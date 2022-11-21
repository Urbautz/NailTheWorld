let settings = {
  Language:'EN/US',
  TousandPoint:'.',
  DecimalPoint:',',
  Currency: '$ n',
  PowerFormat: 'n kWt',
  Pause: false,
};

const limits = [
  {LimitLow:              25n,                                   Show:'press10'}, 
  {LimitLow:             300n,                                   Show:'Storage'},
  {LimitLow:             800n,                                   Show:'Bank'},
  {LimitLow:             950n,                                   Show:'Steelbars'},
  {LimitLow:            2000n,                                   Show:'Sales'},
  {LimitLow:            2500n,                                   Show:'press100'},
  {LimitLow:            3000n,                                   Show:'AutoPress'},
  {LimitLow:            4000n,                                   Show:'Power'},
  {LimitLow:            5000n,                                   Show:'BuySteelbar100'},
  {LimitLow:            7500n,                                   Show:'BuySolar'},
  {LimitLow:           10000n,                                   Show:'BuyBattery1'},
  {LimitLow:           15000n,                                   Show:'BuySteelbar100'},
  {LimitLow:           25000n,  Other:{AutoPress: 100n},          Show:'buyAutopress10'},
  {LimitLow:           50000n,                                   Show:'Marketing'},
  {LimitLow:           75000n,                                   Show:'Sell2500'},
  {LimitLow:          100000n,                                   Show:'BuyWindmill'},
  {LimitLow:          100500n,                                   Show:'BuyBattery100'},
  {LimitLow:          500000n,  Other:{StorageGarage: 5n},       Show:'StorageWarehouseSmall'}
];

const Storage = {
    Garage:            {Capacity:     1000000n, Cost:    5000n}
  , WarehouseSmall:    {Capacity:    50000000n, Cost:  100000n}
  , WarehouseMedium:   {Capacity:  1000000000n, Cost: 5000000n}    
};

const probs = {
  PriceChangeProb: 0.3,
  PriceIncreaseChance: 0.5001,
  BaseSalesprice: 500n, 
  AutoPressPriceFactor: 108n, // 25%
  SalesRepHireBaseCost: 100000n, // 1000
  SalesRepHireCostFactor:108n,
  SalesRepTickCost:66n, // 66 Cent pro tick
  PowerConAutoPress: 3n, // 3KWt
  PowerCostBase:3114
};
