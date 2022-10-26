let settings = {
  Language:"EN/US"
};

const limits = [
  {LimitLow:              25n,                                   Show:'press10'}, 
  {LimitLow:          500000n,  Other:{StorageGarage: 5n},       Show:'StorageWarehouseSmall'}
]

const Storage = {
    Garage:            {Capacity:     1000000n, Cost:    5000n}
  , WarehouseSmall:    {Capacity:    50000000n, Cost:  100000n}
  , WarehouseMedium:   {Capacity:  1000000000n, Cost: 5000000n}    
}
  