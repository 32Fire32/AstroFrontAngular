import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'

export interface allUsers {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  subscribed: boolean;
  role: string;
  delete: any;
}

@Component({
  selector: 'app-associazione',
  templateUrl: './associazione.component.html',
  styleUrls: ['./associazione.component.scss']
})
export class AssociazioneComponent implements OnInit {
  constructor(private serv: GetServicesService, public store: StoreService, private http: HttpClient, public datepipe: DatePipe){}

  displayedColumns: string[] = ['Username', 'First name', 'Last name', 'Email', 'Subscribed', 'Role', 'Delete'];

  dataSource: any

  allUsers: any;

  fileName = '';

  file: any;

  imageURL?: string;


  ngOnInit(): void {
    this.serv.GetAll("https://localhost:7167/api/Admin/GetList").subscribe((data: any) => {
      console.log(data);
      this.allUsers = data;
      this.dataSource = new MatTableDataSource(this.allUsers);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource.filter)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: number){
    this.serv.removeUser("https://localhost:7167/api/Admin/DeleteUser?id=", id).subscribe((data: any) => {console.log(data)})
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

onEvent(form: NgForm){
  //api per evento
  let date = form.value.date;
  console.log(form.value.eventDate);
  let goodDate:string = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss')!
  console.log(goodDate);


    // const formData = new FormData();
    // formData.append("EventName", form.value.eventName)
    // formData.append("Description", form.value.description)
    // formData.append("EventDate", goodDate)
    // formData.append("Place", form.value.place)
    // formData.append("EventTypeId", form.value.eventTypeId)
    // formData.append("Image", this.file)
    // this.http.post("https://localhost:7167/api/Admin/CreateEvent", formData).subscribe((data :any) => {
    // console.log(data)
  // })
}
}

