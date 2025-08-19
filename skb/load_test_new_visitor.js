import http from 'k6/http';
import { check, sleep } from 'k6';

const imgData = open('./test_pic.jpg', 'b');

export const options = {
    // vus: 1, // Virtual Users
    // duration: '10s', // ระยะเวลาทดสอบ
    // iterations: 10, //loop 10 times

    // ทดสอบตามเวลาใน array
    stages: [
        { duration: '10s', target: 0 },
        { duration: '10s', target: 1 },
        { duration: '10s', target: 5 }, 
        { duration: '10s', target: 10 },
        { duration: '10s', target: 5 },
        { duration: '10s', target: 0 },
    ],
};

export default function () {
    //login token
    const url_login = 'https://vms.rtp-eservice.com/sso/realms/klynx/protocol/openid-connect/token';

    //signin with token
    const url_signin = 'https://vms.rtp-eservice.com/visitor/api/signin';

    //register visitor
    const url_register = 'https://vms.rtp-eservice.com/apip/visitor?func=create';

    //crop face
    const url_cropface = 'https://vms.rtp-eservice.com/apip/cropface';

    const payload_login =
        'client_id=be' +
        '&username=1529902067488' +
        '&password=0902215120' +
        '&scope=openid' +
        '&grant_type=password';

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    // Step 1: Login
    const loginRes = http.post(url_login, payload_login, params);

    console.log('Login response status:', loginRes.status);
    // console.log('Login response body:', loginRes.body);

    check(loginRes, {
        'POST login token is 200': (r) => r.status === 200,
    });

    if (loginRes.status !== 200) {
        console.log('Login failed, stopping execution');
        return;
    }

    let accessToken;
    try {
        const jsonLogin = loginRes.json();
        accessToken = jsonLogin?.access_token;
        console.log('Access Token received:', !!accessToken);
    } catch (e) {
        console.log('Error parsing login response:', e.message);
        return;
    }

    if (!accessToken) {
        console.log('No access token received');
        return;
    }

    // Step 2: Signin
    const login_hd = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const signinRes = http.post(url_signin, null, login_hd);

    console.log('Signin response status:', signinRes.status);
    // console.log('Signin response body:', signinRes.body);

    check(signinRes, {
        'POST signin is 200': (r) => r.status === 200,
    });

    // Step 3: Crop face
    const lomsToken = 'OOCePFeBW9lRj4OxZB1K3EFXKhQ25xEOzVAec2gs_6xHCoW6QUJCXjp7j9SkNR_IUhReKBC//BAnc31raqU9AsWa2sAZg/_ge2acbiWwFCfQg2HGZybiyI0_fd4d2L_/2OzvxneySomTD2RbVCP4plqMCOT/4ttpjMhq8AJxonHYn23P2iyX8/pwzbjwqkXPAWDKINIJoS73etLmxjLfSHF0q0h_oA4EGPcAot2P3l7VyGHOm9YC38oEcH3lRAVgu46_2ZPOefSCEGV_FuW9raIivF75hNeyA97q7oPWUvAxssd/6fioZCGhth/9kWIanX/xYFyqgqaRKQzLEQ0bVkrhR1ZKN49i4lpZGtphQcum8i_eDTMWSlhY_lWRkkNfZMXzihwAUQO4aVW8rsSkX0kEs1vl/GtGBsTh0YVLQLXOFP5nCAc7AnetakQy2QKLzEje3vYUhPrdcIrU3BXfhDWQidsLZO4mQ_IyjNj8kvnXDoWuyzSyi1q96gDBG59FxsSgaW3s3kc42TeEAo0OEvEMA5JqXwWksnpSjlF4qKq6RYnOvxeo3wcGASAnEjldKeb8m/S2AB8nsmamu4vK6SBWUYtegv5i8nVgl1W59qaHxlaPYZkYd68TZGQfqwOQ';

    const cropface_hd = {
        headers: {
            'Authorization': `Bearer ${lomsToken}`,
        },
    };

    const cropface_payload = {
        image: http.file(imgData, 'test_pic.jpg')
    };

    const cropfaceRes = http.post(url_cropface, cropface_payload, cropface_hd);

    console.log('Cropface response status:', cropfaceRes.status);
    // console.log('Cropface response body:', cropfaceRes.body);

    check(cropfaceRes, {
        'POST cropface is 200': (r) => r.status === 200,
    });

    // let cropfaceId;
    // if (cropfaceRes.status === 200 && cropfaceRes.body) {
    //     try {
    //         const jsonCropface = cropfaceRes.json();
    //         cropfaceId = jsonCropface?.id;
    //         console.log('Cropface ID:', cropfaceId);
    //     } catch (e) {
    //         console.log('Error parsing cropface response:', e.message);
    //     }
    // }

    const jsonCropface = cropfaceRes.json();
    const cropfaceId = jsonCropface?.id;
    // const cropfaceImg = jsonCropface?.image;
    console.log('Cropface ID:', cropfaceId);
    // console.log('Cropface Img:', cropfaceImg);

    // Step 4: Register visitor
    const create_hd = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    const payload_create = {
        appointmentTime: '2025-07-07 13:35',
        takeTimeTo: '2025-07-07 17:30',
        titleNameId: '1a89938d23b87ea7602f84c349',
        registerBy: 'web',
        cardType: '1',
        cardRefNo: '1529902067488',
        cardExpire: '2025-07-31',
        titleName: 'นาย',
        fullName: 'จิราธิป วิทยานุศักดิ์',
        phone: '0902215120',
        company: 'supreme',
        location: '6dbb7419-0862dbc3-67905ea4-ee4d373d',
        jobTitle: 'Tester',
        vehicleType: '1',
        licensePlate: 'Test1234',
        contactTo: '1d0ea434-3f444e49-68466654-e7e9f04b',
        description: 'TesterVISITOR',
        cardImg: 'null',
        province: '622e76727b191',
        buildingLevel1: '51c1d390-73459ca3-67905f41-97c1a1d8',
        buildingLevel2: '5f8252f4-a2520e5e-67dbf1a4-4b5de683',
        id: '3d9b15b7-236aa3d9-6852190e-5a0fc958',
        visitorId: '3d9b15b7-236aa3d9-6852190e-5a0fc958',
        buildingId: '147beff9-bf037556-67dbf1a4-4b5d9a2c',
        faceVector: cropfaceId,
    };

    // แก้ไขลำดับพารามิเตอร์: payload ควรมาก่อน headers
    const createRes = http.post(url_register, payload_create, create_hd);

    console.log('CreateRes:', createRes);

    check(createRes, {
        'POST create is 200': (r) => r.status === 200,
    });

    // เพิ่ม error handling สำหรับ response parsing
    if (createRes.status === 200 && createRes.body) {
        try {
            const jsonCreate = createRes.json();
            console.log('Create visitor success:', jsonCreate);
        } catch (e) {
            console.log('Error parsing create response:', e.message);
            console.log('Response was:', createRes.body);
        }
    }

    sleep(2);
}