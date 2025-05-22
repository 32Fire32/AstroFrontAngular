import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface allUsers {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  subscribed: boolean;
  role: string;
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
  selector: 'app-cms-utenti',
  templateUrl: './cms-utenti.component.html',
  styleUrls: ['./cms-utenti.component.scss'],
})
export class CmsUtentiComponent implements OnInit {
  constructor(
    private serv: GetServicesService,
    public store: StoreService,
    private http: HttpClient,
    public datepipe: DatePipe
  ) {}

  displayedColumns: string[] = [
    'userName',
    'First name',
    'Last name',
    'Email',
    'Subscribed',
    'Role',
    'ChangeRole',
    'Delete',
  ];

  dataSource: any;

  allUsers: any;

  thisId: any;

  userName = localStorage.getItem('userName');

  ngOnInit(): void {
    this.serv
      .GetAll('https://localhost:7167/api/Admin/GetList')
      .subscribe((data: any) => {
        this.allUsers = data;
        this.dataSource = new MatTableDataSource(this.allUsers);
        this.allUsers.forEach((element: any) => {
          if (element.userName == this.userName) {
            this.thisId = element.userId;
          }
          console.log('thisId', this.thisId);
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource.filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleRole(userRole: { userId: any; roleId: any; role: any }[]) {
    console.log(userRole[0].roleId);
    console.log(userRole[0].role.name);
    const formData = new FormData();
    let role: any = {
      RoleId: userRole[0].roleId,
      Name: userRole[0].role.name,
    };
    formData.append('UserId', userRole[0].userId);
    formData.append('RoleId', userRole[0].roleId);
    formData.append('Role', role);
    this.serv
      .changeRole('https://localhost:7167/api/Admin/ToggleRole', formData)
      .subscribe((data: any) => {
        console.log(data);
        this.allUsers.forEach((element: any) => {
          if (element.userId == userRole[0].userId) {
            element.roles[0].role.name = data.role.name;
          }
        });
      });
  }

  deleteUser(id: number) {
    this.serv
      .removeUser('https://localhost:7167/api/Admin/DeleteUser?id=', id)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
