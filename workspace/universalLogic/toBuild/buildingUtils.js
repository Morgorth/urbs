import { buildingsUniversalList } from './buildings.js';

export function buildingPrerequisitesAreMet(urbs,prerequisites){  
  if (prerequisites === undefined || Object.keys(prerequisites).length === 0){
    return true;
  }else{
    return false; 
  }
    
}

export function getBuildingsAvailabletoUrbs(urbs,buildingList){
  let availableBuildings = [];
  Object.keys(buildingList).forEach(function(key, index) {
    if(buildingPrerequisitesAreMet(urbs,buildingList[key].getPrerequisites())){
       availableBuildings.push(buildingList[key])
       } 
  })
  return availableBuildings;
    
}