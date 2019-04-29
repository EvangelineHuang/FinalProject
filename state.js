var wage=d3.csv("FinalData/AnnualWage.csv");
var thousand=d3.csv("FinalData/EmploymentPerThousand.csv");
var total=d3.csv("FinalData/TotalEmployment.csv");
var salary=d3.csv("FinalData/Salary.csv");
var geo=d3.json("FinalData/us-states.json");
var usAverage=d3.csv("FinalData/average.csv")
var button=["employment","percent","salary","wage","average"]
var year=[1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
var year2=[2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
var job=["Software Engineer","Java Developer","Web Developer","Data Analyst","System Engineer","Application Developer","Programmer Analyst","Software Test Engineer","Front End Developer","Systems Analyst","C++ Developer"]
///////////////////////////////////////////////////////////////////
var drawMap=function(geoD){
  var screen={width:1000,height:600};
  var geoGenerator=d3.geoPath().projection(d3.geoAlbersUsa())
  var svg=d3.select("body")
            .append("svg")
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
///////////////////////////////////////////////////////////////////
var drawemploymentcolor=function(data,year){
  var y=data.features.map(function(d){
    return d.properties.employment[year];
  })
  var color = d3.scaleQuantile()
                .domain(y)
                .range(["#78a1e0", "#6aabe3", "#5fb5e4", "#5bbde1", "#5fc5dd", "#61c9d8", "#66cdd3", "#6ed0cd", "#71d1c5", "#76d1bd", "#7cd1b5", "#84d1ac"])
  d3.selectAll("path")
    .transition()
    .attr("fill",function(d){
      if(d.properties.salary[job]=="")
      {return "#a8aeb7";}
      else{
      return color(d.properties.employment[year]);}
    })
}
//////////////////////////////////////////////////////////
var drawwagecolor=function(data,year){
var y=data.features.map(function(d){
  return d.properties.wage[year];
})
var color=d3.scaleQuantile()
            .domain(y)
            .range(["#6fd3aa", "#7dd5a1", "#8bd697", "#9ad78e", "#a9d786", "#b2d47f", "#bad179", "#c3ce73", "#c6c76d", "#c8c067", "#cab863", "#ccb15f"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d){
        if(d.properties.salary[job]=="")
        {return "#a8aeb7";}
        else{
          return color(d.properties.wage[year]);}
      })
}
////////////////////////////////////////////////////////////
var drawpercentcolor=function(data,year){
var y=data.features.map(function(d){
  return d.properties.percent[year];
})
var color=d3.scaleQuantile()
            .domain(y)
            .range(["#ff8282", "#fe788f", "#fa719e", "#f16caf", "#e36bc0", "#d66ec9", "#c771d1", "#b775d8", "#ab7ad8", "#a07ed7", "#9681d4", "#8d84d1"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d){
        if(d.properties.percent[job]=="")
        {return "#a8aeb7";}
        else{
          return color(d.properties.percent[year]);
        }
      })
}
////////////////////////////////////////////////////////
var drawsalarycolor=function(data,job){
var y=data.features.map(function(d){
  return d.properties.salary[job];
})
var color=d3.scaleQuantile()
            .domain(y)
            .range(["#f3f589", "#f1eb7c", "#f0e070", "#eed663", "#edcb58", "#efbe51", "#f0b14d", "#f0a44a", "#f0924e", "#ec8154", "#e5715b", "#db6262"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d){
        if(d.properties.salary[job]=="")
        {return "#a8aeb7";}
        else {
        return color(d.properties.salary[job]);
        }

      })
}
//////////////////////////////////////////////////////////////////
var drawaveragecolor=function(data,job,average){
var y=data.features.map(function(d){
  return d.properties.salary[job]-average[0][job];
})
var negative=y.map(function(d){
  if(d<0)
  {return d}
})
var positive=y.map(function(d){
  if(d>0)
  {return d}
})

var color=d3.scaleQuantile()
            .domain(positive)
            .range(["#10097d", "#0047ab", "#0073be", "#009cbe", "#11c2ba"])
var color2=d3.scaleQuantile()
             .domain(negative)
             .range(["#c30b0b", "#d1342d", "#dc504a", "#e66966", "#ed8181"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d,i){
        if(d.properties.salary[job]=="")
        {return "#a8aeb7";}
        else if(y[i]>0)
        {
        return color(y[i]);
        }
        else if(y[i]<0)
        {
        return color2(y[i]);
        }
        else {
        return "white"
        }

      })
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
  var drawColor=function(data,button){

  }
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
  d3.select("body")
    .selectAll("button")
    .data(button)
    .enter()
    .append("button")
    .attr("id",function(d){
      return d;
    })
    .on("click",function(){
      var choice=d3.select(this).attr("id");
      if (choice=="employment"){
        d3.selectAll(".year").remove()
        d3.selectAll("path").attr("fill","none")
        d3.select("body")
          .append("div")
          .attr("id","employment")
          .selectAll("button")
          .data(year)
          .enter()
          .append("button")
          .classed("year",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var y=d3.select(this).attr("id")
            drawemploymentcolor(geo,y)
          })
          .text(function(d){return d})
      }
      if(choice=="wage"){
        d3.selectAll(".year").remove()
        d3.selectAll("path").attr("fill","none")
        d3.select("body")
          .append("div")
          .attr("id","wage")
          .selectAll("button")
          .data(year)
          .enter()
          .append("button")
          .classed("year",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var y=d3.select(this).attr("id")
            drawwagecolor(geo,y)
          })
          .text(function(d){return d})
      }
      if(choice=="percent"){
        d3.selectAll(".year").remove()
        d3.selectAll("path").attr("fill","none")
        d3.select("body")
          .append("div")
          .attr("id","percent")
          .selectAll("button")
          .data(year2)
          .enter()
          .append("button")
          .classed("year",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var y=d3.select(this).attr("id")
            drawpercentcolor(geo,y)
          })
          .text(function(d){return d})
      }
      if(choice=="salary"){
        d3.selectAll(".year").remove()
        d3.selectAll("path").attr("fill","none")
        d3.select("body")
          .append("div")
          .attr("id","salary")
          .selectAll("button")
          .data(job)
          .enter()
          .append("button")
          .classed("year",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var j=d3.select(this).attr("id")
            drawsalarycolor(geo,j)
          })
          .text(function(d){return d})
      }
      if(choice=="average"){
        d3.selectAll(".year").remove()
        d3.selectAll("path").attr("fill","none")
        d3.select("body")
          .append("div")
          .attr("id","salary")
          .selectAll("button")
          .data(job)
          .enter()
          .append("button")
          .classed("year",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var j=d3.select(this).attr("id")
            drawaveragecolor(geo,j,usAverage)
          })
          .text(function(d){return d})
      }
    })
    .text(function(d){
      return d;
    })
    drawMap(geo)
},function(err){console.log(err)})
