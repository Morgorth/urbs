import ReactTable from "react-table";
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Urbes } from '../api/urbs.js';

export class ToogleButton extends Component{ 
  render(){
    return(
    <label className="switch">
        <input type="checkbox" value={this.props.value} />
        <span className="slider round"></span>
    </label>
    );
  }
}
   
export class BuildingDetails extends Component{
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
   
  }
  componentDidMount() {
    console.log("bode here:"+this.myRef.current)
    this.props.buildingDetailsSetFocus(this.myRef.current);
  }  
  render(){
    return(
      <div className = "cssBuildingDetails" ref={this.myRef}>
        <h1> Building Details </h1>
        <div>{this.props.building.displayName}           
        </div>
        <div>
          Education intake: will be finished in{this.props.building.educationIntake[0].CycleLeft}  
        </div>

      </div>  
    );
  }  
}
      
export class ExistingBuildingSummary extends Component{
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }  

 //pageSize={20}
  render(){
    //let simple = [this.props.buildings.displayName,this.props.buildings.space]
    const data = this.props.buildings;
    //console.log(this.props.buildings);
     const columns = [{
    Header: 'Building Name',
    accessor: 'displayName' // String-based value accessors!
  }, {
    Header: 'Space Consumption',
    accessor: 'space'    
  },{Header:'Energy Consumption',accessor:'energyConsumption'},
    {Header:'DNR Maintenance Cost',accessor:'DNRMaintenance'},
    {Header:'Resource Produced',accessor:'resourceProduced'},
    {Header:'Production Qty',accessor:'qtyProducedPerCycle'},
    {Header:'Max Level',accessor:'levelMax'},
    {Header:'Level',accessor:'level'},
    {Header:'Status',accessor:'status.display'},
    {Header:'Details',Cell:row => (<div> <i className="fa fa-info-circle cssGetDetails" onClick={()=> { this.props.showDetails(row.index); console.log(row);}}></i></div>)}
    //{Header:'Status',Cell:row => ( <ToogleButton value={false} />)}fa-info-circle
    ]

    return( 
          <ReactTable
            data={data}
            columns={columns}
          />
      );
  }
};

//not working
class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
      
  render() {
    
    let selectoptions= [];    
    Object.keys(this.props.customSelectValues).map(function(key, value) {              
      //selectoptions.push(<option key = {key} value={key}></option>);
                         });
      
    return (
      
      <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
            {selectoptions}
          </select>
        <input type="submit" value={this.props.submitButtonValue}/>
      </form>
    );
  }
}

export  class AvailableBuildingTable extends Component{
  
  
  render(){
    //let simple = [this.props.buildings.displayName,this.props.buildings.space]
    const data = this.props.availableBuildings;
    //console.log(this.props.buildings);

     var columns = [{
    Header: 'Building Name',
    accessor: 'displayName' // String-based value accessors!
  }, {
    Header: 'Space Consumption',
    accessor: 'space'    
  },{Header:'Energy Consumption',accessor:'energyConsumption'},{Header:'DNR Costs',accessor:'buildRequirements[1].resources[0].qty'},{Header:'Build Power Required',accessor:'buildRequirements[0].buildPoints'},{Header:'Resource Produced',accessor:'resourceProduced'},{Header:'Production Qty',accessor:'qtyProducedPerCycle'}]    
    
     let customField,customField2;
    if(this.props.builder){
       customField = {Header:'Construction Progress',accessor:'buildStatus.progress',Cell:row => (<div>{row.value*100} %</div>)}; 
       columns.push(customField);
       customField2 = {Header:'Construction Status',accessor:'buildStatus.message',Cell:row => (<div>{row.value}</div>)};               
       columns.push(customField2);
      }
      else{
        customField = {Header:'Build',Cell:row => ((typeof this.props.queueUp != 'undefined') ? <div> <i className="fa fa-plus-circle cssGetDetails" onClick={()=> { this.props.queueUp(row.index)}}></i></div> : <div> <i className="fa fa-minus-circle cssRemoveBtn" onClick={()=> { this.props.unQueue(row.index)}}></i></div>)};
        columns.push(customField);
      };
  
    return( 
          <ReactTable
            pageSize={this.props.reactTableDefaultPageSize}
            data={data}
            columns={columns}
          />
      );
  }
};

                                                   
export  class BuildingBuilder extends Component{
  constructor (props) {
    super(props)
    this.state = {
      buildingQueue: this.props.queuedBuildings,
    }
    this.queueUp = this.queueUp.bind(this);
    this.unQueue = this.unQueue.bind(this);       
  } 
  
