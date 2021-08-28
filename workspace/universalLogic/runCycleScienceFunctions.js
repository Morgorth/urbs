import { returnElementsFromArrayBy } from '../imports/globalUtils.js';
import { buildingsUniversalList } from '../universalLogic/toBuild/buildings.js';

module.exports = 
{
  scienceCanResearch: function scienceCanResearch(science,scienceParent){
    let result = {}
    if (scienceParent !== null && scienceParent.status.researched === false){
      result.research = false;
      result.message = "Dependent scientific progress is unknown, research it first";
      return result
    }
    else{
      result.research = true;
      result.message = "You can research this scientific progress";
      return result      
    }
      
  },
  teamRequirementsMet: function(teamRequired,pop,execute = false){
    let result = {met:true,message:"You have the necessary research team"};
    for(var o = 0;o<teamRequired.length;o++){       
      if(pop[teamRequired[o].id] !== undefined && pop[teamRequired[o].id].unemployed >= teamRequired[o].number ){
        //console.log(pop[teamRequired[o].id])
        if(execute){
          pop[teamRequired[o].id].unemployed -= teamRequired[o].number;
          pop[teamRequired[o].id].employed += teamRequired[o].number;
          result.toSave = pop;
        }
      }
      else{
        result.met = false
        result.message = "You need more " + pop[teamRequired[o].id].displayName;
      }
    }
    return result;
  },
  scienceCostsRequirementsMet: function scienceCostsRequirements(costs,resources,execute = false){

    let result = {met:true,message:["You can afford the costs of research"]}
    let resourceCosts = costs.resources;
    for(var i=0;i<resourceCosts.length;i++){
      if(resources[resourceCosts[i].resource].value >= resourceCosts[i].qty / costs.cycleRequired){
        if(execute){
         resources[resourceCosts[i].resource].value -= resourceCosts[i].qty / costs.cycleRequired;
         result.toSave = resources; 
        } 
      }
      else{
        result.met = false;
        result.message.push("Need " + resources[resourceCosts[i].resource].value - resourceCosts[i].qty / costs.cycleRequired   + " " + resourceCosts[i].qty + " more") 
      }
    }
    return result;
  }
  ,
  scienceResearched(scienceArray,urbs,debug = false){       
    let updater = {what:"buildings",how:"setAllObject",with:{},save:false}
    let result = {};
    result.updater = [];
    
    if(debug){console.log("Nbr of progress researched = " + scienceArray.length)}  
    for(var i = 0;i<scienceArray.length;i++){
      // for each science that was researched
      if(debug){console.log("science researched: " + scienceArray[i].displayName) }  
      if(debug){console.log(scienceArray[i])}
      for(let o = 0;o < scienceArray[i].unlock.length;o++){
        result.toDo = true;
        // for each unlock of that science
        if(scienceArray[i].unlock[o].type === "upgradeBuilding"){    
          urbs.buildings[scienceArray[i].unlock[o].what].levelMax = scienceArray[i].unlock[o].levelMax
          updater.save = true;
          updater.with = urbs.buildings;          
        }
        else if(scienceArray[i].unlock[o].type === "newBuilding"){  
        updater.what = "availableBuildings";  
        urbs.availableBuildings.push(buildingsUniversalList[scienceArray[i].unlock[o].what]); 
        updater.save = true;
        updater.with = urbs.availableBuildings;
        }
        result.updater.push(updater)
      }
    }   
    return result;
  }
  ,scienceDoResearch: function scienceDoResearch(science,pop,resources,debug = false){
    let result ={updater:[],scienceResearched:[]};
    let updater = [{what:"pop",how:"setAllObject",with:{},save:false,setAll:true},{what:"science",with:{},save:false,setAll:false,how:"browseArray",path:[]},{what:"resource",how:"setAllObject",with:{},save:false,setAll:true}]
    
    //science[0].toBeResearched = true;
    let TBR = returnElementsFromArrayBy(science,"toBeResearched",true,false,true,"children",true);    
    if(TBR.found){
      let popNeeded = [];
      for(var i = 0;i<TBR.elements.length;i++){
        if(debug){console.log("now researching: " + TBR.elements[i].displayName)}        
        // RESEARCH TEAM REQUIREMENTS   
        let teamRequirements = module.exports.teamRequirementsMet(TBR.elements[i].team,pop);        
        if(teamRequirements.met){
          if(debug){console.log("team requirements are met")}
          let costsRequirements = module.exports.scienceCostsRequirementsMet(TBR.elements[i].costs,resources);
          // team requirements are met so we proceed
          if(costsRequirements.met){
            if(debug){console.log("costs requirements are met")}
            // All Requirements are met we can research
            teamRequirements = module.exports.teamRequirementsMet(TBR.elements[i].team,pop,true);
            let costsRequirements = module.exports.scienceCostsRequirementsMet(TBR.elements[i].costs,resources,true);            
            if(teamRequirements.met && costsRequirements.met){
              // first time researching, let's set up the count
              if(TBR.elements[i].status.researching === false){
                if(debug){console.log("first time researching that science")}
                TBR.elements[i].status.researching = true;
                TBR.elements[i].status.display.push("Research in progress");
                TBR.elements[i].status.cycleLeft = TBR.elements[i].costs.cycleRequired +1;
              }
              TBR.elements[i].status.cycleLeft -= 1; 
              if(debug){console.log("research effective, cycle left: " + TBR.elements[i].status.cycleLeft)}
              pop = teamRequirements.toSave;
              updater[0].save = true;
              updater[0].with = pop;
              resources = costsRequirements.toSave;
              updater[2].save = true;
              updater[2].with = resources;              


              if(TBR.elements[i].status.cycleLeft===0){  
                if(debug){console.log("researched is finished")}
                TBR.elements[i].status.researching = false;
                TBR.elements[i].toBeResearched = false;
                TBR.elements[i].status.researched = true;
                TBR.elements[i].status.display = ["This science is known"];
                result.scienceResearched.push(TBR.elements[i])
              }
              updater[1].save = true;
              updater[1].with = TBR.elements;  
              
            }            
          }
          else{
            // Costs Requirements are unmet
            if(debug){console.log("costs requirements are unmet")}
            TBR.elements[i].status.display.concat(costsRequirements.message);
          }
        }//TEAM requirements are unmet
        else{
          if(debug){console.log("team requirements are unmet")}
          TBR.elements[i].status.display.concat(teamRequirements.message);
        }                  
      }

      result.updater = updater;
      return result;
    }
    return false;
  }
  
}