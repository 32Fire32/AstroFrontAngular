import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetServicesService {
  objects: any = [];

  constructor(private http: HttpClient) {}

  GetObjects() {
    return this.http.get('https://localhost:7167/api/CelestialObject/GetList/');
  }

  GetUser(url: string, userName: string) {
    return this.http.get(`${url}${userName}`);
  }

  GetAll(url: string) {
    return this.http.get(url);
  }

  GetSingle(url: string, id: string) {
    return this.http.get(`${url}${id}`);
  }

  PatchUser(url: string, body: {}) {
    return this.http.put(url, body);
  }

  EditPref(url: string, body: {}) {
    return this.http.put(url, body);
  }

  GetAllUsers(url: string) {
    return this.http.get(url);
  }

  removeUser(url: string, id: number) {
    return this.http.delete(`${url}${id}`);
  }

  modifyEvent(url: string, body: {}) {
    return this.http.put(url, body);
  }

  removeEvent(url: string, id: number) {
    return this.http.delete(`${url}${id}`);
  }

  GetUserObservations(url: string, id: string) {
    return this.http.get(`${url}${id}`);
  }

  GetAllObservations(url: string) {
    return this.http.get(url);
  }

  removeObservation(url: string, id: number) {
    return this.http.delete(`${url}${id}`);
  }

  GetAllEvents(url: string) {
    return this.http.get(url);
  }

  changeRole(url: string, body: {}) {
    return this.http.post(url, body);
  }
}
