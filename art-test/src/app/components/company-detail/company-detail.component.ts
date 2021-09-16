import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'ang-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  card;
  private routeSub: Subscription;

  constructor(private lss: ListServiceService, private route: ActivatedRoute) {
    this.routeSub = new Subscription;
   }

  ngOnInit(): void {
    this.card = this.route.snapshot.fragment;
  }

  ngOnDestroy() {
  }

}
