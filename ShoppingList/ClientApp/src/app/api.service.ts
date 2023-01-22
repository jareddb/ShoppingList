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

  public deleteRecord(id: any ) {
    return this.http.delete(this.baseUrl + 'app/v1/DeleteRecord/' + id)
  }

  public addRecord() {
    return this.http.get(this.baseUrl + 'app/v1/AddRecord')
  }

  public upsertRecord(item:any) {
    return this.http.post(this.baseUrl + 'app/v1/UpsertRecord', item)
  }

  public getAllRecords() {
    return this.http.get(this.baseUrl + 'app/v1/GetAllRecords')
  }

  public saveAllChanges() {
    return this.http.get(this.baseUrl + 'app/v1/SaveChanges')
  }



}
