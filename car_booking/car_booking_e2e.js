import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        // Assert that 99% of requests finish within 3000ms.
        http_req_duration: ["p(90) < 3000"],
    },
    vus: 1,
    duration: '1s',
};

export default function () {
    // const baseUrl = 'https://supercar-dev.pointit.co.th';
    const url_login = 'https://supercar-dev.pointit.co.th/signin.php';
    const url_kc = 'https://iam.pointit.co.th/realms/supercar/protocol/openid-connect/token';
    const url_reserv = 'https://supercar-dev.pointit.co.th/reservation.php';
    const url_options = 'https://supercar-dev.pointit.co.th/reservation.php';
    const url_org = 'https://supercar-dev.pointit.co.th/reservation.php';
    const url_dep = 'https://supercar-dev.pointit.co.th/department.php';
    const url_role = 'https://supercar-dev.pointit.co.th/permission.php';
    const url_vehicle = 'https://supercar-dev.pointit.co.th/vehicle.php';
    const url_model = 'https://supercar-dev.pointit.co.th/model.php';

    const params_kc = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    const payload_kc_user = 'client_id=gw&username=user3&scope=openid&grant_type=password&password=P@ssw0rd&client_secret=bHgcJjSGgoMEvEAwdoagXWhqWYwTOZAz';
    const login_kcRes = http.post(url_kc, payload_kc_user, params_kc)
    const json = login_kcRes.json();
    const accessToken = json?.id_token;
    const params_login = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    };
    const loginRes = http.post(url_login, null, params_login);
    console.log('Signin response:', login_kcRes);
    console.log('accessToken response:', accessToken);
    console.log('Login response:', loginRes);
    check(login_kcRes, {
        'POST Login User (Keycloak) is 200': (r) => r.status === 200,
    });
    check(loginRes, {
        'POST Sign-in is 200': (r) => r.status === 200,
    })

    const query_params_listOrder = {
        organizationId: 'bdf44ca8-0022286f-6875d0d5-31d6cf2c',
        page: 1,
        perPages: 10
    };
    const Url_list_reservOrder = `${url_reserv}?${buildQuery(query_params_listOrder)}`;
    const List_reserv = http.get(Url_list_reservOrder, null, params_login);
    // const json_list_reserv = List_reserv.json();
    console.log('GET reserv:', List_reserv);
    check(List_reserv, {
        'GET List Reservation Order is 200': (r) => r.status === 200,
    });

    const query_params_orderDetails = {
        id: '92c289a4-640eccb7-68809a4a-b856ac60',
    };
    const Url_get_reservOrder = `${url_reserv}?${buildQuery(query_params_orderDetails)}`;
    const orderDetails_reserv = http.get(Url_get_reservOrder, null, params_login);
    console.log('Get orderDetails:', orderDetails_reserv);
    check(orderDetails_reserv, {
        'Get Reservation Order Details is 200': (r) => r.status === 200,
    });

    const payload_reserv = {
        "organizationId": "bdf44ca8-0022286f-6875d0d5-31d6cf2c",
        "project": "ทดสอบการจอง",
        "description": "ทดสอบ",
        "vehicleId": "ade5557f-5d164628-687e3666-50de5136",
        "start": "2025-07-25 10:00:00",
        "end": "2025-07-25 18:00:00",
        "passengers": 4,
        "phone": "",
        "driverName": "นาย ขับรถ เก่งมาก",
        "remark": ""
    };
    const postReserv = http.post(url_login, payload_reserv, params_login);
    console.log('Create reserv:', postReserv);
    check(postReserv, {
        'POST Create Reservation Order is 200': (r) => r.status === 200,
    });

    const payload_editReserv = {
        "organizationId": "bdf44ca8-0022286f-6875d0d5-31d6cf2c",
        "project": "ทดสอบการจอง",
        "description": "ทดสอบ",
        "vehicleId": "ade5557f-5d164628-687e3666-50de5136",
        "start": "2025-07-25 10:00:00",
        "end": "2025-07-25 18:00:00",
        "passengers": 4,
        "phone": "",
        "driverName": "นาย ขับรถ เก่งมาก",
        "remark": ""
    };
    const query_params_editReserv = {
        id: '92c289a4-640eccb7-68809a4a-b856ac60',
    };
    const Url_put_reservOrder = `${url_reserv}?${buildQuery(query_params_editReserv)}`;
    const orderDetails_editReserv = http.put(Url_put_reservOrder, payload_editReserv, params_login);
    console.log('Put orderDetails:', orderDetails_editReserv);
    check(orderDetails_editReserv, {
        'PUT Update Reservation Order is 200': (r) => r.status === 200,
    });

    const query_params_listDropdownOptions = {
        list: 'all',
    };
    const Url_get_listOptions = `${url_options}?${buildQuery(query_params_listDropdownOptions)}`;
    const listOptions_dropdown = http.get(Url_get_listOptions, null, params_login);
    console.log('Get List Dropdown:', listOptions_dropdown);
    check(listOptions_dropdown, {
        'Get List Dropdown Options is 200': (r) => r.status === 200,
    });
    const query_params_listLocations = {
        list: 'location',
        locationId: 'dde8bec2-327ad77d-686cb4db-42e6d811',
        level: '2',
    };

    const Url_get_listLocations = `${url_options}?${buildQuery(query_params_listLocations)}`;
    const listLocation_options = http.get(Url_get_listLocations, null, params_login);
    console.log('Get List Location Child:', listLocation_options);
    check(listLocation_options, {
        'Get List Location Child is 200': (r) => r.status === 200,
    });

    const query_params_listVehicle = {
        list: 'vehicle',
    };
    const Url_get_listVehicle = `${url_options}?${buildQuery(query_params_listVehicle)}`;
    const listVehicle_options = http.get(Url_get_listVehicle, null, params_login);
    console.log('Get listVehicle_options:', listVehicle_options);
    check(listVehicle_options, {
        'Get listVehicle_options is 200': (r) => r.status === 200,
    });

    const query_params_listOrg = {
        page: '1',
        perPages: '10',
    };
    const Url_get_listOrg = `${url_org}?${buildQuery(query_params_listOrg)}`;
    const list_Org = http.get(Url_get_listOrg, null, params_login);
    console.log('Get List Organization:', list_Org);
    check(list_Org, {
        'Get List Organization is 200': (r) => r.status === 200,
    });

    const query_params_getOrgDetails = {
        id: 'bdf44ca8-0022286f-6875d0d5-31d6cf2c',
    };
    const Url_get_getOrgDetails = `${url_org}?${buildQuery(query_params_getOrgDetails)}`;
    const getOrgDetails = http.get(Url_get_getOrgDetails, null, params_login);
    console.log('Get Organization Details:', getOrgDetails);
    check(getOrgDetails, {
        'Get Organization Details is 200': (r) => r.status === 200,
    });

    const payload_createOrg = {
        "name": "test",
        "description": "setset",
        "address": "123/11 กทม.",
        "locationId": "ed2a7618-353288cc-686cb4db-1c749297"
    };
    const createOrg = http.post(url_org, payload_createOrg, params_login);
    console.log('Create Organization:', createOrg);
    check(createOrg, {
        'POST Create Organization is 200': (r) => r.status === 200,
    });

    const payload_editOrg = {
        "id": "37f6aa4a-213624c0-6875bc24-213bfdeb",
    };
    const editOrg = http.put(url_org, payload_editOrg, params_login);
    console.log('Update Organization:', editOrg);
    check(editOrg, {
        'PUT Update Organization is 200': (r) => r.status === 200,
    });

    const query_params_del = {
        "id": "37f6aa4a-213624c0-6875bc24-213bfdeb",
    };
    const Url_delOrg = `${url_org}?${buildQuery(query_params_del)}`;
    const delOrg = http.del(Url_delOrg, null, params_login);
    console.log('Delete Organization:', delOrg);
    check(delOrg, {
        'Delete Organization is 200': (r) => r.status === 200,
    });

    const query_params_listDep = {
        organizationId: "bdf44ca8-0022286f-6875d0d5-31d6cf2c",
        page: "1",
        perPages: "10",

    };

    const Url_listDep = `${url_dep}?${buildQuery(query_params_listDep)}`;
    const listDep = http.get(Url_listDep, null, params_login);
    console.log('List Department:', listDep);
    check(listDep, {
        'GET List Department is 200': (r) => r.status === 200,
    });

    const query_params_getDep = {
        "id": "0e351a2f-0f2e298f-6875d0d5-3a6cd15f",
    };
    const Url_getDep = `${url_org}?${buildQuery(query_params_getDep)}`;
    const getDep = http.del(Url_getDep, null, params_login);
    console.log('Get Department Details:', getDep);
    check(getDep, {
        'GET Department Details': (r) => r.status === 200,
    });

    const payload_createDep = {
        "name": "test",
        "description": "",
        "organizationId": "bdf44ca8-0022286f-6875d0d5-31d6cf2c"
    };
    const createDep = http.post(url_org, payload_createDep, params_login);
    console.log('Create Department:', createDep);
    check(createDep, {
        'POST Create Department is 200': (r) => r.status === 200,
    });

    const payload_editDep = {
        "id": "506e1667-04f51aa1-6875dc74-b5360308",
    };
    const editDep = http.put(url_org, payload_editDep, params_login);
    console.log('Update Department:', editDep);
    check(editDep, {
        'PUT Update Department is 200': (r) => r.status === 200,
    });

    const query_params_delDep = {
        "id": "37f6aa4a-213624c0-6875bc24-213bfdeb",
    };
    const Url_delDep = `${url_org}?${buildQuery(query_params_delDep)}`;
    const delDep = http.del(Url_delDep, null, params_login);
    console.log('Delete Department:', delDep);
    check(delDep, {
        'Delete Department is 200': (r) => r.status === 200,
    });

    const query_params_listRole = {
        organizationId: "bdf44ca8-0022286f-6875d0d5-31d6cf2c",
        page: "1",
        perPages: "10",

    };
    const Url_listRole = `${url_role}?${buildQuery(query_params_listRole)}`;
    const listRole = http.get(Url_listRole, null, params_login);
    console.log('List Permission:', listRole);
    check(listRole, {
        'GET List Permission is 200': (r) => r.status === 200,
    });

    const query_params_getRole = {
        "id": "5a9c2142-5301962b-6875d0d5-4452ef96",
    };
    const Url_getRole = `${url_role}?${buildQuery(query_params_getRole)}`;
    const getRole = http.del(Url_getRole, null, params_login);
    console.log('Get Permission Role Details:', getRole);
    check(getRole, {
        'Get Permission Role Details': (r) => r.status === 200,
    });

    const payload_createRole = {
        "name": "Driver",
        "organizationId": "bdf44ca8-0022286f-6875d0d5-31d6cf2c",
        "feature": {
            "organization": {
                "view": false,
                "create": false,
                "update": false,
                "delete": false
            },
            "department": {
                "view": false,
                "create": false,
                "update": false,
                "delete": false
            },
            "permissionRole": {
                "view": false,
                "create": false,
                "update": false,
                "delete": false
            }

        }
    }
    const createRole = http.post(url_role, payload_createRole, params_login);
    console.log('Create Permission Role:', createRole);
    check(createRole, {
        'POST Create Permission Role is 200': (r) => r.status === 200,
    });

    const payload_editRole = {
        "id": "02ac797a-ddfbb0b7-68761111-da35fc41",
    };
    const editRole = http.put(url_role, payload_editRole, params_login);
    console.log('Update Permission Role:', editRole);
    check(editRole, {
        'PUT Update Permission Role is 200': (r) => r.status === 200,
    });

    const query_params_delRole = {
        "id": "37f6aa4a-213624c0-6875bc24-213bfdeb",
    };
    const Url_delRole = `${url_role}?${buildQuery(query_params_delRole)}`;
    const delRole = http.del(Url_delRole, null, params_login);
    console.log('Delete Department:', delRole);
    check(delRole, {
        'Delete Department is 200': (r) => r.status === 200,
    });

    const query_params_list_Vehicle = {
        page: "1",
        perPages: "10",

    };
    const Url_listVehicle = `${url_vehicle}?${buildQuery(query_params_list_Vehicle)}`;
    const listVehicle = http.get(Url_listVehicle, null, params_login);
    console.log('List Vehicle:', listVehicle);
    check(listVehicle, {
        'GET List Vehicle is 200': (r) => r.status === 200,
    });

    const query_params_getVehicle = {
        "id": "5a9c2142-5301962b-6875d0d5-4452ef96",
    };
    const Url_getVehicle = `${url_vehicle}?${buildQuery(query_params_getVehicle)}`;
    const getVehicle = http.del(Url_getVehicle, null, params_login);
    console.log('Get Vehicle Details:', getVehicle);
    check(getVehicle, {
        'Get Vehicle Details': (r) => r.status === 200,
    });

    const payload_createVehicle = {
        "organizationId": "bdf44ca8-0022286f-6875d0d5-31d6cf2c",
        "description": "",
        "licensePlate": "2กก1234",
        "provinceId": "60616919-541f38d5-686cb4db-030177ec",
        "modelId": "f7bf042c-e6a8c05d-687e0d7c-a604052d",
        "color": "BLACK"
    };
    const createVehicle = http.post(url_vehicle, payload_createVehicle, params_login);
    console.log('Create Vehicle:', createVehicle);
    check(createVehicle, {
        'POST Create Vehicle is 200': (r) => r.status === 200,
    });

    const payload_editVehicle = {
        "id": "f2438aed-d3161534-687e3690-5b6bf23c",
    };
    const editVehicle = http.put(url_vehicle, payload_editVehicle, params_login);
    console.log('Update Vehicle:', editVehicle);
    check(editVehicle, {
        'PUT Update Vehicle is 200': (r) => r.status === 200,
    });

    const query_params_delVehicle = {
        "id": "37f6aa4a-213624c0-6875bc24-213bfdeb",
    };
    const Url_delVehicle = `${url_vehicle}?${buildQuery(query_params_delVehicle)}`;
    const delVehicle = http.del(Url_delVehicle, null, params_login);
    console.log('Delete Vehicle:', delVehicle);
    check(delVehicle, {
        'Delete Vehicle is 200': (r) => r.status === 200,
    });

    const query_params_listModel = {
        page: "1",
        perPages: "10",

    };
    const Url_listModel = `${url_model}?${buildQuery(query_params_listModel)}`;
    const listModel = http.get(Url_listModel, null, params_login);
    console.log('List Model:', listModel);
    check(listModel, {
        'GET List Model is 200': (r) => r.status === 200,
    });

    const query_params_getModel = {
        "id": "ee30d6ca-11dbc65e-687e0ddc-2719e886",
    };
    const Url_getModel = `${url_model}?${buildQuery(query_params_getModel)}`;
    const getModel = http.del(Url_getModel, null, params_login);
    console.log('Get Model Details:', getModel);
    check(getModel, {
        'Get Model Details': (r) => r.status === 200,
    });

    const payload_createModel = {
        "brand": "Honda",
        "model": "City",
        "engine": "Gasoline (เบนซิน)",
        "type": "Sedan",
        "seat": 5,
        "year": 2020
    };
    const createModel = http.post(url_model, payload_createModel, params_login);
    console.log('Create Model:', createModel);
    check(createModel, {
        'POST Create Model is 200': (r) => r.status === 200,
    });

    const payload_editModel = {
        "id": "4c1f08f9-ce928dfd-6877ad6b-3294414f",
    };
    const editModel = http.put(url_model, payload_editModel, params_login);
    console.log('Update Model:', editModel);
    check(editModel, {
        'PUT Update Model is 200': (r) => r.status === 200,
    });

    const query_params_delModel = {
        "id": "4c1f08f9-ce928dfd-6877ad6b-3294414f",
    };
    const Url_delModel = `${url_model}?${buildQuery(query_params_delModel)}`;
    const delModel = http.del(Url_delModel, null, params_login);
    console.log('Delete Model:', delModel);
    check(delModel, {
        'Delete Model is 200': (r) => r.status === 200,
    });

    sleep(1);
}

// ฟังก์ชันสร้าง query string จาก object
function buildQuery(params) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}