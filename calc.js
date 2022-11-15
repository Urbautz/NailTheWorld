
function getStorageCap() {
  let cap = 0n;
  cap += save.StorageGarage * Storage.Garage.Capacity;
  cap += save.StorageWarehouseSmall * Storage.WarehouseSmall.Capacity;
  cap += save.StorageWarehouseMedium * Storage.WarehouseMedium.Capacity;
  return cap;
}

function makeNail(count=0n) {
  // Check Capacity
  let nailstomake = BigInt(count);
  if (getStorageCap() < save.SteelbarsByK + save.NailsInStorage + nailstomake ) {
    error("Warehouse is full");
    nailstomake = SteelbarsByK + save.NailsInStorage + nailstomake - getStorageCap();
  }
  if(save.SteelbarsByK >= nailstomake )
  {
    save.Nails += nailstomake;
    save.NailsInStorage += nailstomake;
    save.SteelbarsByK = save.SteelbarsByK - nailstomake;
    console.log(nailstomake+" Nails made. Steel left: "+save.SteelbarsByK);
  } else {
    error("Not enough steel!");
  }
  
}

function buyGarage(count=1){
  save.StorageGarage += BigInt(count);
  updateView();
}

function buySteelbar(count=1n){
  if(save.Money > save.SteelbarCost * BigInt(count) )  {
    let steelbarsByK = BigInt(count)*1000n; 
    if(getStorageCap() > save.SteelbarsByK + save.NailsInStorage + steelbarsByK) {
      save.SteelbarsByK += steelbarsByK;
      save.Money -= BigInt(count) * save.SteelbarCost;
      console.log('Bought '+count+' Steelbars');
      randomizePrices();

    } else {
      error('Not enough storage capacity.');
    }
  } else {
    error('Not enough money to buy Steelbars!');
  }
}

function randomizePrices(){
   if(BinaryRandom(probs.PriceChangeProb)){
     let change = 0;
     console.log('Price changes happening');
     // SteelbarCost
     if(BinaryRandom(probs.PriceIncreaseChance)) {

       save.SteelbarCost += save.SteelbarCost / BigInt(getRandom(40,160));
       console.log('Price increased ' + save.SteelbarCost );
     } else {
       save.SteelbarCost -= save.SteelbarCost / BigInt(getRandom(40,160));
       console.log('Price decreased ' + save.SteelbarCost);
     }
   } else {
     console.log('No Price Change!');
   }
}

function changeNailPrice(value) {
  if(save.Price + BigInt(value) > 0n) {
    save.Price += BigInt(value);
    console.log("Changed Price to "+save.Price+' by '+value);
  } else {
    error('You cannot sell below ' + formatBigint(formatBigInt,0,settings.Currency) );
  }
  updateDemand(0n, false);
  updateView();
}

function updateDemand(changeby=0n, refactor=true){
  let d_old = save.Demand;
  save.Demand += BigInt(changeby);
  let pricedeviation = (probs.BaseSalesprice - save.Price) *100n / probs.BaseSalesprice;
  if(refactor) { 
      save.Demand += save.Demand * pricedeviation / 100n;
  }
  console.log('Demand changed from '+d_old+' to '+save.Demand);
}

function SellNails(count=100n){
  if (save.Demand < count) {
    return error('Not enough demand!');
  }
  if(save.NailsInStorage < count) {
    return error('Not enough nails!');
  }
  save.NailsInStorage -= count;
  save.Money += count * save.Price;
  console.log('Sold '+count+'Nails for '+ (count * save.Price));
  updateDemand(-100n,true)
  updateView();
}

function  buyAutoPress(count=1n,price=null) {
  if(price==null) 
    price = save.AutoPressPrice;
  if(count != 1n) { 
      for (let i=0n;i<count;i++){
        buyAutoPress(1n,price);
      }
  } else {
    //make one press
    if(save.Money < price) {
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