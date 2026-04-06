// 이 파일은 개발 철학 섹션에서 사용하는 카드형 데이터 구조를 정의한다.
// UI는 이 타입을 기준으로 제목과 설명을 안정적으로 렌더링한다.
// 개발 철학 카드 한 장의 텍스트 구조를 나타낸다.
export type PhilosophyEntry = {
  title: string;
  body: string;
};
