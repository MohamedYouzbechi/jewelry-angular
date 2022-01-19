import { ProductModelServer } from './product.model';

export interface CartModelPublic {
  total: number;
  prodData: [
    {
      id: number,
      incart: number
    }
  ];
}

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductModelServer,
    numInCart: number
  }];
}
