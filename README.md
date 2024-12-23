![readme_관리자_v3](https://github.com/user-attachments/assets/288e1653-9493-4a24-ba00-1ce1fd54897b)
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
![커스터 마이징 서비스 (5)](https://github.com/user-attachments/assets/f9334aa2-84f1-4ad4-81fd-7540a9389de2)


- **서비스 관리**: 이용자, 카드, 가맹점 관리 기능을 제공합니다.
![커스터 마이징 서비스 (6)](https://github.com/user-attachments/assets/1d3c9ccf-d4eb-473a-8656-a91c3b1b8ced)


- **로그 관리**: MDC(Mapped Diagnostic Context) 필터를 적용하여 로그를 순차적으로 관리하고 분석할 수 있습니다.
![53](https://github.com/user-attachments/assets/95f2690a-ea8e-4560-8123-2c48c2ab60f8)

![54](https://github.com/user-attachments/assets/3473ca5d-82a8-46d9-971e-89c27271a158)


<br>

## 🌟 추가 구현사항 
- **모니터링**: Grafana를 통해 시스템 상태를 실시간으로 모니터링하고 문제를 즉시 대응할 수 있도록 합니다.
![커스터 마이징 서비스 (7)](https://github.com/user-attachments/assets/649bf739-7335-4c6d-a5a0-f8a64315e1d0)


<br>

## ⚙️ 기술 스택
![image](https://github.com/user-attachments/assets/580632dd-5717-49b5-9fb7-1658a2b68a2a)
<br>


## 🌐 배포 파이프라인
관리자 페이지는 Vercel을 이용해 배포를 진행하였습니다. Vercel 대시보드를 통해 배포 상태를 한눈에 확인할 수 있습니다.
<br>

**배포 과정**
1. 커밋 푸시: Github에 브랜치로 푸시합니다.
2. Vercel 배포: 메인 브랜치 병합 후 Vercel에 배포합니다.
3. 실시간 업데이트: Vercel을 통해 관리자 사이트가 즉시 업데이트됩니다.
<br>

## 🖥️ 인프라 구조도
![image](https://github.com/user-attachments/assets/aeb76baa-ece2-40fd-8ed6-18205d223d69)


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


## 💻 개발 환경
<table>
  <thead>
    <tr>
      <th>카테고리</th>
      <th>라이브러리</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">프레임워크 & 코어</td>
      <td><strong>Next.js</strong> (v14.2.19)</td>
      <td>React 기반의 풀스택 웹 프레임워크로 SSR 및 SSG 지원</td>
    </tr>
    <tr>
      <td><strong>React</strong> (v18.2.0)</td>
      <td>선언형 사용자 인터페이스를 개발하기 위한 라이브러리</td>
    </tr>
    <tr>
      <td rowspan="5">UI & 아이콘</td>
      <td><strong>Ant Design</strong> (v5.22.3)</td>
      <td>웹 애플리케이션 UI 컴포넌트 라이브러리, 빠르고 일관된 UI 구축 지원</td>
    </tr>
    <tr>
      <td><strong>Headless UI</strong> (v2.2.0)</td>
      <td>접근성 표준을 준수하는 UI 컴포넌트 라이브러리, 디자인 커스터마이징 용이</td>
    </tr>
    <tr>
      <td><strong>Ant Design Icons</strong> (v5.5.2)</td>
      <td>Ant Design 스타일의 아이콘 세트 제공</td>
    </tr>
    <tr>
      <td><strong>Material UI Icons</strong> (v6.1.9)</td>
      <td>Material Design 기반의 아이콘 세트 제공</td>
    </tr>
    <tr>
      <td><strong>React Icons</strong> (v5.4.0)</td>
      <td>다양한 스타일의 아이콘 라이브러리 모음 제공</td>
    </tr>
    <tr>
      <td rowspan="2">날짜 & 시간</td>
      <td><strong>JS-Joda</strong> (v5.6.3)</td>
      <td>불변성을 갖춘 날짜와 시간 처리 라이브러리</td>
    </tr>
    <tr>
      <td><strong>date-fns</strong> (v4.1.0)</td>
      <td>JavaScript 날짜 처리 라이브러리, 간단하고 직관적인 API 제공</td>
    </tr>
    <tr>
      <td>인증</td>
      <td><strong>NextAuth.js</strong> (v5.0.0-beta.25)</td>
      <td>OAuth, Credentials 등 다양한 인증 방식을 간편하게 구현</td>
    </tr>
    <tr>
      <td rowspan="2">추가 기능</td>
      <td><strong>React Paginate</strong> (v8.2.0)</td>
      <td>효율적인 페이지네이션 기능을 제공하는 React 컴포넌트</td>
    </tr>
    <tr>
      <td><strong>React Quill</strong> (v3.3.3)</td>
      <td>리치 텍스트 편집기 라이브러리, 알림메일 입력 기능 구현</td>
    </tr>
  </tbody>
</table>

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
      <a href="https://github.com/bangsk2">
        <img src="https://github.com/bangsk2.png" alt="방성경" width="150" height="150"/>
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
      <a href="https://github.com/bangsk2">
        <b>방성경</b>
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
   <td align="center">총괄 팀장<br/>Frontend 팀장<br/>FullStack 개발</td>
   <td align="center">FullStack 개발 팀원</td>
   <td align="center">Backend 팀장<br/>FullStack 개발</td>
   <td align="center">FullStack 개발 팀원</td>
   <td align="center">PM 팀장<br/>FullStack 개발 팀원</td>
   <td align="center">FullStack 개발 팀원</td>
 </tr>
  <tr>
    <td align="center">
      스프링 배치 복권 기능 구현 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      인증, 인가 구현 <br>
      CICD & 인프라 구축 <br>
      백엔드 프로젝트 세팅
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
      MDC 로깅 구현 <br>
      내용 입력 <br>
      내용 입력
    </td>
  </tr>
</table>

<br>

## 👥 팀원 개인별 회고

### 기남석
- ~
  
### 김영성
- ~

### 김현우
- ~

### 방성경
- ~

### 오선민
- ~

### 홍찬의
- ~

<br>

---
[요구사항 정의서.pdf](https://github.com/user-attachments/files/18225291/default.pdf)

[서비스 요구사항 정의서.pdf](https://github.com/user-attachments/files/18225293/default.pdf)

[비즈니스프로세스모델.pdf](https://github.com/user-attachments/files/18225295/default.pdf)

[WBS.pdf](https://github.com/user-attachments/files/18225296/WBS.pdf)

[DB 설계서.pdf](https://github.com/user-attachments/files/18225297/DB.pdf)



## 🔗 관련 문서 링크
- [Quostomize-BE](https://github.com/woorifisa-projects-3rd/Quostomize-BE)
- [Quostomize-FE](https://github.com/woorifisa-projects-3rd/Quostomize-FE)
- [HeadlessUI](https://headlessui.com/)
