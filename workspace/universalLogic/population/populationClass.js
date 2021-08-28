module.exports = {
    
  population: class population{
      constructor(constructorObj){
        this._id = constructorObj._id;
        this.id = constructorObj.id;
        this.type = constructorObj.type;
        this.category = constructorObj.category;
        this.level = constructorObj.level;
        this.displayName = constructorObj.displayName;
        this.citizen = constructorObj.citizen;
        this.rank = constructorObj.rank;
        this.multiplier = constructorObj.multiplier;
        this.happiness = constructorObj.happiness;
        this.foodConsumption = constructorObj.foodConsumption;
        this.growthRate = constructorObj.growthRate;
        this.popDecrease = constructorObj.popDecrease;
        this.number = 0;
        this.employed = 0;
        this.unemployed = constructorObj.unemployed;
       
      }   
    getId(){
      return this._id;
    }
    inc(value){
      this.number += value;
    }
    employ(value){
      this.employed += value;
    }
           
  }  
  
}
  
      