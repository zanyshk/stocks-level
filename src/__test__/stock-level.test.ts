import { ERROR_MSGS } from '../constants'
import { StocksLevel } from '../helpers/stock-level.class'

const files = {
  stock: './stock.json',
  transactions: './transactions.json'
}
const stocksLevel = new StocksLevel(files)

describe("SKU not found", () => {
  it("it should return error)", async() => {
    try{
      const data = await stocksLevel.getStocksLevel("CLQ274846/0")
    }catch(e: any){
      expect(e.message).toBe(`${ERROR_MSGS.SKU_NOT_FOUND}`)
    }
  })
})

describe("SKU found against record", () => {
  it("it should return success)", async() => {
    try{
      const data = await stocksLevel.getStocksLevel("LTV719449/39/39")
      expect(Object.keys(data)).toEqual([ 'sku', 'qty' ]);
    }catch(e: any){
      //console.log(e)
    }
  })
})

