import ReactTable from "react-table";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree from 'react-sortable-tree';
import {transformObjectInArray,mutateTreeOfObject} from '../globalUtils.js';

import { scienceCanResearch } from '../../universalLogic/runCycleScienceFunctions.js';

import 'react-sortable-tree/style.css';

export class ScienceTree extends Component {

     
  render() {  
    
    let treeData = this.props.urbsScience;
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          onChange={treeData => {console.log("treeData change")}}
          generateNodeProps={rowInfo => (                
                  /*let buttons = []
                  buttons.push(<button
                      onClick={() => console.log(rowInfo)}
                    >
                      <i className="fa fa-info-circle"></i>
                  </button>)
                  if(rowInfo.node.status.researching){
                    buttons.push("Cycle Left": rowInfo.node.status.cycleLeft)
                  }else{
                    buttons.push(<button
                      onClick={() => this.props.researchThis(rowInfo,this.state.treeData)}
                    >
                      <i className="fa fa-flask"></i>
                  </button>)
                  }*/
                  // GET DETAILS BUTTON
                  {
                  buttons: [
                    <button
                      onClick={() => console.log(rowInfo.node)}
                    >
                      <i className="fa fa-info-circle"></i>
                  </button>,!rowInfo.node.status.researched && !rowInfo.node.status.researching &&   
                    <button
                      onClick={() => this.props.researchThis(rowInfo)}
                    >
                      <i className="fa fa-flask"></i>
                  </button>
                  ],className:'cssScienceProgressTBR'
                })
              }              
        />
      </div>
    );
  }
}


export class Science extends Component{
  
   static contextTypes = {
      urbsID: PropTypes.string,
  }
  
  
  constructor (props) {
    super(props)
    this.state = {
      urbsScience: this.props.urbsScience,
      scienceSummaryToogleHidden: true,
    }
    this.researchThis = this.researchThis.bind(this)
  }

  researchThis(element){
    console.log(element.node);
    let result = scienceCanResearch(element.node,element.parentNode);
    //console.log(result);
    element.node.toBeResearched = !element.node.toBeResearched;    
      if(result.research === true || element.node.toBeResearched === false){
        //console.log(transformObjectInArray(this.props.urbsScience)) 
        //element.node.toBeResearched = true;
        let newTree = mutateTreeOfObject(this.state.urbsScience,"bid",element.node.bid,{"toBeResearched":element.node.toBeResearched,"title":"Done"},"children",true);
        if(newTree !== false){
          this.props.updateUrbs(this.context.urbsID,"updateAll","science",newTree);
          console.log(newTree);
          this.setState({urbsScience : newTree});          
        }

      }
      else{
        //console.log(result.message)
      }      
       
  }  
  
  scienceSummaryToogleHidden () {
    this.setState({
      scienceSummaryToogleHidden: !this.state.scienceSummaryToogleHidden
    })
  }
  

  render(){
    return(
      <div className = "cssScience">
        <h1> Scientifical Progress Tree </h1>
        <i className="fa fa-plus cssSectionDetail" onClick={this.scienceSummaryToogleHidden.bind(this)}></i> 
        {!this.state.scienceSummaryToogleHidden &&  <ScienceTree urbsScience = {this.state.urbsScience} researchThis = {this.researchThis} />}
      </div>
    );
  }  
}