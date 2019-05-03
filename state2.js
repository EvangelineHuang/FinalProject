var annualWage=d3.csv("FinalData/AnnualWage.csv");
var annualWage2=d3.csv("FinalData/AnnualWage2.csv");
var comAnnual=d3.csv("FinalData/NationalWage.csv")
var allAnnual=d3.csv("FinalData/NationalTotalAnnual .csv")
var job=d3.csv("FinalData/Salary.csv")
var ocp=["Software Engineer","Java Developer","Web Developer","System Engineer","Application Developer","Software Test Engineer","Front End Developer","Systems Analyst","C++ Developer"]
var geo=d3.json("FinalData/us-states.json");
var lat=d3.csv("FinalData/us-states-lat.csv")
var screen={width:1150,height:1000};
//////////////////////////////////////////////////////
var drawMap=function(geoD,lat,xs){
  var sa=[]
  for(var n=0;n<xs.length;n++){
    if(xs[n]!=0){
      sa.push(xs[n])
    }
  }
  var scale=d3.scaleLinear()
              .domain([d3.min(sa),d3.max(sa)])
              .range([5,20])
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
        .on("mouseover",function(d){
          var s=d3.select(this).attr("id")
          svg.append("text")
             .attr("id","info")
          .attr("x",function(){
            for(var m=0;m<lat.length;m++)
              {if (lat[m].STATE.split(" ").join("")==s)
              {
                return projection([lat[m].Longitude,lat[m].Latitude])[0]-20+"px"
              }}
          })
          .attr("y",function(){
              for(var m=0;m<lat.length;m++)
                {if (lat[m].STATE.split(" ").join("")==s)
                {
                  return projection([lat[m].Longitude,lat[m].Latitude])[1]+"px"
                }}
            })
            .text(d.properties.name)
            .style("pointer-events","none")
            .attr("stroke","#DA9BB7");
        })
        .on("mouseout",function(){
          d3.select("#info").remove()
        })


var color=d3.scaleOrdinal(["#dc97a9", "#f2cb7c", "#edaf88", "#91b539", "#B55A52", "#b4c094", "#ff654d", "#84B0E3","#B084E3"])
        d3.selectAll("path")
          .attr("stroke-width","2")
          .attr("stroke",function(d){
            if(d.properties.hjob.job!="")
            {return color(d.properties.hjob.job)}
            else{
              return "grey"
            }
          })

        d3.select("svg")
          .selectAll("circle.lat")
          .data(lat)
          .enter()
          .append("circle")
          .attr("class","lat")
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
      console.log(xs)
 var cmax=d3.max(sa)
 var cmin=d3.min(sa)
 var cmedian=d3.median(sa)
 svg.append("circle")
    .attr("id","cmax")
    .attr("cx",900)
    .attr("cy",600)
    .attr('r',scale(cmax))
    .attr("fill","none")
    .attr("stroke","black")
    svg.append("circle")
       .attr("id","cmin")
       .attr("cx",900)
       .attr("cy",600)
       .attr('r',scale(cmin))
       .attr("fill","none")
       .attr("stroke","black")
       svg.append("circle")
          .attr("id","cmedian")
          .attr("cx",900)
          .attr("cy",600)
          .attr('r',scale(cmedian))
          .attr("fill","none")
          .attr("stroke","black")
//////////////////////////////////////////////
      svg.selectAll("rect.legend")
         .data(ocp)
         .enter()
         .append("rect")
         .attr("class","legend")
         .attr("x",880)
         .attr("y",function(d,i){
           return 330+30*i;
         })
         .attr("width",20)
         .attr("height",10)
         .attr("fill",function(d){
           return color(d)
         })
         svg.selectAll("text.legendt")
            .data(ocp)
            .enter()
            .append("text")
            .attr("class","legendt")
            .attr("x",910)
            .attr("y",function(d,i){
              return 340+30*i;
            })
            .text(function(d){return d})

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
      var y=geoD.features.map(function(d){
        return d.properties.perwage;
      })
      var all=[]
      for(var ele in y)
      {
        for(var pro in y[ele]){
          if(pro!="STATE"&&pro!="ABBR")
          {all.push(parseInt(y[ele][pro],10))}
        }
      }

      var yp=[]
      var yn=[]
      all.forEach(function(d){
        if(d>0){
          yp.push(d)
        }
        else if(d<0){
          yn.push(Math.abs(d))
        }
      })
      var max=d3.max(yp)
      var min=d3.min(yp)
      var median=d3.median(yp)
　 svg.append("text")
     .attr("id","max")
     .text(max)
     .attr("x",900)
     .attr("y",610)
  svg.append("text")
     .attr("id","min")
     .text(min)
     .attr("x",600)
     .attr("y",610)
     svg.append("text")
        .attr("id","median")
        .text(median)
        .attr("x",750)
        .attr("y",610)
      var svgDefs = svg.append('defs');
      var mainGradient = svgDefs.append('linearGradient')
          .attr('id', 'mainGradient');
      mainGradient.append('stop')
          .attr('offset', '0%')
          .attr("stop-color", "#ffffd9")
      mainGradient.append('stop')
          .attr('offset', '11%')
          .attr("stop-color", "#edf7cf")
      mainGradient.append('stop')
          .attr('offset', '22%')
          .attr("stop-color", "#d9f0c7")
      mainGradient.append('stop')
          .attr('offset', '33%')
          .attr("stop-color", "#b0e0bc")
      mainGradient.append('stop')
          .attr('offset', '44%')
          .attr("stop-color", "#8cd2b6");
      mainGradient.append('stop')
          .attr('offset', '55%')
          .attr("stop-color", "#65c3b4");
      mainGradient.append('stop')
          .attr('offset', '66%')
          .attr("stop-color", "#35b4b5");
      mainGradient.append('stop')
          .attr('offset', '77%')
          .attr("stop-color", "#0099b7");
      mainGradient.append('stop')
          .attr('offset', '88%')
          .attr("stop-color", "#005dab");
      mainGradient.append('stop')
          .attr('offset', '100%')
          .attr("stop-color", "#213a91");

      svg.append('g')
          .attr('id',"legend")
          .append('rect')
          .classed('filled', true)
          .attr('x', 20)
          .attr('y', 20)
          .attr('width', 300)
          .attr('height', 15)
          .attr('transform',"translate(600,600)");
          svg.append("line")
             .attr("x1",770)
             .attr("x2",770)
             .attr("y1",620)
             .attr("y2",635)
             .attr("stroke","white")
             .attr("stroke-width",2)
             .style("opacity",0.75)

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
    .attr("cy",700)
    .attr("cx",function(d,i){
      return 20+i*50
    })
    .attr("r","20")
    .attr("fill","none")
    .style("pointer-events","visible")
    .attr("stroke","black")
  d3.select("svg")
    .selectAll("text.p")
    .data(y)
    .enter()
    .append("text")
    .text(function(d){
      return d;
    })
    .attr("x",function(d,i){
      return 20+i*50
    })
    .attr("y",705)
    .style("text-anchor","middle")
    .style("pointer-events","none")

}
///////////////////////////////////////////////////////////
function pointColor(y){
  d3.selectAll(".point")
    .attr("fill","none")
  d3.select("#y"+y)
    .attr("fill","#F08E84")
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
                .range(["#ffffd9", "#edf7cf", "#d9f0c7", "#b0e0bc", "#8cd2b6", "#65c3b4", "#35b4b5", "#0099b7","#005dab", "#213a91"])
  var color2=d3.scaleQuantile()
               .domain(yn)
  d3.selectAll("path")
    .transition()
    .attr("fill",function(d){
      return color(d.properties.perwage[yr])
    })

}
///////////////////////////////////////////////////////////
function state(geo,year){
  var twage=geo.features.map(function(d){
    return d.properties.wage;
  })
  var all=[]
  for(var ele in twage)
  {
    for(var pro in twage[ele]){
      if(pro!="STATE"&&pro!="ABBR")
      {all.push(parseInt(twage[ele][pro],10))}
    }
  }
  var max=d3.max(all)
  var min=d3.min(all)
  var median=d3.median(all)
  d3.select("#max")
       .text(max)
       .attr("x",900)
       .attr("y",610)
    d3.select("#min")
       .text(min)
       .attr("x",600)
       .attr("y",610)
       d3.select("#median")
          .text(median)
          .attr("x",750)
          .attr("y",610)
  var colorScale=d3.scaleOrdinal()
                   .domain(all)
                   .range(["#ffffd9", "#edf7cf", "#d9f0c7", "#c5e8c0", "#b0e0bc", "#8cd2b6", "#65c3b4", "#35b4b5", "#0099b7", "#007db6","#005dab", "#213a91"])
  d3.selectAll("path")
    .transition()
    .attr("fill",function(d){
      return colorScale(parseInt(d.properties.wage[year],10))
    })}
