import http from 'k6/http';
import { check, sleep } from 'k6';
import { generateRandomString } from './randomString.js';
import { getRandomItemFromArray } from './randomArr.js';

export const options = {

    vus: 1, // Virtual Users
    // duration: '10s', // ระยะเวลาทดสอบ

    //ทดสอบตามเวลาใน array
    // stages: [
    //     { duration: '10s', target: 0 },
    //     { duration: '10s', target: 1 }, //เพิ่มจาก 0 เป็น 10,000 VUs ภายใน 10 วินาที
    //     { duration: '10s', target: 10 },  //ลดจาก 10,000 เป็น 1,000 VUs ภายใน 10 วินาที
    //     { duration: '10s', target: 100 },
    //     { duration: '10s', target: 1000 },
    //     { duration: '10s', target: 0 },
    // ],
};

export default function () {

    // Login เพื่อรับ access_token และ refresh_token
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

    const loginRes = http.post(url, payload, params);

    const json = loginRes.json();
    const accessToken = json?.detail?.access_token;
    const refreshToken = json?.detail?.refresh_token;

    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    check(loginRes, {
        'POST /signin status is 200': (r) => r.status === 200,
        // 'access_token exists': () => accessToken !== undefined,
        // 'refresh_token exists': () => refreshToken !== undefined,
    });

    // // เรียก refresh_token API ด้วย refresh_token ที่ได้
    // if (refreshToken) {
    //     const refreshUrl = 'https://aliza.kudsonmoo.co/api/v1/auth/refreshToken'; // เปลี่ยนให้ตรง API จริง
    //     const refreshPayload = JSON.stringify({
    //         refresh_token: refreshToken // หรือชื่อ field ที่ API ต้องการ
    //     });

    //     const refreshHeaders = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };

    //     const refreshRes = http.post(refreshUrl, refreshPayload, refreshHeaders);

    //     console.log('Refresh API response:', refreshRes.body);

    //     check(refreshRes, {
    //         'refresh status is 200': (r) => r.status === 200,
    //     });
    // }

    // ตรวจสอบก่อนว่าได้ token มา
    if (accessToken) {

        const headers = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const devicesUrl = 'https://aliza.kudsonmoo.co/api/v1/devices';
        const DeviceRes = http.get(devicesUrl, headers);
        console.log('Device response:', DeviceRes.body);
        check(DeviceRes, {
            'GET /devices - status 200': (r) => r.status === 200,
        });

        const devicesPayload = JSON.stringify({
            "brand": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }), // สุ่มชื่อผู้ใช้
            // "dateTimeCreate": "string",
            // "dateTimeUpdate": "string",
            "district": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }),
            "id": "" + generateRandomString(5, { includeLetters: false, includeSpecialChars: false }),
            "lat": 15.345678,
            "long": 101.987654,
            "name": "" + generateRandomString(7, { includeNumbers: false, includeSpecialChars: false }),
            "password": "" + generateRandomString(8, { includeSpecialChars: true }),
            // "state": "create",
            "status": true,
            "url": "www.google.com",
            "user": "" + generateRandomString(8, { includeSpecialChars: false }),
        });
        const createDevicesRes = http.post(devicesUrl, devicesPayload, headers);
        console.log('Device response:', createDevicesRes.body);
        check(createDevicesRes, {
            'POST /devices status is 201': (r) => r.status === 201,
        });

        const kcontrolUrl = 'https://aliza.kudsonmoo.co/api/v1/kcontrol';
        const kcontrolRes = http.get(kcontrolUrl, headers);
        console.log('Kcontrol response:', kcontrolRes.body);
        check(kcontrolRes, {
            'GET /kcontrol is 200': (r) => r.status === 200,
        })

        const timestamp = new Date().toISOString();
        const listLight = ['red', 'green', 'yellow', 'blue'];
        const listStatus = ['on', 'off'];

        const randomLight = getRandomItemFromArray(listLight);
        const randomStatus = getRandomItemFromArray(listStatus);

        const message = `Turn ${randomStatus} ${randomLight}`;

        const kcontrolPayload = JSON.stringify({
            "hwId": "64:B7:08:2B:C6:1B",
            "message": message,
            "setAlarmInterval": 1000,
            "setHealthInterval": 5000,
            "setOutput": "OUT_1",
            "timestamp": timestamp,
            "topic": "kcontrol-control",
            "type": "ONCE"
        });
        const kcontrolSendRes = http.post(kcontrolUrl, kcontrolPayload, headers);
        console.log('Kcontrol payload:', kcontrolPayload);
        console.log('Kcontrol response:', kcontrolSendRes.body);
        check(kcontrolSendRes, {
            'POST /kcontrol Send status is 200': (r) => r.status === 200,
        });

        const kcontrolAlarmUrl = 'https://aliza.kudsonmoo.co/api/v1/kcontrol/alarms'
        const kcontrolAlarmRes = http.get(kcontrolAlarmUrl, headers);
        console.log('Kcontrol Alarm response:', kcontrolAlarmRes.body);
        check(kcontrolAlarmRes, {
            'GET /kcontrol/alarms status is 200': (r) => r.status === 200,
        });

        const mapsUrl = 'https://aliza.kudsonmoo.co/api/v1/maps/kml'
        const mapsRes = http.get(mapsUrl, headers);
        console.log('Maps response:', mapsRes.body);
        check(mapsRes, {
            'GET /maps/kml status is 200': (r) => r.status === 200,
        });

        const usersUrl = 'https://aliza.kudsonmoo.co/api/v1/users'
        const usersRes = http.get(usersUrl, headers);
        console.log('Users response:', usersRes.body);
        check(usersRes, {
            'GET /users status is 200': (r) => r.status === 200,
        });

        const logoutUrl = 'https://aliza.kudsonmoo.co/api/v1/auth/signout';
        const logoutRes = http.post(logoutUrl, null, headers);
        console.log('Logout response:', logoutRes.body);
        check(logoutRes, {
            'POST /signout status is 200': (r) => r.status === 200,
        });
    }

    sleep(3);
}
