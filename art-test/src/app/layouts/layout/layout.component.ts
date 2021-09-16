import { Component, OnInit } from '@angular/core';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'ang-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  
  constructor(private lss: ListServiceService) { }

  ngOnInit(): void {

  }

}
