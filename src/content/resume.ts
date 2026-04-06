import type { Resume } from "@/domain";

export const resume: Resume = {
  work: [
    {
      company: "미스고 부동산",
      role: "iOS 개발 파트 주임",
      period: "2024.12.03 — 2025.05.10",
      body: "부동산 앱 iOS 클라이언트 개발 책임 리드.",
    },
  ],
  leadership: [
    {
      company: "Central Makeus Challenge",
      role: "iOS 개발 파트 리드",
      period: "2025.03.15 — 참여중",
      body: "챌린저 코드 리딩 및 프로젝트 관리.",
    },
  ],
  education: [
    {
      school: "ICT폴리텍대학",
      major: "정보통신공학",
      period: "2020.03 — 2024.02",
      note: "GPA 4.27 / 4.5",
    },
  ],
  activities: [
    {
      name: "CMC 개발 동아리",
      role: "iOS 개발 챌린저 16th",
      body: "굴비잇기 앱 개발",
    },
  ],
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
