class PurchaseCalculator {
  constructor(motorcyclePrice, accessoriesPrice, registrationPrice) {
    this.motorcyclePrice = motorcyclePrice;
    this.accessoriesPrice = accessoriesPrice;
    this.registrationPrice = registrationPrice;
  }

    totalAmount = () => this.motorcyclePrice + this.accessoriesPrice + this.registrationPrice
}

export default PurchaseCalculator;
