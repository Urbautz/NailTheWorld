function makeNail(count=0n) {
  // Check Capacity
  let nailstomake = BigInt(count);
  if (getStorageCap() < save.SteelbarsByK + save.NailsInStorage + nailstomake ) {
    console.log("Warehouse full");
    nailstomake = SteelbarsByK + save.NailsInStorage + nailstomake -getStorageCap();
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