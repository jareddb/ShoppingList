import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'btn-renderer',
  template: `
    <button type="button" class="btn btn-outline-secondary btn-sm" (click)="onClick($event)">+</button>
  `
})

export class AddBtnRenderer implements ICellRendererAngularComp {
  private params: any;


  refresh(params ?: any): boolean {
    return true;
  }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }

  onClick($event: any) {
    if (this.params.clicked instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.clicked(params);
    }
  }

}
