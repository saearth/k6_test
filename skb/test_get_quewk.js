import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 100, // Virtual Users
    duration: '10s', // ระยะเวลาทดสอบ
};

export default function () {
    let url = 'https://oolapihip.iboc.co/api/auth/login';

    let payload = JSON.stringify({
        username: "hhip",
        password: "hip1"
    });


    let accessToken = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGhpcCIsImp0aSI6IjBmYWQ4NDZjLWQyMDAtNGE1NC05ZWI0LTk3MzQ2MGVlOGJjYyIsIm5iZiI6MTc1MTMzMzU1MywiZXhwIjoxNzUzOTI1NTUzfQ.zMEm2tDzDSHne7giIBrDDJpSFUWMljK0kAnMev_POxY';

    let params = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        "status is 200": (r) => r.status === 200,
    });

    console.log("Response:", res);
}
