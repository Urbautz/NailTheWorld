function formatBigInt(value,cutby=0) {
  if(cutby == 0) 
    return value.toString();
  else return value.toString().substr(0, 
                                      value.toString().length - cutby
                                      );

}

function updateVisibility(){
  limits.forEach(limit => {
    if(limit.LimitLow < save.Nails ) {
      if(document.getElementById(limit.Show) != null) 
        document.getElementById(limit.Show).style.visibility = "visible";
    }
  });
}

function updateView(){
  document.getElementById('NailsTotal').innerHTML =         formatBigInt(save.Nails);
  document.getElementById('NailsProduction').innerHTML =    formatBigInt(save.NailsPerTick);
}