import http from 'k6/http';
import { check } from 'k6';

// กำหนด base URL ของระบบ
const BASE_URL = 'https://policeinnopolis-p6.k-lynx.com/sso/realms/master/protocol/openid-connect/token';

export default function () {
  // 🔐 1. Login เพื่อรับ Token
  const loginPayload = JSON.stringify({
    hwId: '',
    username: 'admin',
    password: 'iglnJqXs2Kevx2G0'
  });

  const loginHeaders = {
    headers: { 'Content-Type': 'application/json' }
  };

  const loginRes = http.post(`${BASE_URL}/api/v1/signin`, loginPayload, loginHeaders);

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': (r) => r.json('access_token') !== undefined,
  });

  const token = loginRes.json('access_token'); // ดึง token

  // 🛠️ 2. เรียก API อื่น โดยใส่ token ใน header
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const apiRes = http.get(`${BASE_URL}/devices`, authHeaders);

  check(apiRes, {
    'profile status is 200': (r) => r.status === 200,
  });
}
