let building = require ("./buildingClasses.js");

//creating the natures
var buildingNatures = [];
buildingNatures.Production = new building.nature("Production");
buildingNatures.Engineering = new building.nature("Engineering");
buildingNatures.Education = new building.nature("Education");

//creating the categories
var buildingCategories = [];
buildingCategories.Food = new building.category("Food",buildingNatures.Production);
buildingCategories.Energy = new building.category("Energy",buildingNatures.Production);
buildingCategories.buildPower = new building.category("buildPower",buildingNatures.Production);
buildingCategories.MediumEducation = new building.category("Medium Education",buildingNatures.Production);

//creating the types
var buildingTypes = [];
buildingTypes.basicFood = new building.type("basicFood",buildingCategories.Food);
buildingTypes.Reactor = new building.type("Reactor",buildingCategories.Food);
buildingTypes.basicEngineering = new building.type("basicEngineering",buildingCategories.buildPower);
buildingTypes.school = new building.type("Administration",buildingCategories.buildPower);
//creating the scale
var buildingScales =[];
buildingScales.Mono = new building.scale("Mono");
buildingScales.Dy = new building.scale("Dy");
buildingScales.Tri = new building.scale("Tri");



//creating the actual buildings
var buildings = {};
let buildingBuilder = {bid : "ALLYOURBASEAREBELONGTOUS",
                       nature:buildingNatures.Production,
                       category:buildingCategories.Food,
                       type:buildingTypes.Farm,
                       scale: buildingScales.Mono,
                       displayName:"New Building Model",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[],
                       space:1,
                       energy:1,
                       DNRCost:1,
                       DNRMaintenance:1,
                       manPowerRequired:[],
                       buildRequirements:{},
                       buildPoints:100,
                       buildStatus:{display:"Not built",status:false,progress:0},
                       prerequisites:{},
                       resourceProduced:"DNR",
                       qtyProducedPerCycle:1,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},
                       }

buildingBuilder = {    bid:"B00001",
                       nature:buildingNatures.Production,
                       category:buildingCategories.Food,
                       type:buildingTypes.Farm,
                       scale: buildingScales.Mono,
                       displayName:"Basic Ration Condensator",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[{validUntilLevel:10,buildRequirements:100,manPowerRequired:50,qtyProducedPerCycle:20}],
                       space:1,
                       energy:1,
                       DNRMaintenance:2,
                       manPowerRequired:[{id:"P0001",number:50},{id:"P0002",number:1}],
                       buildRequirements:[{type:"buildPoints",buildPoints:30},{type:"resources",resources:[{resource:'DNR',qty:50}]}],                   
                       buildStatus:{display:"Not built",status:false,progress:0,message:["Construction ongoing"]},
                       prerequisites:{},
                       resourceProduced:"food",
                       qtyProducedPerCycle:1000,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},
                       }

buildings.basicRationCondensator = new building.building(buildingBuilder);

  buildingBuilder = {  _id:"B00002",
                       nature:buildingNatures.Production,
                       category:buildingCategories.Energy,
                       type:buildingTypes.Reactor,
                       scale: buildingScales.Mono,
                       displayName: "Fusion Reactor",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[{validUntilLevel:10,buildRequirements:100,manPowerRequired:50,qtyProducedPerCycle:20}],                     
                       space:100,
                       energy:0,
                       DNRMaintenance:50,
                       manPowerRequired:[{id:"P0001",number:100},{id:"P0002",number:10}],
                       buildRequirements:[{type:"buildPoints",buildPoints:1000},{type:"resources",resources:[{resource:'DNR',qty:50000}]}],                   
                       buildStatus:{display:"Not built",status:false,progress:0,message:["Construction ongoing"]},
                       prerequisites:{},                     
                       resourceProduced:"energy",
                       qtyProducedPerCycle:50000,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},                     
                       }
buildings.fusionReactor = new building.building(buildingBuilder);

  buildingBuilder = {  bid:"B00003",
                       nature:buildingNatures.Engineering,
                       category:buildingCategories.buildPower,
                       type:buildingTypes.basicEngineering,
                       scale: buildingScales.Mono,
                       displayName: "AI Assisted Engi Station",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[{validUntilLevel:10,buildRequirements:100,manPowerRequired:50,qtyProducedPerCycle:20}],                     
                       space:100,
                       energy:1000,
                       DNRMaintenance:25,
                       manPowerRequired:[{id:"P0001",number:150},{id:"P0002",number:5},{id:"P0003",number:5}],
                       buildRequirements:[{type:"buildPoints",buildPoints:100},{type:"resources",resources:[{resource:'DNR',qty:5000}]}], 
                       buildStatus:{display:"Not built",status:false,progress:0,message:["Construction ongoing"]},
                       prerequisites:{},                     
                       resourceProduced:"buildPower",
                       qtyProducedPerCycle:10,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},                     
                       }
