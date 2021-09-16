import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'ang-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  //svc = new ListServiceService

  companies: {
    bs_company_statement: String
    business_name: String
    buzzword: String
    catch_phrase: String
    duns_number: String
    employee_identification_number: String
    full_address: String
    id: Number
    industry: String
    latitude: Number
    logo: String
    longitude: Number
    phone_number: String
    suffix: String
    type: String
    uid: String
  }[] = [];

  filteredCompanies: {
    bs_company_statement: String
    business_name: String
    buzzword: String
    catch_phrase: String
    duns_number: String
    employee_identification_number: String
    full_address: String
    id: Number
    industry: String
    latitude: Number
    logo: String
    longitude: Number
    phone_number: String
    suffix: String
    type: String
    uid: String
  }[] = [];

  companyIndustries: String[] | undefined;
  companyTypes: String[] | undefined;

  constructor(private lss: ListServiceService) {
    

  }

  sortChangeHandler(value) {
    if (this.lss.listFilterParams.sort.columnName === value) {
      if (this.lss.listFilterParams.sort.direction === 'ASC') {
        this.lss.listFilterParams.sort.direction = 'DESC'
      } else {
        this.lss.listFilterParams.sort.direction = 'ASC'
      }
    } else {
      this.lss.listFilterParams.sort.columnName = value;
      this.lss.listFilterParams.sort.direction = 'ASC';
    }
    //console.log(`New sort ${this.lss.listFilterParams.sort}`);
    this.updateView();
  }

  nameFilterChangeHandler(value) {
    //console.log(value)
    this.lss.listFilterParams.filter.business_name = value;
    this.updateView();
  }

  industryFilterChangeHandler(value) {
    //console.log(value)
    this.lss.listFilterParams.filter.industry = value;
    this.updateView();
    if (value) {
      this.companyTypes = this.lss.getSortedAndUniqueList(this.filteredCompanies.map(item => item.industry))
    } else {
      this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))
    }
  }

  typeFilterChangeHandler(value) {
    //console.log(value)
    this.lss.listFilterParams.filter.type = value;
    this.updateView();
    if (value) {
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.filteredCompanies.map(item => item.type))
    } else {
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))
    }
  }

  updateView() {
    //console.log(this.companies);
    // Sorting list
    this.filteredCompanies = this.companies;
    const sortAttr = this.lss.listFilterParams.sort.columnName;
    const sortDir = this.lss.listFilterParams.sort.direction;
    const sortMult = sortDir === 'ASC' ? 1 : -1;
    this.filteredCompanies.sort((prev, next) => {
      if ( prev[sortAttr] < next[sortAttr] ) {
        return -1*sortMult;
      } else if ( prev[sortAttr] > next[sortAttr] ) {
        return 1*sortMult;
      } else {
        return 0;
      }
    });
    //console.log(this.companies);

    // Filter by business_name

    // Filter by industry
    if (this.lss.listFilterParams.filter.industry) {
      this.filteredCompanies = this.filteredCompanies.filter(item => item.industry === this.lss.listFilterParams.filter.industry)
    }

    // Filter by type
    if (this.lss.listFilterParams.filter.type) {
      this.filteredCompanies = this.filteredCompanies.filter(item => item.type === this.lss.listFilterParams.filter.type)
    }


  }

  

  ngOnInit(): void {
    const fetch = this.lss.getCompaniesList(this.lss.listFilterParams.size)
    .then ((results) => {
      this.companies = this.filteredCompanies = results;
      this.updateView();

      this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))

      this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))

      //console.log(this.companyIndustries)
      //console.log(this.companyTypes)
  })

  }

}
