import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  listFilterParams = {
    size: 100,
    filter: {
        business_name: '',
        industry: '',
        type: ''
    },
    sort: {
        columnName: 'business_name',
        direction: 'ASC'
    }
  }

  async _fetchList(size: Number) {
    let url = `https://random-data-api.com/api/company/random_company?size=${size}`;
    let result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json"
        },
    })
    let commits = await result.json(); // читаем ответ в формате JSON
    return commits;
  }

  async getCompaniesList(size = 100) {
      if (size) this.listFilterParams.size = size;
      //console.log(listFilterParams)
      return this._fetchList(size);
  }

  getSortedAndUniqueList(types: String[]) {
    let uniqueArray = Array.from(new Set(types));
    // let uniqueArray = types.filter(function(item, pos) {
    //   return types.indexOf(item) == pos;
    // })
    return uniqueArray.sort();
  }

  constructor() { }
}
