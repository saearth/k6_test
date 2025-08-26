import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    // thresholds: {
    //     // Assert that 99% of requests finish within 3000ms.
    //     http_req_duration: ["p(90) < 3000"],
    // },
    vus: 1,
    // duration: '1s',
};

export default function () {

    const url_login = 'https://iam.pointit.co.th/realms/supercar/protocol/openid-connect/token';
    const url = 'https://supercar-dev.pointit.co.th/api/organization.php';

    const payload_login =
        'client_id=gw' +
        '&username=sis 2' +
        '&scope=openid' +
        '&grant_type=password' +
        '&password=P@ssw0rd' +
        '&client_secret=bHgcJjSGgoMEvEAwdoagXWhqWYwTOZAz';


    const auth = {
        headers: {
            // 'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const res = http.post(url_login, payload_login, auth);
    console.log(JSON.stringify(res, null, 2));
}