import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'ang-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

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
  blockLoad = false;

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
    this.updateView();
  }

  nameFilterChangeHandler(value) {
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
    this.filteredCompanies = this.companies;
    this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies);
  }

  applyFilters(noSort = false) {
        this.filteredCompanies = this.lss.setFilterAndSort(this.filteredCompanies,noSort);
        this.companyTypes = this.lss.getSortedAndUniqueList(this.companies.map(item => item.type))
        this.companyIndustries = this.lss.getSortedAndUniqueList(this.companies.map(item => item.industry))

  }

  scroll(e) {
    let scrollPosition = (e.target.scrollingElement.scrollTop+e.target.scrollingElement.clientHeight)/e.target.scrollingElement.offsetHeight
    if (scrollPosition>0.8) {
      //console.log(this.blockLoad)
      if (!this.blockLoad) {
        this.blockLoad = true
        const fetch = this.lss.getCompaniesList(30)
        .then ((results) => {
          //this.filteredCompanies.splice(0, 30)
          results.forEach(element => {
            this.filteredCompanies.push(element);
            this.companies.push(element);
          });
          this.applyFilters(true);
        })
        .finally(() => {
          this.blockLoad = false;
        })
      }
      //console.log('нижняя половина страницы')
    }
  }

  scrollListener = this.scroll.bind(this);

  ngOnInit(): void {

    window.addEventListener('scroll', this.scrollListener, true)

    if (!this.lss.companies) {
      const fetch = this.lss.getCompaniesList(this.lss.listFilterParams.size)
      .then ((results) => {
        this.companies = this.filteredCompanies = this.lss.companies = results;
        this.applyFilters();
      })
    } else {
      this.companies = this.filteredCompanies = this.lss.companies;
      this.applyFilters();
    }

  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener, true);
}

}
