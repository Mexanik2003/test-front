import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'ang-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

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
    //this.updateView();
  }

  
  constructor(private lss: ListServiceService) { }

  ngOnInit(): void {
    if (!this.lss.companies) {
      const fetch = this.lss.getCompaniesList(this.lss.listFilterParams.size)
      .then ((results) => {
        this.lss.companies = results;
      })
    } else {

    }


  }

}
