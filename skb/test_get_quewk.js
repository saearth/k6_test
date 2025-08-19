import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10000, // Virtual Users
    duration: '10s', // ระยะเวลาทดสอบ
};

export default function () {
    let url = 'https://aliza.k-lynx.com/api/v1/auth/introspect';

    let payload = JSON.stringify({
        username: "hhip",
        password: "hip1"
    });


    let accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1bmUxYTFySTNBSjVrWXk3aHJHeXlOMXFpMV9xZVl0ZlExUXlzZ0s5RVhzIn0.eyJleHAiOjE3NTMxNjU5ODEsImlhdCI6MTc1MzA3OTU4MSwianRpIjoiMzEyZDQ3MGItMmFiMi00Mjg4LTgyZjktNzdlMWUxMjg2ODU0IiwiaXNzIjoiaHR0cHM6Ly9hbGl6YS5rLWx5bnguY29tL3Nzby9yZWFsbXMva2x5bngiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDM2NTcwNDUtYjA2Zi00YTI4LTgwODgtNWU3MWEzZjk2MDBiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZ3ciLCJzaWQiOiI3YmY4NWY2MC1hYjllLTRhNTUtYTVlNi03Mjg4ZDU3ZTAyNDIiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMta2x5bngiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY3VzdG9tLWF0dHJpYnV0ZSBlbWFpbCBwcm9maWxlIiwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJBZG1pbiBrbHlueCIsInBlcm1pc3Npb24iOlsiY3JlYXRlIiwiZGVsZXRlIiwicmVhZCIsIndyaXRlIl0sImF2YXRhciI6Ii9zMy9rbHlueC9wZXJzb24vYWRtaW4vdXNlci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJBZG1pbiIsImxvY2FsZSI6InRoIiwiZmFtaWx5X25hbWUiOiJrbHlueCIsImVtYWlsIjoiYWRtaW5pc3RyYXRvckBrbHlueC5jbyJ9.pp07srRP445fkCqd3bLLCFWFyoRIGNaYfAzc2p3_F8LbjxnfXlilWqc5U8vtdsIK5FC7u68p5HofQRlX133F5JKxeAZAhH1uDOKjuoVkhC4Oyh0ameKwDbUpNo1NoTi62xx9J0ozQvGWF54DgabQDf6dEGN1hI4sxfBFYRpMHD_4Y3b0T0nINwE7A3pIJIl5ajQuJqZtKqsA70OwcfWyIBBVGBtIWhZXaWyN8J_bOBFAEThCXTCD03_DmtmsaaexFpJ6E4Sk-XIew8uEvyVByTCOWSwMTqeLoXXukfUwbgt6sZlx2FijTYxjftrIUFIScaD3emFBlvZOF72ZQa7M8w';

    let params = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    let res = http.get(url, params);

    check(res, {
        "status is 200": (r) => r.status === 200,
    });

    console.log("Response:", res);
}
