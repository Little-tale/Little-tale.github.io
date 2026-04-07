// 이 파일은 프로젝트 섹션 전체를 구성하는 대표 작업물 데이터를 보관한다.
// 각 객체는 화면에서 하나의 프로젝트 아티클로 렌더링되며, 기능/하이라이트/문제 해결 사례 순서를 그대로 따른다.
import type { Project } from "@/domain";

// 배열 순서가 포트폴리오에서 보여 주고 싶은 프로젝트 우선순위이므로 수동 정렬 의도를 유지한다.
export const projects: readonly Project[] = [
  // 실무 경험을 가장 먼저 배치해 현재 역량과 실제 서비스 운영 경험이 바로 보이도록 한다.
  {
    id: "missgo",
    title: "미스고 부동산",
    index: "01",
    image: "/projects/1.svg",
    tagline:
      "이젠 누구나 쉽고 간편하게 부동산 경매를 할 수 있습니다. 미스고부동산 테크놀로지는 대법원경매에 필요한 모든 정보를 제공합니다.",
    period: "2024.12.03 ~ 2025.05.10",
    team: "iOS 개발 1명",
    env: { xcode: "Xcode 15, 16", minIOS: "iOS 14.6+", swift: "Swift 5.9" },
    features: [
      {
        title: "데이터 맵",
        body: "지도를 통한 전국 필지 정보 확인, 실거래가 즉시 확인, 국유 부동산 정보 제공",
      },
      {
        title: "등기부등본",
        body: "앱 내에서 대법원 등기부등본, 토지대장, 건축물대장 열람",
      },
      {
        title: "비대면 경매 입찰",
        body: "부동산경매 전문가와 매칭을 통해 비대면으로 입찰",
      },
      {
        title: "매물 추천",
        body: "실투자금만 입력하면 세금 및 대출 비중을 적용한 매물 추천",
      },
    ],
    // 스택은 화면 메타 그리드에서 라벨/내용 한 줄씩 읽히도록 정리한다.
    stack: [
      { label: "Framework", items: "UIKit (95%), SwiftUI (5%)" },
      {
        label: "UI Library",
        items: "SnapKit, PinLayout, FlexLayout, Kingfisher, Lottie",
      },
      { label: "Reactive", items: "RxSwift, RxCocoa" },
      { label: "Network", items: "Alamofire, AWS S3" },
      {
        label: "Others",
        items: "Firebase, WKWebView, TossSDK, StoreKit, NMapsMap",
      },
    ],
    highlights: [
      {
        title: "소셜 로그인 연동",
        body: "기존 이메일 로그인 방식에서 Toss·Apple 로그인과 본인인증 기능을 구현했습니다.",
      },
      {
        title: "Custom AVPlayer",
        body: "단일 이미지 형태의 광고를 동영상 광고로 확장하기 위한 영상 플레이어를 구현해, 사용자에게 더 직관적인 정보를 전달했습니다.",
      },
      {
        title: "StoreKit 인앱결제",
        body: "결제 완료 후 서버 영수증 검증 로직까지 구성하여 결제의 신뢰성과 안정성을 확보했습니다.",
      },
      {
        title: "Swift 6 대비 비동기 개편",
        body: "GCD 기반 코드를 Swift Concurrency로 전환하고, RxSwift의 AsyncSequence를 통해 Thread Explosion 문제를 개선했습니다.",
      },
      {
        title: "WebView–Native 연동",
        body: "WKWebView로 예정매물 상세, 필터, 광고를 연동하고 네이티브와 웹 간 이벤트 통신을 구현했습니다.",
      },
      {
        title: "홈 화면 UI 전면 재설계",
        body: "ScrollView 안에 CollectionView·TableView를 혼합하던 구조를 CompositionalLayout 기반으로 재구성해 메모리 사용 측면에서도 개선했습니다.",
      },
      {
        title: "지도 UI 작업",
        body: "경매·공매·예정매물 마커와 오버레이를 구현하고, 임장 네비게이션 기능으로 지도 탐색 경험을 강화했습니다.",
      },
    ],
    // 문제 해결 사례는 아코디언으로 열리므로, 제목만 봐도 맥락이 잡히게 구성한다.
    troubles: [
      {
        title: "지도 UI 로직과 도메인 로직의 분리",
        problem:
          "기존 MVC에서는 위치 처리, 지도 상태, 네비게이션 로직이 하나의 ViewController에 집중되어 코드가 길고 복잡해지는 문제가 있었습니다.",
        solution:
          "ViewModel보다 더 독립된 로직 컴포넌트(MapLocationStateManager)로 분리하여, 책임을 명확히 하고 가독성과 유지보수성을 개선했습니다.",
      },
      {
        title: "지도 Thread Explosion",
        problem:
          "사용자 이동·드래그·모드 전환이 반복될 때, 지도 동작이 무효화되거나 정상적으로 동작하지 않는 현상을 확인했습니다.",
        cause:
          "GCD 기반 비동기 처리에서 마커 제거·오버레이 정리 등 작업이 여러 DispatchQueue에서 병렬·중첩 실행되어 순서 보장과 취소 제어가 어려웠습니다.",
        solution: "GCD 기반을 Swift Concurrency 기반으로 전환했습니다.",
        bullets: [
          "단일 Task 흐름으로 묶어 순차 실행",
          "async/await로 실행 순서 보장",
          "UI 직접 연관 작업의 우선순위 보장",
        ],
      },
      {
        title: "AVPlayer 중앙화",
        problem:
          "특정 화면 진입 시 사용자의 외부 음악 재생을 방해하는 문제가 발생했습니다.",
        cause:
          "AVPlayer가 화면별로 분산 생성·관리되어 오디오 세션이 매번 활성화되고 카테고리가 덮어써지는 구조였습니다.",
        solution: "AVPlayerManager를 구성해 중앙에서 관리하도록 개선.",
        bullets: [
          "AVPlayer와 오디오 세션을 중앙에서 관리",
          "NSPointerArray로 플레이어를 약한 참조로 추적",
        ],
      },
      {
        title: "WebView Memory Leak",
        problem:
          "WKScriptMessageHandler를 등록한 후 화면을 닫아도 deinit이 호출되지 않는 문제를 확인했습니다.",
        cause: "MessageHandler 강한참조로 인한 retain cycle.",
        solution: "MessageHandler를 약한 참조로 감싸는 래퍼를 도입.",
        bullets: [
          "UserContentController에 래퍼만 등록",
          "약한 delegate를 통해 메시지 전달",
        ],
      },
    ],
  },
  // 개인 출시 앱은 설계/자동화 역량을 보여 주는 사례로 실무 프로젝트 다음에 둔다.
  {
    id: "goolbi",
    title: "굴비잇기",
    index: "02",
    image: "/projects/2.svg",
    tagline:
      "굴비들의 짠테크! '굴비잇기'로 슬기롭게 절약하고 지속 가능한 습관을 형성하세요.",
    period: "2025.01.04 ~ 유지보수 중",
    team: "iOS 1명 — 서버·디자인·기획 협업",
    link: { label: "App Store", href: "https://buly.kr/1GKvw1w" },
    env: { xcode: "Xcode 16, 26.1", minIOS: "iOS 16.0+", swift: "Swift 6" },
    features: [
      {
        title: "소비습관",
        body: "소비습관 분석 후 유형 판별, 유형에 따른 챌린지 추천, 유형별 소비 습관 이미지 제공",
      },
      {
        title: "개인/그룹 챌린지",
        body: "작심삼일 챌린지, 전체 챌린지 평균 성공률 제공, 그룹 단위 챌린지",
      },
      {
        title: "살까 말까",
        body: "소비 예정 상품을 올려 다른 사용자에게 살지 말지 결정 받는 기능. 신고 기능을 통한 삭제",
      },
      { title: "알림 기능", body: "미완료 챌린지 미리 알림 기능" },
    ],
    stack: [
      { label: "Framework", items: "SwiftUI" },
      { label: "Architecture", items: "TCA" },
      { label: "Reactive", items: "Combine" },
      { label: "Build & CI/CD", items: "Tuist, Fastlane" },
      { label: "Network", items: "Alamofire" },
      {
        label: "Others",
        items:
          "TCACoordinator, Gifu, KakaoOpenSDK, Lottie, Kingfisher, PopupView, SwiftImageCompressor",
      },
    ],
    highlights: [
      {
        title: "모듈/기능 분리",
        body: "Tuist로 App / Domain / Modules 등 기능 단위 구조화로 유지보수성, 빌드 속도, 재사용성을 확보했습니다.",
      },
      {
        title: "Demo App 분리",
        body: "각 모듈을 Demo App으로 분리해 필요한 기능만 선택적으로 빌드·실행할 수 있는 환경을 구축, 디버깅 속도를 크게 개선했습니다.",
      },
      {
        title: "FCM 연동 및 배지 카운트",
        body: "FCM 기반 푸시 알림 + 토큰 관리 + 권한 요청 + 배지 카운트 업데이트까지 푸시 플로우를 구현했습니다.",
      },
      {
        title: "앱 강제 업데이트",
        body: "앱스토어 버전과 사용자의 버전을 비교해 강제 업데이트를 구현했습니다.",
      },
      {
        title: "이미지 캡처/크롭",
        body: "사용자가 선택한 이미지를 영역 지정으로 크롭할 수 있는 편집 기능을 구현했습니다.",
      },
      {
        title: "Analytics/Crashlytics + Discord",
        body: "서버 오류(500) 발생 시 Crashlytics로 이벤트를 감지하고 Discord로 알림을 전송하는 모니터링 자동화를 구현했습니다.",
      },
      {
        title: "소셜 로그인",
        body: "Kakao, Apple 로그인을 통한 간편 로그인 기능 구현.",
      },
    ],
    // 운영 자동화와 사용자 기능이 모두 드러나도록 구현 포인트를 폭넓게 기록한다.
    troubles: [
      {
        title: "Fastlane 적용",
        problem:
          "Dev / Stage / Live로 운영하면서 배포가 잦아졌고, 수동 배포는 빌드 설정·스킴 선택 실수와 빌드 시간 증가 문제를 일으켰습니다.",
        solution: "Fastlane 기반 자동화 도입.",
        bullets: [
          ".env 기반 환경변수 분리로 민감정보 보호",
          "App Store Connect API Key 인증으로 2FA 없이 파이프라인 구성",
          "환경별 배포 lane 분리",
        ],
      },
      {
        title: "Thread Debugging Utility",
        problem:
          "비동기 로직 중 Main Thread가 아닌 곳에서 UI 업데이트가 실행되는 케이스가 발생했습니다.",
        cause: "백그라운드 작업 후 UI 업데이트 작업 호출 지점 실수.",
        solution:
          "ThreadCheckable 프로토콜 + extension으로 공통 디버깅 유틸을 구현해 실수를 방지했습니다.",
      },
      {
        title: "Snap Carousel UI 구현",
        problem:
          "사용자가 가로 스크롤로 콘텐츠를 직관적으로 탐색할 수 있는 Snap Carousel UI가 필요했습니다.",
        solution: "GeometryReader + DragGesture 기반으로 직접 구현.",
        bullets: [
          "GeometryReader로 카드와 화면 중앙 거리를 계산해 scale effect 적용",
          "DragGesture로 가로 스와이프, onChanged·onEnded로 Snap 구현",
          "스크롤 종료 시 가장 가까운 카드 중앙 정렬",
        ],
      },
      {
        title: "이미지 압축 구현과 라이브러리화",
        problem:
          "이미지 업로드 서버 제한 용량이 5MB여서 압축이 필요했고, 빠른 압축을 위한 알고리즘 적용이 필요했습니다.",
        solution: "재사용성을 위해 라이브러리화 (https://buly.kr/HHdtI7T).",
        bullets: [
          "JPEG 압축 시 목표 파일 크기를 만족하는 최적 품질을 이진 탐색으로 결정",
          "jpeg, png 중 원하는 확장자로 압축",
          "GCD, Swift Concurrency 기반 API 제공",
        ],
      },
    ],
  },
  // UIKit 기반 협업 프로젝트는 네트워크/실시간 통신/성능 관점의 경험을 보여 준다.
  {
    id: "categoryz",
    title: "CategoryZ",
    index: "03",
    image: "/projects/3.svg",
    tagline:
      "당신의 일상과 특별한 순간! 그 외에도 다양한 경험을 CategoryZ로 공유해보세요!",
    period: "2024.04.13 ~ 2024.06.11",
    team: "iOS 1명 — 서버 협업",
    link: { label: "App Store", href: "https://buly.kr/DaPzOVt" },
    env: { xcode: "Xcode 15", minIOS: "iOS 16.0+", swift: "Swift 5.9" },
    features: [
      {
        title: "소셜 피드 & 인터랙션",
        body: "팔로우 기능, 게시글 좋아요 및 모아보기, 해시태그 기반 게시글 탐색",
      },
      {
        title: "실시간 커뮤니케이션",
        body: "WebSocket 기반 1:1 실시간 채팅, 메시지 수신·연결 상태 관리",
      },
      { title: "결제 및 서비스 이용", body: "PG 결제 연동을 통한 결제 서비스" },
      {
        title: "서비스 안정성",
        body: "네트워크 연결 상태를 감지해 서비스 이용 중단 상황 안내",
      },
    ],
    stack: [
      { label: "Framework", items: "UIKit" },
      { label: "Reactive", items: "RxSwift" },
      { label: "Architecture", items: "MVVM" },
      { label: "Network", items: "Alamofire, SocketIO" },
      {
        label: "Others",
        items:
          "SnapKit, PhotosUI, AVFoundation, RxDataSource, CompositionalLayout, Kingfisher, KeychainAccess, Realm",
      },
    ],
    highlights: [
      {
        title: "네트워크 요청 구조 통합",
        body: "Router + TargetType 기반 네트워크 계층을 설계해 API 요청 구성을 표준화하고 일관된 방식으로 관리할 수 있도록 했습니다.",
      },
      {
        title: "WebSocket 통신 채팅",
        body: "Socket.IO로 1:1 실시간 메시지 전송을 구현하고, 화면 전환 시 소켓 연결을 제어해 안정적인 채팅 환경을 유지했습니다.",
      },
      {
        title: "Masonry UI 구현",
        body: "가변 높이 아이템 배치 시에도 사용자가 콘텐츠를 직관적으로 탐색할 수 있도록 레이아웃 흐름과 스크롤 경험을 함께 고려해 구성했습니다.",
      },
      {
        title: "KeychainAccess",
        body: "Access/Refresh Token을 OS 보안 저장소에 암호화 저장하여 앱 내부 저장 방식 대비 보안을 강화했습니다.",
      },
      {
        title: "커서 기반 페이지네이션",
        body: "Offset/Index 방식 대신 Cursor 기반을 적용해 중복 없이 다음 데이터를 조회하도록 구성했습니다.",
      },
    ],
    // 디버깅/보안/라이프사이클 판단처럼 구현 이유가 드러나는 사례를 모아 둔다.
    troubles: [
      {
        title: "Instruments 도입",
        problem:
          "이미지 중심 화면에서 스크롤·전환 후에도 메모리 사용량이 지속적으로 증가했고, 일부 화면에서는 객체 해제 누락 의심 상황이었습니다.",
        solution: "Instruments 도입을 통한 메모리 체크.",
        bullets: [
          "화면 진입·이탈 시 메모리 변화 추적",
          "이미지 로딩·캐싱 객체 중심 점유 패턴 분석",
          "강한 참조 발견 시 리소스·뷰 계층을 식별 후 조정",
        ],
      },
      {
        title: "API 인코딩 전략 불일치",
        problem: "특정 요청에서만 통신이 실패해 원인 파악이 어려웠습니다.",
        cause:
          "프로젝트 전역에 SnakeCase Encoding을 적용했으나 일부 프로퍼티에서 CamelCase를 요구하는 것을 확인했습니다.",
        solution: "CodingKeys로 서버가 요구하는 키를 명시적으로 매핑.",
      },
      {
        title: "소켓과 백그라운드",
        problem:
          "백그라운드 전환 후에도 소켓 연결이 유지되어 메시지 수신과 배터리 소모가 지속되고, 포그라운드 복귀 시 중복 연결 위험이 있었습니다.",
        solution: "라이프사이클 이벤트를 감지해 소켓 연결을 제어.",
        bullets: ["백그라운드 전환 시 연결 해제", "포그라운드 진입 시 재연결"],
      },
      {
        title: "Keychain을 선택한 이유",
        problem: "Access Token은 어떻게 관리하는 게 좋을까?",
        solution:
          "탈취 시 계정 접근으로 이어질 수 있는 민감 정보이므로 OS 보안 영역에 암호화 저장하기 위해 Keychain을 선택.",
        bullets: [
          "KeychainAccess 사용",
          "iCloud Keychain을 통한 기기 간 동기화 차단",
        ],
      },
    ],
  },
  // 출시 취소 프로젝트도 기술 선택과 설계 판단 근거를 보여 주기 위해 포트폴리오에 포함한다.
  {
    id: "guideu",
    title: "Guide-U",
    index: "04",
    image: "/projects/4.svg",
    tagline:
      "가이두와 함께하는 편리한 왁타버스 덕질생활. 당신을 위한 왁타버스 가이드를 모바일에서도 만나보세요!",
    period: "2024.09.02 ~ 2024.10.30",
    team: "2명",
    status: "현재 출시 취소",
    link: { label: "정보", href: "https://buly.kr/7bIDZiO" },
    env: { xcode: "Xcode 16", minIOS: "iOS 16.0+", swift: "Swift 6" },
    features: [
      {
        title: "왁타버스 탐색",
        body: "왁타버스 멤버 검색, 멤버 상세 정보 제공, 크롬 익스텐션에서도 실시간 확인",
      },
      {
        title: "유튜브 영상 연계",
        body: "왁타버스 영상의 인물 정보 제공, 해당 인물 다른 영상 목록 제공",
      },
      {
        title: "이 밈은 뭐지?",
        body: "멤버뿐 아니라 밈 검색 기능 도입, 밈 상세 정보와 관련 영상 제공",
      },
      { title: "화면 모드 제공", body: "라이트 모드, 다크 모드 제공" },
    ],
    stack: [
      { label: "Framework", items: "SwiftUI" },
      { label: "Architecture", items: "TCA" },
      { label: "Reactive", items: "Combine" },
      { label: "Network", items: "Alamofire" },
      {
        label: "Others",
        items: "TCACoordinator, Kingfisher, PopupView, Realm",
      },
    ],
    highlights: [
      {
        title: "Swift 6 도입",
        body: "강화된 Concurrency 검사로 컴파일 단계에서 데이터 레이스 및 스레드 오류를 조기에 발견할 수 있도록 개선했습니다.",
      },
      {
        title: "Actor 도입",
        body: "Actor 모델을 적용해 공유 상태를 격리하고 데이터 레이스 가능성을 제거했습니다.",
      },
      {
        title: "Lock 기반 상태 격리",
        body: "Actor를 도입하기 어려운 환경(동기 API, 값 타입 포함 구조 등)에는 NSRecursiveLock을 통한 상태 격리를 구현했습니다.",
      },
      {
        title: "Shimmer Animation",
        body: "재사용 가능한 Shimmer 로딩 애니메이션(ViewModifier)을 구현하고 LTR/RTL 방향에 따라 그라디언트 이동 방향을 자동 전환하도록 했습니다.",
      },
      {
        title: "App Group",
        body: "App Group 기반 UserDefaults를 공유 저장소로 구성해 메인 앱과 Share Extension이 동일한 데이터를 접근하도록 설계했습니다.",
      },
    ],
    // Swift 6 전환 배경과 동시성 설계 판단을 사례 중심으로 정리한다.
    troubles: [
      {
        title: "Swift 6 왜 도입하였는가",
        problem:
          "기존 Swift 5.x 환경은 동시성 경고 수준에 그쳤고, 장기적으로 Swift Concurrency 기반 구조를 활용하기 위해 엄격한 동시성 규칙이 필요했습니다.",
        solution: "Swift 6 도입.",
        bullets: [
          "값 타입 / 불변 객체 Sendable 채택",
          "가변 객체는 Actor·Lock 격리로 구조 변경",
          "UI 갱신·상태 반영 지점을 @MainActor로 명시",
        ],
      },
      {
        title: "LockIsolated 구현 이유",
        problem:
          "Actor는 직렬 실행 컨텍스트를 가져 호출이 suspend/resume될 수 있고, 작업이 enqueue되어 오버헤드가 발생합니다. 접근이 잦고 작업이 짧은 구조에서는 과한 구조라고 판단했습니다.",
        solution: "간단한 구조에는 LockIsolated(NSRecursiveLock 기반) 사용.",
      },
      {
        title: "Any Value Actor",
        problem:
          "여러 비동기 작업이 동일한 상태를 읽고/수정하는 영역에서 데이터 레이스 위험이 존재합니다. 매번 Actor를 만들기보다 쉬운 방법이 필요했습니다.",
        solution: "제네릭 기반의 AnyValueActor를 구현.",
        bullets: [
          "재사용성을 위해 제네릭 채택",
          "하나의 메서드를 통해 값을 안전하게 수정",
          "초기값 저장으로 안전한 리셋 가능",
        ],
      },
      {
        title: "Type Throws 적용",
        problem:
          "비동기·도메인 로직이 복잡해지며 에러가 Error 하나로 throw되어 as 문법으로 컨트롤해야 했습니다.",
        solution:
          "Swift 6의 Type Throws를 적용해 에러 타입을 명시적으로 선언하고 try/catch가 정확한 타입을 갖도록 개선했습니다.",
      },
    ],
  },
];
