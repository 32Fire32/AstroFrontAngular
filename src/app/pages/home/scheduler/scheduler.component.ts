import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { GetServicesService } from 'src/app/services/get-services.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  constructor(private serv: GetServicesService) {}
  loadedData = false;
  dateClass: any;
  datesToCheck: any = [];
  events: any;
  event: any;
  pathUrl = 'https://localhost:7167';

  datesToIterate: any = [];
  lastEvent: any = { types: [] };
  nextEvent: any = { types: [] };
  lastDate: any;
  nextDate: any;
  currentDate: any;
  noEvents: any;
  previousDates: any = [];

  ngOnInit() {
    this.serv
      .GetAllEvents('https://localhost:7167/api/Admin/GetListEvents')
      .subscribe((data: any) => {
        if (!data || data.length === 0) {
          this.loadedData = true; // Evita il caricamento infinito
          return;
        }

        this.events = data;
        console.log('Tutti gli eventi ricevuti:', this.events); // 👀 Controlla cosa ricevi

        this.events.forEach((element: any) => {
          this.datesToIterate.push(element.eventDate.slice(0, 10));
        });

        this.currentDate = new Date();

        this.datesToIterate.forEach((element: any) => {
          if (new Date(element) < new Date(this.currentDate)) {
            this.previousDates.push(element);
          }
        });
        console.log('Date degli eventi:', this.datesToIterate); // 👀 Debug date

        this.events.forEach((element: any) => {
          this.lastDate = this.previousDates[this.previousDates.length - 1];
          if (element.eventDate.slice(0, 10) == this.lastDate) {
            this.lastEvent = element;
          }
        });
        console.log('Ultima data:', this.lastDate); // 👀 Debug
        console.log('Ultimo evento trovato:', this.lastEvent);

        this.nextDate = this.datesToIterate.find(
          (date: any) => new Date(date) > this.currentDate
        );
        console.log('Prossima data:', this.nextDate);

        this.events.forEach((element: any) => {
          if (element.eventDate.slice(0, 10) == this.nextDate) {
            this.nextEvent = element;
          }
        });
        console.log('Prossimo evento trovato:', this.nextEvent);

        this.loadedData = true;
      });
  }

  onDateSelected(event: any) {
    const newDate = new Date(event);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const dateInCalendar = `${year}-${month}-${day}`;

    this.events.map((element: any) => {
      if (element.eventDate.slice(0, 10) == dateInCalendar) {
        this.event = element;
      }
    });
  }

  updateDateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const datesToCheck = this.events.map((element: any) =>
        element.eventDate.slice(0, 10)
      );

      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');
      const dateInCalendar = `${year}-${month}-${day}`;

      return datesToCheck.find((element: any) => element === dateInCalendar)
        ? 'has-event'
        : '';
    };
  }
}
