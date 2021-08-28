let science = require ("./scienceClasses.js");


//creating the actual science
var sciences = {}
var sciencesArray = [];

var branches = {};
branches.society = new science.scienceBranch({displayName:"Society"});
branches.engineering = new science.scienceBranch({displayName:"Engineering"});
branches.physics = new science.scienceBranch({displayName:"Physics"});
branches.biology = new science.scienceBranch({displayName:"Biology"});

//SOCIETY

let scienceBuilder = {   bid:"S00001",
                         displayName:"Science Under Graduate School",
                         description:"This scientifical progess will allow you to build undergrad scientific schools, allowing for further research",
                         branch:branches.society,
                         team:[{id:"P0004",number:1}],
                         costs:{cycleRequired:2,resources:[{resource:'DNR',qty:100}]},
                         level:1,
                         unlock:[{type:"newBuilding",what:"scienceUnderGradSchool"}],
                         status:{researched:false,display:["No research done yet"],researching:false,cycleLeft:0,researchedPercentage:0},
                         root:true,
                       }

sciences.scienceUnderGradSchool = new science.science(scienceBuilder);
sciencesArray.push(sciences.scienceUnderGradSchool);

scienceBuilder = {       bid:"S00003",
                         displayName:"Science Graduate School",
                         description:"This scientifical progess will allow you to build scientific schools, allowing for further research",
                         branch:branches.society,
                         team:[{id:"P0004",number:1}],
                         costs:{cycleRequired:10,resources:[{resource:'DNR',qty:100}]},
                         level:1,
                         unlock:[{type:"newBuilding",what:"scienceUnderGradSchool"}],
                         status:{researched:false,display:["No research done yet"],researching:false,cycleLeft:0,researchedPercentage:0},
                       }

//sciences.scienceGradSchool = new science.science(scienceBuilder);
//sciences.scienceUnderGradSchool.addChild(new science.science(scienceBuilder));
sciencesArray[0].children.push(new science.science(scienceBuilder))

scienceBuilder = {       bid:"S00004",
                         displayName:"School of Social Policies",
                         description:"This scientifical progess will allow you to build a school dedicated to social policies",
                         branch:branches.society,
                         team:[{id:"P0004",number:1}],
                         costs:{cycleRequired:10,resources:[{resource:'DNR',qty:100}]},
                         level:1,
                         unlock:[{type:"newBuilding",what:"scienceSocialPoliciesSchool"}],
                         status:{researched:false,display:["No research done yet"],researching:false,cycleLeft:0,researchedPercentage:0},
                       }

//sciences.scienceGradSchool = new science.science(scienceBuilder);
//sciences.scienceUnderGradSchool.addChild(new science.science(scienceBuilder));
sciencesArray[0].children.push(new science.science(scienceBuilder))

// ENGINEERING


scienceBuilder = {       bid:"S00002",
                         displayName:"Engineering Tools",
                         description:"This scientifical progress will allow you to increase the level of your engineering buildings in order to produce faster",
                         branch:branches.engineering,
                         team:[{id:"P0004",number:1}],
                         costs:{cycleRequired:2,resources:[{resource:'DNR',qty:100}]},
                         level:1,
                         unlock:[{type:"upgradeBuilding",what:"basicEngineeringStation",levelMax:5}],
                         status:{researched:false,display:["No research done yet"],researching:false,cycleLeft:0,researchedPercentage:0},
                        root:true,
                       }

//sciences.engineeringTools = new science.science(scienceBuilder);
sciencesArray.push(new science.science(scienceBuilder))

scienceBuilder = {       bid:"S00005",
                         displayName:"Engineering Workshop",
                         description:"This scientifical progess will allow you to build a workshop to train your engineers",
                         branch:branches.engineering,
                         team:[{id:"P0004",number:1}],
                         costs:{cycleRequired:3,resources:[{resource:'DNR',qty:500}]},
                         level:1,
                         unlock:[{type:"newBuilding",what:"engineeringWorkshop"}],
                         status:{researched:false,display:["No research done yet"],researching:false,cycleLeft:0,researchedPercentage:0},
                       }

//sciences.scienceGradSchool = new science.science(scienceBuilder);
//sciences.engineeringTools.addChild(new science.science(scienceBuilder));
sciencesArray[1].children.push(new science.science(scienceBuilder))


//console.log(buildings);

export const scienceUniversalList = sciencesArray;

