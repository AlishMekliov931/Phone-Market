import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from "./core/services/service.module";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './components/sheard/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/auth/logout/logout';
import { GuardsModule } from './core/guards/guards.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastModule.forRoot(),    
    BrowserModule,
    AppRoutingModule,
    ServiceModule,
    HttpClientModule,
    SharedModule,
    GuardsModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
