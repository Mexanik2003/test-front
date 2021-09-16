// 3. Реализовать страницу с подробной информации о конкретной компании (компонента company-detail).
// 	- Переход на данную страницу происходит при клике на компанию в списке (компонента company-item).
// 	- В company-detail должны быть следующие данные: логотип (logo), название компании (в формате: suffix "business_name"), вид деятельности (industry), слоган (catch_phrase), контактный номер телефона (phone_number), адрес (full_address).


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