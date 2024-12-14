![reade_관리자_v3](https://github.com/user-attachments/assets/bc917619-700e-45b0-a203-69252560b251)
# 📌 Quostomize-admin: 관리자 페이지
## 📝 프로젝트 소개
우리 커스터마이징 서비스(QUOSTOMIZE)를 위한 관리자 페이지입니다.
<br>
정보 조회, 알림 메일 발송, 서비스 및 로그 관리, 실시간 모니터링 기능을 통해 서비스를 효율적으로 관리합니다.
### 👉🏻 [관리자 페이지 바로가기](https://quostomize-admin.vercel.app/)
<br>

## 🚀 주요 설계 방향 
본 프로젝트는 **서비스 안정성**과 **효율성 증대**를 주요 설계 방향으로 두고 개발되었습니다.
- **Authentication + Role 기반 Admin 여부 확인**: 로그인 시 사용자 인증 후, 관리자인지 확인하는 절차를 구현하여 권한을 제어합니다.
- **MiddleWare + API 내부 Role 체크**: 중간 미들웨어에서 API 접근 시 역할을 확인하여 이중 인증을 제공합니다.
- **만료 토큰 갱신 및 예외 처리**: 토큰 기반 인증을 적용하여 토큰 만료 시 갱신하고 예외 처리를 통해 안정적인 인증 프로세스를 유지합니다.
- **역할 기반 접근 제어**: **Admin**만 민감한 데이터에 접근할 수 있도록 하여 보안을 강화했습니다.
<br>

## 🔧 주요 기능
- **정보 조회**: 관리자가 다양한 정보(이용자, 카드, 가맹점 등)를 조회할 수 있습니다.
- **알림 메일 발송**: 관리자가 이메일을 통해 알림을 발송할 수 있는 기능입니다.
- **서비스 관리**: 이용자, 카드, 가맹점 관리 기능을 제공합니다.
- **로그 관리**: MDC(Mapped Diagnostic Context) 필터를 적용하여 로그를 순차적으로 관리하고 분석할 수 있습니다.
<br>

## 🌟 추가 구현사항 
- **모니터링**: Grafana를 통해 시스템 상태를 실시간으로 모니터링하고 문제를 즉시 대응할 수 있도록 합니다.
<br>

## ⚙️ 기술 스택
- 
<br>

## 🌐 배포 파이프라인
관리자 페이지는 Vercel을 이용해 배포를 진행하였습니다. Vercel 대시보드를 통해 배포 상태를 한눈에 확인할 수 있습니다.
**배포 과정**
1. 커밋 푸시: Github에 브랜치로 푸시합니다.
2. Vercel 배포: 메인 브랜치 병합 후 Vercel에 배포합니다.
3. 실시간 업데이트: Vercel을 통해 관리자 사이트가 즉시 업데이트됩니다.
<br>

## 🚨트러블 슈팅
**로그 출력 순서**
- 문제: 멀티 쓰레드 환경에서 동시에 여러 요청이 처리되기 때문에 동일한 요청에 대한 **로그가 순서없이** 쌓였습니다.
- 해결: **MDC**를 Spring Filter 가장 앞단에 적용하여 다양한 시큐리티 필터보다 먼저 적용되도록 해 순서대로 로그가 쌓이게 했습니다. traceId 키 값을 설정하여 요청별 고유한 uuid를 생성하며, 이를 로그 추적에 활용하였습니다.
<br>

## 🗂️ 주요 폴더 구조
**프론트엔드**
```
root/
├── app/
│   ├── (nav)/
│   │   ├── cards/
│   │   ├── franchises/
│   │   ├── information/
│   │   ├── members/
│   │   ├── notifications/
│   │   ├── setting/
│   │   └── layout.jsx
│   └── api/
│       ├── auth/
│       │   ├── [...nestauth]/
│       │   └── logout/
│       ├── cards/
│       ├── mail/
│       ├── manager/
│       ├── members/
│       └── setting/
├── components/
│   ├── button/
│   ├── modal/
│   ├── sideNav/
│   ├── spinner/
│   └── table/
├── public/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── service/
│   └── apiMethodList.js
├── jsconfig.json
├── next.config.mjs
├── tailwind.config.js
├── middleware.js
├── .env.local
├── package.json
├── pnpm-lock.yaml
└── postcss.config.js
```
<br>

## 📅 진행 일정 (13Days)
- 프로젝트 시작일: 2024.11.27.
- 프로젝트 종료일: 2024.12.09.
<br>

## 🖥️ 개발 환경
- 
<br>

## ✍️ 컨벤션
**커밋 컨벤션**
- {Tag}/{작업 내용}
```
Feat/input : 비밀번호 숨김 처리
```
- 커밋 규칙
<table>
  <thead>
    <tr>
      <th>Tag Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Feat</td>
      <td>새로운 기능을 추가</td>
    </tr>
    <tr>
      <td>Fix</td>
      <td>버그 수정</td>
    </tr>
    <tr>
      <td>Design</td>
      <td>CSS 등 사용자 UI 디자인 변경</td>
    </tr>
    <tr>
      <td>!BREAKING CHANGE</td>
      <td>커다란 API 변경의 경우</td>
    </tr>
    <tr>
      <td>!HOTFIX</td>
      <td>치명적인 버그 긴급 수정</td>
    </tr>
    <tr>
      <td>Style</td>
      <td>코드 포맷 변경, 세미콜론 누락 등</td>
    </tr>
    <tr>
      <td>Refactor</td>
      <td>프로덕션 코드 리팩토링</td>
    </tr>
    <tr>
      <td>Comment</td>
      <td>주석 추가 및 변경</td>
    </tr>
    <tr>
      <td>Docs</td>
      <td>문서 수정</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>테스트 코드 추가 또는 수정</td>
    </tr>
    <tr>
      <td>Chore</td>
      <td>빌드 업무 수정 및 패키지 관리 업데이트</td>
    </tr>
    <tr>
      <td>Rename</td>
      <td>파일/폴더명 수정</td>
    </tr>
    <tr>
      <td>Remove</td>
      <td>파일/폴더 삭제</td>
    </tr>
  </tbody>
</table>

<br>

**API 응답 컨벤션**
- noContent(204) 응답 처리
- Backend 서버에서 noContent(204) 응답이 오는 경우 API route.jss에서 아래와 같이 처리합니다.
```
        return new Response(null, {
            status: 204,
        });
```

<br>

## 🧑‍🤝‍🧑 팀원 소개
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Kee0304">
        <img src="https://github.com/Kee0304.png" alt="기남석" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/newgamer11">
        <img src="https://github.com/newgamer11.png" alt="김영성" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kimh7537">
        <img src="https://github.com/kimh7537.png" alt="김현우" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/seonmin5">
        <img src="https://github.com/seonmin5.png" alt="오선민" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hcu55">
        <img src="https://github.com/hcu55.png" alt="홍찬의" width="150" height="150"/>
      </a>
    </td>
  </tr>
   <tr>
    <td align="center">
      <a href="https://github.com/Kee0304">
        <b>기남석</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/newgamer11">
        <b>김영성</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kimh7537">
        <b>김현우</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/seonmin5">
        <b>오선민</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hcu55">
        <b>홍찬의</b>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
  </tr>
</table>

<br>

## 🔗 관련 문서 링크
- [Quostomize-BE](https://github.com/woorifisa-projects-3rd/Quostomize-BE)
- [Quostomize-FE](https://github.com/woorifisa-projects-3rd/Quostomize-FE)
- [HeadlessUI](https://headlessui.com/)
