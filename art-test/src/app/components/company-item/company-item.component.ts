import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ang-company-item',
    templateUrl: './company-item.component.html',
    styleUrls: ['./company-item.component.scss']
})


export class CompanyItemComponent {

@Input() card;

ngOnInit() {
    //console.log(this.card)
}


}