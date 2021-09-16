import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularYandexMapsModule } from 'angular8-yandex-maps';


import { AppComponent } from './components/app/app.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './components/company-yandex-map/company-yandex-map.component'
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { CompanySortComponent } from './components/company-sort/company-sort.component';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';
import { LayoutComponent } from './layouts/layout/layout.component'

import { ListServiceService } from './services/list-service.service';


const routes: Routes = [  
  { 
    path: '', 
    component: LayoutComponent, 
    children: [
      { 
        path: '', 
        component: CompanyListComponent 
      },
      { 
        path: 'detail/:id', 
        component: CompanyDetailComponent,
        data: {}
      },
      { 
        path: 'map', 
        component: CompanyYandexMapComponent 
      },
      { 
        path: '**', 
        component: CompanyListComponent 
      }
    ]
  },
];



@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyYandexMapComponent,
    CompanyItemComponent,
    CompanySortComponent,
    CompanyFilterComponent,
],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularYandexMapsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
