const formatPrice = (price: number | undefined): string => {
  if (price !== undefined) {
    // Check if the price is less than 1
    if (price < 1) {
      // Return the price without any formatting
      return price.toString()
    } else {
      // Format the price with commas for thousands separators and 2 decimal places, and add $ sign
      return `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    }
  }
  return ''
}

export { formatPrice }
