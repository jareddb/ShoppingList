import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, Grid, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DeleteBtnRenderer } from '../shared/delete-button-renderer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public gridOptions: GridOptions = {};
  public api: GridApi;
  public frameworkComponents: any;
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public isLoading: boolean = true;

  constructor(private http: HttpClient) {
    this.frameworkComponents = { deleteBtnRenderer: DeleteBtnRenderer };
    this.api = new GridApi();
  }

  ngOnInit() {
    this.columnDefs = [
      { field: 'Description' },
    ];
    this.rowData = [
      { Description: 'Milk' },
      { Description: '' },
      { Description: 'Banan' },
    ]

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
    this.gridOptions.domLayout = 'autoHeight';

  }

  onGridReady(params: any) {
    this.api = params.api;
  }

  onBtnClick(params: any) {
    console.log('Delete Button function');
  }

  AddRow() {
    this.rowData.push({ Description: '' });
    this.api.setRowData(this.rowData);
  }

  DeleteRow() {
    //this.apiService.DeleteItem();
  }

}
