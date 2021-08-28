import { resourceUniversalList } from '../universalLogic/resourcesFiles/resources.js';
import { getObjectFromArrayBySelectors,getFirstResultFromArrayOfObjectsBySelectors } from '../imports/globalUtils.js';
import { populationUniversalList } from '../universalLogic/population/population.js';

module.exports = 
{
  addObjects: function addObjects(a,b) {
    
      for (let k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
    
      return a;

  },
  
  buildingAndEmployment: function buildingAndEmployment(buildings,pop)
  {
     for (var i = 0; i < buildings.length; i++)
        {
          //console.log(buildings[i].displayName);
          buildings[i].manPowerRequired.forEach();
        }     
  }  
  ,
  nextCycleHappiness: function nextCycleHappiness(popClass,employmentRate){
    
  }
  ,
  nextCycleEducation: function nextCycleEducation(populationUniversalList,urbsBuildings,action = true,debug = false){
    var result = {todo:false,updateBuildings:false,updatePop:false,promotion:[],finishedIntake:[],buildings:[]};
    var newPromotion = {};
     for (var i = 0; i < urbsBuildings.length; i++){       
       if(urbsBuildings[i].Nature.nature === 'Education'){
         //if(debug){console.log(urbsBuildings[i])}
         //console.log(urbsBuildings[i].educationIntake);
         if(urbsBuildings[i].educationIntake !== undefined && urbsBuildings[i].educationIntake.length >= 1){   
           // IF the building has already a promotion ongoing
           for (var p = 0; p < urbsBuildings[i].educationIntake.length; p++){   
             if(debug){console.log("Intake Ongoing")}
             urbsBuildings[i].educationIntake[p].CycleLeft -= 1;   
             result.updateBuildings = true;
             if(urbsBuildings[i].educationIntake[p].CycleLeft > 0){
               // If the intake isn't finished, we do nothing more               
             }
             else{
               // Intake is over, we remove it and return it
               result.finishedIntake.push(urbsBuildings[i].educationIntake[p]); 
               if(debug){console.log("finished Intake:"+result.finishedIntake)}
               if(action){                    
                 urbsBuildings[i].educationIntake.splice(p,1)
                 result.updateBuildings = true;
                 result.updatePop = true;
               }
             }                          
           }           
         }             
         // no student promotion right now lets run one
         else{
           //if(debug){console.log(urbsBuildings[i].educationProduced)}
           for (var k = 0; k < urbsBuildings[i].educationProduced.length; k++){
             let education = urbsBuildings[i].educationProduced[k];             
             let popSource = getFirstResultFromArrayOfObjectsBySelectors(populationUniversalList,[{selector:"rank",value:education.popSourceRank},{selector:"type",value:education.popSourceType}]);
             let popTarget = getFirstResultFromArrayOfObjectsBySelectors(populationUniversalList,[{selector:"rank",value:education.popTargetRank},{selector:"type",value:education.popTargetType}]);             
             newPromotion = {started:true,popSource:popSource.id,popTarget:popTarget.id,intakeQty:popSource.number*education.sourcePopPercent,CycleLeft:education.cycleRequired,cycleRequired:education.cycleRequired,educationProduced:k,building:urbsBuildings[i].displayName};         
             //if(debug){console.log(newPromotion)}
             if(action){
               urbsBuildings[i].educationIntake = []; 
               urbsBuildings[i].educationIntake.push(newPromotion);               
               if(debug){console.log("Intake created"+urbsBuildings[i].educationIntake)}
               result.updateBuildings = true;
             }
             result.promotion.push(newPromotion);
           }                 
         }         
       }
    }
    result.buildings = (result.updateBuildings) ? urbsBuildings : [];
    //if(debug){console.log(result)}    
    return result;
  },
  elevatePop : function elevatePop(pop,intake,debug=false){
    let result = {};
    //console.log("elevatepop intake: "+ intake.length);
    for(var i = 0; i < intake.length;i++){
      
      if(pop[intake[i].popSource] === undefined){
        result.error = "Urbs doesn't have the population to complete the intake of "+intake.building;
        return result;        
      }
      else{
        if(pop[intake[i].popTarget] === undefined){
          // that urbs doesn't have that pop yet, let's add it
          let newPop = populationUniversalList[popTarget];
          pop.push(newPop)
        }
        else{
          pop[intake[i].popTarget].number += intake[i].intakeQty;
          pop[intake[i].popSource].number -= intake[i].intakeQty;
          result.pop = pop;
          result.popUpdated = [{pop:pop[intake[i].popSource].id,qty:-intake[i].intakeQty},{pop:pop[intake[i].popTarget].id,qty:intake[i].intakeQty}];
          result.updatePop = true;
        }

      }      
    }
    return result;

  }
  , 
  nextCycleConsumption : function nextCycleConsumption(urbs)
  {            
    if(urbs == null){return false}
    
    let simpleResource = {};
    //console.log(urbs.resource);
    Object.keys(urbs.resource).forEach(function(key, index) {
      simpleResource[key] = 0;
    })
    //console.log(simpleResource);
    
    // ----------- ---------------------------------------------------------------------------------------------------------------------------------------BUILDING induced Consumption and Employment------------
    let buildingInducedConsumption = Object.assign({}, simpleResource);
    let buildings = urbs.buildings

    for (var i = 0; i < buildings.length; i++)
    {
      //console.log(buildings[i].displayName);
      let popRequirement = 1;  
      //console.log(buildings[i]);
      buildings[i].manPowerRequired.forEach(function(requiredPopClass){
        //console.log(requiredPopClass.id);
        //let popFound = urbs.pop.filter(popClass => popClass.id === requiredPopClass.id);
        
        //console.log(popFound);        
        let filled = requiredPopClass.number - urbs.pop[requiredPopClass.id].unemployed;
        //console.log(urbs.pop[requiredPopClass.id].unemployed);        
        if(urbs.pop[requiredPopClass.id].unemployed >= requiredPopClass.number){
            popRequirement *= 1
            filled = requiredPopClass.number;
        }
        else{
             popRequirement *= urbs.pop[requiredPopClass.id].unemployed /  requiredPopClass.number;
             filled = urbs.pop[requiredPopClass.id].unemployed;
        }
        //console.log(urbs.pop);
        urbs.pop[requiredPopClass.id].employed += filled;
        urbs.pop[requiredPopClass.id].unemployed -= filled;
        //console.log("filled"+filled+"  employed:"+urbs.pop[requiredPopClass.id].employed);
      });
      buildings[i].status = {display:"Running",totalRequirements:1,popRequirement:popRequirement}  
      //console.log(buildings[i].status);
      
      buildingInducedConsumption.energy += -buildings[i].energyConsumption;
      buildingInducedConsumption.DNR += -buildings[i].DNRMaintenance;
      buildingInducedConsumption[buildings[i].resourceProduced] += buildings[i].qtyProducedPerCycle;
    }
    
    // -------------------------------------------------------------------------------------------------------------------------------------------------- POPULATION induced consumption ---------
    let popInducedConsumption = Object.assign({}, simpleResource);
    let popGrowthByClass;
    //for(i=0;i<urbs.pop.length;i++)
    i = 0;
    let employmentRate = 0;
    for(var key in urbs.pop){
      if (!urbs.pop.hasOwnProperty(key)) continue;
      var popClass = urbs.pop[key];      
        //DNR
        //console.log("pop induced consumption for:   " + urbs.pop[i]);  
        employmentRate = popClass.employed / popClass.number;
        popInducedConsumption.DNR += Math.floor(popClass.number * popClass.multiplier * urbs.resource.DNR.settings[0].value * employmentRate)
      
      
        //FOOD
        let foodConsumption = Math.floor(- popClass.number * popClass.multiplier * popClass.foodConsumption);
        
        if(popClass.number <= 0)
        {
          foodConsumption = 0
        }
        if (urbs.resource.food.value >= Math.abs(foodConsumption))
        {
          
        }
        else
        {
          foodConsumption = Math.floor(foodConsumption / 2);
        }  
        //console.log(foodConsumption)
        popInducedConsumption.food += foodConsumption;
        //console.log(popInducedConsumption);   
      
        //POP Growth
        
        if(urbs.resource.food.value >= popClass.number)
        {
          popGrowthByClass = Math.floor(popClass.number) * popClass.growthRate
          //console.log("normal growth:  " + popGrowthByClass)
        }
        else
        {
          if(urbs.resource.food.value > 0)
            {
              popGrowthByClass = Math.floor(-popClass.number * popClass.popDecrease * urbs.resource.food.value/popClass.number)
            }
          else
          {
            popGrowthByClass = Math.floor(-popClass.number * popClass.popDecrease *5)
          }
          
        }
      urbs.pop[popClass.id].number += popGrowthByClass;
      popInducedConsumption.population += Math.floor(popGrowthByClass);
      i++;
    }
        //console.log(popInducedConsumption);
    

    //console.log(buildingInducedConsumption);
    //console.log(popInducedConsumption);
    let totalConsumption = module.exports.addObjects(buildingInducedConsumption,popInducedConsumption);
    //console.log("end of run cycle:" + totalConsumption);
    return totalConsumption;
  },
  updateUrbsResources: function updateUrbsResources(simpleResources,urbsResources){
    //console.log(simpleResources)
    Object.keys(urbsResources).forEach(function(key, index) {
      if(urbsResources[key].type == "normal" || urbsResources[key].type == "population" ){
        //console.log(urbsResources[key].displayName +":"+ urbsResources[key].value + "consumption = " + simpleResources[key]);
        urbsResources[key].value = urbsResources[key].value + simpleResources[key];
      }
      else if(urbsResources[key].type == "flux"){
        urbsResources[key].value = simpleResources[key];
      }        
    })
    //console.log(urbsResources);
    return urbsResources;
  },
  constructBuildingCheckRequirements: function constructBuildingCheckRequirements(urbs,toBuild,percentBuilt)
  {
    let result = false;
    toBuild.buildStatus.message = [];
    for(var i =1; i < toBuild.buildRequirements.length;i++){
        if(toBuild.buildRequirements[i].type === "resources")
          {
            for(var o=0;o<toBuild.buildRequirements[i].resources.length;o++){
              //console.log(toBuild.buildRequirements[i].resources[o].qty*percentBuilt);
              //console.log(urbs.resource[toBuild.buildRequirements[i].resources[o].resource]);
              if(urbs.resource[toBuild.buildRequirements[i].resources[o].resource].value >= toBuild.buildRequirements[i].resources[o].qty*percentBuilt){
                urbs.resource[toBuild.buildRequirements[i].resources[o].resource].value -= toBuild.buildRequirements[i].resources[o].qty*percentBuilt;
                result = true;
                toBuild.buildStatus.message.unshift("Construction ongoing...");
                //console.log(toBuild.buildRequirements[i].resources[o].qty*percentBuilt+" of "+urbs.resource[toBuild.buildRequirements[i].resources[o].resource].displayName+" consumed");
              }
              else{
                //console.log(toBuild.buildRequirements[i].resources[o].qty*percentBuilt+" of "+urbs.resource[toBuild.buildRequirements[i].resources[o].resource].displayName+" missing")
                toBuild.buildStatus.message.unshift("Not enough"+urbs.resource[toBuild.buildRequirements[i].resources[o].resource].displayName+" to build");
                result = false;
              }
                
              
            }
          }
    }
    return result;
  }
  ,  
  constructBuilding: function constructBuilding(urbs)
  {
    let buildPowerUsed = 0;
    let buildingBuilt = [];
    let progressedBuilding = false;
    let percentBuilt;
    console.log(urbs.queuedBuildings);
    
    for(var i=0;i<urbs.queuedBuildings.length;i++){
        console.log("in queue: "+urbs.queuedBuildings[i].displayName);        
        if(urbs.resource.buildPower.value - buildPowerUsed  >= urbs.queuedBuildings[0].buildRequirements[0].buildPoints - urbs.queuedBuildings[i].built){
          percentBuilt = (urbs.queuedBuildings[0].buildRequirements[0].buildPoints - urbs.queuedBuildings[i].built) / urbs.queuedBuildings[0].buildRequirements[0].buildPoints
          if(module.exports.constructBuildingCheckRequirements(urbs,urbs.queuedBuildings[0],percentBuilt)){
            urbs.queuedBuildings[i].built = urbs.queuedBuildings[0].buildRequirements.buildPoints;
            buildPowerUsed = urbs.queuedBuildings[0].buildPoints;
            buildingBuilt.push(urbs.queuedBuildings[i]);
            urbs.queuedBuildings.shift();
            console.log("built");            
          }
          

        }
        else{
          percentBuilt = (urbs.resource.buildPower.value - buildPowerUsed) / urbs.queuedBuildings[0].buildRequirements[0].buildPoints
          if(module.exports.constructBuildingCheckRequirements(urbs,urbs.queuedBuildings[0],percentBuilt)){
            urbs.queuedBuildings[i].built += urbs.resource.buildPower.value - buildPowerUsed
            buildPowerUsed = urbs.resource.buildPower.value - buildPowerUsed;
            console.log(urbs.queuedBuildings[i].buildStatus);
            urbs.queuedBuildings[i].buildStatus.progress = urbs.queuedBuildings[i].built/urbs.queuedBuildings[0].buildRequirements[0].buildPoints;
            urbs.queuedBuildings[i].buildStatus.display = "In progress";
            progressedBuilding = true;
            console.log("progressed");
          }
        }         
    }
    if(buildingBuilt.length > 0){
      return {built:true,progress:progressedBuilding,buildings:buildingBuilt,queue:urbs.queuedBuildings}
    }
    else{
      return {built:false,progress:progressedBuilding,buildings:buildingBuilt,queue:urbs.queuedBuildings}
    }
      
    
    /*if(urbs.queuedBuildings.length > 0){
      console.log(urbs.queuedBuildings[0]);
      console.log(urbs.resource.buildPower.value);
      urbs.queuedBuildings[0].built += urbs.resource.buildPower.value;
      if(urbs.queuedBuildings[0].built >= urbs.queuedBuildings[0].buildPoints){
        //delete urbs.queuedBuildings[0].built;
        return {built:true,progress:progressedBuilding,building:urbs.queuedBuildings[0]}
      }
      else{
        return {built:false,progress:true,buiding:urbs.queuedBuildings[0],queue:urbs.queuedBuildings}
      }
    }
    else{
      return {built:false,progress:false}
    }*/
  },    
  
}