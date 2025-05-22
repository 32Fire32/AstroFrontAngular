import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})

export class EditFormComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditFormComponent>, private datepipe: DatePipe, private http: HttpClient, public store: StoreService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any)
    {
      this.element = data.element;
    }

  element:any
  editForm: FormGroup = new FormGroup({});

  file: any;
  imageURL?: string;
  fileName = '';

  ngOnInit(): void {
    console.log('dialog:',this.element)

    this.editForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      place: ['', Validators.required],
      eventId: [this.element.eventId, Validators.required],
      eventDate: ['', Validators.required],
      eventTypeId: ['', Validators.required],

      // Define other form controls with their validators
    }); 
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

  editEvent(){
      console.log('edit form',this.editForm.value)
      let date = this.editForm.value.eventDate;
      console.log(date.toString())
      let goodDate:string = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss')!
      console.log(goodDate)

      const formData = new FormData();
      formData.append("EventId", this.editForm.value.eventId)
      formData.append("EventName", this.editForm.value.eventName)
      formData.append("Description", this.editForm.value.description)
      formData.append("EventDate", goodDate)
      formData.append("Place", this.editForm.value.place)
      formData.append("EventTypeId", this.editForm.value.eventTypeId)
      formData.append("Image", this.file)
      this.http.put("https://localhost:7167/api/Admin/EditEvent", formData).subscribe((data :any) => {
      console.log(data)
    })
    //api per evento
    // this.dialogRef.close(this.editForm?.value);

  }

}
