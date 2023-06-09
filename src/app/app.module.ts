//module
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule }  from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common'
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';


//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChiSiamoComponent } from './pages/chi-siamo/chi-siamo.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { PaginaPersonaleComponent } from './pages/pagina-personale/pagina-personale.component';
import { DatabaseComponent } from './pages/database/database.component';
import { AssociazioneComponent, MY_FORMATS } from './pages/associazione/associazione.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './_helpers/auth.guard';
import { FilterPipe } from './filter.pipe';


//services
import { UpdateService } from './services/update.service';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { CarouselComponent } from './components/carousel/carousel.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ChiSiamoComponent,
    ContattiComponent,
    PaginaPersonaleComponent,
    DatabaseComponent,
    AssociazioneComponent,
    NotFoundComponent,
    FilterPipe,
    UploadImagesComponent,
    SchedulerComponent,
    CarouselComponent,
  ],
  imports: [
    MatToolbarModule,
    MomentDateModule,
    MatMomentDateModule,
    MatNativeDateModule,
    DatePipe,
    MatProgressBarModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7167"],
        disallowedRoutes: []
      }
    }),
    MatMenuModule,
    RouterModule,
    MatCardModule
  ],
  providers: [AuthGuard, UpdateService,DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }
    ,{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
