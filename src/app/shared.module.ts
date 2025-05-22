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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MomentDateModule,
} from '@angular/material-moment-adapter';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

//component
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_helpers/auth.guard';
import { FilterPipe } from './filter.pipe';

//services
import { UpdateService } from './services/update.service';
import { MY_FORMATS } from './pages/cms-utenti/cms-utenti.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { EventsComponent } from './components/events/events.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    FilterPipe,
    EditFormComponent,
    UploadImagesComponent,
    EventsComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MomentDateModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,

    // HTTP
    HttpClientModule,
    MatTableModule,

    // JWT
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7167'],
        disallowedRoutes: [],
      },
    }),
    MatMenuModule,
    RouterModule,
    MatCardModule,
  ],
  exports: [
    MatCardModule, // ✅ Esporta per renderlo accessibile ad altri moduli
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatMenuModule,
    FilterPipe,
    CommonModule,
  ],
  providers: [
    AuthGuard,
    UpdateService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SharedModule {}
