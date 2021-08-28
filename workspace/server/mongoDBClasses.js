
import {Urbes} from '../imports/api/urbs.js';

module.exports = 
{
  updateUrbsProp: function updateUrbsProp(urbsID, updaterObject,debug = false){
    if(debug){console.log("updating urbs, object to update: " + updaterObject.length)}
    for(var i=0;i<updaterObject.length;i++){      
      if(updaterObject[i].save){
        // this element should be saved to DB let's proceed
        if(updaterObject[i].how==="setAllObject"){
          if(debug){console.log("updating "+updaterObject[i].what+ " as setAll")}
          //this is the easiest case, just update the whole urbs prop    
          let toSet = {}
          toSet[updaterObject[i].what] = updaterObject[i].with;
          let setter = {$set:toSet}
          Urbes.update(urbsID,setter)
        }
        else if(updaterObject[i].how==="browseArray"){
          if(debug){console.log("updating as browseArray")}            
          for(var o = 0;o<updaterObject[i].with.length;o++){
            if(debug){console.log(updaterObject[i].what[o].path)}  
            let toSet = {}
            toSet["science"+updaterObject[i].with[o].path] = updaterObject[i].with[o];
            console.log(toSet);
            let setter = {$set:toSet}
            //if(debug){console.log("setter: "+setter)}
            Urbes.update(urbsID,setter,function(err,result){console.log(result); console.log(Urbes.find({_id:urbsID}).fetch({}))})
          }    
        }
       
        
      }      
    }
  }
  
}