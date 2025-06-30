import http from 'k6/http';
import { check, sleep } from 'k6';



export const options = {

    vus: 1, // Virtual Users
    duration: '10s', // ระยะเวลาทดสอบ

    //ทดสอบตามเวลาใน array
    // stages: [
    //     { duration: '10s', target: 0 },
    //     { duration: '10s', target: 10 }, //เพิ่มจาก 0 เป็น 10,000 VUs ภายใน 10 วินาที
    //     { duration: '10s', target: 100 },  //ลดจาก 10,000 เป็น 1,000 VUs ภายใน 10 วินาที
    //     { duration: '10s', target: 1000 },
    //     { duration: '10s', target: 10000 },
    //     { duration: '10s', target: 0 },
    // ],
};

export default function () {

    const url = 'https://aliza.kudsonmoo.co/api/v1/auth/signin';

    const payload = JSON.stringify({
        username: 'admin',
        password: 'iglnJqXs2Kevx2G0',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    // ตรวจสอบสถานะการตอบกลับ
    check(res, {
        'login success (status 200)': (r) => r.status === 200,
        'response has token': (r) => res.json().detail.access_token !== undefined,
    });

    // check access token from json
    // console.log('Full response body:', res.json().detail.access_token);

    // ถ้าต้องการใช้งาน token ต่อ
    const token = res.json().detail.access_token;
    // check access token
    // console.log('Access Token:', token);

    if (token) {
        const refreshUrl = 'https://aliza.kudsonmoo.co/api/v1/refreshToken'; // เปลี่ยน URL จริง
        const refreshHeaders = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }

    sleep(1);

    // // ทดสอบแบบไม่ส่ง query
    // let res = http.get(`${BASE_URL}/devices`, headers);
    // check(res, {
    //     'GET /devices - status 200': (r) => r.status === 200,
    // });

    // sleep(1);

    // // ทดสอบ pagination
    // res = http.get(`${BASE_URL}/devices?page=1&perPages=10`, headers);
    // check(res, {
    //     'pagination - status 200': (r) => r.status === 200,
    // });

    // sleep(1);

    // // ทดสอบ search
    // res = http.get(`${BASE_URL}/devices?search=Duhua`, headers);
    // check(res, {
    //     'search - status 200': (r) => r.status === 200,
    // });

    // sleep(1);

    // // ทดสอบ sortOrder
    // res = http.get(`${BASE_URL}/devices?sortOrder=desc`, headers);
    // check(res, {
    //     'sortOrder=desc - status 200': (r) => r.status === 200,
    // });

    // sleep(1);
}
