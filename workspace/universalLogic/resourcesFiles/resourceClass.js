module.exports = {
  
  resourceType: class resourceType{
    constructure(type){
      this.type = type;
    }
  }
  ,  
  resource: class resource{
      constructor(resourceConstructor){
        this._id = resourceConstructor._id;
        this.type = resourceConstructor.type;
        this.displayName = resourceConstructor.displayName;
        this.value = resourceConstructor.value;
        this.container = 0
        this.settings = resourceConstructor.settings;
       
      }   
    getId(){
      return this._id;
    }
    getType(){
      return this.type;
    }
    getValue(){
      return this.value;
    }
    
            
  }  
  
}
  
      
