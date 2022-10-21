function makeNail(count=0) {
  save.Nails += BigInt(count) + save.NailsPerTick;
  doSave();
}