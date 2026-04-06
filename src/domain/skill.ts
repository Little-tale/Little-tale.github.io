// 이 파일은 기술 스택 섹션에서 카테고리별 스킬 묶음을 표현하는 타입을 정의한다.
// 한 카테고리 안에 여러 기술명이 들어가는 단순 구조지만, 섹션 렌더링의 기준 타입이 된다.
// 스킬 카테고리 한 묶음의 이름과 항목 목록이다.
export type SkillCategory = {
  name: string;
  items: readonly string[];
};
