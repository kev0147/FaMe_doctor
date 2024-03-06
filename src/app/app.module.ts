import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { PatientsModule } from './patients/patients.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    InscriptionComponent,
    ConnexionComponent,
    HeaderComponent,
    DashboardComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PatientsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
