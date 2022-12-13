let loglevel = 999;

let log = [];
let callstack = 0;
let tickmode = false;

function tickStart(tick) {
    tickmode = true;
    callstack = 0;
    console.group('Tick ' + tick);
}

function tickEnd() {
  logCleanup();
  tickmode = false;
  callstack = 0;
  console.groupend();
}

function logFunctionStart(Name, inputvalues=[]) {
    callstack++; 
    if(callstack > loglevel) return;

}

function logFunctionEnd(Name, returnvalue=null) {
    callstack--;
    if(callstack > loglevel) return;
}

function logEvent(Name, values=[]) {
    if(callstack > loglevel) return;
}

function logCleanUp() {
    log.splice(0, log.length - 1000);
}