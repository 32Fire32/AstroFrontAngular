import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserObservations } from 'src/app/store/Observations/obs.selectors';
import { getUser } from 'src/app/store/User/user.selectors';
import { loadObservations } from 'src/app/store/Observations/obs.actions';
import { AppState } from 'src/app/app.state';

export interface allEvents {
  description: string;
  observationDate: string;
  place: string;
  delete: any;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD hh:mm:ss',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-pagina-personale',
  templateUrl: './pagina-personale.component.html',
  styleUrls: ['./pagina-personale.component.scss'],
})
export class PaginaPersonaleComponent implements OnInit {
  constructor(
    public store: StoreService,
    private http: HttpClient,
    public datepipe: DatePipe,
    private serv: GetServicesService,
    private storeNgrx: Store<AppState>
  ) {
    this.user$ = this.storeNgrx.select(getUser);
    this.observations$ = this.storeNgrx.select(selectUserObservations);
  }

  user$: Observable<any>;
  observations$: Observable<any>;

  selectedFiles: any = [];
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  displayedObservationsColumns: string[] = [
    'Description',
    'ObservationDate',
    'Place',
    'Delete',
  ];

  dataSourceObservations: any;

  observations: any;

  userName: any = localStorage.getItem('userName');

  user: any;

  addObservation: any;

  edit: boolean = false;

  admin: any;

  fileName = '';

  file: any;

  imageURL?: string;

  pathUrl = 'https://localhost:7167';

  ngOnInit() {
    this.user$.subscribe((user) => {
      console.log('user recuperato', user);
      if (user) {
        this.storeNgrx.dispatch(loadObservations({ userId: user.userId }));
      }
    });

    this.observations$.subscribe((observations) => {
      console.log('osservazioni recuperate', observations);
    });
  }

  onPatchUser(form: NgForm) {
    //api per foto profilo
    if (this.file) {
      const formData = new FormData();
      formData.append('UserId', this.store.user.userId);
      formData.append('Image', this.file);
      this.http
        .post('https://localhost:7167/api/PersonalPage/ProfileImage', formData)
        .subscribe((data: any) => {
          this.store.user.profileImgUrl = data.data.profileImgUrl;
        });
    }

    // api per informazioni utente
    this.serv
      .PatchUser('https://localhost:7167/api/PersonalPage/Update', {
        UserId: this.user.userId,
        userName: form.value.userName
          ? form.value.userName
          : this.user.userName,
        FirstName: form.value.firstName
          ? form.value.firstName
          : this.user.firstName,
        LastName: form.value.lastName
          ? form.value.lastName
          : this.user.lastName,
        Email: form.value.email ? form.value.email : this.user.email,
        Subscribed: form.value.subscribed
          ? JSON.parse(form.value.subscribed)
          : false,
        Password: this.user.password,
      })
      .subscribe((data: any) => {
        this.user = data;
        const userName = data.userName;
        localStorage.setItem('userName', userName);
      });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    // const fileName = file.name;
    console.log(this.file);

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  enableEdit() {
    this.edit ? (this.edit = false) : (this.edit = true);
  }

  modify() {
    this.addObservation
      ? (this.addObservation = false)
      : (this.addObservation = true);
  }

  isAdminAuthenticated = (): boolean => {
    const admin = localStorage.getItem('admin');
    if (admin) {
      return true;
    }
    return false;
  };

  selectFiles(files: FileList | null): void {
    if (files) {
      this.message = [];
      this.progressInfos = [];

      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }

      this.previews = [];
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;

        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };

          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }
  }

  onObservation(form: NgForm) {
    const formData = new FormData();
    formData.append('UserId', this.user.userId);
    formData.append('ObservationNote', form.value.observationNote);
    formData.append('Place', form.value.place);
    formData.append(
      'ObservationDate',
      this.datepipe.transform(
        form.value.observationDate,
        'yyyy-MM-ddTHH:mm:ss'
      )!
    );
    formData.append('User', this.user);

    if (this.selectedFiles) {
      this.selectedFiles.forEach((element: File) => {
        console.log(element);
        formData.append('Images', element);
      });
    }

    console.log(formData);
    this.http
      .put(
        'https://localhost:7167/api/PersonalPage/CreateObservation',
        formData
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  applyFilterObservations(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSourceObservations.filter);
    this.dataSourceObservations.filter = filterValue.trim().toLowerCase();
  }

  deleteObservation(id: number) {
    this.serv
      .removeObservation(
        'https://localhost:7167/api/PersonalPage/DeleteObservation?id=',
        id
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
