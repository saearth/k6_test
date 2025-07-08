import http from 'k6/http';
import { check, sleep } from 'k6';

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
    const url = 'https://loms.logistics.rtp-eservice.com/auth/login';

    
}