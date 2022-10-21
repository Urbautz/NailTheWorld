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

function format(value){
  return value;
}

function load() {
  document.getElementById('NailsTotal').innerHTML = 0; 
  updateVisibility();
}

function save() {
    document.cookie = ("save="+JSON.stringify(save));
    updateVisibility();
}

function makeNail(count=0) {
  save.Nails += BigInt(count) + save.NailsPerTick;
  document.getElementById('NailsTotal').innerHTML = format(save.Nails);
  save();

}

function updateVisibility(){
  limits.forEach(limit => {
    if(limit.LimitLow < save.Nails ) {
      document.getElementById(limit.Show).style.visibility = "visible";
    }
  });
}
