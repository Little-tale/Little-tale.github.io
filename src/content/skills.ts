import type { SkillCategory } from "@/domain";

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
