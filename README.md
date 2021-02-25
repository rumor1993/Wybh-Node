REST API

GET /users => 사용자정보
POST /users => 사용자추가
GET /users/(ID) => 한명만 조회
PUT /users/(ID) => 한명만 수정
DELETE /users/(ID) => 한명만 삭제

controllers/index 대분류 url + 폴더 위치
controllers/admin/index.js ( admin url + 미들웨어 )
controllers/admin/admin.ctrl.js ( 컨트롤러 )