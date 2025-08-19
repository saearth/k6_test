import http from 'k6/http';
import { check, sleep } from 'k6';

// สมมติข้อมูล JSON array ที่มีประมาณ 600+ ชุด
const testData = [
    {
         "MID":643,
         "account":"anapat138",
         "password":"da2a0602c305ca50c5096419b0fd7f83595494ef1a730d341409115088c78143f6a3415e9c4ba9297bfc96609fefb2a57e3ceff5e4df3455936420fe26826969",
         "member_name":"ส.ต.ต.อนพัทย์ จงเทพ",
         "member_phone":"0892394975",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":67,
         "police_station":6709,
         "name_police_station":"สภ.เมืองสุโขทัย",
         "name_position":"ผบ.หมู่ (ป.) สภ.เมืองสุโขทัย",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.สุโขทัย",
         "hint_pw":"anapat0892394975",
         "line_id":"anapat138"
      },
      {
         "MID":644,
         "account":"SEK1234",
         "password":"70de7bff97950044ffc77b926e3de2fd04ec9cf570c4179f1b216f70f449a7e6d178671c7fe76d02b8b29a220c717cd759e3994643afbfb901e0275738d97c91",
         "member_name":"ร.ต.ท.เสก พละทรัพย์",
         "member_phone":"0815320919",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":69,
         "police_station":6902,
         "name_police_station":"สภ.ตลุกดู่",
         "name_position":"รอง สว.สส.สภ.ตลุกดู่",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.อุทัยธานี",
         "hint_pw":"SEK1234",
         "line_id":"0815320919"
      },
      {
         "MID":645,
         "account":"Mpj1",
         "password":"20c0ca683be148c2431cc9f8e4b51b164f6f3e327afbda3b6b374484b4a926a54a25e7d3fe2d4d66f459358e08628432c8280c57488ed4981e3527c6ccee5fc6",
         "member_name":"พ.ต.อ.ลักษณ์ รัตนถาวร",
         "member_phone":"0819635354",
         "user_level":100,
         "ua_add_data":1,
         "ua_delete_data":100,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":64,
         "police_station":6407,
         "name_police_station":"สภ.เมืองพิจิตร",
         "name_position":"ผกก.สภ.เมืองพิจิตร",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.พิจิตร",
         "hint_pw":"Luck59",
         "line_id":"Phinmoy"
      },
      {
         "MID":646,
         "account":"kl1",
         "password":"705561158bf8a2224fa9d09822ea242b3bf10c178215f42cde7f64d78d66f12dbd1304af7ce7420806e0da1c54725be5b8d18fb2b9628b3bb538398688218cbd",
         "member_name":"พ.ต.อ.ณัทรภณ ทรงไทย",
         "member_phone":"admin",
         "user_level":100,
         "ua_add_data":1,
         "ua_delete_data":100,
         "ua_edit_data":1,
         "ua_view_data":"1193",
         "region":6,
         "provincial":67,
         "police_station":6701,
         "name_police_station":"สภ.กงไกรลาศ",
         "name_position":"ผกก.สภ.กงไกรลาศ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.สุโขทัย",
         "hint_pw":"kl1",
         "line_id":""
      },
      {
         "MID":647,
         "account":"TIKKY",
         "password":"7f7b55f26e621f0218d267a38064fcd9e8320e45d197f1fac9c885bbd38f526894e2f5bfde179aa37b1ebd6ec2e7b8b2fb34110f3fae00834878d67c7b0a5319",
         "member_name":"พ.ต.ท.เจษฎา จิตร์ตรง",
         "member_phone":"0884257600",
         "user_level":100,
         "ua_add_data":1,
         "ua_delete_data":100,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":67,
         "police_station":6701,
         "name_police_station":"สภ.กงไกรลาศ",
         "name_position":"รอง ผกก.สส.สภ.กงไกรลาศ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.สุโขทัย",
         "hint_pw":"JJ7258JJ",
         "line_id":"Tikky7258"
      },
      {
         "MID":648,
         "account":"สภ.แม่อาย",
         "password":"ba97067b77d0e966bf983375d387aea492e0fe474e8256f08e5c9f5a2878e3605a2204e3392f40764f2531f3226635cc194430e0ef4db3627cd1c4978d097858",
         "member_name":"ส.ต.ต.ศุภกฤต พุทธนุกูล",
         "member_phone":"0649711930",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":5,
         "provincial":52,
         "police_station":5225,
         "name_police_station":"สภ.แม่อาย",
         "name_position":"ผบ.หมู่ (ป.) สภ.แม่อาย",
         "name_region":"ตำรวจภูธรภาค 5",
         "name_provincial":"ภ.จว.เชียงใหม่",
         "hint_pw":"Boy0649711930",
         "line_id":"boyblack555"
      },
      {
         "MID":649,
         "account":"Godbazen",
         "password":"967d1c575a3d9b4d0122425ad880afb23a296433ff53c0e8e6ea06ccad78c0c07f183e5bf982ae8fbda9611b92f9bb7fa96c17c941fb59fcb3253eec5358e2eb",
         "member_name":"ด.ต.ภูรินทร์ บ้านสระ",
         "member_phone":"0983469080",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":5,
         "provincial":54,
         "police_station":5403,
         "name_police_station":"สภ.เชียงม่วน",
         "name_position":"ผบ.หมู่ (ป.) สภ.เชียงม่วน",
         "name_region":"ตำรวจภูธรภาค 5",
         "name_provincial":"ภ.จว.พะเยา",
         "hint_pw":"Cid054495101",
         "line_id":"feadfea"
      },
      {
         "MID":650,
         "account":"momta521",
         "password":"ac7603553601a936ad04680635d44821c27858590390c71b0d09500166c2d475ea2675a233a7dae4af55d24e2e401d20c0416a2457bee33c33c8d86233778ddd",
         "member_name":"ส.ต.ต.สุรเชษฐ์ เชื้ออุ่น",
         "member_phone":"0626626811",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":5,
         "provincial":52,
         "police_station":5219,
         "name_police_station":"สภ.แม่แตง",
         "name_position":"ผบ.หมู่ (ป.) สภ.แม่แตง",
         "name_region":"ตำรวจภูธรภาค 5",
         "name_provincial":"ภ.จว.เชียงใหม่",
         "hint_pw":"12312312121a",
         "line_id":"momta521"
      },
      {
         "MID":651,
         "account":"oatzaask",
         "password":"486d69aad64e280b3ad3bff6ef867880cc3a648dda4c00bbc14645032aa073408da49c0135087bde74ce2b7aa3a2d5142319acc6e455daebad8f441889ed516f",
         "member_name":"ส.ต.อ.พัสกร สุจา",
         "member_phone":"0933130574",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":5,
         "provincial":52,
         "police_station":5207,
         "name_police_station":"สภ.ดอยสะเก็ด",
         "name_position":"ผบ.หมู่ (ป.) สภ.ดอยสะเก็ด",
         "name_region":"ตำรวจภูธรภาค 5",
         "name_provincial":"ภ.จว.เชียงใหม่",
         "hint_pw":"Passakorn2103",
         "line_id":"oatpassakorn"
      },
      {
         "MID":652,
         "account":"Game5436",
         "password":"880c41fa99f6e25aeb60cc2306b3f6d0c2e5284ffd77d55ede0668c2bb10610b4080d45837eae5521b6ca8e8ccf615856ecf2690b3c420ecde60f6b54898712f",
         "member_name":"จ.ส.ต.ธนพงษ์ ไชยชนะ",
         "member_phone":"0612653065",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":5,
         "provincial":59,
         "police_station":5903,
         "name_police_station":"กก.สส.3 บก.สส.ภ.5",
         "name_position":"ผบ.หมู่ (สส.) กก.สส.3 บก.สส.ภ.5",
         "name_region":"ตำรวจภูธรภาค 5",
         "name_provincial":"กก.สส.3 บก.สส.",
         "hint_pw":"Gamekoke13",
         "line_id":"game4335"
      },
      {
         "MID":653,
         "account":"Pairat",
         "password":"3d5aaab20f1b9e9fbc5737ad9fc96ac3d66b741bb122bd5c30b3464a6747198e22ed3ce448edb98fd058f28e4737bb33198cbccab79fc4d6e2040e89e8673e73",
         "member_name":"พ.ต.ต.ไพรรัตน์ ชะฎา",
         "member_phone":"0896434884",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":69,
         "police_station":6909,
         "name_police_station":"สภ.หนองขาหย่าง",
         "name_position":"สวป.สภ.หนองขาหย่าง",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.อุทัยธานี",
         "hint_pw":"171717",
         "line_id":"pai1982"
      },
      {
         "MID":654,
         "account":"Parattakorn",
         "password":"5e8efea415aa19667dc33b353be450dc51d3ba09d96bad6cd48b827d2ab3a269031a7f4636a65be3ab6f3e85db3b34f360bd195987aa22450fafa2506aa82616",
         "member_name":"ส.ต.ท.ปรัตถกร เถาว์โท",
         "member_phone":"0932845457",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":5,
         "provincial":51,
         "police_station":5112,
         "name_police_station":"สภ.พาน",
         "name_position":"ผบ.หมู่ (ป.) สภ.พาน",
         "name_region":"ตำรวจภูธรภาค 5",
         "name_provincial":"ภ.จว.เชียงราย",
         "hint_pw":"Popo3135",
         "line_id":"parattakornn"
      },
      {
         "MID":655,
         "account":"41K601",
         "password":"8f5038b5555a730158cae25be516b1cb89a798ab5732d58d0058f363bfbc164ec000ab1850100c25ea2437a267b80b02b88b0b30fd83a96e63fd2bc696cbe14f",
         "member_name":"ส.ต.ต.เบญจรงค์ บาระเมศ",
         "member_phone":"0930402484",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":67,
         "police_station":6701,
         "name_police_station":"สภ.กงไกรลาศ",
         "name_position":"ผบ.หมู่ (ป.) สภ.กงไกรลาศ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.สุโขทัย",
         "hint_pw":"Benjarong2541",
         "line_id":"6oct1998"
      },
      {
         "MID":656,
         "account":"12UQ07",
         "password":"2d064f58d731e04ee29f7eff6b67a20c1c15c7129114619ed1c3a872ec974168479057bc9284de9a880872db95520c493c89738be2f1f21af6ab7e63af162efb",
         "member_name":"พ.ต.ท.สนม แก้วแดง",
         "member_phone":"0881387888",
         "user_level":100,
         "ua_add_data":1,
         "ua_delete_data":100,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":67,
         "police_station":6701,
         "name_police_station":"สภ.กงไกรลาศ",
         "name_position":"สว.สส.สภ.กงไกรลาศ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.สุโขทัย",
         "hint_pw":"0881387888",
         "line_id":"0881387888"
      },
      {
         "MID":657,
         "account":"ThanaphatBest",
         "password":"19bc3578790ffea36275eab506b177bc9030a44751b2a0df914e0624c7d46dc16a4501037fe59a621f3d4c69d86642077e77bbc0e2282c1e9e95c844a855e43a",
         "member_name":"ส.ต.ต.ธนพัทธ์ ทองเนื้ออ่อน",
         "member_phone":"0902282321",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":67,
         "police_station":6701,
         "name_police_station":"สภ.กงไกรลาศ",
         "name_position":"ผบ.หมู่ (ป.) สภ.กงไกรลาศ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.สุโขทัย",
         "hint_pw":"Best924858",
         "line_id":"tnp_best43439"
      },
      {
         "MID":658,
         "account":"28D900",
         "password":"bba34ed8ea365a89fa556ee21709d34f6769907144c1f482eac1f89a2e9f674bbba4b3b5d13f444bc249fa098ea8e411a4cfcdadbf0d19e68af5e484baebf303",
         "member_name":"ด.ต.พรศักดิ์ กันพรม",
         "member_phone":"0863110717",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":62,
         "police_station":6203,
         "name_police_station":"สภ.พบพระ",
         "name_position":"ผบ.หมู่ (สส.) สภ.พบพระ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.ตาก",
         "hint_pw":"pornsak2528",
         "line_id":"bombie191"
      },
      {
         "MID":659,
         "account":"ekarat040342",
         "password":"91bfb02a5225dcf7815f830a9d632db3e412011370c1ec8689645649374b1e34f5d0f07617db89c3e8ada663b29d1cf9bb0eaf19d4e0578f4aa373fc676b050a",
         "member_name":"ส.ต.ต.เอกราช สิงห์อ้าย",
         "member_phone":"0645915590",
         "user_level":1,
         "ua_add_data":1,
         "ua_delete_data":1,
         "ua_edit_data":1,
         "ua_view_data":"1",
         "region":6,
         "provincial":62,
         "police_station":6203,
         "name_police_station":"สภ.พบพระ",
         "name_position":"ผบ.หมู่ (ผช.พงส.) สภ.พบพระ",
         "name_region":"ตำรวจภูธรภาค 6",
         "name_provincial":"ภ.จว.ตาก",
         "hint_pw":"Eb040342",
         "line_id":"bankes5590"
      },
      {
         "MID":660,
         "account":"tester",
         "password":"1234",
         "member_name":"พันตำรวจ ทดสอบ ทดสอบ",
         "member_phone":"",
         "user_level":100,
         "ua_add_data":100,
         "ua_delete_data":100,
         "ua_edit_data":100,
         "ua_view_data":"100",
         "region":6,
         "provincial":61,
         "police_station":6101,
         "name_police_station":"พิปูน",
         "name_position":"ผู้ช่วยผบ.",
         "name_region":"ภ.6",
         "name_provincial":"กำแพลงเพชร",
         "hint_pw":"1234",
         "line_id":""
      }
    // ... กรอกข้อมูลต่อไปเรื่อยๆ ให้ครบ 600 ชุด
];

