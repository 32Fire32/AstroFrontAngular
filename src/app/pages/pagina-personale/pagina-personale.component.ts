import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';

export interface allEvents {
  description: string;
  observationDate: string;
  place: string;
  delete: any;
}

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD hh:mm:ss',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-pagina-personale',
  templateUrl: './pagina-personale.component.html',
  styleUrls: ['./pagina-personale.component.scss']
})
export class PaginaPersonaleComponent implements OnInit {

  constructor(private serv: GetServicesService, public store: StoreService, private http:HttpClient, public datepipe: DatePipe, private uploadService: FileUploadService) { }

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  displayedObservationsColumns: string[] = ['Description', 'ObservationDate', 'Place', 'Delete'];

  dataSourceObservations: any

  observations: any

  username: any = localStorage.getItem("username");

  user:any;

  update: any ;

  admin: any;

  isAdmin: any;

  fileName = '';

  file: any;

  imageURL?: string;

  pathUrl = "https://localhost:7167"


  ngOnInit() {
    this.serv.GetUser("https://localhost:7167/api/PersonalPage/GetSingle?username=", this.username)
          .subscribe((data) =>{
              this.user = data;
              console.log(this.user.userId)
              console.log(data)
              this.serv.GetUserObservations('https://localhost:7167/api/PersonalPage/GetObservationsById?id=', this.user.userId).subscribe((data: any) =>{
                console.log(data)
                this.dataSourceObservations = data
              })
            },
    )
    // this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }});
    }
  }

  onPatchUser(form: NgForm){
    //api per foto profilo
    if(this.file){
      const formData = new FormData();
      formData.append("UserId", this.store.user.userId)
      formData.append("Image", this.file)
      this.http.post("https://localhost:7167/api/Images/Profile", formData).subscribe((data :any) => {
      this.store.user.profileImgUrl = data.data.profileImgUrl
      });
    }

 // api per informazioni utente
    this.serv.PatchUser("https://localhost:7167/api/PersonalPage/Update", {
      UserId: this.store.user.userId,
      UserName: form.value.userName ? form.value.userName : this.store.user.userName,
      FirstName: form.value.firstName ? form.value.firstName : this.store.user.firstName,
      LastName: form.value.lastName ? form.value.lastName : this.store.user.lastName,
      Email: form.value.email ? form.value.email : this.store.user.email,
      Subscribed: form.value.subscribed ? JSON.parse(form.value.subscribed) : false,
      Password: this.store.user.password,
    }).subscribe((data: any)=>{
      this.store.user = data.data;
      const username = data.data.userName
      localStorage.setItem('username', username)
    })
  }

  onFileSelected(event :any) {

    this.file = event.target.files[0];
    // const fileName = file.name;
    console.log(this.file)

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.file)
}

  modify(){
    this.update?  this.update = false : this.update = true
  }

  isAdminAuthenticated = (): boolean => {
    const admin = localStorage.getItem("admin");
  if (admin){
    return true;
  }
  return false;
  }

  onObservation(form: NgForm){
    //api per evento
    console.log(this.store.user)
    let date = form.value.observationDate._i;
    console.log(form.value.observationDate._i)
    let goodDate:string = this.datepipe.transform(date, 'yyyy-MM-ddTHH:mm:ss')!
    console.log(goodDate)
    this.http.post("https://localhost:7167/api/PersonalPage/CreateObservation", {
      UserId: this.store.user.userId,
      ObservationNote: form.value.observationNote,
      Place: form.value.place,
      ObservationDate: goodDate,
      User: this.store.user
    }).subscribe((data: any)=>{
      console.log(data)
    })
  }

  applyFilterObservations(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSourceObservations.filter)
    this.dataSourceObservations.filter = filterValue.trim().toLowerCase();
  }


  deleteObservation(id: number){
    this.serv.removeObservation("https://localhost:7167/api/PersonalPage/DeleteObservation?id=", id).subscribe((data: any) => {console.log(data)})
  }
}
