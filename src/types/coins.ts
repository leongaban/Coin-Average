export interface Coin {
  id: string
  name: string
  symbol: string
  price?: number
  total?: number
  coinRows?: CoinRow[]
  avgPrice?: number
}

export interface CoinRow {
  id: string
  date: string
  amount: number
  price: number
  total: number
}
