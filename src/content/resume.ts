// 이 파일은 About 섹션 오른쪽 이력 타임라인에 들어갈 원본 데이터를 정의한다.
// 화면에서는 각 배열을 공통 카드 구조로 변환해 쓰므로, 여기서는 사실 중심의 데이터만 유지한다.
import type { Resume } from "@/domain";

// 섹션별 배열 키는 About 컴포넌트에서 그대로 순회하므로 의미 있는 순서를 보존한다.
export const resume: Resume = {
  // 최근 실무 경험부터 시작해 커리어 맥락이 먼저 보이도록 배치한다.
  work: [
    {
      company: "미스고 부동산",
      role: "iOS 개발 파트 주임",
      period: "2024.12.03 — 2025.05.10",
      body: "부동산 앱 iOS 클라이언트 개발 책임 리드.",
    },
  ],
  // 현재 진행 중인 리드 경험을 별도 섹션으로 분리해 강조한다.
  leadership: [
    {
      company: "Central Makeus Challenge",
      role: "iOS 개발 파트 리드",
      period: "2025.03.15 — 참여중",
      body: "챌린저 코드 리딩 및 프로젝트 관리.",
    },
  ],
  // 학력은 한 줄 메타보다 설명형 note가 더 중요해 별도 필드로 둔다.
  education: [
    {
      school: "ICT폴리텍대학",
      major: "정보통신공학",
      period: "2020.03 — 2024.02",
      note: "GPA 4.27 / 4.5",
    },
  ],
  // 활동 항목은 경력보다 짧은 설명 중심이므로 period 대신 body만 둔다.
  activities: [
    {
      name: "CMC 개발 동아리",
      role: "iOS 개발 챌린저 16th",
      body: "굴비잇기 앱 개발",
    },
  ],
  // 수상 이력은 시간순 문맥이 중요하므로 date를 함께 유지한다.
  awards: [
    {
      title: "Central Makeus Challenge 16th 대상",
      date: "2025.03",
      body: "금융관리 굴비잇기 앱을 개발하여 대상 수상",
    },
    {
      title: "SeSAC iOS 경진대회 1st",
      date: "2024.05",
      body: "LSLP 경진대회에서 커뮤니티 CategoryZ 앱을 통해 1등 수상",
    },
    {
      title: "한국 디지털 컨텐츠 학회 학술대회 동상",
      date: "2023.11",
      body: "IoT와 애플리케이션 제어를 통한 COMHOME 앱 개발 논문",
    },
    {
      title: "ICT폴리텍대학 졸업 작품전 대상",
      date: "2023.11",
      body: "IoT APP COMHOME을 개발하여 대상 수상",
    },
  ],
  // 자격증은 별도 섹션으로 분리해 전문성 신호를 빠르게 확인할 수 있게 한다.
  certificates: [
    {
      title: "정보통신 산업기사",
      date: "2023.05",
      body: "KCA (국가 기술 자격 검정)",
    },
    {
      title: "네트워크 관리사",
      date: "2020.12",
      body: "ICQA (한국정보통신자격협회)",
    },
  ],
};
