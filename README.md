# 🧾 BrunchPayments 대시보드 과제

지원자: 하채린
기술 스택: Next.js 14, TypeScript, React Query, TailwindCSS, Recharts

본 프로젝트는 BrunchPayments 채용 과제 수행을 위해 개발된 **PG 대시보드 웹 애플리케이션**입니다.  
회사에서 제공한 API(`https://recruit.paysbypays.com/api/v1`)를 기반으로  
가맹점 및 결제 거래 데이터를 조회하고 시각화하는 기능을 구현했습니다.

---

## 🚀 주요 기능 (필수 요건 충족)

### ✔ 1. 대시보드 페이지
- 오늘의 거래 요약 KPI 카드 (총 건수, 성공률, 실패율, 취소율 등)
- 최근 7일 거래 추이(LineChart)
- 결제 상태 비중 파이차트(PieChart)
- 전체 UI를 카드 중심 레이아웃으로 구성하여 PG사 관리자 페이지 느낌을 구현

### ✔ 2. 거래 내역 리스트
- API 연동 거래 데이터 조회
- 테이블 UI 직접 구현 (status 배지, hover, border 등 통일된 디자인 시스템 적용)
- Pagination 컴포넌트 직접 구현 및 적용
- 반응형 고려

### ✔ 3. 가맹점 목록 페이지
- 가맹점 리스트 조회
- Pagination 적용
- row 클릭 시 해당 가맹점 상세 페이지로 이동

### ✔ 4. 가맹점 상세 페이지
- 가맹점 기본 정보 카드 (직접 디자인한 2열 grid)
- 해당 가맹점의 거래내역 테이블 표시
- StatusBadge 컴포넌트 재사용
- 테이블 디자인 시스템 일관화

---

## 🎨 UI/디자인 의도

본 프로젝트는 외부 템플릿 없이 UI를 디자인해서 사용용했습니다.

**디자인 의도**
- PG 관리자 페이지의 실사용 UX를 참고하여 **테이블 중심 레이아웃**으로 구성
- TailwindCSS를 기반으로 일관된 **디자인 시스템(table-head-cell, status-badge 등)** 구축
- 사이드바 고정 및 넓은 여백(p-8)을 통해 콘텐츠 집중도 향상
- 상태(Status) 정보를 뱃지 형태로 시각화하여 가독성을 강화
- Recharts를 사용한 단순하고 명확한 데이터 시각화

---

## 🛠 기술 스택

| 기술 | 설명 |
|------|------|
| **Next.js 14** | App Router 기반, Server/Client 컴포넌트 조합 |
| **TypeScript** | 안정적인 타입 기반 개발 |
| **React Query** | API 데이터 캐싱 및 비동기 상태 관리 |
| **TailwindCSS** | 커스텀 디자인 시스템 구축 |
| **Recharts** | 거래 LineChart & PieChart 시각화 |
| **Axios** | API 통신 |

---

## 📡 API 연동

모든 데이터는 아래 API 서버를 통해 가져왔습니다:

https://recruit.paysbypays.com/api/v1

yaml
코드 복사

### 사용된 주요 API
- `/payments/list` — 결제 내역 전체 조회
- `/merchants/list` — 가맹점 목록 조회
- `/merchants/details/{mchtCode}` — 특정 가맹점 상세 조회

---

## 📁 폴더 구조 (중요 부분만 발췌)
```
src/
├─ app/
│ ├─ dashboard/ # 대시보드 페이지
│ ├─ transactions/ # 거래 내역 리스트
│ ├─ merchants/ # 가맹점 목록 & 상세
│ └─ layout.tsx # 전체 레이아웃 (사이드바 포함)
│
├─ components/
│ └─ common/
│ ├─ Pagination.tsx
│ ├─ DetailItem.tsx
│ └─ StatusBadge.tsx
│
├─ features/
│ ├─ payments/
│ │ ├─ hooks/
│ │ └─ api.ts
│ └─ merchants/
│ ├─ hooks/
│ └─ api.ts
│
├─ styles/
│ └─ globals.css # Tailwind + 커스텀 디자인 시스템
│
└─ lib/
└─ axiosInstance.ts # Axios 설정
```

---

## ▶ 실행 방법

Node.js **20.x LTS** 환경에서 아래 명령으로 실행할 수 있습니다:
```
npm install
npm install recharts
npm install @iconify/react
npm run dev
```
이후 브라우저에서 아래 주소로 접속합니다:
```http://localhost:3000```

🔧 환경 변수 (선택적)
API Base URL을 환경 변수로 분리할 경우:

.env.local
```NEXT_PUBLIC_API_BASE=https://recruit.paysbypays.com/api/v1```

## 화면
메인보드
<img width="1475" height="876" alt="image" src="https://github.com/user-attachments/assets/82a16108-d7a1-4a9f-b190-d7265c68ef70" />
<br>
거래 내역
<img width="1475" height="870" alt="image" src="https://github.com/user-attachments/assets/508f975c-8172-4be1-a3a1-cdbbb9a5ea3a" />
<br>
가맹점 목록
<img width="1475" height="877" alt="image" src="https://github.com/user-attachments/assets/ec579159-2358-4635-9953-96da16b3ed7d" />
<br>
가맹점 상세
<img width="1475" height="874" alt="image" src="https://github.com/user-attachments/assets/dd769c8d-ce88-4d5f-a6d7-2dcd399b6621" />

