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
  industryControl = new FormControl('');
  typeControl = new FormControl('');


  @Input() companyTypes;
  @Input() companyIndustries;

  @Output() nameFilterChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output() industryFilterChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output() typeFilterChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(private lss: ListServiceService) { 
  }
  
  onNameInputChanged(value) {
    this.nameFilterChanged.emit(this.nameControl.value)
  }
  
  onIndustryOptionsSelected() {
    this.industryFilterChanged.emit(this.industryControl.value)
  }

  onTypeOptionsSelected() {
    this.typeFilterChanged.emit(this.typeControl.value)
  }


  ngOnInit(): void {
    this.nameControl.setValue(this.lss.listFilterParams.filter.business_name);
    this.industryControl.setValue(this.lss.listFilterParams.filter.industry);
    this.typeControl.setValue(this.lss.listFilterParams.filter.type);
    this.nameControl.valueChanges.subscribe(this.onNameInputChanged.bind(this))
    this.industryControl.valueChanges.subscribe(this.onIndustryOptionsSelected.bind(this))
    this.typeControl.valueChanges.subscribe(this.onTypeOptionsSelected.bind(this))
  }

}
