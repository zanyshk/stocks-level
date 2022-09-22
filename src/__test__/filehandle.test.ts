import { ERROR_MSGS } from '../constants'
import { StocksLevel } from '../helpers/stock-level.class'

const files = {
  stock: './stock.json',
  transactions: './transactions.json'
}
const stocksLevel = new StocksLevel(files)

describe("Test files with Error", () => {
  it("it should return error)", async() => {
    const file = {
      stock: './stock.jso',
      transactions: './transactions.json'
    }
    try{
      const data:any = await stocksLevel.handleFile(file)
    }catch(e: any){
      console.log(e.message)
      expect(e.message).toBe(`${ERROR_MSGS.INVALID_FILE} ${file.stock}`)
    }
   
  })
})

describe("Test files Success", () => {
  it("it should return success)", async() => {
    const file = {
      stock: './stock.json',
      transactions: './transactions.json'
    }
    try{
      const data:any = await stocksLevel.handleFile(file)
      expect(Object.keys(data)).toEqual([ 'stocks', 'transactions' ]);
    }catch(e: any){
      //console.log(e.message)
    }
   
  })
})
