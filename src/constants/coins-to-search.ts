export interface Coin {
  id: string
  name: string
  symbol: string
  price?: number
  total?: number
}

const coins_to_search = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
  },
  {
    id: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    symbol: 'bch',
  },
  {
    id: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'wbtc',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
  },
  {
    id: 'binance',
    name: 'Binance',
    symbol: 'bnb',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'xrp',
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'doge',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ada',
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    symbol: 'shib',
  },
  {
    id: 'tron',
    name: 'Tron',
    symbol: 'trx',
  },
  {
    id: 'chainlink',
    name: 'Chianlink',
    symbol: 'link',
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'ltc',
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    symbol: 'uni',
  },
  {
    id: 'pepe',
    name: 'Pepe',
    symbol: 'pepe',
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'dot',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'matic',
  },
  {
    id: 'near',
    name: 'Near',
    symbol: 'near',
  },
  {
    id: 'render',
    name: 'Render',
    symbol: 'rndr',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    symbol: 'op',
  },
  {
    id: 'dogwifhat-base',
    name: 'DogWifHat',
    symbol: 'wif',
  },
  {
    id: 'sui',
    name: 'Sui',
    symbol: 'sui',
  },
  {
    id: 'monero',
    name: 'Monero',
    symbol: 'xmr',
  },
  {
    id: 'bonk',
    name: 'Bonk',
    symbol: 'bonk',
  },
]

export default coins_to_search
