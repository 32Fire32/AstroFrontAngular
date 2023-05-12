import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private buttonClickedSource = new Subject<void>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  constructor() { }

  emitButtonClick() {
    this.buttonClickedSource.next();
  }
}
