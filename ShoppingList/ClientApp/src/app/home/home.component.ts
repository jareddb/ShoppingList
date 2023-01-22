import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { ColDef, GridOptions, Grid, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DeleteBtnRenderer } from '../shared/delete-button-renderer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild('myModal', { static: true }) myModal: ElementRef = {} as ElementRef;

  public gridOptions: GridOptions = {};
  public api: GridApi;
  public frameworkComponents: any;
  public rowData: any[] = [];
  public columnDefs: ColDef[] = [];
  public isLoading: boolean = true;
  public username: string = '';

  constructor(private http: HttpClient,
    private apiservice: ApiService,
    private modalService: NgbModal,
  ) {
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

    this.apiservice.getUserRecords('Jared Brinton').subscribe(d => { console.log(d); })

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

    this.modalService.open(this.myModal).result.then(() => this.username = this.userInput.nativeElement.value);
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

  SaveUser(username: string) {
    this.username = this.userInput.nativeElement.value;
  }


  DeleteRow() {
    //this.apiService.DeleteItem();
  }

}
