// 이 파일은 커스텀 훅들의 공개 진입점이다.
// UI 레이어에서 훅 경로를 단순화해 import 문을 짧게 유지하게 한다.
export { useClock } from "./useClock";
export { useScrollProgress } from "./useScrollProgress";
export type { ScrollProgressMode } from "./useScrollProgress";
export { useInView } from "./useInView";
export type { UseInViewOptions } from "./useInView";
