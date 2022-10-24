

let save = {
  Nails: 0n,
  NailsPerTick: 0n,
  StorageGarage: 1n,
  StorageWarehouseSmall: 0n,
  StorageWarehouseMedium: 0n,
  NailsInStorage: 0n,
  SteelbarsByK: 1000n
};

function load() {
  updateView();
  let stringed = localStorage.getItem('save');
  if(stringed != null )
  {
    let backAgain = null;
    backAgain = JSON.parse(stringed, (key, value) => {
    if (typeof value === "string" && /^\d+n$/.test(value)) {
      return BigInt(value.substr(0, value.length - 1));
      }
      return value;
    });
    if(backAgain != null) save = backAgain;
    if(!save.hasOwnProperty('StorageGarage')) save.StorageGarage = 1n;
    if(!save.hasOwnProperty('StorageWarehousSmall')) save.StorageWarehousSmall = 0n;
    if(!save.hasOwnProperty('StorageWarehouseMedium')) save.StorageWarehouseMedium = 0n;
    if(!save.hasOwnProperty('NailsInStorage')) save.NailsInStorage = 0n;
    if(!save.hasOwnProperty('SteelbarsByK')) save.SteelbarsByK = 0n;
    console.log("save loaded");
  }
  updateView();
  updateVisibility();
}

function doSave() {
  let stringed = JSON.stringify(save, (key, value) =>
  typeof value === "bigint" ? value.toString() + "n" : value
  );
  window.localStorage.setItem('save', stringed);
  updateVisibility();
  updateView();
}

function DeleteSave() {
  if(window.confirm("Delete Save, are you sure?")){
    localStorage.clear();
    window.location.reload(false);
  }
}