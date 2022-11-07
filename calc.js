
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
    console.log("Warehouse full");
    nailstomake = SteelbarsByK + save.NailsInStorage + nailstomake - getStorageCap();
  }

  save.Nails += nailstomake;
  save.NailsInStorage += nailstomake;
  save.SteelbarsByK = save.SteelbarsByK - nailstomake;
  console.log(nailstomake+" Nails made. Steel left: "+save.SteelbarsByK);
  doSave();
}

function buyGarage(count=1){
  save.StorageGarage += BigInt(count);
  doSave();
}

function buySteelbar(count=1n){
  if(save.Money > save.SteelbarCost * BigInt(count) )  {
    let steelbarsByK = BigInt(count)*1000n; 
    if(getStorageCap() > save.SteelbarsByK + save.NailsInStorage + steelbarsByK) {
      save.SteelbarsByK += steelbarsByK;
      save.Money -= BigInt(count) * save.SteelbarCost;
      console.log('Bought '+count+' Steelbars');
      randomizePrices();
      doSave();
    } else {
      error('Not enough storage capacity.');
    }
  } else {
    error('Not enough money to buy Steelbars!');
  }
}

function randomizePrices(){
  
}