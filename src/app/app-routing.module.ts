import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsUtentiComponent } from './pages/cms-utenti/cms-utenti.component';
import { ChiSiamoComponent } from './pages/chi-siamo/chi-siamo.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { DatabaseComponent } from './pages/database/database.component';
import { HomeComponent } from './pages/home/home.component';
import { CmsEventiComponent } from './pages/cms-eventi/cms-eventi.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PaginaPersonaleComponent } from './pages/pagina-personale/pagina-personale.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'chi-siamo', component: ChiSiamoComponent},
  {path:'contatti', component: ContattiComponent},
  {path:'cms-utenti', component: CmsUtentiComponent},
  {path:'cms-eventi', component: CmsEventiComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'database/:id', component: DatabaseComponent},
  {path:'pagina-personale', component: PaginaPersonaleComponent, canActivate: [AuthGuard]},
  {path:'404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
