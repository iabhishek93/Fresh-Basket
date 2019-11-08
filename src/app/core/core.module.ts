import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModule,//Here we have installed NgbModule 3.3.1 as it supports this version//
    RouterModule.forChild([])
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
