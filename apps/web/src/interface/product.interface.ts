export interface IProducts {
  id: number;
  name: string;
  description: string;
  price: number;
  brands?: IBrands;
}

export interface IBrands {
  id: number;
  name: string | null;
}
