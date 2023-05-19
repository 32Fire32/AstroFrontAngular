import { Component } from '@angular/core';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  onDateSelected(event: any) {
    const selectedDate = event.value;
    console.log('Selected date:', selectedDate);
    // You can perform any desired actions with the selected date
  }
}
