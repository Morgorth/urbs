module.exports = 
  {
    Urbs: class Urbs {
      constructor(defaultBuildingArray,defaultResourceObject,defaultPopArray,defaultScienceArray) {
        this.name = "New City";
        this.resource = defaultResourceObject;
        this.buildings = defaultBuildingArray; 
        this.availableBuildings = defaultBuildingArray;
        this.pop = defaultPopArray;
        this.policies = [{applyTo:"pop",what:"growth",displayName:"Push people to breed",level:3}]   ;     
        this.science = defaultScienceArray;
        this.queuedBuildings = [];
        this.events = [];
        
      }
      // Basic Getters
      getDNR(){
        return this.DNR;
      }
      getPopulation()
      {
        return this.population;
      }
      getFood()
      {
        return this.food;       
      }
      

      addAnything(object)
      {
        let whatToAdd = Object.getOwnPropertyNames(object)[0];
        this[whatToAdd] = object.value;
      }
      addDNR(value)
      {
        this.gold = this.gold  + value;
      }
      addPop(value){
        this.population = this.population + value;
        
      }
    }
  
}