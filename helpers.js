function formatBigInt(value, cutby = 0, format = null) {
    if (value == null) {
        console.log('Value was null, cannot format.');
        return 'FORMAT error';
    }
    let ret = value.toString();
    //cut if necessary
    if (cutby != 0) {
        if (ret.length > cutby) {
            ret = ret.substr(0, ret.length - cutby);
        } else {
            ret = '0';
        }
        // Add decimals for small values
        if (value < 1000n * BigInt(cutby)) {
            ret += settings.DecimalPoint + value.toString().slice(-1 * cutby).padStart(cutby, '0');
        }
    }
    // format tousands
    ret = ret.replace(/\B(?=(\d{3})+(?!\d))/g, settings['TousandPoint']);


    // format with currency etc.
    if (format != null) {
        ret = format.replace('n', ret);
    }

    //console.log('Format ' + value +' to ' + ret);
    return ret;

}

function jsonparse(stringed) {
    try {
        return JSON.parse(stringed, (key, value) => {
            if (typeof value === "string" && /^\d+n$/.test(value)) {
                return BigInt(value.substr(0, value.length - 1));
            }
            return value;
        });
    } catch (e) {
        error('Invalid File');
        return null;
    }
}




function jsonify(json) {
    return JSON.stringify(json, (key, value) => typeof value === "bigint" ? value.toString() + "n" : value);
}




function updateVisibility() {
    limits.forEach(limit => {
        if (limit.LimitLow < save.Nails) {
            let allow = true;
            if ('Other' in limit) { // loop over other restrictions
                obj = limit['Other'];
                Object.keys(obj).forEach(key => {
                    let k = save[key];
                    let k2 = limit.Other[key];
                    if (save[key] < limit.Other[key]) {
                        allow = false;
                    } // endif
                }); // end foreach
            } // end check other
            if (allow) {
                if (document.getElementById(limit.Show) != null) {
                    //console.log('unlock: '+ limit.Show);
                    if (document.getElementById(limit.Show).className == 'hidden') {
                        document.getElementById(limit.Show).classList.remove('hidden');
                    }

                    document.getElementById(limit.Show).style.display = "inline";
                } else {
                    console.log('Element to unlock does not exist: ' + limit.Show);
                }
            } //end allow
        } // end nails
    }); //end foreach
}

function updateView() {
    // settings
    document.getElementById('TousandPoint').value = settings.TousandPoint;
    document.getElementById('DecimalPoint').value = settings.DecimalPoint;
    document.getElementById('Currency').value = settings.Currency;
    document.getElementById('FormatExample').innerHTML = formatBigInt(123456711, 2, settings.Currency);
    if (settings.Pause) document.getElementById('Pause').innerHTML = '&#9654; Unpause';
    else document.getElementById('Pause').innerHTML = '&#10074;&#10074; Pause';

    //main elements
    document.getElementById('Money').innerHTML = formatBigInt(save.Money, 2, settings.Currency);
    document.getElementById('NailsTotal').innerHTML = formatBigInt(save.Nails);
    document.getElementById('NailsProduction').innerHTML = formatBigInt(save.NailsPerTick);
    document.getElementById('StorageGarageCount').innerHTML = formatBigInt(save.StorageGarage);
    document.getElementById('NailsInStorage').innerHTML = formatBigInt(save.NailsInStorage);
    document.getElementById('SteelbarsNo').innerHTML = formatBigInt(save.SteelbarsByK, 3);
    document.getElementById('SteelBarCost').innerHTML = formatBigInt(save.SteelbarCost, 2, settings.Currency);
    let storagecap = getStorageCap();
    document.getElementById('NailsInStoragePercent').innerHTML = save.NailsInStorage * 100n / storagecap;
    document.getElementById('SteelbarsPercent').innerHTML = save.SteelbarsByK * 100n / storagecap;
    if((save.SteelbarsByK + save.NailsInStorage) * 100n / storagecap > 90) {
        document.getElementById('StorageTotal').classList.add('warn');
    } else {
        document.getElementById('StorageTotal').classList.remove('warn');
    }
    if((save.NailsPerTick * 60n) > save.SteelbarsByK) {
        document.getElementById('SteelbarsNo').classList.add('warn');
    } else {
        document.getElementById('SteelbarsNo').classList.remove('warn');
    }
    document.getElementById('StorageTotal').innerHTML = (save.SteelbarsByK + save.NailsInStorage) * 100n / storagecap;
    document.getElementById('StorageCap').innerHTML = formatBigInt(storagecap);

    document.getElementById('Price').innerHTML = formatBigInt(save.Price, 2, settings.Currency);
    document.getElementById('Demand').innerHTML = formatBigInt(save.Demand, 0);

    document.getElementById('AutoPressNo').innerHTML = formatBigInt(save.AutoPress, 0);
    document.getElementById('AutoPressPrice').innerHTML = formatBigInt(save.AutoPressPrice, 2, settings.Currency);

    document.getElementById('SalesRepCount').innerHTML = formatBigInt(save.SalesReps);
    document.getElementById('SalesRepCost').innerHTML = formatBigInt(getSalesRepCost(), 2, settings.Currency);

    document.getElementById('Time').innerHTML = time[save.Time].Name;
    document.getElementById('Weather').innerHTML = weather[save.Weather].Name;
    document.getElementById('Tick').innerHTML = formatBigInt(save.Tick);

    document.getElementById('PowerConsumption').innerHTML = formatBigInt(save.PowerConsumed, 0, settings.PowerFormat);
    document.getElementById('PowerCost').innerHTML = formatBigInt(save.PowerCost, 2, settings.Currency);
    document.getElementById('PowerProduced').innerHTML = formatBigInt(save.PowerProduced, 0, settings.PowerFormat);
    document.getElementById('PowerStored').innerHTML = formatBigInt(save.PowerStored, 0, settings.PowerFormat);
    document.getElementById('PowerStoreCap').innerHTML = formatBigInt(save.PowerStoreCap, 0, settings.PowerFormat);
    if(save.PowerConsumed > save.PowerProduced) {
        document.getElementById('PowerProduced').classList.add('warn');
    } else {
        document.getElementById('PowerProduced').classList.remove('warn');
    }
    if(save.PowerStored < (save.PowerConsumed)) {
        document.getElementById('PowerStored').classList.add('warn');
    } else {
        document.getElementById('PowerStored').classList.remove('warn');
    }

    getSalesRepCost()
    console.log("did run updateView");
}

function getRandom(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function BinaryRandom(probability = 0.1) {
    let rand = Math.random();
    console.log('Random: ' + rand + ', Result: ' + (rand < probability));
    return rand < probability;
}