///////////////////////////////////////////////////////////
Promise.all([annualWage,comAnnual,allAnnual,geo,job,lat,annualWage2])
       .then(function(data){
         var annualWage=data[0]
         var comAnnual=data[1]
         var allAnnual=data[2]
         var geo=data[3]
         var job=data[4]
         var lat=data[5]
         var annualWage2=data[6]
         var w=job.map(function(d){
           return parseInt(d.wage,10);
         })
         var stateWage={}
         annualWage.forEach(function(d){
           stateWage[d.STATE]=d;
         })
         var stateWage2={}
         annualWage2.forEach(function(d){
           stateWage2[d.STATE]=d;
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
         geo.features.forEach(function(d){
           d.properties.wage=stateWage2[d.properties.name];
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
         var stat="diff"
         d3.selectAll(".point")
           .on("click",function(){
             if (stat=="diff")
             {var yy=d3.select(this).attr("id").split("y")
             pointColor(yy[1])
             drawDifference(geo,yy[1])
             clearInterval(id)}
             if (stat=="state")
             {var yy=d3.select(this).attr("id").split("y")
             pointColor(yy[1])
             state(geo,yy[1])
             clearInterval(id)}
           })
           d3.select("body")
             .append("button")
             .attr("id","diff")
             .on("click",function(){
               stat="diff"
               drawDifference(geo,2001)
             })
             .text("Difference")

         d3.select("body")
           .append("button")
           .attr("id","state")
           .on("click",function(){
             stat="state"
             state(geo,2001)
           })
           .text("State")
         d3.select("body")
           .append("button")
           .attr("id","start")
           .on("click",function(){
             if (stat=="diff"){
               start();
             }
             else if (stat=="state"){
               start2();
             }
           })
           .text("Start")

           d3.select("body")
             .append("button")
             .attr("id","clear")
             .on("click",function(){
               d3.selectAll("path")
                 .attr("fill","#efe5d4")
              d3.selectAll(".point")
                .attr("fill","none")
              d3.select("#year")
                .text("")
             })
             .text("Clear")
var id;
function start()
{
    var i=1
    pointColor(year[0])
    drawDifference(geo,year[0])
    id = setInterval(frame,1000)
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
function start2()
{
    pointColor(year[0])
    state(geo,year[0])
    var i=1
    id = setInterval(frame,1000)
    function frame()
    {
      if (i==year.length)
    {
        clearInterval(id);
    }
      else
    {
        pointColor(year[i])
        state(geo,year[i])
        i++;
    }
    }
}
d3.select("body")
  .append("button")
  .attr("id","stop")
  .on("click",function(){
    clearInterval(id)
  })
  .text("Stop")
  d3.select("body")
    .append("button")
    .attr("id","restart")
    .on("click",function(){
      if (stat=="diff"){
        start();
      }
      else if (stat=="state"){
        start2();
      }
    })
    .text("Restart")
       },function(err){console.log(err)})
