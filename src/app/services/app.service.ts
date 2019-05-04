import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Injectable()
export class AppService {
private headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(private http: HttpClient) { }

 public getAllCountries(): Observable<any> {
    const url = 'https://restcountries.eu/rest/v2/all';
    return this.http.get(url);
  }
}