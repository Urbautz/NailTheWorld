let settings = {
  Language:'EN/US',
  TousandPoint:'.',
  Currency: '$ n'
};

const limits = [
  {LimitLow:              25n,                                   Show:'press10'}, 
  {LimitLow:             300n,                                   Show:'Storage'},
  {LimitLow:             500n,                                   Show:'Bank'},
  {LimitLow:             950n,                                   Show:'Steelbars'},
  {LimitLow:          500000n,  Other:{StorageGarage: 5n},       Show:'StorageWarehouseSmall'}
]

const Storage = {
    Garage:            {Capacity:     1000000n, Cost:    5000n}
  , WarehouseSmall:    {Capacity:    50000000n, Cost:  100000n}
  , WarehouseMedium:   {Capacity:  1000000000n, Cost: 5000000n}    
}
  