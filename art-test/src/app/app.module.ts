import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './components/company-yandex-map/company-yandex-map.component'
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { CompanySortComponent } from './components/company-sort/company-sort.component';
import { CompanyFilterComponent } from './components/company-filter/company-filter.component';
import { LayoutComponent } from './layouts/layout/layout.component'


const routes: Routes = [  
  { 
    path: '', 
    component: LayoutComponent, 
    children: [
      { 
        path: '', 
        component: CompanyListComponent 
      }
    ]
  },
  { 
    path: 'detail', 
    component: LayoutComponent, 
    children: [
      { 
        path: '', 
        component: CompanyDetailComponent 
      }
    ]
  },
  { 
    path: 'map', 
    component: LayoutComponent, 
    children: [
      { 
        path: '', 
        component: CompanyYandexMapComponent 
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
