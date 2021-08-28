let resource = require ("./resourceClass.js");
import { populationUniversalList } from '../population/population.js';

var resources = {}

let constructor ={
  _id: null,
  type: "normal",
  displayName:"",
  value: 0,
  settings:[{}]  
};

constructor ={
  _id: null,
  type: "normal",
  displayName:"DNR",
  value: 10000,
  settings:[{what:"Taxes",displayName:"Taxes",value:0.1,reactComponent:"ResourceSettingSlider",isPercent:true}]
};

resources.DNR = new resource.resource(constructor);

constructor ={
  _id: null,
  type: "normal",
  displayName:"Dark Matter",
  value: 1000,
};

resources.DM = new resource.resource(constructor);

constructor ={
  _id: null,
  type: "normal",
  displayName:"food",
  value: 5000,
};

resources.food = new resource.resource(constructor);

constructor ={
  _id: null,
  type: "flux",
  displayName:"energy",
  value: 0
};

resources.energy = new resource.resource(constructor);

constructor ={
  _id: null,
  type: "flux",
  displayName:"build power",
  value: 0
};

resources.buildPower = new resource.resource(constructor);

constructor ={
  _id: null,
  type: "population",
  displayName:"population",
  value: 1000,
  
};
resources.population = new resource.resource(constructor);

export const resourceUniversalList = resources;

export const allResources = {};