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
