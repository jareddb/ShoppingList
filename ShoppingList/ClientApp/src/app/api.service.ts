import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl!: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public deleteRecord() {
    return this.http.get(this.baseUrl + 'app/v1/DeleteRecord')
  }

  public addRecord() {
    return this.http.get(this.baseUrl + 'app/v1/AddRecord')
  }

  public getUserRecords(username: string) {
    return this.http.get(this.baseUrl + 'app/v1/GetUserRecords/{username}')
  }

  public saveAllChanges() {
    return this.http.get(this.baseUrl + 'app/v1/SaveChanges')
  }



}
