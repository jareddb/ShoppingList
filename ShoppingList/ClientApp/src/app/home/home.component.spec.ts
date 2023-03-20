import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Home Component', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, AgGridModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: 'BASE_URL', useValue: 'https://localhost:44498/' }]
    });
    fixture = TestBed.createComponent(HomeComponent);
  });

  it('Should correctly load and configure the columns', () => {
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    expect(fixture.componentInstance.columnDefs.length).toEqual(2);
    expect(fixture.componentInstance.columnDefs[0].resizable).toEqual(true);
    expect(fixture.componentInstance.columnDefs[1].editable).toEqual(true);
  });

  it('Should add a new row when addRow() is called', () => {
    const count = fixture.componentInstance.rowData.length;
    fixture.componentInstance.addRow();
    expect(fixture.componentInstance.rowData.length).toBeGreaterThan(count);
  });


});

