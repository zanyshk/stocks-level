import { filterData, processTransactions, validateFile } from '../utils'
import FileHandler from './file-handler.class'
import { Files, GenericObjects, Stocks, Transactions } from '../types'
import { ERROR_MSGS } from '../constants'

export class StocksLevel {
  private file : Files
  constructor(files: Files){
    this.file = files
  }
  
  private filterSku(stocks: Stocks, transactions: Transactions, sku: string): GenericObjects{
    const filterStock = filterData(stocks, 'sku', sku)  
    if (filterStock.length > 0) {
      const filterTransactions = filterData(transactions, 'sku', sku)
      return processTransactions(filterStock, filterTransactions)
    } else {
      return{
        status: false,
        message: ERROR_MSGS.SKU_NOT_FOUND
      }
    }
  }

  public async handleFile(file){
    const allPromise = Promise.all([
      await FileHandler.read(file.stock),  
      await FileHandler.read(file.transactions)
    ]);

    const files = await allPromise
    return{
      stocks: files[0],
      transactions: files[1]
    }
  }

  public async getStocksLevel(sku: string): Promise<any>{
    try{
      const handle: any = await this.handleFile(this.file)
      if(validateFile(handle.stocks, this.file.stock) && validateFile(handle.transactions, this.file.transactions))
        return this.filterSku(JSON.parse(handle.stocks), JSON.parse(handle.transactions), sku)
    }catch(e: any){
      return{
        status: false,
        message: e.message
      }
    }
  }
}
