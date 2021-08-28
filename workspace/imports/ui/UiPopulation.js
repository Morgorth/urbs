import React, { Component } from 'react';

export class UrbsPopAnalysis extends Component{
  
  constructor () {
    super()
    this.state = {
      childIsHidden: true,
    }
    this.childToggleHidden.bind(this);
  }
  childToggleHidden () {
    console.log("clicked");
    this.setState({
      childIsHidden: !this.state.childIsHidden
    })
  }
  
  
  render(){
    return(
      <div className = "UrbsPopAnalysis">
        <i className="fa fa-info cssGetInfo" onClick={ ()=> { this.childToggleHidden() }}></i>
        <div className = "HighLevelProperties_Current">
          {this.props.propertyName} : {Math.floor(this.props.urbs.resource[this.props.propertyName].value)}
        </div>
      
        <div className = "HighLevelProperties_Consumption">
          next cycle: + {this.props.nextCycleConsumption[this.props.propertyName]}
        </div>
        
        {!this.state.childIsHidden && <PopSocialClassesReview pop = {this.props.urbs.pop} />}
      </div>
    );
  }
};      

export class PopSocialClassesReview extends Component{ 

  render(){
    let rows = [];
    for(var key in this.props.pop){
      if (!this.props.pop.hasOwnProperty(key)) continue;
      var popClass = this.props.pop[key];     
        rows.push(<PopSocialClassReview socialClass ={popClass} key={"socialClass"+popClass.id} />)
     }    
    return(
        <div className = "PopSocialClassesReview">
         {rows}         
       </div>
    );
    }
  
};

export class PopSocialClassReview extends Component{ 
  render(){
    return(
        <div className = "PopSocialClassReview">
          {this.props.socialClass.displayName}:{Math.floor(this.props.socialClass.number)} Un-Employment Rate: {Math.floor(this.props.socialClass.unemployed / this.props.socialClass.number * 100)}%
          
      </div>
    );
  }
};    

