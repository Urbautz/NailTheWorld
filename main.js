// Settings object
let settings = {
  Language:"EN/US"
};

let limits = [
  {LimitLow: 25n, Show:'press10'}, 
  {LimitLow: 1000n, Show:'xzy'}
]

let save = {
  Nails: 0n,
  NailsPerTick: 0n,
  StorageGarage: 1n,
  StorageWarehouseSmall: 0n,
  StorageWarehouseMedium: 0n
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