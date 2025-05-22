import { NgModule } from '@angular/core';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { CmsEventiComponent } from './cms-eventi/cms-eventi.component';
import { CmsUtentiComponent } from './cms-utenti/cms-utenti.component';
import { ContattiComponent } from './contatti/contatti.component';
import { DatabaseComponent } from './database/database.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginaPersonaleComponent } from './pagina-personale/pagina-personale.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared.module';
import { SchedulerComponent } from './home/scheduler/scheduler.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    SharedModule, // ✅ Importa il modulo condiviso che contiene MatCardModule
    CommonModule,
    MatInputModule,
  ],
  declarations: [
    ChiSiamoComponent,
    CmsEventiComponent,
    CmsUtentiComponent,
    ContattiComponent,
    DatabaseComponent,
    HeroComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    PaginaPersonaleComponent,
    RegisterComponent,
    SchedulerComponent,
    CarouselComponent,
  ],
  exports: [
    ChiSiamoComponent,
    CmsEventiComponent,
    CmsUtentiComponent,
    ContattiComponent,
    DatabaseComponent,
    HeroComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    PaginaPersonaleComponent,
    RegisterComponent,
  ],
  providers: [DatePipe],
})
export class PagesModule {}
