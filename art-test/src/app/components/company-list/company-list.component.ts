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
    if (value) {
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.filteredCompanies.map(item => item.industry))
      this.companyTypes = this.lss.getSortedAndUniqueList(this.filteredCompanies.map(item => item.type))
    } else {
      this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))
    }
  }

  industryFilterChangeHandler(value) {
    //console.log(value)
    this.lss.listFilterParams.filter.industry = value;
    this.updateView();
    if (value) {
      this.companyTypes = this.lss.getSortedAndUniqueList(this.filteredCompanies.map(item => item.type))
    } else {
      this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))
    }
  }

  typeFilterChangeHandler(value) {
    //console.log(value)
    this.lss.listFilterParams.filter.type = value;
    this.updateView();
    if (value) {
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.filteredCompanies.map(item => item.industry))
    } else {
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))
    }
  }

  updateView() {
    //console.log(this.companies);
    // Sorting list
    this.filteredCompanies = this.companies;
    //console.log(this.companies);

    this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies);


  }

  

  ngOnInit(): void {
    if (!this.lss.companies) {
      const fetch = this.lss.getCompaniesList(this.lss.listFilterParams.size)
      .then ((results) => {
        this.companies = this.filteredCompanies = this.lss.companies = results;
        this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies);

        this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))

        this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))
      })
    } else {
      this.companies = this.filteredCompanies = this.lss.companies;
      this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))
      this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies);
      this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))
    }

  }

}
