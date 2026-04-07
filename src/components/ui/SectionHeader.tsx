// 이 파일은 각 섹션 상단의 공통 제목 패턴을 렌더링하는 UI 컴포넌트다.
// 인덱스, 큰 제목, 보조 문구를 동일한 리듬으로 맞춰 전체 페이지 타이포그래피를 통일한다.
// 스크롤 진입 시 자연스럽게 떠오르는 reveal 애니메이션이 framer-motion을 통해 적용된다.
import { motion } from "framer-motion";

// 섹션 헤더에 필요한 최소 텍스트 입력 구조다.
type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

/**
 * 섹션 상단의 번호, 제목, 보조 문구를 공통 스타일로 렌더링한다.
 * framer-motion의 staggerChildren 기능과 whileInView를 사용해 부드럽게 등장한다.
 */
export default function SectionHeader({ index, title, subtitle }: Props) {
  // framer-motion variants
  const containerVariants = {
    hidden: { borderTopColor: "rgba(0,0,0,0)" },
    visible: {
      borderTopColor: "var(--color-border)", // tailwind border color will be inherited generally, here we use a subtle generic approach or we can just stick to opacity if it's too tricky, but let's animate the border if we want.
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="border-t border-transparent pt-10 mb-16 md:mb-24 transition-colors duration-1000"
    // Added tailwind border-transparent and use a class that overrides the border transition safely. Actually framer motion can do it.
    >
      <div className="flex items-baseline justify-between gap-6">
        <motion.span
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono"
        >
          {index}
        </motion.span>
        {subtitle && (
          <motion.span
            variants={itemVariants}
            className="hidden md:block text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            {subtitle}
          </motion.span>
        )}
      </div>
      <motion.h2
        variants={itemVariants}
        className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
