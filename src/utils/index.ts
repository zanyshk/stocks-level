import fs from 'fs'
import { ERROR_MSGS } from '../constants'
import { Stocks, Transactions } from '../types'

export const filterData = (object: any, key: string, value: string): any => {
  return object.filter(record => {
    return record[key] === value
  })
}

export const processTransactions = (stock: Stocks, trans: Transactions) => {
  let total = 0
  let refund = 0
  trans.forEach(element => {
    if(element.type === 'order')
      total += element.qty
    else
      refund += element.qty
  })

  return{
    sku: stock[0].sku,
    qty: stock[0].stock - (total - refund)
  }
}

export const isFileExists = (path: string) => {
  if (!fs.existsSync(path)) {
    // path not exists
    return false
  } 
  return true
}

export const validateFile = (content: string, name: string)  => {
  try{
    const data = JSON.parse(content)
    if(data.length <= 0){
      throw Error(`${ERROR_MSGS.EMPTY_FILE} ${name}`)
    }
    return true 
  }catch(e: any){
    throw new Error(e.message)
  }
}