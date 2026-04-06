// 이 파일은 기술 스택 섹션과 하단 마키 텍스트의 원본 데이터를 담는다.
// 카테고리 이름과 항목 순서는 시각적 그룹핑에 직접 반영되므로 임의 정렬하지 않는다.
import type { SkillCategory } from "@/domain";

// 카테고리별로 끊어 주어 스택 폭이 넓어도 사용자가 빠르게 훑어볼 수 있게 한다.
export const skills: readonly SkillCategory[] = [
  {
    name: "Frameworks",
    items: ["UIKit", "SwiftUI", "AlarmKit", "MapKit", "Flutter"],
  },
  { name: "Network", items: ["URLSession", "Alamofire", "Socket.IO"] },
  { name: "Reactive & State", items: ["RxSwift", "Combine"] },
  { name: "Architecture", items: ["MVC", "MVVM", "MVI", "Redux", "TCA"] },
  { name: "Tools", items: ["GitHub", "Slack", "Tuist", "Fastlane", "Figma"] },
  { name: "Others", items: ["Realm", "SnapKit", "PinLayout", "Dart"] },
];
