// - Реализовать компоненту company-filter, которая генерирует эвент для фильтрации списка компаний.
// - Контролы в фильтре: text-box поиск по названию, select-box с типами компаний, select-box с видами деятельности.
// - Это должна быть форма, реализованная с помощью модуля ReactiveForm.
// - При изменение поля, должна автоматически происходить фильтрация списка компаний, компоненты company-list.
// - Связать фильтрацию с компонентой company-list через Input/Output или через сервис.



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ang-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