buildings.basicEngineeringStation = new building.building(buildingBuilder);


  buildingBuilder = {  bid:"B00004",
                       nature:buildingNatures.Production,
                       category:buildingCategories.DM,
                       type:buildingTypes.generator,
                       scale: buildingScales.Mono,
                       displayName: "Dark Matter Inceptor",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[{validUntilLevel:10,buildRequirements:100,manPowerRequired:50,qtyProducedPerCycle:20}],                     
                       space:100,
                       energy:10000,
                       DNRMaintenance:10,
                       manPowerRequired:[{id:"P0001",number:200},{id:"P0002",number:5}],
                       buildRequirements:[{type:"buildPoints",buildPoints:1000},{type:"resources",resources:[{resource:'DNR',qty:50000}]}], 
                       buildStatus:{display:"Not built",status:false,progress:0,message:["Construction ongoing"]},
                       prerequisites:{},                     
                       resourceProduced:"DM",
                       qtyProducedPerCycle:100,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},                     
                       }
buildings.darkMatterInceptor = new building.building(buildingBuilder);

  buildingBuilder = {  bid:"B00005",
                       nature:buildingNatures.Education,
                       category:buildingCategories.MediumEducation,
                       type:buildingTypes.School,
                       scale: buildingScales.Mono,
                       displayName: "Administration School",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[{validUntilLevel:10,buildRequirements:100,manPowerRequired:50,qtyProducedPerCycle:20}],                     
                       space:50,
                       energy:500,
                       DNRMaintenance:10,
                       manPowerRequired:[{id:"P0001",number:10},{id:"P0002",number:3}],
                       buildRequirements:[{type:"buildPoints",buildPoints:100},{type:"resources",resources:[{resource:'DNR',qty:1000}]}], 
                       buildStatus:{display:"Not built",status:false,progress:0,message:["Construction ongoing"]},
                       prerequisites:{},                     
                       resourceProduced:"Education",
                       educationProduced:[{popSourceRank:1,popSourceType:"plebeian",popTargetRank:2,popTargetType:"admin",sourcePopPercent:0.01,cycleRequired:2}],
                       qtyProducedPerCycle:0,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},                     
                       }
buildings.AdministrationSchool = new building.building(buildingBuilder);

  buildingBuilder = {  bid:"B00006",
                       nature:buildingNatures.Education,
                       category:buildingCategories.MediumEducation,
                       type:buildingTypes.School,
                       scale: buildingScales.Mono,
                       displayName: "Science Under Graduate School",
                       level:1,
                       levelMax:1,
                       levelMultiplier:[{validUntilLevel:10,buildRequirements:100,manPowerRequired:50,qtyProducedPerCycle:20}],                     
                       space:100,
                       energy:5000,
                       DNRMaintenance:20,
                       manPowerRequired:[{id:"P0001",number:10},{id:"P0002",number:5},{id:"P0003",number:5},{id:"P0004",number:1}],
                       buildRequirements:[{type:"buildPoints",buildPoints:150},{type:"resources",resources:[{resource:'DNR',qty:1500}]}], 
                       buildStatus:{display:"Not built",status:false,progress:0,message:["Construction ongoing"]},
                       prerequisites:[{type:"science",id:"scienceUnderGradSchool",levelMultiplier:5}],                     
                       resourceProduced:"Science",
                       educationProduced:[{popSourceRank:1,popSourceType:"plebeian",popTargetRank:2,popTargetType:"scientist",sourcePopPercent:0.005,cycleRequired:5}],
                       qtyProducedPerCycle:0,
                       status:{display:"Not running",totalRequirements:0,popRequirements:0},                     
                       }
buildings.scienceUnderGradSchool = new building.building(buildingBuilder);

//console.log(buildings);

export const buildingsUniversalList = buildings;

var startBuildingList = []
startBuildingList.push(buildings.basicRationCondensator);
startBuildingList.push(buildings.basicEngineeringStation);
startBuildingList.push(buildings.darkMatterInceptor);
startBuildingList.push(buildings.fusionReactor);
startBuildingList.push(buildings.AdministrationSchool);

export const buildingStartingList = startBuildingList;