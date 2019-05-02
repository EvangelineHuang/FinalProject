var annualWage=d3.csv("FinalData/AnnualWage.csv");
var comAnnual=d3.csv("FinalData/NationalWage.csv")
var allAnnual=d3.csv("FinalData/NationalTotalAnnual .csv")
var job=d3.csv("FinalData/Salary.csv")
var ocp=["Software Engineer","Java Developer","Web Developer","Data Analyst","System Engineer","Application Developer","Programmer Analyst","Software Test Engineer","Front End Developer","Systems Analyst","C++ Developer"]
var geo=d3.json("FinalData/us-states.json");
var lat=d3.csv("FinalData/us-states-lat.csv")
var screen={width:1150,height:1000};
//////////////////////////////////////////////////////
function drawjob(lat,xs){
  var color=d3.scaleOrdinal(["#0422FC","#FF6E46","#FF0004","#008B71","#AA00B5","#10DC3F","#10DC3F","#DCD910"])
  d3.selectAll("path")
    .attr("stroke-width","2")
    .attr("stroke",function(d){
      if(d.properties.hjob.job!="")
      {return color(d.properties.hjob.job)}
      else{
        return "grey"
      }
    })
    var projection=d3.geoAlbersUsa().scale([1300]).translate([screen.width/2-100,screen.height/2-200]);;
    var geoGenerator=d3.geoPath().projection(projection)
  var scale=d3.scaleLinear()
              .domain([d3.min(xs),d3.max(xs)])
              .range([5,20])
  d3.select("svg")
    .selectAll("circle.lat")
    .data(lat)
    .enter()
    .append("circle")
    .attr("cx",function(d){
      return projection([d.Longitude,d.Latitude])[0]
    })
    .attr("cy",function(d){
      return projection([d.Longitude,d.Latitude])[1]
    })
    .attr("r",function(d){
      if(parseInt(d.hjob.wage,10)!=0){
        return scale(parseInt(d.hjob.wage,10))
      }
      else{
        return 0;
      }
    })
    .attr("fill",function(d){
      if(d.hjob.job!="")
      {return color(d.hjob.job)}
      else{
        return "grey"
      }
    })
    .style("opacity","0.75")
}
//////////////////////////////////////////////////////
var drawMap=function(geoD,lat,xs){
  var projection=d3.geoAlbersUsa().scale([1300]).translate([screen.width/2-100,screen.height/2-200]);;
  var geoGenerator=d3.geoPath().projection(projection)
  var svg=d3.select("body")
            .append("svg")
            .attr("id","map")
            .attr("width",screen.width)
            .attr("height",screen.height)
  var states=svg.append("g")
                .selectAll("g")
                .data(geoD.features)
                .enter()
                .append("g");
  states.append("path")
        .attr("id",function(d){
          return d.properties.name.split(" ").join("");
        })
        .attr("d",geoGenerator)
        .attr("stroke","black")
        .attr("fill","#efe5d4")
var color=d3.scaleOrdinal(["#0422FC","#FF6E46","#FF0004","#008B71","#AA00B5","#10DC3F","#10DC3F","#DCD910"])
        d3.selectAll("path")
          .attr("stroke-width","2")
          .attr("stroke",function(d){
            if(d.properties.hjob.job!="")
            {return color(d.properties.hjob.job)}
            else{
              return "grey"
            }
          })
    var scale=d3.scaleLinear()
                .domain([d3.min(xs),d3.max(xs)])
                .range([5,20])
        d3.select("svg")
          .selectAll("circle.lat")
          .data(lat)
          .enter()
          .append("circle")
          .attr("id",function(d){
            return d.STATE.split(" ").join("");
          })
          .attr("cx",function(d){
            return projection([d.Longitude,d.Latitude])[0]
          })
          .attr("cy",function(d){
            return projection([d.Longitude,d.Latitude])[1]
          })
          .attr("r",function(d){
            if(parseInt(d.hjob.wage,10)!=0){
              return scale(parseInt(d.hjob.wage,10))
            }
            else{
              return 0;
            }
          })
          .attr("fill",function(d){
            if(d.hjob.job!="")
            {return color(d.hjob.job)}
            else{
              return "grey"
            }
          })
          .style("opacity","0.75")
    d3.select("circle#Florida")
      .attr("cx","780")
    d3.select("circle#Delaware")
      .attr("cx","900")
    d3.select("circle#Maryland")
      .attr("cx","900")
      .attr("cy","275")
    d3.select("circle#Connecticut")
      .attr("cx","900")
      .attr("cy","220")
    d3.select("circle#NewYork")
      .attr("cx","820")
      .attr("cy","170")
    d3.select("circle#NewJersey")
      .attr("cy","235")
    d3.select("circle#RhodeIsland")
      .attr("cx","920")
    d3.select("circle#Massachusetts")
      .attr("cy","150")
      .attr("cx","930")
    d3.select("svg")
      .append("line")
      .attr("x1",835)
      .attr("y1",265)
      .attr("x2",900)
      .attr("y2",275)
      .attr("stroke","black")
    d3.select("svg")
      .append("line")
      .attr("x1",843)
      .attr("y1",260)
      .attr("x2",900)
      .attr("y2",251)
      .attr("stroke","black")
    d3.select("svg")
      .append("line")
      .attr("x1",875)
      .attr("y1",180)
      .attr("x2","900")
      .attr("y2","220")
      .attr("stroke","black")
    d3.select("svg")
      .append("line")
      .attr("x1",890)
      .attr("y1",180)
      .attr("x2","920")
      .attr("y2","181")
      .attr("stroke","black")
    d3.select("svg")
      .append("line")
      .attr("x1",890)
      .attr("y1",160)
      .attr("y2","150")
      .attr("x2","930")
      .attr("stroke","black")
    d3.select("circle#NorthCarolina")
      .attr("cy","345")
    d3.select("circle#Kentucky")
      .attr("cy","320")
      .attr("cx","670")
    d3.select("circle#Louisiana")
      .attr("cx","550")
    d3.select("circle#Idaho")
      .attr("cy","160")
    d3.select("circle#Michigan")
      .attr("cy","180")
      .attr("cx","670")
    d3.select("circle#Hawaii")
      .attr("cy","580")
      .attr("cx","305")
}
///////////////////////////////////////////////////////////
function drawpoint(y){
  d3.select("svg")
    .selectAll("circle.point")
    .data(y)
    .enter()
    .append("circle")
    .attr("class","point")
    .attr("id",function(d){
      return "y"+d;
    })
    .attr("cy",650)
    .attr("cx",function(d,i){
      return 20+i*50
    })
    .attr("r","20")
    .attr("fill","none")
    .style("pointer-events","visible")
    .attr("stroke","black")
  d3.select("svg")
    .selectAll("text")
    .data(y)
    .enter()
    .append("text")
    .text(function(d){
      return d;
    })
    .attr("x",function(d,i){
      return 20+i*50
    })
    .attr("y",655)
    .style("text-anchor","middle")
    .style("pointer-events","none")
}
///////////////////////////////////////////////////////////
function pointColor(y){
  d3.selectAll(".point")
    .attr("fill","none")
  d3.select("#y"+y)
    .attr("fill","lightblue")
}
///////////////////////////////////////////////////////////
var drawDifference=function(geo,yr){
  d3.select("p")
    .text(yr)
  var y=geo.features.map(function(d){
    return d.properties.perwage[yr];
  })
  var yp=[]
  var yn=[]
  y.forEach(function(d){
    if(d>0){
      yp.push(d)
    }
    else if(d<0){
      yn.push(Math.abs(d))
    }
  })
  var color = d3.scaleQuantile()
                .domain(yp)
                .range(["#b3f5b5","#a1f2b2", "#8df0b1",  "#77edb1", "#5aeab2","#32e0c1","#01d5cd",  "#00c9d3",  "#00b1db", "#0096df","#0078da","#1f54c5"])
  var color2=d3.scaleQuantile()
               .domain(yn)
  d3.selectAll("path")
    .transition()
    .attr("fill",function(d){
      return color(d.properties.perwage[yr])
    })
}
///////////////////////////////////////////////////////////
Promise.all([annualWage,comAnnual,allAnnual,geo,job,lat])
       .then(function(data){
         var annualWage=data[0]
         var comAnnual=data[1]
         var allAnnual=data[2]
         var geo=data[3]
         var job=data[4]
         var lat=data[5]
         var w=job.map(function(d){
           return parseInt(d.wage,10);
         })
         var stateWage={}
         annualWage.forEach(function(d){
           stateWage[d.STATE]=d;
         })
         var year=allAnnual.map(function(d){
           return d.year
         })
         var dictAnnual={}
         allAnnual.forEach(function(d){
           dictAnnual[d.year]=parseInt(d.a_mean,10);
         })
         var jobdict={}
         job.forEach(function(d){
           jobdict[d.STATE]=d;
         })
         for(var key in stateWage)
         {
           if(key!="STATE" && key!="ABBR")
           {
             for(var i=0;i<year.length;i++)
             {
               stateWage[key][year[i]]=parseInt(stateWage[key][year[i]],10)-dictAnnual[year[i]]
             }
           }
         }
         geo.features.forEach(function(d){
           d.properties.perwage=stateWage[d.properties.name];
         })
         geo.features.forEach(function(d){
           d.properties.hjob=jobdict[d.properties.name];
         })
         var jobdict2={}
         job.forEach(function(d){
           jobdict2[d.STATE]=d;
         })
         lat.forEach(function(d){
           d.hjob=jobdict2[d.STATE];
         })
         console.log(geo)
         drawMap(geo,lat,w)
         drawpoint(year)
         d3.selectAll(".point")
           .on("click",function(){
             var yy=d3.select(this).attr("id").split("y")
             pointColor(yy[1])
             drawDifference(geo,yy[1])
           })

         d3.select("body")
           .append("button")
           .on("click",start)
           .text("Start")

function start()
{
    var i=0
    var id = setInterval(frame,1000)
    function frame()
    {
      if (i==year.length)
    {
        clearInterval(id);
    }
      else
    {
        pointColor(year[i])
        drawDifference(geo,year[i])
        i++;
    }
    }
}


       },function(err){console.log(err)})
