import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiServicce {

  private baseUrl!: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public deleteRecord() {
    return this.http.get(this.baseUrl + 'api/v1/DeleteRecord')
  }

  public addRecord() {
    return this.http.get(this.baseUrl + 'api/v1/AddRecord')
  }

  public getUserRecords() {
    return this.http.get(this.baseUrl + 'api/v1/GetUserRecords')
  }

  public saveAllChanges() {
    return this.http.get(this.baseUrl + 'api/v1/SaveChanges')
  }



}
