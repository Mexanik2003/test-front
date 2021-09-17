import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  companies;

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
    let commits = await result.json();
    return commits;
  }

  async getCompaniesList(size = 100) {
      if (size) this.listFilterParams.size = size;
      return this._fetchList(size);
  }

  getSortedAndUniqueList(types: String[]) {
    let uniqueArray = Array.from(new Set(types));
    return uniqueArray.sort();
  }

  setFilterAndSort(companies, noSort = false) {

    const sortAttr = this.listFilterParams.sort.columnName;
    const sortDir = this.listFilterParams.sort.direction;
    const sortMult = sortDir === 'ASC' ? 1 : -1;
    if (!noSort) {
      companies.sort((prev, next) => {
        if ( prev[sortAttr] < next[sortAttr] ) {
          return -1*sortMult;
        } else if ( prev[sortAttr] > next[sortAttr] ) {
          return 1*sortMult;
        } else {
          return 0;
        }
      });
    }

    // Filter by business_name
    if (this.listFilterParams.filter.business_name) {
      companies = companies.filter(item => item.business_name.toLowerCase().indexOf(this.listFilterParams.filter.business_name.toLowerCase()) > -1)
    }


    // Filter by industry
    if (this.listFilterParams.filter.industry) {
      companies = companies.filter(item => item.industry === this.listFilterParams.filter.industry)
    }

    // Filter by type
    if (this.listFilterParams.filter.type) {
      companies = companies.filter(item => item.type === this.listFilterParams.filter.type)
    }

    return companies;
    
  }

  constructor() { }
}
