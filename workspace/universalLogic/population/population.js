let pop = require ("./populationClass.js");

var population = {}

let constructor ={
  _id: null,
  id:"P0001",
  type: "plebeian",
  displayName:"Plebeians",
  category:"disciplus",
  level:1,  
  citizen:true,
  rank:1,
  multiplier:1,
  happiness:100,
  foodConsumption:1,
  growthRate:0.02,
  popDecrease:0.05,
  number:0,
  employed:0,
  unemployed:0,
  salary:1,
  savingsPercent:0.05,
  savingsPool:0,
  goodsPercent:0.2
};

population.P0001 = new pop.population(constructor);

constructor ={
  _id: null,
  id:"P0002",
  type: "admin",
  displayName:"Curators",
  category:"disciplus",
  level:1,  
  citizen:true,
  rank:2,
  multiplier:1.05,
  happiness:100,
  foodConsumption:1,  
  growthRate:0.005,
  popDecrease:0.05,
  number:0,
  employed:0,
  unemployed:0,
  salary:2,
  savingsPercent:0.08,
  savingsPool:0,
  goodsPercent:0.25 
};

population.P0002 = new pop.population(constructor);

constructor ={
  _id: null,
  id:"P0003",
  type: "engineer",
  displayName:"Ingeniator",
  category:"disciplus",
  level:1,  
  citizen:true,
  rank:2,
  multiplier:1.1,
  happiness:100,
  foodConsumption:1.5,  
  growthRate:0.005,
  popDecrease:0.05,
  number:0,
  employed:0,
  unemployed:0,
  salary:2,
  savingsPercent:0.08,
  savingsPool:0,
  goodsPercent:0.25 
};

population.P0003 = new pop.population(constructor);

constructor ={
  _id: null,
  id:"P0004",
  type: "scientist",
  displayName:"Physicus",
  category:"disciplus",
  level:1,
  citizen:true,
  rank:2,
  multiplier:1.4,
  happiness:100,
  foodConsumption:2,  
  growthRate:0.003,
  popDecrease:0.05,
  number:0,
  employed:0,
  unemployed:0,
  salary:3,
  savingsPercent:0.1,
  savingsPool:0,
  goodsPercent:0.3 
};

population.P0004 = new pop.population(constructor);

export const populationUniversalList = population;

var startPop = {};
startPop.P0001 = population.P0001;
startPop.P0002 = population.P0002;
startPop.P0003 = population.P0003;
startPop.P0004 = population.P0004;

startPop.P0001.inc(975);
startPop.P0002.inc(20);
startPop.P0003.inc(5);
startPop.P0004.inc(1);

export const populationStart = startPop;