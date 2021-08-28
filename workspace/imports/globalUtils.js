// transform an object into an array valid for an HTML select
export function associatedBbjectArrayToHTMLSelectValues(theObject,value,name){
  let result=[];
  let obj = {};
  Object.keys(theObject).forEach(function(key, index) {
    //console.log(theObject[key][name]);
    obj[theObject[key][value]]=theObject[key][name];
    //result.push( obj[theObject[key][value]]=theObject[key][name] );
  });
    
    return obj;
    
}

export function getElementFromArrayById(id,array){
  //console.log(array);
  for(var i = 0;i <= array.length;i++){
    console.log(array[i]);
    if(array[i].getId()===id)
      {
        return array[i];
      }
    else
      {
        return false;
      }
    }

}

export function getFirstResultFromArrayBySelectors(array,selectors){
 
  for(var i=0;i<array.length;i++){
    let found = false;    
    for(var k=0;k<selectors.length;k++){
      found = (array[i][selectors[k].selector] === selectors[k].value) ? true : false;
    }
    if(found){ return array[i]}
  }
}

export function getFirstResultFromArrayOfObjectsBySelectors(object,selectors,debug = false){
  let found = false;  
  for(var key in object){    
    if (!object.hasOwnProperty(key)) continue;   
    var element = object[key];
    if(debug){console.log(element.displayName)}

    for(var k=0;k<selectors.length;k++){
      if(debug){console.log(selectors[k].selector)}      
      found = (object[key][selectors[k].selector] === selectors[k].value) ? true : false;
      if(debug){console.log(found)}
      
    }
    if(found){ return object[key]}    
  }  
}

export function mutateTreeOfObject(tree,propSearched,searchedValue,mutator,recursiveSelector = null,debug = false){
  
  let found = false;
  
  function rec(tree,propSearched,searchedValue,mutator,recursiveSelector = null,debug = false){
    for(var i =0;i < tree.length;i++){
      if(debug){console.log("now looping on" + tree[i].displayName)}
      if(tree[i][propSearched] === searchedValue){
        for(var key in mutator){
          if (!mutator.hasOwnProperty(key)) continue;
          if(debug){console.log(key + " :found and changed to: " + mutator[key])}
          tree[i][key] = mutator[key]
        }        
      }else{
        if(recursiveSelector !== null && tree[i][recursiveSelector] instanceof Array && tree[i][recursiveSelector].length >0){
          if(debug){console.log("recursive call")}
          rec(tree[i][recursiveSelector],propSearched,searchedValue,mutator,recursiveSelector,debug)
        }        
      }
    }
    //recursion is incorrect I can't return the whole tree on the recursive call
    //return false;
  }
  rec(tree,propSearched,searchedValue,mutator,recursiveSelector,debug)
  return tree;
  
}

export function returnElementsFromArrayBy(array,idSelector,idSearched,firstOnly = true,recursive = false,recursiveSelector = null,setPath = false, debug = false){
  
  let result = {found:false,elements:[]}
  function rec(array,idSelector,idSearched,firstOnly = true,recursive = false,recursiveSelector = null,recursiveResult = {},setPath = false,path = "",debug=false){
    for(var i=0;i<array.length;i++){
      if(debug){console.log("Now looping on:" + array[i].displayName)}
      let root = array[i].root ? "bid" : "";
      // we record the path to get to the object
      if(setPath){
        if(array[i].root){
          //array[i].path = "." + array[i].bid;
          array[i].path = path + "." + i;
        }else{
          array[i].path = path + "."+recursiveSelector+ "." + i;
        }
        
      }
      if(array[i][idSelector] === idSearched){
        recursiveResult.found = true;        
        recursiveResult.elements.push(array[i]);      
        if(firstOnly){return result}
      }
      if(recursiveResult.found === false || firstOnly === false){
               //if(array[i][recursiveSelector] instanceof Array && recursive ){console.log(array[i][recursiveSelector].length)}
        if(recursive && array[i][recursiveSelector] instanceof Array && array[i][recursiveSelector].length>=1){
          if(debug){console.log("recursive call")}
          rec(array[i][recursiveSelector],idSelector,idSearched,firstOnly,true,recursiveSelector,recursiveResult,setPath,array[i].path,debug)
        }
      }      
    }    
  }
  
  rec(array,idSelector,idSearched,firstOnly,recursive,recursiveSelector,result,setPath,"",debug)    
  return result;
}

export function transformObjectInArray(object){
  let i=0;
  let result = [];
  for(var key in object){    
    if (!object.hasOwnProperty(key)) continue;
      result[i] = object[key];
    i++;
  }
  return result;
}