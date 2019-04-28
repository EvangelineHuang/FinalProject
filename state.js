var wage=d3.csv("FinalData/AnnualWage.csv");
var thousand=d3.csv("FinalData/EmploymentPerThousand.csv");
var total=d3.csv("FinalData/TotalEmployment.csv");
var salary=d3.csv("FinalData/Salary.csv");
var geo=d3.json("FinalData/us-states.json");
var usAverage=d3.csv("FinalData/average.csv")
///////////////////////////////////////////////////////////////////
var drawMap=function(geoD){
  var screen={width:1000,height:1000};
  var geoGenerator=d3.geoPath().projection(d3.geoAlbersUsa())
  var svg=d3.select("svg")
            .attr("width",screen.width)
            .attr("height",screen.height)
  var states=svg.append("g")
                .selectAll("g")
                .data(geoD.features)
                .enter()
                .append("g");
  states.append("path")
        .attr("d",geoGenerator)
        .attr("stroke","orange")
        .attr("fill","none")
}
//////////////////////////////////////////////////////////////////
Promise.all([wage,thousand,total,salary,geo,usAverage]).then(function(data){
  var wage=data[0];
  var thousand=data[1];
  var total=data[2];
  var salary=data[3];
  var geo=data[4];
  var usAverage=data[5]
  var stateWage={}
  wage.forEach(function(d){
    stateWage[d.STATE]=d;
  })
  geo.features.forEach(function(d){
    d.properties.wage=stateWage[d.properties.name];
  })
  ////////
  var statePercent={}
  thousand.forEach(function(d){
    statePercent[d.STATE]=d;
  })
  geo.features.forEach(function(d){
    d.properties.percent=statePercent[d.properties.name];
  })
  ////////
  var stateEmployment={}
  total.forEach(function(d){
    stateEmployment[d.STATE]=d;
  })
  geo.features.forEach(function(d){
    d.properties.employment=stateEmployment[d.properties.name];
  })
  ///////
  var stateSalary={}
  salary.forEach(function(d){
    stateSalary[d.STATE]=d;
  })
  geo.features.forEach(function(d){
    d.properties.salary=stateSalary[d.properties.name];
  })
  console.log(stateSalary)
  console.log(geo);

  drawMap(geo)
},function(err){console.log(err)})
