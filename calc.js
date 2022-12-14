function getStorageCap() {
    let cap = 0n;
    cap += save.StorageGarage * Storage.Garage.Capacity;
    cap += save.StorageWarehouseSmall * Storage.WarehouseSmall.Capacity;
    cap += save.StorageWarehouseMedium * Storage.WarehouseMedium.Capacity;
    return cap;
}

function makeNail(count = 0n, power = false) {
    // Check Capacity
    let nailstomake = BigInt(count);
    if (getStorageCap() < save.SteelbarsByK + save.NailsInStorage + nailstomake) {
        error("Warehouse is full");
    }
    if (save.SteelbarsByK < nailstomake) return error("Not enough steel!");
    else {
        if (power) {
            if (!consumePower(nailstomake * probs.PowerConAutoPress)) {
                return;
            }
        }
        save.Nails += nailstomake;
        save.NailsInStorage += nailstomake;
        save.SteelbarsByK = save.SteelbarsByK - nailstomake;
        console.log(nailstomake + " Nails made. Steel left: " + save.SteelbarsByK);
    }

}

function buyGarage() {
    if (save.Money < Storage.Garage.Cost) {
        error('Not enough Money!');
        return;
    }
    save.Money -= Storage.Garage.Cost;
    save.StorageGarage++;
    console.log('Bouoght Garage');
}

function buySteelbar(count = 1n) {
    if (save.Money > save.SteelbarCost * BigInt(count)) {
        let steelbarsByK = BigInt(count) * 1000n;
        if (getStorageCap() > save.SteelbarsByK + save.NailsInStorage + steelbarsByK) {
            save.SteelbarsByK += steelbarsByK;
            save.Money -= BigInt(count) * save.SteelbarCost;
            console.log('Bought ' + count + ' Steelbars');
            randomizePrices();

        } else {
            error('Not enough storage capacity.');
        }
    } else {
        error('Not enough money to buy Steelbars!');
    }
}

function randomizePrices() {
    // steelbar
    if (BinaryRandom(probs.PriceChangeProb)) {
        let change = 0;
        console.log('Steelbar price changes happening');
        // SteelbarCost
        if (BinaryRandom(probs.PriceIncreaseChance)) {

            save.SteelbarCost += save.SteelbarCost / BigInt(getRandom(40, 160));
            console.log('Price increased ' + save.SteelbarCost);
        } else {
            save.SteelbarCost -= save.SteelbarCost / BigInt(getRandom(40, 160));
            console.log('Price decreased ' + save.SteelbarCost);
        }
    } else {
        console.log('No Price Change!');
    }

    //Power
    if (BinaryRandom(probs.PriceChangeProb)) {
        let change = 0;
        console.log('Power price changes happening');
        // SteelbarCost
        if (BinaryRandom(probs.PriceIncreaseChance)) {

            save.PowerCost += save.PowerCost / BigInt(getRandom(40, 160));
            console.log('Price increased ' + save.PowerCost);
        } else {
            save.PowerCost -= save.PowerCost / BigInt(getRandom(40, 160));
            console.log('Price decreased ' + save.PowerCost);
        }
    } else {
        console.log('No Price Change!');
    }
}

function changeNailPrice(value) {
    if (save.Price + BigInt(value) > 0n) {
        save.Price += BigInt(value);
        console.log("Changed Price to " + save.Price + ' by ' + value);
    } else {
        error('You cannot sell below ' + formatBigint(formatBigInt, 0, settings.Currency));
    }
    updateView();
}

function updateDemand(changeby = 0n, refactor = true) {
    let d_old = save.Demand;
    save.Demand += BigInt(changeby);
    let pricedeviation = (probs.BaseSalesprice - save.Price) * 100n / probs.BaseSalesprice;
    if (refactor) {
        save.Demand += save.Demand * pricedeviation / 100n;
        if (pricedeviation < 1) pricedeviation = 1;
        save.Demand += save.SalesReps * BigInt(pricedeviation) * BigInt(getRandom(5, 200));
    }

    console.log('Demand changed from ' + d_old + ' to ' + save.Demand);
}

function SellNails(count = 100n) {
    if (save.Demand < count) {
        return error('Not enough demand!');
    }
    if (save.NailsInStorage < count) {
        return error('Not enough nails!');
    }
    save.NailsInStorage -= count;
    save.Money += count * save.Price;
    console.log('Sold ' + count + 'Nails for ' + (count * save.Price));
    updateDemand(-1n * count, false);
    updateView();
}

