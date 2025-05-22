import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { PagesModule } from './pages/pages.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/Auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/Auth/auth.effects';
import { MatInputModule } from '@angular/material/input';
import { ObsEffects } from './store/Observations/obs.effects';
import { UserEffects } from './store/User/user.effects';
import { observationsReducer } from './store/Observations/obs.reducer';
import { UserReducer } from './store/User/user.reducer';
import { AppState } from './app.state';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    StoreModule.forRoot<AppState>({
      auth: authReducer,
      obs: observationsReducer,
      user: UserReducer,
    }),
    EffectsModule.forRoot([AuthEffects, ObsEffects, UserEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
