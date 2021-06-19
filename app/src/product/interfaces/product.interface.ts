export interface Product {
    id: number;
    name: string;
    brand: string;
    type: string;
    barcode: string;
    status?: 'ACTIVE' | 'INACTIVE';
  }