function buyAutoPress(count = 1n, price = null) {
    if (price == null) price = save.AutoPressPrice;
    if (count != 1n) {
        for (let i = 0n; i < count; i++) {
            buyAutoPress(1n, price);
        }
    } else {
        //make one press
        if (save.Money < price) {
            error("Not enough Money.");
            return;
        }
        save.Money -= price;
        save.AutoPress++;
        save.AutoPressPrice = price * probs.AutoPressPriceFactor / 100n;
        console.log('Bought Autopress, price changed to ' + AutoPressPrice);
        updateView();
    }

}

function getSalesRepCost() {
    let ret = (save.SalesReps ** (probs.SalesRepHireCostFactor / 100n)) * probs.SalesRepHireBaseCost + probs.SalesRepHireBaseCost;
    return ret;
}

function hireSalesRep(count = 1n, cost = getSalesRepCost()) {
    if (count > 1n) {
        for (let i = 0; i < count; i++) {
            hireSalesRep(1n, cost);
        }
    }
    if (save.Money < cost) {
        error('Not enough Money!');
        return;
    }
    save.Money -= cost;
    save.SalesReps++;
    save.SalesRepsActive = save.SalesReps;
	console.log('Salesrep hired');
}

function fireSalesRep(count = 1n) {
    if (save.SalesReps >= count) {
        save.SalesReps -= count;
        console.log('Salesrep fired');
    } else console.log("Not enough Sales-Reps to fire");
    save.SalesRepsActive = save.SalesReps;
}

function paySalesReps() {
    let wage = save.SalesReps * probs.SalesRepTickCost;
    if (wage > save.Money) {
        error('Cannot pay Sales Reps. They went on strike!');
        save.SalesRepsActive = 0;
        return;
    }
    save.Money -= wage;
    save.SalesRepsActive = save.SalesReps;
}


function consumePower(power = 0n) {
    if (save.PowerStored > power) {
        save.PowerStored -= power;
        save.PowerConsumed += power;
        console.log('Consumed Power from Storage:' + power)
        return true;
    }
    let ptp = power - save.PowerStored;
    console.log('Reserved all Power from Storage:' + save.PowerStored)
    if (save.Money > ptp * save.PowerCost / 1000n) {
        save.Money -= ptp * save.PowerCost / 1000n;
        console.log('Bought power for Money: ' + ptp);
        save.PowerStored = 0n;
        save.PowerConsumed += power;
        return true;
    }
    console.log('Not enough Money to buy power.');
    return false;
}

function makePower() {
    let solar = save.Solar * probs.SolarProduction;
    solar = solar * time[save.Time].SolarOut / 100n;
    solar = solar * weather[save.Weather].SolarOut / 100n;
    let windmill = save.WindMill * probs.WindMillProduction;
    windmill = windmill * weather[save.Weather].WindOut / 100n;
    save.PowerProduced = solar + windmill;
    console.log('Procued Power: ' + solar + ' Solar and ' + windmill + ' Wind');
    save.PowerStored += save.PowerProduced;
}

function clearPowerStorage() {
    if (save.PowerStored < save.PowerStoreCap) return;
    save.PowerStored = save.PowerStoreCap;
    console.log('Set PowerStored to max Capacity');
}

function buySolar(count = 1n) {
    if (save.Money < count * probs.SolarCost) return;
    save.Money -= count * probs.SolarCost;
    save.Solar += count;
    console.log('Bought solar');
}

function buyWindMill(count = 1n) {
    if (save.Money < count * probs.WindMillCost) return;
    save.Money -= count * probs.WindMillCost;
    save.WindMill += count;
    console.log('Bought Windmill');
}

function buyBattery(count = 1n) {
    if (save.Money < count * probs.BatteryCost) return;
    save.Money -= count * probs.BatteryCost;
    save.PowerStoreCap += count*100n;
    console.log('Bought Battery');
}

function updateWeather() {
    if (BinaryRandom(probs.WeatherChangeProb)) {
        save.Weather = getRandom(0, weather.length - 1);
        console.log('Weather is now: ' + weather[save.Weather].Name);
    }
    if (save.Time >= (time.length - 1)) save.Time = 0;
    else save.Time++;
    console.log('Time is now: ' + time[save.Time].Name);
    return;
}