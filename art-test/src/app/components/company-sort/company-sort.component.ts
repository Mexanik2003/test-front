import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'ang-company-sort',
  templateUrl: './company-sort.component.html',
  styleUrls: ['./company-sort.component.scss']
})
export class CompanySortComponent implements OnInit {

  @Output() sortChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(private lss: ListServiceService) { }

  onOptionsSelected(value: string) {
    this.sortChanged.emit(value)
  }

  ngOnInit(): void {
}

}
