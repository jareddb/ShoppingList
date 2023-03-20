import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-renderer',
  template: `
    <button type="button" class="btn btn-outline-danger btn-sm" style="margin-bottom:5px; padding-top:1px; padding-bottom:4px;" (click)="onClick($event)">x</button>
  `
})

export class DeleteBtnRenderer implements ICellRendererAngularComp {
  private params: any;

  refresh(params?: unknown): boolean {
    this.params = params;
    return true;
  }

  agInit(params: unknown): void {
    this.params = params;
  }

  btnClickedHandler (): void {
    this.params.clicked(this.params.value);
  }

  onClick ($event: unknown): void {
    if (this.params.clicked instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.clicked(params);
    }
  }

}
