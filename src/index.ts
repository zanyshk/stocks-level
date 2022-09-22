import { StocksLevel } from './helpers/stock-level.class' 
import { Files } from './types'

const files: Files = {
  stock: './stock.json',
  transactions: './transactions.json'
}

async function main(): Promise<void> {
  const stocksLevel = new StocksLevel(files)
  const data = await stocksLevel.getStocksLevel("CLQ274846/07/46")
  console.log(data)
}

main();
