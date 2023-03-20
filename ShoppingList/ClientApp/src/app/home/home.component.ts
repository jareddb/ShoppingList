import { type CellValueChangedEvent, type ColDef, GridApi, type GridOptions } from 'ag-grid-community';
import { Component, type OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DeleteBtnRenderer } from '../shared/delete-button-renderer.component';
import type { BackendPayload, DeleteParams, GridParams, ShoppingListItem } from '../models/shopping-list-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public gridOptions: GridOptions = {};
  public api: GridApi;
  public frameworkComponents: unknown;
  public rowData: ShoppingListItem[] = [];
  public columnDefs: ColDef[] = [];
  public isLoading: boolean = true;

  constructor (private readonly apiservice: ApiService) {
    this.frameworkComponents = { deleteBtnRenderer: DeleteBtnRenderer };
    this.api = new GridApi();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.columnDefs = [{ field: 'description', initialWidth: 550 },];
    this.apiservice.getAllRecords().subscribe((d: BackendPayload) => {
      this.rowData = d.data as ShoppingListItem[];
      this.isLoading = false;
    })
    this.columnDefs.forEach((colDef, index) => { colDef.editable = true; })
    const deleteButton = {
      headerName: '',
      field: 'record',
      rowDrag: true,
      resizable: true,
      cellRenderer: 'deleteBtnRenderer',
      cellRendererParams: { clicked: this.deleteRow.bind(this) },
      maxWidth: 110
    }
    this.columnDefs.unshift(deleteButton);
    this.gridOptions.suppressScrollOnNewData = true;
  }

  onGridReady(params: GridParams): void {
    this.api = params.api as GridApi;
  }

  onCellValueChanged (event: CellValueChangedEvent): void {
    this.isLoading = true;
    const index: number = Number(event.rowIndex);
    this.rowData = this.api.getRenderedNodes().map(x => x.data) as ShoppingListItem[];
    this.apiservice.upsertRecord(event.data).subscribe((d: BackendPayload) => {
      this.rowData[index] = d.data as ShoppingListItem;
      this.isLoading = false;
    });
  }

  deleteRow(params: DeleteParams): void {
    this.rowData = this.api.getRenderedNodes().map(x => x.data);
    this.isLoading = true;
    this.apiservice.deleteRecord(params.rowData.id).subscribe(() => {
      this.rowData.splice(this.rowData.findIndex(i => i.id === params.rowData.id), 1);
      this.isLoading = false;
    });
  }

  addRow (): void {
    try { this.rowData = this.api.getRenderedNodes().map(x => x.data);
    } catch { this.rowData = [] }
    this.rowData.unshift({ id: 0, description: '' });
  }

}
