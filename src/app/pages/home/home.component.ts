import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });
  userName: any;
  notLoggedIn = 'Utente Sconosciuto';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }

  ngAfterContentChecked(): void {
    this.userName = localStorage.getItem('userName');
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogElementsExampleDialog {}
