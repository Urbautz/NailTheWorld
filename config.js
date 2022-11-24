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
  PowerCostBase:240,
  SolarCost: 50000n,
  WindMillCost: 2500000n,
  WeatherChangeProb:0.2
};

const time = [
  {Name: 'Early Morning', SolarOut:25n},
  {Name: 'Morning', SolarOut:75n},
  {Name: 'Noon', SolarOut:100n},
  {Name: 'Early Afternoon', SolarOut:100n},
  {Name: 'Late Afternoon', SolarOut:75n},
  {Name: 'Evening', SolarOut:50n},
  {Name: 'Late Evening', SolarOut:25n},
  {Name: 'Night', SolarOut:0n},
  {Name: 'Night', SolarOut:0n},
  {Name: 'Night', SolarOut:0n},
]

const weather = [
  {Name: 'Sunny', SolarOut: 100n, WindOut: BigInt(getRandom(0,50)) },
  {Name: 'Sunny', SolarOut: 100n, WindOut: BigInt(getRandom(0,50)) },
  {Name: 'Sunny', SolarOut: 100n, WindOut: BigInt(getRandom(0,50)) },
  {Name: 'Sunny', SolarOut: 100n, WindOut: BigInt(getRandom(0,50)) },
  {Name: 'Cloudy', SolarOut: BigInt(getRandom(25,75)), WindOut: BigInt(getRandom(25,75)) },
  {Name: 'Cloudy', SolarOut: BigInt(getRandom(25,75)), WindOut: BigInt(getRandom(25,75)) },
  {Name: 'Cloudy', SolarOut: BigInt(getRandom(25,75)), WindOut: BigInt(getRandom(25,75)) },
  {Name: 'Rain', SolarOut: BigInt(getRandom(0,50)), WindOut: BigInt(getRandom(50,100)) },
  {Name: 'Rain', SolarOut: BigInt(getRandom(0,50)), WindOut: BigInt(getRandom(50,100)) },
  {Name: 'Rain', SolarOut: BigInt(getRandom(0,50)), WindOut: BigInt(getRandom(50,100)) },
  {Name: 'Stormy', SolarOut: BigInt(getRandom(0,100)), WindOut: 100n },
  {Name: 'Thundstorm', SolarOut: 0n, WindOut: 100n },
]