// - Реализовать компоненту company-filter, которая генерирует эвент для фильтрации списка компаний.
// - Контролы в фильтре: text-box поиск по названию, select-box с типами компаний, select-box с видами деятельности.
// - Это должна быть форма, реализованная с помощью модуля ReactiveForm.
// - При изменение поля, должна автоматически происходить фильтрация списка компаний, компоненты company-list.
// - Связать фильтрацию с компонентой company-list через Input/Output или через сервис.



import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'ang-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.scss']
})
export class CompanyFilterComponent implements OnInit {

  nameControl = new FormControl();
  industryControl = new FormControl('0');
  typeControl = new FormControl('0');


  @Input() companyTypes;
  @Input() companyIndustries;

  @Output() industryFilterChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output() typeFilterChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output() nameFilterChanged: EventEmitter<any> = new EventEmitter<any>()


  constructor(private lss: ListServiceService) { 
  }
  
  onNameInputChanged(value: string) {
    this.nameFilterChanged.emit(value)
  }
  
  onIndustryOptionsSelected(value: string) {
    console.log(value)
    this.industryFilterChanged.emit(value)
  }

  onTypeOptionsSelected(value: string) {
    //this.setSortingAttr(value);
    this.typeFilterChanged.emit(value)
  }


  ngOnInit(): void {
    this.nameControl.valueChanges.subscribe(this.onNameInputChanged)
    this.industryControl.valueChanges.subscribe(this.onIndustryOptionsSelected)
    this.typeControl.valueChanges.subscribe(this.onTypeOptionsSelected)
  }

}
