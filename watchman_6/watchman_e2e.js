import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        // Assert that 99% of requests finish within 3000ms.
        http_req_duration: ["p(90) < 3000"],
    },

    maxRedirects: 3,

    vus: 1,
    duration: '1s',
};

const image = open('./test_pic.jpg', 'b').toString('base64'); // แปลงเป็น base64 string

export default function () {

    const url_options = 'https://aliza.kudsonmoo.co/WatchmanData/api_options.php';
    const url_person = 'https://aliza.kudsonmoo.co/WatchmanData/api_list_person.php';

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const options_res = http.get(url_options, params)
    // const json = login_kcRes.json();
    // const accessToken = json?.id_token;

    // const params_login = {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //     },
    // };

    console.log('List options response:', options_res);

    check(options_res, {
        'GET List options is 200': (r) => r.status === 200,
    });

    const query_params_provincial = {
        f: "provincial",
        reggionId: "1",
    };

    const Url_provincial = `${url_options}?${buildQuery(query_params_provincial)}`;

    const provincial_res = http.get(Url_provincial, params)

    console.log('List provincial options response:', provincial_res);

    check(provincial_res, {
        'GET List provincial options is 200': (r) => r.status === 200,
    });

    const query_params_station = {
        f: "station",
        reggionId: "1",
    };

    const Url_station = `${url_options}?${buildQuery(query_params_station)}`;

    const station_res = http.get(Url_station, params)

    console.log('List station options response:', station_res);

    check(station_res, {
        'GET List station options is 200': (r) => r.status === 200,
    });

    const query_params_person = {
        page: "1",
        perPage: "10",
    };

    const Url_person = `${url_options}?${buildQuery(query_params_person)}`;

    const person_res = http.get(Url_person, params)

    console.log('List person response:', person_res);

    check(person_res, {
        'GET List person is 200': (r) => r.status === 200,
    });

    const query_params_personDetails = {
        findBy: "id",
        id: "53309",
    };

    const Url_personDetails = `${url_options}?${buildQuery(query_params_personDetails)}`;

    const personDetails_res = http.get(Url_personDetails, params)

    console.log('List person details response:', personDetails_res);

    check(person_res, {
        'GET List person details is 200': (r) => r.status === 200,
    });


    const query_params_createPerson = {
        "type": "1",
        "personType": "12",
        "crimesType": "",
        "idcard": "1264567891234",
        "passport": "",
        "titlename": "นาย",
        "subTitlename": "",
        "firstname": "นารุโตะ",
        "lastname": "ทาเคชิ",
        "nickname": "อิชิตัน",
        "sex": "ชาย",
        "birthday": "2023-01-12",
        "age": "",
        "fatherName": "มินาโตะ",
        "fatherIdcard": "1234567890121",
        "motherName": "เจ้าหญิง",
        "motherIdcard": "1234567890121",
        "maritalStatus": "โสด",
        "deathStatus": "1",
        "dateOfDeath": "",
        "policeRegion": "1",
        "policeProvince": "12",
        "policeStation": "1201",
        "photo": image,
        "userRecorder": "พ.ต.อ. ทดสอบ นามสมมุติ",
        "userPosition": "ผบ.ตร. หน่วยงานทดสอบ",
    };

    // const Url_createPerson = `${url_person}?${buildQuery(query_params_createPerson)}`;

    const createPerson_res = http.post(url_person, JSON.stringify(query_params_createPerson), params)

    console.log('List create person response:', createPerson_res);

    check(createPerson_res, {
        'POST List create person is 200': (r) => r.status === 200,
    });

    const query_params_updatePerson = {
        "type": "1",
        "personType": "12",
        "crimesType": "",
        "idcard": "1264567891234",
        "passport": "",
        "titlename": "นาย",
        "subTitlename": "",
        "firstname": "นารุโตะ",
        "lastname": "ทาเคชิ",
        "nickname": "อิชิตัน",
        "sex": "ชาย",
        "birthday": "2023-01-12",
        "age": "",
        "fatherName": "มินาโตะ",
        "fatherIdcard": "1234567890121",
        "motherName": "เจ้าหญิง",
        "motherIdcard": "1234567890121",
        "maritalStatus": "โสด",
        "deathStatus": "1",
        "dateOfDeath": "",
        "policeRegion": "1",
        "policeProvince": "12",
        "policeStation": "1201",
        "photo": image,
        "userRecorder": "พ.ต.อ. ทดสอบ นามสมมุติ",
        "userPosition": "ผบ.ตร. หน่วยงานทดสอบ",
    };

    // const Url_createPerson = `${url_person}?${buildQuery(query_params_createPerson)}`;

    const updatePerson_res = http.post(url_person, JSON.stringify(query_params_updatePerson), params)

    console.log('List update person response:', updatePerson_res);

    check(updatePerson_res, {
        'POST List update person is 200': (r) => r.status === 200,
    });

    const query_params_delPerson = {
        id: "53313",
    };

    const Url_delPerson = `${url_person}?${buildQuery(query_params_delPerson)}`;

    const delPerson_res = http.post(Url_delPerson, params)

    console.log('Delete person response:', delPerson_res);

    check(delPerson_res, {
        'DELETE  person is 200': (r) => r.status === 200,
    });

    sleep(3);
}

// ฟังก์ชันสร้าง query string จาก object
function buildQuery(params) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}