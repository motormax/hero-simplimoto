const registrationPrice = 3800;

class PurchaseCalculator {

    constructor(motorcyclePrice, accessoriesPrice) {
        this.motorcyclePrice = motorcyclePrice;
        this.accessoriesPrice = accessoriesPrice;
    }

    totalAmount = () => {
        return this.motorcyclePrice + this.accessoriesPrice + registrationPrice;
    }
}

export default PurchaseCalculator;
