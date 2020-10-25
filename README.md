# WeTube

Cloning Youtube with Vanilla and NodeJS

## Pages:

- [ ] Home
- [ ] Join
- [ ] Login
- [x] Search
- [ ] User Detail
- [ ] Edit Profile
- [ ] Change Password
- [ ] Upload
- [ ] Video Detail
- [ ] Edit Video

Mongo DB설치.
brew tap mongodb/brew
brew install mongodb-community
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db

Mongo DB실행
brew services run mongodb-community

brew services list

Mongo DB중지
brew services stop mongodb-community

Aliases생성.
alias mongod='brew services run mongodb-community'
alias mongod-status='brew services list'
alias mongod-stop='brew services stop mongodb-community'

eslint 설치 및 설정
전역설치: npm install eslint
설정: eslint --init

1. 스타일 - 3(많이 사용하는 타입)
2. 표준 스타일 - airbnb
   ...
   추가 패키지 설치.

prettier을 사용하는 경우.
formatter를 가지고 있기 때문에, eslint가 에러를 표시하지 않기 위해
npm install eslint-config-prettier를 설치.

webpack, webpack-cli설치
웹번들러-

6.5 connect-mongo
몽고DB를 이용해서 세션의 로그인을 저장.
npm install connect-mongo

AWS 설정.

1. S3
   버킷 생성.
   버킷 액세스 설정 편집

2. IAM설정.(https://console.aws.amazon.com/iam/home?region=ap-northeast-2#/home)
   - 계정명 등록 > 프로그램 접근(api)
   - 접속 권한 설정 (기존 정책 직접 연결: S3)

<CORSConfiguration>
   <CORSRule>
     <AllowedOrigin>\*</AllowedOrigin>
     <AllowedMethod>GET</AllowedMethod>
     <MaxAgeSeconds>3000</MaxAgeSeconds>
     <AllowedHeader>Authorization</AllowedHeader>
   </CORSRule>
</CORSConfiguration>
