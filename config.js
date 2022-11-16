let settings = {
  Language:'EN/US',
  TousandPoint:'.',
  DecimalPoint:',',
  Currency: '$ n',
  Pause: false
};

const limits = [
  {LimitLow:              25n,                                   Show:'press10'}, 
  {LimitLow:             300n,                                   Show:'Storage'},
  {LimitLow:             800n,                                   Show:'Bank'},
  {LimitLow:             950n,                                   Show:'Steelbars'},
  {LimitLow:            2000n,                                   Show:'Sales'},
  {LimitLow:            3000n,                                   Show:'AutoPress'},
  {LimitLow:            5000n,                                   Show:'BuySteelbar100'},
  {LimitLow:            7000n,                                   Show:'buyGarage'},
  {LimitLow:           25000n,  Other:{AutoPress: 25n},          Show:'buyAutopress10'},
  {LimitLow:          500000n,  Other:{StorageGarage: 5n},       Show:'StorageWarehouseSmall'}
]

const Storage = {
    Garage:            {Capacity:     1000000n, Cost:    5000n}
  , WarehouseSmall:    {Capacity:    50000000n, Cost:  100000n}
  , WarehouseMedium:   {Capacity:  1000000000n, Cost: 5000000n}    
}

const probs = {
  PriceChangeProb: 0.3,
  PriceIncreaseChance: 0.5001,
  BaseSalesprice: 500n,
  AutoPressPriceFactor: 125n // 25%
}
