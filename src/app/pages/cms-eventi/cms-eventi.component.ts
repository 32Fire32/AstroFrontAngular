import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { StoreService } from 'src/app/services/store.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { EditFormComponent } from 'src/app/components/edit-form/edit-form.component';


export interface allEvents {
  eventName: string;
  description: string;
  eventDate: string;
  place: string;
  eventTypeId: boolean;
  edit:any;
  delete: any;
}


@Component({
  selector: 'app-cms-eventi',
  templateUrl: './cms-eventi.component.html',
  styleUrls: ['./cms-eventi.component.scss'],
})
export class CmsEventiComponent implements OnInit{

  constructor(public dialog: MatDialog, private http: HttpClient, private datepipe: DatePipe, public store: StoreService, private serv: GetServicesService){}

  displayedEventsColumns: string[] = ['EventName', 'Description', 'EventDate', 'Place', 'EventTypeId', 'Edit', 'Delete'];

  isEditPanelExpanded = false;

  allEvents:any
  selectedEvent: any;
  file: any;
  imageURL?: string;
  fileName = '';
  dataSourceEvents: any

  ngOnInit(): void {
    this.serv.GetAllEvents("https://localhost:7167/api/Admin/GetListEvents").subscribe((data2: any) => {
        console.log(data2)
        this.allEvents = data2
        this.dataSourceEvents = new MatTableDataSource(this.allEvents);
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

openDialog(element:any) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.data = { element };

  this.dialog.open(EditFormComponent, dialogConfig);

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

  applyFilterEvents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSourceEvents.filter)
    this.dataSourceEvents.filter = filterValue.trim().toLowerCase();
  }

  // toggleEditPanel(event: any) {
  //   this.isEditPanelExpanded = !this.isEditPanelExpanded;
  //   this.selectedEvent = event;
  // }

  deleteEvent(id: number){
    this.serv.removeEvent("https://localhost:7167/api/Admin/DeleteEvent?id=", id).subscribe((data: any) => {console.log(data)})
  }

}
