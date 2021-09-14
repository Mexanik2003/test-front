const listFilterParams = {
    filter: {
        business_name: '',
        industry: '',
        type: ''
    },
    sort: {
        columnName: 'date',
        direction: 'ASC'
    }
}

const companies = [
    {
      business_name: "Apple Inc.",
      industry: "Электроника",
      type: "Публичная компания",
      catch_phrase: "Думай иначе",
      phone_number: "+12345678901",
      full_address: "Где-то в США"
    },
    {
      business_name: "BMW",
      industry: "Автомобили",
      type: "Акционерное общество",
      catch_phrase: "С удовольствием за рулем",
      phone_number: "+24563589742",
      full_address: "Где-то в Германии"
    },
    {
      business_name: "Huawei",
      industry: "Телекоммуникации",
      type: "Частная компания",
      catch_phrase: "Увидеть будущее",
      phone_number: "+35874256988",
      full_address: "Где-то в Китае"
    },
    {
      business_name: "ООО Ромашка",
      industry: "Акволабеан",
      type: "Частная компания",
      catch_phrase: "Выжил сам - выживи другого",
      phone_number: "+79876543210",
      full_address: "Где-то в России"
    },
  ]



function sendQuery(params) {
    // return fetch("http://localhost:5000/", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': "application/json"
    //     },
    //     body: JSON.stringify(params)
    // })
    // .then(res => {
    //     if (res.status === 200) {
    //         return res.json();
    //     } else {
    //         return res.status;
    //     }
    // })

    // Вместо обращения к серверу используем тестовые данные
    return Promise(companies)
}

function updateView() {
    console.log(listFilterParams)
    return sendQuery(listFilterParams);
}

function setFilter(params) {
    if (params) {listFilterParams.filter = params} else {
        listFilterParams.filter = {
            columnName: '',
            operator: '',
            filterValue: ''
        }
    };
}

function setSort(params) {
    if (params) {
        listFilterParams.sort.columnName = params
        if (listFilterParams.sort.direction === 'ASC') {
            listFilterParams.sort.direction = 'DESC'
        } else {
            listFilterParams.sort.direction = 'ASC'
        };
    } else {
        listFilterParams.sort = {
            columnName: 'date',
            direction: 'ASC'
        }
    };
}




export {updateView, setFilter, setSort, listFilterParams};