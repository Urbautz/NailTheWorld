

let save = {
  Nails: 0n,
  NailsPerTick: 0n,
  StorageGarage: 1n,
  StorageWarehouseSmall: 0n,
  StorageWarehouseMedium: 0n,
  NailsInStorage: 0n,
  Money:50000n,
  SteelbarsByK: 1000n,
  SteelbarCost: 1500n // 15 Dollar
};

function load() {
  updateView();
  // load settings 
 let stringed = localStorage.getItem('setting');
  if(stringed != null )
  {
    let backAgain = null;
    backAgain = JSON.parse(stringed, (key, value) => {
    if (typeof value === "string" && /^\d+n$/.test(value)) {
      return BigInt(value.substr(0, value.length - 1));
      }
      return value;
    });
    if(backAgain != null) 
    {
       settings = backAgain;
    } 
  }

  // load save
  stringed = localStorage.getItem('save');
  if(stringed != null )
  {
    let backAgain = null;
    backAgain = JSON.parse(stringed, (key, value) => {
    if (typeof value === "string" && /^\d+n$/.test(value)) {
      return BigInt(value.substr(0, value.length - 1));
      }
      return value;
    });
    if(backAgain != null) 
    { 
    //if(!save.hasOwnProperty('Money')) save.Money = 5000n;
      if(!save.hasOwnProperty('SteelbarCost')) save.SteelbarCost = 1500n;
      save = backAgain;
      console.log("save loaded");
    }
  }
  updateView();
  updateVisibility();
}

function doSave() {
  let stringed = JSON.stringify(save, (key, value) =>
  typeof value === "bigint" ? value.toString() + "n" : value
  );
  console.log('Saving: ' + stringed);
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

function error(text) {
  console.log('ERROR: ' + text);
  alert(text);
}

function saveSettings() {
    console.log('saving settings ...');
  settings.TousandPoint = document.getElementById('TousandPoint').value;
  settings.DecimalPoint = document.getElementById('DecimalPoint').value;
  settings.Currency = document.getElementById('Currency').value;
  let stringed = JSON.stringify(settings, (key, value) =>
  typeof value === "bigint" ? value.toString() + "n" : value
  );
  console.log('Settings: ' + stringed);
  window.localStorage.setItem('setting', stringed);
  updateVisibility();
  updateView();
}

function closeModal(elementname) {
  console.log('Closing Modal window '+elementname);
  let modal = document.getElementById(elementname);
  updateView();
  modal.style.display = "none";
}

function ShowModal(elementname) {
  console.log('Showing Modal window '+elementname);
  updateView();
  let modal = document.getElementById(elementname);
  modal.style.display = 'block';
}