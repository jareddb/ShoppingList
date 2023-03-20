
export class ShoppingListItem {
  id: number = 0;
  description: string = '';

}

export class GridParams {
  api!: Object;
}

export class DeleteParams {
  rowData!: ShoppingListItem;
}

export class BackendPayload {
  data: any;
}
