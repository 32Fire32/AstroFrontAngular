import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-personale',
  templateUrl: './pagina-personale.component.html',
  styleUrls: ['./pagina-personale.component.scss']
})
export class PaginaPersonaleComponent implements OnInit {

  paginaPersonale: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://localhost:7167/api/pagina-personale")
    .subscribe({
      next: (result: any) => this.paginaPersonale = result, // <-- qui c'è il token che non possiamo vedere. E' inserito da auth-jwt
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

}
