import http from 'k6/http';
import { check, sleep } from 'k6';
import { generateRandomString } from '../randomString.js';
import { getRandomItemFromArray } from '../randomArr.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {

    vus: 1, // Virtual Users
    // duration: '10s', // ระยะเวลาทดสอบ

    // iterations: 1, // บังคับให้จบเป็นรอบ

    // maxDuration: "2m", // กันเหตุรอบนานเกิน

    // ทดสอบตามเวลาใน array
    // stages: [
    //     { duration: '10s', target: 0 },
    //     { duration: '10s', target: 1 }, //เพิ่มจาก 0 เป็น 10,000 VUs ภายใน 10 วินาที
    //     { duration: '10s', target: 10 },  //ลดจาก 10,000 เป็น 1,000 VUs ภายใน 10 วินาที
    //     { duration: '10s', target: 100 },
    //     { duration: '10s', target: 1000 },
    //     { duration: '10s', target: 10000 },
    //     { duration: '10s', target: 0 },
    // ],
};

export default function () {

    // Auth
    // Login เพื่อรับ access_token และ refresh_token
    const url = 'https://aliza.k-lynx.com/api/v1/auth/signin';

    const payload = JSON.stringify({
        hwId: '',
        username: 'admin',
        password: 'KhFkc5EFFCVU',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
    };

    const loginRes = http.post(url, payload, params);

    console.log(loginRes.body);

    const json = loginRes.json();
    const accessToken = json?.detail?.access_token;
    const refreshToken = json?.detail?.refresh_token;

    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);

    check(loginRes, {
        'POST /auth/signin status is 200': (r) => r.status === 200,
        // 'access_token exists': () => accessToken !== undefined,
        // 'refresh_token exists': () => refreshToken !== undefined,
    });

    // ตรวจสอบความถูกต้องของ JWT จาก Authorization Header
    const url_verify = 'https://aliza.k-lynx.com/api/v1/auth/introspect';

    const headers_verify = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    const verifyRes = http.get(url_verify, headers_verify)
    // console.log('Verify Response:', verifyRes);

    check(verifyRes, {
        'GET /auth/introspect status is 200': (r) => r.status === 200,
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

        // Authz
        // Health check for Permify
        const authz_healthz_url = 'https://aliza.k-lynx.com/api/v1/authz/healthz';
        const authz_healthzRes = http.get(authz_healthz_url, headers);
        // console.log('authz_healthz response:', authz_healthzRes);
        check(authz_healthzRes, {
            'GET /authz/healthz - status 200': (r) => r.status === 200,
        });

        // Read relationships from Permify
        const authz_relationships_url = 'https://aliza.k-lynx.com/api/v1/authz/relationships';
        const authz_relationshipsRes = http.get(authz_relationships_url, headers);
        // console.log('authz_relationships response:', authz_relationshipsRes);
        check(authz_relationshipsRes, {
            'GET /authz/relationships - status 200': (r) => r.status === 200,
        });

        // List all device
        const devicesUrl = 'https://aliza.k-lynx.com/api/v1/devices';
        const DeviceRes = http.get(`${devicesUrl}?page=1&perPages=10&sortField=dateTimeCreate&sortOrder=desc`, headers);
        // console.log('Device response:', DeviceRes);
        check(DeviceRes, {
            'GET /devices - status 200': (r) => r.status === 200,
        });

        // แปลงเป็นออบเจ็กต์แล้วดึง ids
        // หมายเหตุ: k6 มี res.json() ให้ใช้ได้เลย (เทียบเท่า JSON.parse(res.body))
        const dataDevice = DeviceRes.json(); // { details: [...], pagination: {...}, status: true }
        const idDevice = (dataDevice?.details ?? []).map(d => d.id).filter(Boolean);
        // console.log(`id device: ${idDevice.join(', ')}`);

        // ดึง id device แรก
        const firstId = idDevice[0];

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

        // Update fields of a device and set state to "update"
        const update_DeviceRes = http.patch(`${devicesUrl}/${firstId}`, devicesPayload, headers);
        // console.log('UPDATE Device response:', update_DeviceRes);
        check(update_DeviceRes, {
            'PATCH /devices/{id} - status 200': (r) => r.status === 200,
        });

        const createDevicesRes = http.post(devicesUrl, devicesPayload, headers);
        // console.log('Create device response:', createDevicesRes.body);
        check(createDevicesRes, {
            'POST /devices status is 201': (r) => r.status === 201,
        });

        // เรียก DELETE: ต้องส่ง body เป็น null ถ้าไม่มี
        const del_DeviceRes = http.del(`${devicesUrl}/${firstId}`, null, headers);
        // console.log('DELETE Device response:', del_DeviceRes);
        check(del_DeviceRes, {
            'DELETE /devices/{id} - status 200': (r) => r.status === 200,
        });

        // GROUPS
        // List groups
        const groupsUrl = 'https://aliza.k-lynx.com/api/v1/groups';
        const groupsRes = http.get(groupsUrl, headers);
        // console.log('Groups response:', groupsRes.body);
        check(groupsRes, {
            'GET /groups is 200': (r) => r.status === 200,
        })

        const groupsPayload = JSON.stringify({
            "description": "" + generateRandomString(20, { includeNumbers: false, includeSpecialChars: false }),
            "icon": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }),
            "name": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }), // สุ่มชื่อผู้ใช้
            "parentId": "",
        });

        // Create a group, optionally as a child of another group
        const create_groupsRes = http.post(groupsUrl, groupsPayload, headers);
        // console.log('Create Groups response:', create_groupsRes.body);
        check(create_groupsRes, {
            'POST /groups is 200': (r) => r.status === 200,
        })

        // list of devices under a parent group
        const groupsDeviceRes = http.get(`${groupsUrl}/devices`, headers);
        // console.log('Groups device response:', groupsDeviceRes.body);
        check(groupsDeviceRes, {
            'GET /groups/devices is 200': (r) => r.status === 200,
        })

        // Returns a paginated list of members under a group
        const groupsMemberRes = http.get(`${groupsUrl}/members`, headers);
        // console.log('Groups members response:', groupsMemberRes.body);
        check(groupsMemberRes, {
            'GET /groups/members is 200': (r) => r.status === 200,
        })

        // list of roles under a group
        const groupsRolesRes = http.get(`${groupsUrl}/roles`, headers);
        // console.log('Groups roles response:', groupsRolesRes.body);
        check(groupsRolesRes, {
            'GET /groups/roles is 200': (r) => r.status === 200,
        })

        // Returns flat list of matching group nodes for tree highlight
        const groupsSearchRes = http.get(`${groupsUrl}/search`, headers);
        // console.log('Groups search response:', groupsSearchRes.body);
        check(groupsSearchRes, {
            'GET /groups/search is 200': (r) => r.status === 200,
        })

        // Returns a paginated list of groups or subgroups under a parent
        const groupsSubgroupsRes = http.get(`${groupsUrl}/subgroups`, headers);
        // console.log('Groups subgroups response:', groupsSubgroupsRes.body);
        check(groupsSubgroupsRes, {
            'GET /groups/subgroups is 200': (r) => r.status === 200,
        })

        // Returns the full nested group hierarchy with each group's child and member users
        const groupsTreeRes = http.get(`${groupsUrl}/tree`, headers);
        // console.log('Groups tree response:', groupsTreeRes.body);
        check(groupsTreeRes, {
            'GET /groups/tree is 200': (r) => r.status === 200,
        })

        // Kcontrol
        // Returns paginated Kcontrol device list
        const kcontrolUrl = 'https://aliza.k-lynx.com/api/v1/kcontrol';
        const kcontrolRes = http.get(kcontrolUrl, headers);
        // console.log('Kcontrol response:', kcontrolRes.body);
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

        //Sent message to Kcontrol device
        const kcontrolSendRes = http.post(kcontrolUrl, kcontrolPayload, headers);
        // console.log('Kcontrol payload:', kcontrolPayload);
        // console.log('Kcontrol response:', kcontrolSendRes.body);
        check(kcontrolSendRes, {
            'POST /kcontrol Send status is 200': (r) => r.status === 200,
        });

        //Receive list of Kcontrol devices alarms
        const kcontrolAlarmUrl = 'https://aliza.k-lynx.com/api/v1/kcontrol/alarms'
        const kcontrolAlarmRes = http.get(kcontrolAlarmUrl, headers);
        // console.log('Kcontrol Alarm response:', kcontrolAlarmRes.body);
        check(kcontrolAlarmRes, {
            'GET /kcontrol/alarms status is 200': (r) => r.status === 200,
        });

        //Ksearch/Chats
        //ดึงรายการ Project ทั้งหมดแบบแบ่งหน้า
        const ksearchUrl = 'https://aliza.k-lynx.com/api/v1/ksearch'
        const ksearchProjectRes = http.get(`${ksearchUrl}/projects`, headers);
        // console.log('Ksearch project response:', ksearchProjectRes.body);
        check(ksearchProjectRes, {
            'GET /kcontrol/projects status is 200': (r) => r.status === 200,
        });

        const chatsPayload = JSON.stringify({
            "chatId": "" + generateRandomString(20, { includeNumbers: false, includeSpecialChars: false }),
            "createdAt": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }),
            "name": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }), // สุ่มชื่อผู้ใช้
            "projectId": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }),
            "userId": "" + generateRandomString(10, { includeNumbers: false, includeSpecialChars: false }),
        });

        //สร้าง Chat ใหม่ภายใน Project
        const ksearchChatsRes = http.post(`${ksearchUrl}/chats`, chatsPayload, headers);
        // console.log('Ksearch chats response:', ksearchChatsRes.body);
        check(ksearchChatsRes, {
            'POST /kcontrol/chats status is 200': (r) => r.status === 200,
        });

        const chatsMsgPayload = JSON.stringify({
            "prompt": "" + generateRandomString(20, { includeNumbers: false, includeSpecialChars: false }),
        });

        //Create new  message in a chat and stream assistant replies
        const ksearchChatsMsgRes = http.post(`${ksearchUrl}/chats/messages`, chatsMsgPayload, headers);
        // console.log('Ksearch chats messages response:', ksearchChatsMsgRes.body);
        check(ksearchChatsMsgRes, {
            'POST /kcontrol/chats/messages status is 200': (r) => r.status === 200,
        });

        //Get KML files from s3 with pagination and metadata
        const mapsUrl = 'https://aliza.k-lynx.com/api/v1/maps/kml'
        const mapsRes = http.get(mapsUrl, headers);
        // console.log('Maps response:', mapsRes.body);
        check(mapsRes, {
            'GET /maps/kml status is 200': (r) => r.status === 200,
        });

        //Get list of users from Keycloak
        const usersUrl = 'https://aliza.k-lynx.com/api/v1/users'
        const usersRes = http.get(usersUrl, headers);
        // console.log('Users response:', usersRes.body);
        check(usersRes, {
            'GET /users status is 200': (r) => r.status === 200,
        });

        const logoutUrl = 'https://aliza.k-lynx.com/api/v1/auth/signout';
        const logoutRes = http.post(logoutUrl, null, headers);
        // console.log('Logout response:', logoutRes.body);
        check(logoutRes, {
            'POST /signout status is 200': (r) => r.status === 200,
        });
    }

    sleep(0.5);
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data), // export เป็นไฟล์ HTML
    };
}