  static getDerivedStateFromProps(nextProps, prevState) {
      return {
        buildingQueue:
          nextProps.queuedBuildings,        
      };
    }
    
  queueUp(index) {
    let building = this.props.availableBuildings[index];
    building.built = 0;
    Urbes.update(this.props.urbsID,{$push:{queuedBuildings:building}});    
    let slicedState = this.state.buildingQueue.slice();
    slicedState.push(building);
    this.setState({buildingQueue:slicedState});   
    //console.log(slicedState);
  }
  
  unQueue(index){    
    let slicedState = this.state.buildingQueue.slice();
    slicedState.splice(index,1);
    Urbes.update(this.props.urbsID,{$push:{queuedBuildings:slicedState}});
    //console.log(slicedState)
    this.setState({buildingQueue:slicedState});
  }
  
  render(){
     
    return(
      <div>
       <div className="cssBuilding_Available"><h2>Available Buildings </h2>
            <AvailableBuildingTable availableBuildings={this.props.availableBuildings} queueUp = {this.queueUp} reactTableDefaultPageSize = {5} builder={false} />      
      </div>
       <div className="cssBuilding_InQueue"><h2>Buildings in construction</h2>
            <AvailableBuildingTable availableBuildings={this.state.buildingQueue} unQueue = {this.unQueue} reactTableDefaultPageSize = {5} builder = {true} />
      </div>   
      </div>
      );
  }
};

export  class BuildingSection extends Component{
  constructor () {
    super()
    this.state = {
      buildingSummaryIsHidden: true,
      builderIsHidden: true,
      buildingDetails:true,
    }
    this.buildingDetailsSetFocus = this.buildingDetailsSetFocus.bind(this)
    /*React.Children.map(this.props.children, (element, idx) => {
        return React.cloneElement(element, { ref: idx });
      })
    console.log(this.refs);*/
  }

  buildingSummaryToggleHidden () {
    this.setState({
      buildingSummaryIsHidden: !this.state.buildingSummaryIsHidden
    })
  }
  builderToggleHidden () {
    this.setState({
      builderIsHidden: !this.state.builderIsHidden
    })
  }
  buildingDetailsToggleHidden (building){
    this.setState({
      buildingDetails: !this.state.buildingDetails
    })    
    this.buildingIndex = building;
  }
  buildingDetailsSetFocus(node){
    this.childRef = node        
    window.scrollTo(0, this.childRef.offsetTop);    
  }
  render(){
    //console.log(this.props.urbs.buildings);
    return(
      <div className="cssBuildingSection">
           <div>
              <h1>Building Summary</h1> 
               <i className="fa fa-plus cssSectionDetail" onClick={this.buildingSummaryToggleHidden.bind(this)}></i> 
          </div>
          
          {!this.state.buildingSummaryIsHidden && <ExistingBuildingSummary buildings = {this.props.buildings} showDetails = {this.buildingDetailsToggleHidden.bind(this)} />}

          {!this.state.buildingDetails && <BuildingDetails buildingDetailsSetFocus={this.buildingDetailsSetFocus} building = {this.props.buildings[this.buildingIndex]} />}
          
          
          <div>
          <h1>Build</h1> 
               <i className="fa fa-plus cssSectionDetail" onClick={this.builderToggleHidden.bind(this)}></i> 
           
          </div>
           {!this.state.builderIsHidden && <BuildingBuilder availableBuildings = {this.props.availableBuildings} queuedBuildings = {this.props.queuedBuildings} urbsID = {this.props.urbsID} />}               
           
      </div>
      );
  }
};