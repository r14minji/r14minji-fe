# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

# 요구사항 분석 및 적용

## 로그인 (/login)

- 기능구현: 디자인 적용, 아이디형식, 비밀번호 형식, input 값이 유효한 경우만 로그인 활성화, 로그인성공 홈화면 이동, 로그인 화면과 로그아웃 화면 변경, 로그아웃 클릭시 메인화면, 새로고침시 로그인 유지, 전역상태관리는 redux

## 페이지네이션 (/pagination?page=number)

- 기능구현: 상품리스트 보여주기, 한 페이지당 10개의 상품, 가격표기 변경, 상세페이지로 이동, 이전 또는 이후 페이지가 존재하지 않으면 disabled,
- 적용 안된 기능: 이전 범위 버튼(<)을 클릭하면 이전 범위의 마지막 페이지를 보여주기, 페이지버튼 클릭시 해당 버튼 스타일 변경.현재선택된 페이지는 클릭 안됨, 에러페이지

## 무한 스크롤 (/infinite-scroll)

- 기능구현: 상품리스트 보여주기, 16개의 상품 이후 새로운 상품리스트 16개가 보여짐, 상세페이지로 이동, 가격표기 변경, 상품이 없을 경우 요청하지 않기, 상품상세페이지에서 리스트로 돌아왔을 경우 페이지 스크롤 유지

## 상품 상세 (/products/{id})

- 요구사항 구현 : 해당 상품 보여주기, 가격표기 변경, 에러처리

# 기록

- 개선해야할 점: 타입스크립트 적용, 반복적으로 사용된 코드 공통으로 만들기, 커밋 기능별로 기록하기(소스트리 사용하기).
