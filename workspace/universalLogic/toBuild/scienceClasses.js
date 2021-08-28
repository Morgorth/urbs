


module.exports = {
  
  scienceBranch: class scienceBranch{
    constructor(branchConstructor){
      this._id = null;
      this.id = branchConstructor.displayName;
      this.displayName = branchConstructor.displayName;
    }      
  },
  science: class science{
      constructor(scienceConstructor){
        this._id = null;
        this.bid = scienceConstructor.bid;
        this.displayName = scienceConstructor.displayName;
        this.description = scienceConstructor.description;
        this.branch = scienceConstructor.branch;
        this.team = scienceConstructor.team;        
        this.costs = scienceConstructor.costs;
        this.level = scienceConstructor.level;
        this.unlock = scienceConstructor.unlock,
        this.toBeResearched = false;  
        this.status = scienceConstructor.status,
        this.root = scienceConstructor.root;
        this.children = [];
        this.path = "";
        // below are used for the treeview of the science
        this.expanded = true;
        this.noDragging = true;
        this.title = this.displayName;
        this.subtitle = this.description;

       
      }
    addChild(science){
      this.children.push(science)
    }    
    
  }    
}
  
      
