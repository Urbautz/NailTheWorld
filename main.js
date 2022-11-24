

let save = {
  Tick: 0n,
  LastError: '',
  Time:0,
  Weather:0,
  Nails: 0n,
  NailsPerTick: 0n,
  StorageGarage: 1n,
  StorageWarehouseSmall: 0n,
  StorageWarehouseMedium: 0n,
  NailsInStorage: 0n,
  Money:50000n,
  SteelbarsByK: 1000n,
  SteelbarCost: 1500n, // 15 Dollar
  Price: 500n, // 5 Dollar
  Demand: 5000n,
  AutoPress:0n,
  AutoPressPrice:1000n, // 10 Dollar
  SalesReps:0n,
  SalesRepsActive:0n,
  PowerCost:240n,
  PowerStored:0n,
  PowerStoreCap:0n,
  PowerConsumed:0n,
  Solar:0n,
  WindMill:0n
};

function load() {
  
  // load settings 
 let stringed = localStorage.getItem('setting');
  if(stringed != null )
  {
    let backAgain = jsonparse(stringed);
    if(backAgain != null) 
    {
       settings = backAgain;
    } 
  }

  // load save
  stringed = localStorage.getItem('save');
  if(stringed != null )
  {
    let backAgain = jsonparse(stringed);
    if(backAgain != null) 
    { 
      //Savegame Version updates:
      if(!backAgain.hasOwnProperty('PowerCost')) backAgain.PowerCost = 240n;
      if(!backAgain.hasOwnProperty('PowerStored')) backAgain.PowerStored = 0n;
      if(!backAgain.hasOwnProperty('PowerStored')) backAgain.PowerStoreCap = 0n;
      if(!backAgain.hasOwnProperty('PowerConsumed')) backAgain.PowerConsumed = 0n;
      if(!backAgain.hasOwnProperty('Solar')) backAgain.Solar = 0n;
      if(!backAgain.hasOwnProperty('WindMill')) backAgain.WindMill = 0n;
      if(!backAgain.hasOwnProperty('Time')) backAgain.Time = 0;
      if(!backAgain.hasOwnProperty('Weather')) backAgain.Weather = 0;
      save = backAgain;
      console.log("save loaded");
    }
  }
  settings.Pause = false;
  updateView();
  updateVisibility();
  // Start Ticking
  setInterval(tick, 1000);
}

function tick() {
  let start = performance.now();
  if(settings.Pause){
    return;
  }
  save.Tick += 1n;
  save.LastError = null;
  save.PowerConsumed = 0n;
  let tikmod = save.Tick.toString().charAt(save.Tick.toString().length-1);
  console.log('Ticking ' +save.Tick );

  // every tick
  let power = producePower();
  let nps = save.AutoPress;
  save.NailsPerTick = nps;
  makeNail(nps,true);
  paySalesReps();
  updateDemand(getRandom(0, 18), false);
  // every 10 ticks
  if(tikmod == "0"){
    updateWeather();
    console.log("Big tick");
    randomizePrices();
    updateDemand(0n, true);
    doSave();
    console.log('BIG Tick '+save.Tick+' done, took ' + ( window.performance.now() - start) );
  } else {
      updateView();
      console.log('Tick '+save.Tick+' done, took ' + ( window.performance.now() - start) );
  }


}

function doSave() {
  let stringed = jsonify(save);
  console.log('Saving: ' + stringed);
  window.localStorage.setItem('save', stringed);
  updateVisibility();
  updateView();
}

function DeleteSave() {
  if(confirm("Delete Save, are you sure?")) {
    console.log("Save deleted");
    localStorage.removeItem("save");
    window.location.reload(false);
  }
}

function error(text) {
  console.log('ERROR: ' + text);
  if(text==save.LastError) return;
  
  save.LastError = text;
  settings.Pause=true;
  updateView();
  alert(text
        + " Game paused!");
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

function exportSave() {
  const str = jsonify(save);
  const file = new File(['',str], 'nails.json');
  const link = document.createElement('a');
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  closeModal('savegame');
}

function importSave(input){
  let file = input.files[0];
  if(file != null){
    let fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
          console.log('File loaded: ' + fileReader.result);
          let json = jsonparse(fileReader.result);
          if (json && json.Nails) {
            save = json;
            console.log('Save loaded');
            document.getElementById('SaveFile').value = null;
            updateView();
            updateVisibility();
            doSave();
          } else error("File invalid!");
        }; 
  } else {
    console.log('No file to load');
  }
   closeModal('savegame');
}

function closeModal(elementname) {
  console.log('Closing Modal window '+elementname);
  let modal = document.getElementById(elementname);
  tooglepause(false);
  modal.style.display = "none";
}

function ShowModal(elementname) {
  console.log('Showing Modal window '+elementname);
  updateView();
  let modal = document.getElementById(elementname);
  tooglepause(true);
  modal.style.display = 'block';
}

function tooglepause(pause=null) {
  if(pause==null) {
    if(settings.Pause) {
      settings.Pause = false;
    }
    else {
      settings.Pause = true;
    }
  } else {
    settings.Pause = pause;
  }
  updateView();
}