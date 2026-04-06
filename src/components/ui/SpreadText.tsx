// 이 파일은 스크롤 진행도에 따라 글자가 흩어지는 연출을 만드는 텍스트 전용 UI 컴포넌트다.
// 각 글자의 이동 방향을 고정된 시드로 생성해, 리렌더가 일어나도 같은 단어는 같은 패턴을 유지한다.
import { CSSProperties, useMemo, useRef } from "react";
import { useScrollProgress } from "@/hooks";

// 분산 텍스트 효과를 제어하는 입력 속성들이다.
type Props = {
  children: string;
  /** maximum vertical travel (in em of the current font-size) at full scatter */
  distance?: number;
  /** maximum rotation in degrees at full scatter */
  rotation?: number;
  /** how far the stage must scroll to reach full scatter (px) */
  travel?: number;
  /** stable seed so each occurrence has its own letter pattern */
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * 인덱스와 시드를 기반으로 -1..1 범위의 의사 난수를 만든다.
 * 입력은 글자 순서와 컴포넌트 고유 시드이며, 반환값은 각 글자의 이동/회전 방향을 안정적으로 고정하는 숫자다.
 * 같은 입력이면 항상 같은 값을 반환해야 애니메이션 패턴이 리렌더마다 바뀌지 않는다.
 */
function rand(i: number, seed: number): number {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/**
 * 문자열을 글자 단위로 분해해 스크롤에 따라 흩어지는 텍스트를 렌더링한다.
 * 입력 props는 거리, 회전량, 스크롤 구간, 시드, 클래스/스타일이며 반환값은 여러 `span`으로 구성된 인라인 텍스트다.
 * 내부적으로 `useScrollProgress`를 사용하므로 스크롤 위치가 바뀌면 다시 렌더링되고, ref 측정 대상이 없으면 기본 상태를 유지한다.
 *
 * Y-only scatter text, modeled after bettinasosa.com hero:
 *   transform = matrix(cos, sin, -sin, cos, 0, ty)   // tx is always 0
 *
 * Each letter gets a stable pseudo-random unit direction. A single scroll
 * progress multiplies every letter's direction, so the whole word tears apart
 * vertically in unison as the user scrolls.
 */
export default function SpreadText({
  children,
  distance = 6,
  rotation = 15,
  travel = 600,
  seed = 1,
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // 텍스트 자체가 stage 안에서 얼마나 진행됐는지를 애니메이션 강도로 사용한다.
  const progress = useScrollProgress(ref, travel);

  const letters = useMemo(() => {
    // 문자열이 바뀔 때만 글자별 방향 벡터를 다시 계산해 패턴 안정성과 비용을 함께 잡는다.
    const chars = Array.from(children);
    return chars.map((ch, i) => ({
      ch,
      dir: rand(i + 1, seed),
      dirRot: rand(i + 1, seed + 91),
    }));
  }, [children, seed]);

  // linear — bettinasosa feels linear in scroll
  const eased = progress;

  // 외부 스타일을 허용하되 인라인 블록으로 고정해 글자 단위 transform이 줄바꿈에 덜 흔들리게 한다.
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      {letters.map((l, i) => {
        const isSpace = l.ch === " ";
        const ty = l.dir * distance * eased;
        const rot = l.dirRot * rotation * eased;
        // 스크롤이 진행될수록 글자를 옅게 만들어 분산감이 더 강하게 느껴지게 한다.
        const letterOpacity = Math.max(0, 1 - progress * 1.4);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translate3d(0, ${ty}em, 0) rotate(${rot}deg)`,
              opacity: letterOpacity,
              willChange: "transform, opacity",
              whiteSpace: "pre",
            }}
          >
            {isSpace ? "\u00A0" : l.ch}
          </span>
        );
      })}
    </span>
  );
}
