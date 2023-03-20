import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BackendPayload, ShoppingListItem } from './models/shopping-list-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl!: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public deleteRecord (id: number): any {
    return this.http.delete(this.baseUrl + 'shoppinglist/v1/DeleteRecord/' + id.toString())
  }

  public upsertRecord(item: ShoppingListItem): any {
    return this.http.post(this.baseUrl + 'shoppinglist/v1/UpsertRecord', item)
  }

  public getAllRecords(): any {
    return this.http.get(this.baseUrl + 'shoppinglist/v1/GetAllRecords')
  }

}
