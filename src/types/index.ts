export type Files = { 
  stock: string; 
  transactions: string 
}

export type GenericObjects = {
  [key: string]: string | number | boolean 
}

export type Stocks = Array<{ 
  sku: string, 
  stock: number 
}>

export type Transactions = Array<{ 
  sku: string, 
  type: string,
  qty: number 
}>