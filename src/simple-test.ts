import http from 'k6/http';

const usernameArr = ['admin', 'test_user', 'guest'];
const passwordArr = ['123', '1234', '12345'];

export default function () {
  // Get random username and password from array
  const rand = Math.floor(Math.random() * 3);
  const username = usernameArr[rand];
  const password = passwordArr[rand];

  http.post('http://test.k6.io/login.php', {
    login: username,
    password: password,
  });
}
