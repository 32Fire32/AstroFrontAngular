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

export interface allEvents {
  eventName: string;
  description: string;
  eventDate: string;
  place: string;
  eventTypeId: boolean;
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
  selector: 'app-associazione',
  templateUrl: './associazione.component.html',
  styleUrls: ['./associazione.component.scss'],
})
export class AssociazioneComponent implements OnInit {
  constructor(private serv: GetServicesService, public store: StoreService, private http: HttpClient, public datepipe: DatePipe){
  }

  displayedColumns: string[] = ['Username', 'First name', 'Last name', 'Email', 'Subscribed', 'Role', 'ChangeRole','Delete'];
  displayedEventsColumns: string[] = ['EventName', 'Description', 'EventDate', 'Place', 'EventTypeId', 'Delete'];

  dataSource: any
  dataSourceEvents: any

  allUsers: any;

  fileName = '';

  file: any;

  imageURL?: string;

  allEvents:any

  thisId: any

  username = localStorage.getItem("username")


  ngOnInit(): void {
    this.serv.GetAll("https://localhost:7167/api/Admin/GetList").subscribe((data: any) => {
      this.allUsers = data;
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.allUsers.forEach((element: any) => {
        if(element.userName == this.username){
          this.thisId = element.userId
        }
        console.log('thisId', this.thisId)
      });
    });

      this.serv.GetAllEvents("https://localhost:7167/api/Admin/GetListEvents").subscribe((data2: any) => {
        console.log(data2)
        this.allEvents = data2
        this.dataSourceEvents = new MatTableDataSource(this.allEvents);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource.filter)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEvents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSourceEvents.filter)
    this.dataSourceEvents.filter = filterValue.trim().toLowerCase();
  }

  toggleRole(userRole: { userId: any, roleId: any, role: any }[]){
    console.log(userRole[0].roleId)
    console.log(userRole[0].role.name)
    const formData = new FormData();
    let role: any = {
      RoleId: userRole[0].roleId,
      Name: userRole[0].role.name,
    }
    formData.append("UserId", userRole[0].userId);
    formData.append("RoleId", userRole[0].roleId);
    formData.append("Role", role);
    this.serv.changeRole("https://localhost:7167/api/Admin/ToggleRole", formData).subscribe((data: any) => {
      console.log(data)
      this.allUsers.forEach((element: any) => {
        if(element.userId == userRole[0].userId){
          element.roles[0].role.name = data.role.name
        }
      });
    })
  }


  deleteUser(id: number){
    this.serv.removeUser("https://localhost:7167/api/Admin/DeleteUser?id=", id).subscribe((data: any) => {console.log(data)})
  }

  deleteEvent(id: number){
    this.serv.removeEvent("https://localhost:7167/api/Admin/DeleteEvent?id=", id).subscribe((data: any) => {console.log(data)})
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
  let date = form.value.eventDate;
  console.log(date.toString())
  let goodDate:string = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss')!
  console.log(goodDate)

    const formData = new FormData();
    formData.append("EventName", form.value.eventName)
    formData.append("Description", form.value.description)
    formData.append("EventDate", goodDate)
    formData.append("Place", form.value.place)
    formData.append("EventTypeId", form.value.eventTypeId)
    formData.append("Image", this.file)
    this.http.post("https://localhost:7167/api/Admin/CreateEvent", formData).subscribe((data :any) => {
    console.log(data)
  })
}
}

