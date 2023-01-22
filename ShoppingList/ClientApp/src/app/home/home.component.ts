import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiService } from '../api.service';
import { ColDef, GridOptions, Grid, GridApi, CellValueChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DeleteBtnRenderer } from '../shared/delete-button-renderer.component';
import { ShoppingListItem } from '../models/shopping-list-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public gridOptions: GridOptions = {};
  public api: GridApi;
  public frameworkComponents: any;
  public rowData: ShoppingListItem[] = [];
  public columnDefs: ColDef[] = [];
  public isLoading: boolean = true;

  constructor(private http: HttpClient,
    private apiservice: ApiService,
  ) {
    this.frameworkComponents = { deleteBtnRenderer: DeleteBtnRenderer };
    this.api = new GridApi();
  }

  ngOnInit() {
    this.isLoading = true;
    this.columnDefs = [
      { field: 'description', initialWidth: 550 },
    ];
    this.apiservice.getAllRecords().subscribe((d:any) => {
      console.log(d['data']);
      this.rowData = d['data'];
      this.isLoading = false;
    })
    this.columnDefs.forEach((colDef, index) => { colDef.editable = true; })
    let deleteButton = {
      headerName: "",
      field: "record",
      rowDrag: true,
      resizable: true,
      cellRenderer: 'deleteBtnRenderer',
      cellRendererParams: { clicked: this.onBtnClick.bind(this) },
      maxWidth: 110
    }
    this.columnDefs.unshift(deleteButton);
    this.gridOptions.suppressNoRowsOverlay = false;
    this.gridOptions.suppressScrollOnNewData = true;
    //this.gridOptions.domLayout = 'autoHeight';
  }

  onGridReady(params: any) {
    this.api = params.api;
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    this.isLoading = true;
    this.apiservice.upsertRecord(event.data).subscribe((d: any) => { this.isLoading = false; });
  }

  //Delete Button
  onBtnClick(params: any) {
    this.rowData = this.api.getRenderedNodes().map(x => x.data);
    this.isLoading = true;
    this.apiservice.deleteRecord(params.rowData['id']).subscribe(() => {
      this.rowData.splice(this.rowData.findIndex(i => i.id == params.rowData['id']), 1);
      this.api.setRowData(this.rowData);
      console.log('this line reached');
      this.isLoading = false;
    });
  }

  AddRow() {
    this.rowData = this.api.getRenderedNodes().map(x => x.data);
    this.rowData.unshift({ id: 0, description: '' });
    this.api.setRowData(this.rowData);

  }

}
