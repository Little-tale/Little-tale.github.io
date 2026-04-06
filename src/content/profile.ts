// 이 파일은 히어로, 소개, 연락처에서 공통으로 참조하는 기본 프로필 데이터를 담는다.
// 개인 식별 정보와 외부 링크는 여러 섹션에서 재사용되므로 단일 상수로 관리한다.
import type { Profile } from "@/domain";

// 한 사람의 핵심 소개 정보를 UI에서 바로 사용할 수 있는 형태로 유지한다.
export const profile: Profile = {
  name: "김재형",
  nameEn: "Kim Jaehyung",
  role: "App Developer",
  birth: "2001. 03. 19",
  email: "you3192001@gmail.com",
  phone: "010-6527-6624",
  github: "https://github.com/Little-tale",
  blog: "https://velog.io/@little_tail/posts",
  tagline: "제가 남긴 발자국이 누군가의 꿈이 되기를 바라는 개발자",
  intro:
    "Swift 6, Swift Concurrency, AlarmKit, TCA 등 최신 iOS 기술을 적극적으로 학습하고 프로젝트에 적용해 왔습니다. Tuist, Fastlane을 활용해 빌드·배포·모듈화 등 개발 프로세스를 개선하며, 새로운 기술에 대한 도전을 통해 지속적인 성장을 이어가고 있습니다.",
};