export let options = {
    vus: 1,                   // จำนวน Virtual Users (ปรับตามต้องการ)
    iterations: testData.length,  // จำนวนรอบ = จำนวนข้อมูลใน testData
};

export default function () {
    const i = __ITER;
    const data = testData[i];

    // แยกชื่อจริง - นามสกุล จาก member_name (ง่าย ๆ โดยแบ่งจากช่องว่างตัวสุดท้าย)
    let firstName = data.member_name;
    let lastName = "";
    if (data.member_name && data.member_name.includes(" ")) {
        const parts = data.member_name.trim().split(" ");
        lastName = parts.pop();
        firstName = parts.join(" ");
    }
    const payload = {
        attributes: {
            locale: "th",
            role: "user",
            permission: ["create", "delete", "read", "write"],
            avatar: "",
            department: "",
            perPages: "",
            refId: "",
            phone: data.member_phone || "",
            region: data.region ? String(data.region) : "",
            provincial: data.provincial ? String(data.provincial) : "",
            policeStation: data.police_station ? String(data.police_station) : "",
            namePoliceStation: data.name_police_station || "",
            position: data.name_position || "",
            nameRegion: data.name_region || "",
            nameProvincial: data.name_provincial || "",
        },
        requiredActions: [],
        emailVerified: false,
        username: data.account || "",
        email: "",
        firstName: firstName,
        lastName: lastName,
        groups: [],
        enabled: true,
    };

    const url_kc = 'https://policeinnopolis-p6.k-lynx.com/sso/realms/master/protocol/openid-connect/token';

    const payload_kc =
        'client_id=admin-cli' +
        '&username=admin' +
        '&password=IFDuLYYwW7GZ' +
        '&grant_type=password';

    const params_kc = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const res_kc = http.post(url_kc, payload_kc, params_kc);

    check(res_kc, {
        'is status 200': (r) => r.status === 200,
    });

    console.log(res_kc.body);

    const token = JSON.parse(res_kc.body).access_token;

    // const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjbTVvZTlpbnBmbFBycXNpeTJBYmpEM29EN2VmaEZhUTM4aG1jclRuMDBVIn0.eyJleHAiOjE3NTQ0NTE2NDAsImlhdCI6MTc1NDQ1MTU4MCwianRpIjoiNzU0YjgyZWYtNzhmZC00NDI1LWI2ODAtNjM4MTUxNjc5NGFmIiwiaXNzIjoiaHR0cHM6Ly9wb2xpY2Vpbm5vcG9saXMtcDYuay1seW54LmNvbS9zc28vcmVhbG1zL21hc3RlciIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNpZCI6IjBmMzk1ZTA5LTZhMWUtNDUzMy1hZTcxLTUxOWZhNDNjYjA1ZCIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSJ9.hC8tm-HoLS_AmBZDVRVS-XXJaQBUEo2q2lASfnVaWbzL39434L6BGbRYwlN9NKCnUUSyac9aocdEdMcKQDbBz7DyJR3Dd2SOGrKbtOCTRzAijfThyrDNs_Cezb5sne0zBkf2Xi0-hUVhOfrG5nVj6nQdWLqeQtofRRBCikoHh_bcDPYMJeyx5v0_42zKtYd-osILz_Mk5WpYQR-ZomQn9_b7J5JDesqYIWXfTddL70o1QWSfa2rMuVsAdCtS3C9m7FqO1s-ZEYtYho3HNwdMmAZeFiE5kyQmfF8vaUCVu_8n7z3Gp0p83jlAHSaYt3wbKThyeTNnDMeCw0sx6y6d_Q";

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    let res = http.post('https://policeinnopolis-p6.k-lynx.com/sso/admin/realms/klynx/users', JSON.stringify(payload), params);

    console.log('Res: ', res);

    check(res, {
        'status 200': (r) => r.status === 200,
    });

    sleep(1); // พัก 1 วินาที ก่อนส่งรอบต่อไป (ถ้าต้องการ)
}
