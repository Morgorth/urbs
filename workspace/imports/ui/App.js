//system
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

//collection and DB
import { Urbes } from '../api/urbs.js';
import { collTempus } from '../api/tempus.js';

// utils and lists
import { getBuildingsAvailabletoUrbs } from '../../universalLogic/toBuild/buildingUtils.js';
import { buildingsUniversalList } from '../../universalLogic/toBuild/buildings.js';
import { scienceUniversalList } from '../../universalLogic/toBuild/science.js';
import {associatedBbjectArrayToHTMLSelectValues,getElementFromArrayById,transformObjectInArray} from '../globalUtils.js';
let runCycle = require ('../../universalLogic/runCycle functions.js');

// React UI
import {BuildingSection,BuildingBuilder,AvailableBuildingTable,ExistingBuildingSummary,CustomSelect} from './UiBuildings.js';
import { Science } from './UiScience.js';
import {ResourceSettingSlider,ResourceReview,UrbsHighLevelResource} from './UiResources.js';
import {UrbsPopAnalysis,PopSocialClassesReview,PopSocialClassReview} from './UiPopulation.js';

//external components
import {Tooltip} from 'react-tippy';

//css
import 'react-tippy/dist/tippy.css';


class UrbsHeader extends Component{   
                                   
  render() {
    let i = 0;
    //console.log(this.props.urbs.buildings)
    return (
      <div>
      <div className="UrbsInfo">
        <UrbsHighLevelResource propertyName={"DNR"} urbs={this.props.urbs} nextCycleConsumption = {this.props.nextCycleConsumption} />
        <UrbsHighLevelResource propertyName={"energy"} urbs={this.props.urbs} nextCycleConsumption = {this.props.nextCycleConsumption} />      
        <UrbsHighLevelResource propertyName={"food"} urbs={this.props.urbs} nextCycleConsumption = {this.props.nextCycleConsumption} />      
        <UrbsPopAnalysis propertyName={"population"} urbs={this.props.urbs} nextCycleConsumption = {this.props.nextCycleConsumption} />
      </div>
      
      <div>
        <BuildingSection  buildings={this.props.urbs.buildings} availableBuildings = {this.props.availableBuildings} queuedBuildings = {this.props.urbs.queuedBuildings} urbsID = {this.props.urbs._id} />
      </div>
      <div>
        <Science urbsScience = {this.props.urbs.science} updateUrbs={this.props.updateUrbs} />
      </div>
    </div>
    );
  }
}      


class App extends Component {
  constructor(){
    super();
     this.updateUrbs = this.updateUrbs.bind(this);
  }
  static childContextTypes = {
    urbsID: PropTypes.string
  };
      
 /* constructor(props, context) {
    super(props, context);
    this.state = {urbsID: this.props.urbs[1]._id };
  }  */    
  getChildContext(){
    if (this.props.urbsReady){
      return {urbsID: this.props.urbs[0]._id};      
    }

  }

  updateUrbs(id,updateHow,updateWhat,updateWith){
    
    let setter = {};
    setter[updateWhat] = updateWith;  
    let set = {$set:setter}
    //console.log(setter)
    Urbes.update(id,set,function(err,result){console.log(result)}); 
    //console.log(Urbes.find({id:id}))
  }

  
  render() {
    if (this.props.urbsReady)
    {     
      return (
        <div className="container">
          <header>
            <h1>{this.props.urbs[0].name}</h1>
            <p>Universal Cycle:{this.props.cycleReady ? this.props.cycle.cycle : "Searching..."}</p>
          </header>
            <UrbsHeader urbs = {this.props.urbs[0]} nextCycleConsumption = {this.props.nextCycleConsumption} availableBuildings = {this.props.urbs[0].availableBuildings} updateUrbs = {this.updateUrbs} />
        </div>
        
      );
    }
    else
    {
      return(
      <div className="container">
        <header>
          <h1>Loading....</h1>          
        </header>            
      </div>
        );    
    }

  }
  
}

export default withTracker(() => {  
  const urbesHandle = Meteor.subscribe('urbes');
  const cycleHandle = Meteor.subscribe('collTempus');
  
  let oneUrbsForNow = Urbes.find({}).fetch()[0];
  //associatedBbjectArrayToHTMLSelectValues();
  let availableBuildings = getBuildingsAvailabletoUrbs(oneUrbsForNow,buildingsUniversalList);
  //console.log(oneUrbsForNow);
  //var value = Urbes.find().fetch();  
  return {
    urbsReady : urbesHandle.ready(),
    urbs: Urbes.find({}).fetch(),
    cycle: collTempus.find().fetch()[0],
    cycleReady: cycleHandle.ready(),
    nextCycleConsumption: runCycle.nextCycleConsumption(oneUrbsForNow),    
  };
})(App);

//_id:"iWBbguYEqmB9dZtCp"