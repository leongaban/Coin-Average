/**
 * Converts a numerica value into a financial price string.
 * Example input: 1234.56
 * Output: "$1,234.56"
 */
const formatPrice = (price: number | undefined): string => {
  if (price !== undefined) {
    if (price < 1) {
      return price.toString()
    } else {
      return `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    }
  }
  return ''
}

/**
 * Converts a formatted price string back into a numeric value.
 * Example input: "$1,234.56"
 * Output: 1234.56
 */
function parsePrice(formattedPrice: string) {
  const numericString = formattedPrice.replace(/[^0-9.-]+/g, '')
  const price = parseFloat(numericString)

  return isNaN(price) ? 0 : price
}

export { formatPrice, parsePrice }
