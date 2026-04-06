// 이 파일은 화면 우측 상단에 표시하는 현재 시각 문자열을 주기적으로 갱신하는 커스텀 훅을 제공한다.
// 타임존 포맷팅과 interval 정리를 훅 안에 가둬 Hero 컴포넌트가 표시 로직만 신경 쓰게 만든다.
import { useEffect, useState } from "react";

// 시계 문자열을 만들 때 사용할 선택 옵션 묶음이다.
type Options = {
  timeZone?: string;
  suffix?: string;
  intervalMs?: number;
};

/**
 * 지정한 타임존의 현재 시각을 `"HH:mm SFX"` 형태 문자열로 반환한다.
 * 입력 옵션은 타임존, 접미사, 갱신 주기를 제어하며, 생략 시 서울/KST/30초를 기본값으로 사용한다.
 * 반환값은 렌더링에 바로 쓸 수 있는 문자열이고, `timeZone`, `suffix`, `intervalMs`가 바뀌면 effect가 다시 설정된다.
 * 내부적으로 interval을 등록하며 언마운트 또는 의존성 변경 시 `clearInterval`로 정리한다.
 */
export function useClock({
  timeZone = "Asia/Seoul",
  suffix = "KST",
  intervalMs = 30_000,
}: Options = {}): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    // 동일한 포맷 함수를 최초 실행과 interval 콜백에서 같이 사용해 문자열 규칙을 고정한다.
    const update = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }).format(new Date());
      setTime(`${fmt} ${suffix}`);
    };
    update();
    const id = setInterval(update, intervalMs);
    // 주기가 바뀌거나 컴포넌트가 사라질 때 이전 타이머를 제거해 중복 갱신을 막는다.
    return () => clearInterval(id);
  }, [timeZone, suffix, intervalMs]);

  return time;
}
