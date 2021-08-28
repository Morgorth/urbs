import React, { Component } from 'react';
import { Urbes } from '../api/urbs.js';
import PropTypes from 'prop-types';

export class ResourceSettingSlider extends Component{
  
  render(){
    return(
          <div className="slidecontainer">
            <input type="range" min="1" max="100" value={this.props.value}  className="slider" id="myRange" onChange={ (e) =>  this.props.updateSliderValue(this.props.setting,e)} onMouseUp={ (e) =>  this.props.updateDB(this.props.setting,e)} />           
            {this.props.value} {this.props.isPercent && "%"}
          </div>
      )
  }
  
}

export class ResourceReview extends Component{
  
  static contextTypes = {
      urbsID: PropTypes.string,
  }
  
  constructor(props,context){
    super(props,context)

    this.state ={};
    this.updateSliderValue = this.updateSliderValue.bind(this);
    this.updateDB = this.updateDB.bind(this);
  }

  componentWillMount(){
    
    for(var i = 0;i<this.props.resource.settings.length;i++){
      //console.log(i + ":"+this.props.resource.settings[i]);
      let valueToSend = (this.props.resource.settings[i].isPercent) ? this.props.resource.settings[i].value * 100 : this.props.resource.settings[i].value;
      this.state[this.props.resource.settings[i].what] = valueToSend;
    }    
    //console.log(this.state);
  }
  
  updateSliderValue(setting,event){
    console.log("sliding");
    //console.log(this.context);
    let stateSetter = {};
    stateSetter[this.props.resource.settings[setting].what] = event.target.value;
    this.setState(stateSetter);
  } 

  updateDB(setting,event){
    console.log("updating");
    let stringToUpdate = "resource."+this.props.propertyName+".settings."+setting+".value";
    let objectToUpdate = {}
    let valueToUpdate = (this.props.resource.settings[setting].isPercent) ? event.target.value / 100 : event.target.value;
    objectToUpdate[stringToUpdate] = valueToUpdate;
    Urbes.update(this.context.urbsID,{$set:objectToUpdate});
  } 
  render(){
        
    for(var i = 0;i<=this.props.resource.settings.length;i++){
      if(this.props.resource.settings[i].reactComponent === "ResourceSettingSlider"){
        //console.log(this.state[this.props.resource.settings[i].what]);
        return(<div><h3>{this.props.resource.settings[i].displayName}</h3> <ResourceSettingSlider value = {this.state[this.props.resource.settings[i].what]} isPercent = {this.props.resource.settings[i].isPercent} updateSliderValue = {this.updateSliderValue} updateDB = {this.updateDB} setting = {i}/></div>)
      }
    }    
  }
  
}
}

export class UrbsHighLevelResource extends Component{
  
  constructor () {
    super()
    this.state = {
      childIsHidden: true,
    }
    this.childToggleHidden.bind(this);
  }
  childToggleHidden () {
    this.setState({
      childIsHidden: !this.state.childIsHidden
    })
  }
  
  
  render(){
    return(
      <div className = "urbsHighLevelProperties">
        <i className="fa fa-info cssGetInfo" onClick={ ()=> { this.childToggleHidden() }}></i>
        <div className = "HighLevelProperties_Current">
          {this.props.propertyName} : {Math.floor(this.props.urbs.resource[this.props.propertyName].value)}
        </div>
      
        <div className = "HighLevelProperties_Consumption">
          next cycle: {this.props.nextCycleConsumption[this.props.propertyName]}
        </div>
        
        {!this.state.childIsHidden && <ResourceReview propertyName = {this.props.propertyName} resource = {this.props.urbs.resource[this.props.propertyName]} urbsID = {this.props.urbs._id} />}
      </div>
    );
  }
};