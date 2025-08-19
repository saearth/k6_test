import http from 'k6/http';
import { check, sleep } from 'k6';

// ปรับตาม API URL
const BASE_URL = 'https://aliza.kudsonmoo.co/api/v1';

export const options = {

        vus: 10000, // Virtual Users
        duration: '10s', // ระยะเวลาทดสอบ
    // interaction: 10,    //วนลูปทดสอบ

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

    //ส่ง header Authorization
    const headers = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0Y1pNLThKRzZwWkIwbEZBcWdkdVJwQldzcXJaNXpQMUI1Wl9uZkVsc1NvIn0.eyJleHAiOjE3NTAxMzIxNzEsImlhdCI6MTc1MDA0NTc3MSwianRpIjoiYmMzZDhkMmUtZTI0YS00OTBiLTg4NjctYzE1MzMwOGJmNDY4IiwiaXNzIjoiaHR0cHM6Ly9hbGl6YS5rdWRzb25tb28uY28vc3NvL3JlYWxtcy9rbHlueCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxM2IyNGMxYy1lNDA1LTRkODItOTZiNC0yNTgxM2ExMzI5YWYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJndyIsInNpZCI6IjRmNDk4NjNiLWUzYWQtNGYzNS1iOWQxLTA4ZTU2MGJhMDg0YyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1rbHlueCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGN1c3RvbS1hdHRyaWJ1dGUgZW1haWwiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkFkbWluIGtseW54IiwicGVybWlzc2lvbiI6WyJjcmVhdGUiLCJkZWxldGUiLCJyZWFkIiwid3JpdGUiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJhdmF0YXIiOiIvczMva2x5bngvcGVyc29uL2FkbWluL3VzZXIucG5nIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwibG9jYWxlIjoidGgiLCJmYW1pbHlfbmFtZSI6ImtseW54IiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yQGtseW54LmNvIn0.sOvpp8pVcJgsl7ort5JssYLs4PrSLgLrWsiXM7PgXeRI5Jl-6xYEnlkSGapIe5kRWRtRfGN9sJV8BixsUOEShfFrEhe-Y3AveDLS25cKReerubJV4pjpXy1waB_Tri6kVxztESkOdBmZ3lv9rv1pXBuQpKtcNSUlsGObTjcS4KbeLHNKnZRfjwUNtYHtQx7RmRt5XHPgsi5EpZSgCvkXgDieJy2KdrcTL73jrEe3XTSXuSO-Q8NGBoLSaZtFFNaiIdhtv_0L1Z7a3yJGL0R7fBCU2tG0W3guZkXg6jDq39iy3j_9A5zIye5_cWXROFl2gg-_JIuYNMOkPVo-rG17dw'
        },
    };

    // ทดสอบแบบไม่ส่ง query
    let res = http.get(`${BASE_URL}/devices`, headers);
    check(res, {
        'GET /devices - status 200': (r) => r.status === 200,
    });

    sleep(1);

    // ทดสอบ pagination
    res = http.get(`${BASE_URL}/devices?page=1&perPages=10`, headers);
    check(res, {
        'pagination - status 200': (r) => r.status === 200,
    });

    sleep(1);

    // ทดสอบ search
    res = http.get(`${BASE_URL}/devices?search=Duhua`, headers);
    check(res, {
        'search - status 200': (r) => r.status === 200,
    });

    sleep(1);

    // ทดสอบ sortOrder
    res = http.get(`${BASE_URL}/devices?sortOrder=desc`, headers);
    check(res, {
        'sortOrder=desc - status 200': (r) => r.status === 200,
    });

    sleep(1);
}
