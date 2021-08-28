import { Meteor } from 'meteor/meteor';

//collections
import {Urbes} from '../imports/api/urbs.js';
import { collTempus } from '../imports/api/tempus.js';

//mongo Manager
import {updateUrbsProp} from '../server/mongoDBClasses.js';

// rules and logic
let rules = require("../universalLogic/universalRules");
let turnBased = rules.turnBased;
let urbsClass = require("./urbsClass");
let tempusClass = require ('../universalLogic/tempus.js');
let runCycle = require ('../universalLogic/runCycle functions.js');
let runCycleScience = require ('../universalLogic/runCycleScienceFunctions.js');

import { buildingsUniversalList,buildingStartingList } from '../universalLogic/toBuild/buildings.js';
import { scienceUniversalList } from '../universalLogic/toBuild/science.js';
import { resourceUniversalList } from '../universalLogic/resourcesFiles/resources.js';
import { populationUniversalList,populationStart } from '../universalLogic/population/population.js';

Meteor.startup(() => {
 console.log("-------------- server started ----------------");
  //console.log(rules);  
  /*Urbs.schema = new SimpleSchema({
    name: {type: String, defaultValue:"Urbs"},
    population: {type: Number, defaultValue: 1000},
    gold: {type: Number, defaultValue:100}
  });*/
  
  function reset()
  {  
    let defaultPopulation = populationStart;
    let resetTempus = collTempus.find().fetch()[0];
    collTempus.update(resetTempus._id,{cycle:0});
    console.log(scienceUniversalList)
    let newUrbs = new urbsClass.Urbs(buildingStartingList,resourceUniversalList,defaultPopulation,scienceUniversalList);
    //console.log(newUrbs);
    Urbes.find().forEach((urbs) => {
      Urbes.remove(urbs._id);
      //Urbes.insert(newUrbs);
      Urbes.insert(newUrbs);
      
    });
  }
  reset();
  
  
  // --------------- [ Time Creation ] ----------------
  var universalTime;
  if(collTempus.find().count()>0)
  {
    //console.log(collTempus.find().count())
    let currentTempus = collTempus.find().fetch()[0];
    universalTime = new tempusClass.Tempus(currentTempus.cycle,currentTempus._id);  
    console.log(universalTime);
  }
  else
  {    
    universalTime = new tempusClass.Tempus();
    collTempus.insert(universalTime);
  }
 
  // -------------------------- [ Cycle Run] --------------
  let increaseBy;
  function run(){
    
    
    //Time passing
    let currentCycle = universalTime.setCycle();
    console.log("------------------------------------------------------- TIME CYCLE : "+ currentCycle+ "--------------------------")
    collTempus.update(universalTime.getMongoID(),{cycle:universalTime.getCycle()})
    
  
    let stop  = 0;
    Urbes.find().forEach((urbs) => {
        // the following is just for temp, running only on the second urbs    
      /*if(stop === 0){
        stop++;
      }
      else{*/
        //console.log(urbs._id)
   

    //reset the employment numbers before recalculating them
      for(var key in urbs.pop){
        if (!urbs.pop.hasOwnProperty(key)) continue;
        var popClass = urbs.pop[key];       
        urbs.pop[popClass.id].employed =0;
        urbs.pop[popClass.id].unemployed =urbs.pop[popClass.id].number; 
      }
      //yes reset
      //console.log(urbs); 
      
      // UPDATE RESOURCES from building/pop production/consumption
      let resourceToUpdate = runCycle.updateUrbsResources(runCycle.nextCycleConsumption(urbs),urbs.resource)
      Urbes.update(urbs._id,{$set:{resource: resourceToUpdate}})
      Urbes.update(urbs._id,{$set:{pop: urbs.pop}})
      Urbes.update(urbs._id,{$set:{buildings: urbs.buildings}})
      
      // RUN EDUCATION, SCIENCE AND POP GROWTH
      let scienceResult = runCycleScience.scienceDoResearch(urbs.science,urbs.pop,urbs.resource,true);
      scienceResult ? updateUrbsProp(urbs._id,scienceResult.updater,true) : "";
      let scienceResearchedAction;  
      scienceResult.scienceResearched ? scienceResearchedAction = runCycleScience.scienceResearched(scienceResult.scienceResearched,urbs,true) : scienceResearchedAction = false;
      console.log(scienceResearchedAction.updater);
      scienceResearchedAction.toDo ?  updateUrbsProp(urbs._id,scienceResearchedAction.updater,true) : "";
      
      
      
      let education = runCycle.nextCycleEducation(populationUniversalList,urbs.buildings,true);
      //console.log(education);
      if(education.updateBuildings){
        Urbes.update(urbs._id,{$set:{buildings: education.buildings}})        
      }
      if(education.updatePop){
        let elevatePop = runCycle.elevatePop(urbs.pop,education.finishedIntake,true);   
        //console.log(elevatePop);
        if(elevatePop.updatePop){
          Urbes.update(urbs._id,{$set:{pop: elevatePop.pop}})
        }
      }
            
      // BUILD NEW BUILDINGs
      let buildingLogic = runCycle.constructBuilding(urbs);
      //console.log(buildingLogic);
      if(buildingLogic.built === true){
        Urbes.update(urbs._id,{$push:{buildings:{$each:buildingLogic.buildings}}});  
        Urbes.update(urbs._id,{$set:{queuedBuildings:buildingLogic.queue}});
        Urbes.update(urbs._id,{$set:{resource:urbs.resource}});
      }
      else if(buildingLogic.progress === true){
        Urbes.update(urbs._id,{$set:{queuedBuildings:buildingLogic.queue}});  
        Urbes.update(urbs._id,{$set:{resource:urbs.resource}});
      }
      }
      
    );
                               
    
  }
  
   var timing = (universalTime.getCycle() === 0) ? 10000 : turnBased.turnLength;
   Meteor.setInterval(function() {

    console.log("game running");
     run();
    
  
  },turnBased.turnLength );


});
