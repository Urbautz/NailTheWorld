function formatBigInt(value,cutby=0) {
  if(cutby == 0) 
    return value.toString();
  else {
    let ret = value.toString();
    if(ret.length > cutby) {
      ret = ret.substr(0, ret.length - cutby);
    }
    return ret;
  }

}

function updateVisibility(){
  limits.forEach(limit => {
    if(limit.LimitLow < save.Nails ) {
      let  allow = true;
      if('Other' in limit) { // loop over other restrictions
        obj = limit['Other'];
         Object.keys(obj).forEach(key => {
                               let k = save[key];
                               let k2 = limit.Other[key];
                               if(save[key] < limit.Other[key]) {
                                 allow = false;
                               } // endif
                            } ); // end foreach
      } // end check other
      if (allow) {
        if(document.getElementById(limit.Show) != null) 
          document.getElementById(limit.Show).style.visibility = "visible";
      }//end allow
    } // end nails
  });//end foreach
}

function updateView(){
  document.getElementById('NailsTotal').innerHTML =              formatBigInt(save.Nails);
  document.getElementById('NailsProduction').innerHTML =         formatBigInt(save.NailsPerTick);
  document.getElementById('StorageGarageCount').innerHTML =      formatBigInt(save.StorageGarage);
  document.getElementById('NailsInStorage').innerHTML =          formatBigInt(save.NailsInStorage);
  document.getElementById('Steelbars').innerHTML =               formatBigInt(save.SteelbarsByK,3);
  let storagecap = getStorageCap();
  document.getElementById('NailsInStoragePercent').innerHTML =   save.NailsInStorage * 100n / storagecap;
  document.getElementById('SteelbarsPercent').innerHTML =        save.SteelbarsByK * 100n / storagecap;
  document.getElementById('StorageTotal').innerHTML =            (save.SteelbarsByK+save.NailsInStorage) * 100n / storagecap;
}

function getStorageCap() {
  let cap = 0n;
  cap += save.StorageGarage * Storage.Garage.Capacity;
  cap += save.StorageWarehouseSmall * Storage.WarehouseSmall.Capacity;
  cap += save.StorageWarehouseMedium * Storage.WarehouseMedium.Capacity;
  return cap;
}