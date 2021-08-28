


module.exports = {
  
  nature: class nature{
    constructor(nature){
      this.nature = nature;
    }
  },
  category: class category{
    constructor(category,nature){
      this.category = category;
      this.nature = nature;
    }
  },    
  type: class type{
    constructor(type,category){
      this.type = type;
      this.category = category
    }
  },
  scale: class scale{
    constructor(scale){
      this.scale = scale;
    }
  },  
  building: class building{
      constructor(buildingConstructor){
        this.bid = buildingConstructor.bid;
        this.Nature = buildingConstructor.nature;
        this.Category = buildingConstructor.category;
        this.Type = buildingConstructor.type;
        this.scale = buildingConstructor.scale;
        this.displayName = buildingConstructor.displayName;
        this.level = buildingConstructor.level;
        this.levelMax = buildingConstructor.levelMax;
        this.levelMultiplier = buildingConstructor.levelMultiplier;        
        this.space = buildingConstructor.space;
        this.energyConsumption = buildingConstructor.energy;
        this.DNRCost = buildingConstructor.DNRCost
        this.DNRMaintenance = buildingConstructor.DNRMaintenance;
        this.manPowerRequired = buildingConstructor.manPowerRequired;   
        this.buildRequirements = buildingConstructor.buildRequirements;   
        this.buildPoints = buildingConstructor.buildPoints;
        this.buildStatus = buildingConstructor.buildStatus;
        this.prerequisites = buildingConstructor.prerequisites;
        this.resourceProduced = buildingConstructor.resourceProduced;
        this.educationProduced = buildingConstructor.educationProduced,
        this.qtyProducedPerCycle = buildingConstructor.qtyProducedPerCycle;
        this.status = buildingConstructor.status;
       
      }
    
    getPrerequisites(){
      return this.prerequisites;
    }
    getId(){
      return this._id;
    }
      
            
  }  
  
}
  
      
