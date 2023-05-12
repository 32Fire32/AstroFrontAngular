import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-personale',
  templateUrl: './pagina-personale.component.html',
  styleUrls: ['./pagina-personale.component.scss']
})
export class PaginaPersonaleComponent implements OnInit {
  [x: string]: any;

  constructor(private serv: GetServicesService, public store: StoreService, private uploadService:FileUploadService, private http:HttpClient, private router: Router) { }

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
    this.store.getUser(this.username, this.isAdmin, this.admin)
  }

  onPatchUser(form: NgForm){
    //api per foto profilo
      console.log('prima')
      console.log(this.store.user.profileImgUrl)
    if(this.file){
      const formData = new FormData();
      formData.append("UserId", this.store.user.userId)
      formData.append("Image", this.file)
      this.http.post("https://localhost:7167/api/Images/Profile", formData).subscribe((data :any) => {
      console.log(data.data.profileImgUrl)
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
      console.log(data.data.userName)
      this.store.user = data.data;
      const username = data.data.userName
      localStorage.setItem('username', username)
    })

    //reload page
    // const currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });
    // window.location.reload();
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
}
