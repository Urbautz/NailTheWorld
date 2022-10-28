function formatBigInt(value,cutby=0,format=null) {
  let ret = value.toString();
  //cut if necessary
  if(cutby != 0) {
    if(ret.length > cutby) {
      ret = ret.substr(0, ret.length - cutby);
    }
  }
  // format tousands
  ret = ret.replace(/\B(?=(\d{3})+(?!\d))/g, settings['TousandPoint']);


  // format with currency etc.
  if (format != null) {
    ret = format.replace('n',ret);
  }
  
  console.log('Format ' + value +' to ' + ret);
  return ret;

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
        if(document.getElementById(limit.Show) != null) {
          console.log('unlock: '+ limit.Show);
          document.getElementById(limit.Show).style.visibility = "visible";
        } else {
          console.log('Element to unlock does not exist: '+ limit.Show);
        }
      }//end allow
    } // end nails
  });//end foreach
}

function updateView(){
  document.getElementById('Money').innerHTML =                   formatBigInt(save.Money,0,settings.Currency);
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