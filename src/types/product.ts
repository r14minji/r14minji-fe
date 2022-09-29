export type Product = {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
};

export type LoninInfo = {
  id: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
};
export type IloginPost = {
  data: {
    accessToken: string;
    user: User;
  };
};

export type IloginGet = {
  data: {
    user: User;
  };
};

export type IProductsGet = {
  data: {
    products: Product[];
    totalCount: number;
  };
};

export type IProducts_ProductId_Get = {
  data: {
    product: Product;
  };
};
