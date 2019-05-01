var wage=d3.csv("FinalData/AnnualWage.csv");
var thousand=d3.csv("FinalData/EmploymentPerThousand.csv");
var total=d3.csv("FinalData/TotalEmployment.csv");
var salary=d3.csv("FinalData/Salary.csv");
var geo=d3.json("FinalData/us-states.json");
var usAverage=d3.csv("FinalData/average.csv")
var button=["employment","percent","salary","wage","average","correlation","overview"]
var nation=d3.csv("FinalData/NationalWage.csv")
var year=[1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
var year2=[2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
var job=["Software Engineer","Java Developer","Web Developer","Data Analyst","System Engineer","Application Developer","Programmer Analyst","Software Test Engineer","Front End Developer","Systems Analyst","C++ Developer"]
var screen={width:1150,height:600};
var national=50620;
///////////////////////////////////////////////////////////////////
var drawMap=function(geoD){
  var projection=d3.geoAlbersUsa().scale([1300]).translate([screen.width/2-100,screen.height/2]);;
  var geoGenerator=d3.geoPath().projection(projection)
  var svg=d3.select("#body")
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
          return d.properties.name;
        })
        .attr("d",geoGenerator)
        .attr("stroke","black")
        .attr("fill","#efe5d4")

}
////////////////////////////////////////////////////////////
var correlation=function(s,geo){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=500;
  var height=500;
  var p=geo.features.map(function(d){
    return d.properties.name
  })
  var ind=p.indexOf(s)
  var wg=geo.features.map(function(d){
    return d.properties.wage;
  })
  var ep=geo.features.map(function(d){
    return d.properties.employment;
  })
  var pair=[]
  for(var m=0;m<year.length;m++){
    pair.push({x:wg[ind][year[m]],y:ep[ind][year[m]]})}

 console.log(pair)
  var xScale2=d3.scaleLinear()
                .domain([d3.min(pair,function(d){return d.x}),d3.max(pair,function(d){return d.x})])
                .range([margins.left+10,width+margins.left])
  var yScale2=d3.scaleSymlog()
               .domain([d3.min(pair,function(d){return d.y}),d3.max(pair,function(d){return d.y})])
               .range([height,margins.top])
   var svg2=d3.select("#body")
              .append("svg")
              .attr("width",width+margins.right+margins.left)
              .attr("height",height+margins.top+margins.bottom)
    svg2.selectAll("circle")
        .data(pair)
        .enter()
        .append("circle")
        .attr("cx",function(d){return xScale2(d.x)})
        .attr("cy",function(d){return yScale2(d.y)})
        .attr("r","5")
        .attr("id",function(d,i){
          return "y"+year[i]
        })
    var xAxis2=d3.axisBottom(xScale2);
    var yAxis2=d3.axisLeft(yScale2);
    svg2.append("g")
       .classed("xAxis3",true)
       .call(xAxis2)
       .attr("transform","translate(0,"+height+")");
    svg2.append("g")
       .classed("yAxis3",true)
       .call(yAxis2)
       .attr("transform","translate("+(margins.left+margins.right)+",0)");
       var mx=d3.mean(pair, function(d){return d.x;})
       var my=d3.mean(pair,function(d){return d.y;})
       var top=pair.map(function(d,i)
       {
         return (pair[i].x-mx)*(pair[i].y-my);
       })
       var topSum=d3.sum(top);
       var sx=d3.deviation(pair,function(d){return d.x});
       var sy=d3.deviation(pair,function(d){return d.y});
       var r=(1/(pair.length-1))*(topSum/(sx*sy))
    d3.select("#body")
      .append("p")
      .text("r="+r.toFixed(2))
}
///////////////////////////////////////////////////////////////////
var drawemploymentcolor=function(data,year){
  var y=data.features.map(function(d){
    return d.properties.employment[year];
  })
  var color = d3.scaleQuantile()
                .domain(y)
                .range(["#b3f5b5","#a1f2b2",  "#8df0b1",  "#77edb1", "#5aeab2","#32e0c1","#01d5cd",  "#00c9d3",  "#00b1db", "#0096df","#0078da","#1f54c5",
])
  d3.selectAll("path")
    .transition()
    .attr("fill",function(d){
      if(d.properties.employment[year]=="")
      {return "#a8aeb7";}
      else{
      return color(d.properties.employment[year]);}
    })
  d3.selectAll("g")
    .attr("id",year)
    .attr("class","employment");
}
//////////////////////////////////////////////////////////
var drawwagecolor=function(data,year){
var y=data.features.map(function(d){
  return d.properties.wage[year];
})
var color=d3.scaleQuantile()
            .domain(y)
            .range(["#e0ff79", "#c7f673", "#aeec6f", "#94e26b", "#79d869", "#5ace74", "#39c37d", "#00b884", "#00a992", "#009898", "#008795", "#1c758b"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d){
        if(d.properties.wage[year]=="")
        {return "#a8aeb7";}
        else{
          return color(d.properties.wage[year]);}
      })
      d3.selectAll("g")
        .attr("id",year)
        .attr("class","wage");
}
////////////////////////////////////////////////////////////
var drawpercentcolor=function(data,year){
var y=data.features.map(function(d){
  return d.properties.percent[year];
})
var color=d3.scaleQuantile()
            .domain(y)
            .range(["#c7a7fe", "#b899fa", "#a88cf7", "#977ff3", "#8473f0", "#7567ea", "#665ce3", "#5551dd", "#4744d2", "#3737c7", "#252abc", "#041cb1"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d){
        if(d.properties.percent[year]=="")
        {return "#a8aeb7";}
        else{
          return color(d.properties.percent[year]);
        }
      })
      d3.selectAll("g")
        .attr("id",year)
        .attr("class","percent");

}
////////////////////////////////////////////////////////
var drawsalarycolor=function(data,job){
var y=data.features.map(function(d){
  return d.properties.salary[job];
})
var color=d3.scaleQuantile()
            .domain(y)
            .range(["#ede881", "#ebdc6d", "#ead059", "#e9c346", "#e8b631", "#e8aa24", "#e79e17", "#e79208", "#e58509", "#e3770d", "#e06912", "#dc5b17"])
    d3.selectAll("path")
      .transition()
      .attr("fill",function(d){
        if(d.properties.salary[job]=="")
        {return "#a8aeb7";}
        else {
        return color(d.properties.salary[job]);
        }
      })
      d3.selectAll("g")
        .attr("id",job)
        .attr("class","salary");
}
//////////////////////////////////////////////////////////////////
var drawaveragecolor=function(data,job,average){
var y=data.features.map(function(d){
  return d.properties.salary[job]-average[0][job];
})
var negative=[]
y.forEach(function(d){
  if(d<0)
  {negative.push(parseInt(d,10))}
})
var positive=[]
y.forEach(function(d){
  if(d>0)
  {positive.push(parseInt(d,10))}
})
var color=d3.scaleQuantile()
            .domain(positive)
            .range(["#11c2ba","#10097d","#0047ab", "#0073be", "#009cbe"])
var color2=d3.scaleQuantile()
             .domain(negative)
             .range(["#ed8181","#c30b0b","#d1342d", "#dc504a","#e66966"])
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
/////////////////////////////////////////////////
var drawemchange=function(state,geo,yr){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=500;
  var height=500;
  var width2=700;
  var svg=d3.select("#body")
            .append("svg")
            .attr("width",width+margins.right+margins.left)
            .attr("height",height+margins.top+margins.bottom)
  var s=geo.features.map(function(d){
    return d.properties.employment;
  })
  var w;
  for(var i=0;i<s.length;i++){
  if(s[i].STATE==state)
  {
    w=s[i]
    break
  }
}
var array=[];
for(var l=0;l<year.length;l++){
  array.push(parseInt(w[year[l]],10))
}
var ny=[]
for(var l=1;l<year.length;l++){
  ny.push(year[l])
}
  var xScale=d3.scaleLinear()
               .domain([0,array.length])
               .range([margins.left+10,width+margins.left])
  var yScale=d3.scaleLinear()
               .domain([d3.min(array),d3.max(array)])
               .range([height,margins.top])
  var line=d3.line()
             .x(function(d,i){return xScale(i)})
             .y(function(d){return yScale(d)})
  svg.append("path")
     .datum(array)
     .classed("line",true)
     .attr("d",line)
     .attr("fill","none")
     .attr("stroke","black");
  var xAxis=d3.axisBottom(xScale);
  var yAxis=d3.axisLeft(yScale);
  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate(0,"+height+")");
  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left+margins.right)+",0)");
  svg.selectAll("circle")
     .data(array)
     .enter()
     .append("circle")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r","5")
     .attr("fill","black")
 var change=[]
 for(var i=0;i+1<array.length;i++){
   change.push(array[i+1]-array[i]);
 }
 var xScale2=d3.scaleLinear()
              .domain([0,change.length])
              .range([margins.left+10,width+margins.left])
 var yScale2=d3.scaleSymlog()
              .domain([d3.min(change,function(d){return Math.abs(d)}),d3.max(change,function(d){return Math.abs(d)})])
              .range([height,margins.top])
  var svg2=d3.select("#body")
             .append("svg")
             .attr("width",width+margins.right+margins.left)
             .attr("height",height+margins.top+margins.bottom)
   svg2.selectAll("rect")
       .data(change)
       .enter()
       .append("rect")
       .attr("x",function(d,i){return xScale2(i)})
       .attr("y",function(d){return yScale2(Math.abs(d))})
       .attr("width",width/change.length-5)
       .attr("height",function(d){return height-yScale2(Math.abs(d))})
       .attr("id",function(d,i){
         return "y"+ny[i]
       })
       .attr("fill",function(d){
         if(d>0){
           return "#5FE187"
         }
         else{
           return "#FF6163"
         }
       });
   var xAxis2=d3.axisBottom(xScale2).ticks(ny);
   var yAxis2=d3.axisLeft(yScale2);
   svg2.append("g")
      .classed("xAxis2",true)
      .call(xAxis2)
      .attr("transform","translate(0,"+height+")");
   svg2.append("g")
      .classed("yAxis2",true)
      .call(yAxis2)
      .attr("transform","translate("+(margins.left+margins.right)+",0)");
      var name=geo.features.map(function(d){
        return d.properties.name
      })
  var allstate=geo.features.map(function(d){
    return parseInt(d.properties.employment[yr],10);
  })
      var xScale3=d3.scaleLinear()
                   .domain([0,allstate.length])
                   .range([margins.left+20,width2+margins.left])
      var yScale3=d3.scaleSymlog()
                   .domain([d3.min(allstate),d3.max(allstate)])
                   .range([height,margins.top])
       var svg3=d3.select("#body")
                  .append("svg")
                  .attr("width",width2+margins.right+margins.left)
                  .attr("height",height+margins.top+margins.bottom)
        svg3.selectAll("rect")
            .data(allstate)
            .enter()
            .append("rect")
            .attr("x",function(d,i){return xScale3(i)})
            .attr("y",function(d){return yScale3(d)})
            .attr("width",width2/allstate.length-5)
            .attr("height",function(d){return height-yScale3(d)})
            .attr("id",function(d,i){
              return "s"+name[i].split(" ").join("")
            })
            .attr("fill","#CBBFFA")
            svg3.select("#s"+state.split(" ").join(""))
                .attr("stroke","#8FA1FF")
                .attr("stroke-width","3")
            var xAxis3=d3.axisBottom(xScale3);
            var yAxis3=d3.axisLeft(yScale3);
           svg3.append("g")
               .classed("xAxis3",true)
               .call(xAxis3)
               .attr("transform","translate(0,"+height+")");
           svg3.append("g")
               .classed("yAxis3",true)
               .call(yAxis3)
               .attr("transform","translate("+(margins.left+margins.right+10)+",0)");
    svg2.select("#y"+yr)
        .attr("stroke","#8FA1FF")
        .attr("stroke-width","3")
    d3.select("#body")
      .append("div")
      .classed("ex",true)
      .append("p")
      .text(state);
    d3.select(".ex")
      .append("p")
      .text(yr);
    d3.select(".ex")
      .append("p")
      .text(function(){
        var da=ny.indexOf(parseInt(yr,10));
        var c=change[da];
        if (c>0)
        {return "Increase "+c+" corresponding to previous year"}
        else if(c<0)
        {return "Decrease "+Math.abs(c)+" corresponding to previous year"}
        else
        {
         return "No change corresponding to previous year"
        }
      })
}
///////////////////////////////////////////////
var drawannualchange=function(state,geo,yr,na){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=500;
  var height=500;
  var width2=700;
  var svg=d3.select("#body")
            .append("svg")
            .attr("width",width+margins.right+margins.left)
            .attr("height",height+margins.top+margins.bottom)
  var s=geo.features.map(function(d){
    return d.properties.wage;
  })
  var w;
  for(var i=0;i<s.length;i++){
  if(s[i].STATE==state)
  {
    w=s[i]
    break
  }
}
var dict={}
na.forEach(function(d){
  dict[d.year]=d.wage;
})
var array=[];
for(var l=0;l<year.length;l++)
{
  array.push(parseInt(w[year[l]],10))
}
var ny=[]
for(var l=1;l<year.length;l++){
  ny.push(year[l])
}
  var n=na.map(function(d){return parseInt(d.wage,10)})
  var temp=n.concat(array)
  var xScale=d3.scaleLinear()
               .domain([0,array.length])
               .range([margins.left+10,width+margins.left])
  var yScale=d3.scaleLinear()
               .domain([0,d3.max(temp)])
               .range([height,margins.top])
  var line=d3.line()
             .x(function(d,i){return xScale(i)})
             .y(function(d){return yScale(d)})
  svg.append("path")
     .datum(array)
     .classed("line",true)
     .attr("d",line)
     .attr("fill","none")
     .attr("stroke","black");
  svg.append("path")
     .datum(n)
     .classed("line2",true)
     .attr("d",line)
     .attr("fill","none")
     .attr("stroke","black");
  var xAxis=d3.axisBottom(xScale);
  var yAxis=d3.axisLeft(yScale);
  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate(0,"+height+")");
  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left+margins.right)+",0)");
  svg.selectAll("circle")
     .data(array)
     .enter()
     .append("circle")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r","5")
     .attr("fill","black")
  svg.selectAll("circle.nation")
     .data(n)
     .enter()
     .append("circle")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r","5")
     .attr("fill","#FF8887")
 var change=[]
 for(var i=0;i+1<array.length;i++){
   change.push(array[i+1]-array[i]);
 }
 var xScale2=d3.scaleLinear()
              .domain([0,change.length])
              .range([margins.left+10,width+margins.left])
 var yScale2=d3.scaleSymlog()
              .domain([d3.min(change,function(d){return Math.abs(d)}),d3.max(change,function(d){return Math.abs(d)})])
              .range([height,margins.top])
  var svg2=d3.select("#body")
             .append("svg")
             .attr("width",width+margins.right+margins.left)
             .attr("height",height+margins.top+margins.bottom)
   svg2.selectAll("rect")
       .data(change)
       .enter()
       .append("rect")
       .attr("x",function(d,i){return xScale2(i)})
       .attr("y",function(d){return yScale2(Math.abs(d))})
       .attr("width",width/change.length-5)
       .attr("height",function(d){return height-yScale2(Math.abs(d))})
       .attr("id",function(d,i){
         return "y"+ny[i]
       })
       .attr("fill",function(d){
         if(d>0){
           return "#5FE187"
         }
         else{
           return "#FF6163"
         }
       });
   var xAxis2=d3.axisBottom(xScale2);
   var yAxis2=d3.axisLeft(yScale2);
  svg2.append("g")
      .classed("xAxis2",true)
      .call(xAxis2)
      .attr("transform","translate(0,"+height+")");
  svg2.append("g")
      .classed("yAxis2",true)
      .call(yAxis2)
      .attr("transform","translate("+(margins.left+margins.right)+",0)");
  svg2.select("#y"+yr)
      .attr("stroke","#8FA1FF")
      .attr("stroke-width","3")
var allwage=geo.features.map(function(d){
  return d.properties.wage[yr];
})
var name=geo.features.map(function(d){
  return d.properties.name
})
var xScale3=d3.scaleLinear()
             .domain([0,allwage.length])
             .range([margins.left+20,width2+margins.left])
var yScale3=d3.scaleLinear()
             .domain([d3.min(allwage),d3.max(allwage)])
             .range([height,margins.top])
 var svg3=d3.select("#body")
            .append("svg")
            .attr("width",width2+margins.right+margins.left)
            .attr("height",height+margins.top+margins.bottom)
  svg3.selectAll("rect")
      .data(allwage)
      .enter()
      .append("rect")
      .attr("x",function(d,i){return xScale3(i)})
      .attr("y",function(d){return yScale3(d)})
      .attr("width",width2/allwage.length-5)
      .attr("height",function(d){return height-yScale3(d)})
      .attr("id",function(d,i){
        return "s"+name[i].split(" ").join("")
      })
      .attr("fill","#CBBFFA")
      svg3.select("#s"+state.split(" ").join(""))
          .attr("stroke","#8FA1FF")
          .attr("stroke-width","3")
      var xAxis3=d3.axisBottom(xScale3);
      var yAxis3=d3.axisLeft(yScale3);
     svg3.append("g")
         .classed("xAxis3",true)
         .call(xAxis3)
         .attr("transform","translate(0,"+height+")");
     svg3.append("g")
         .classed("yAxis3",true)
         .call(yAxis3)
         .attr("transform","translate("+(margins.left+margins.right+10)+",0)");
     svg3.append("line")
         .attr("x1",margins.left+20)
         .attr("y1",yScale3(dict[yr]))
         .attr("x2",width2+margins.left)
         .attr("y2",yScale3(dict[yr]))
         .attr("stroke","#A33E00")
         .attr("stroke-width","2")
         d3.select("#body")
           .append("div")
           .classed("ex",true)
           .append("p")
           .text(state);
         d3.select(".ex")
           .append("p")
           .text(yr);
         d3.select(".ex")
           .append("p")
           .text(function(){
             var da=ny.indexOf(parseInt(yr,10));
             var c=change[da];
             if (c>0)
             {return "Increase "+c+" corresponding to previous year"}
             else if(c<0)
             {return "Decrease "+Math.abs(c)+" corresponding to previous year"}
             else
             {
              return "No change corresponding to previous year"
             }
           })
}
///////////////////////////////////////////////
var drawpercentchange=function(state,geo,yr){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=500;
  var height=500;
  var width2=700;
  var svg=d3.select("#body")
            .append("svg")
            .attr("width",width+margins.right+margins.left)
            .attr("height",height+margins.top+margins.bottom)
  var s=geo.features.map(function(d){
    return d.properties.percent;
  })
  var w;
  for(var i=0;i<s.length;i++){
  if(s[i].STATE==state)
  {
    w=s[i]
    break
  }
}

var array=[];
for(var l=0;l<year2.length;l++){
  array.push(parseFloat(w[year2[l]]))
}
var ny=[]
for(var l=1;l<year2.length;l++){
  ny.push(year2[l])
}
  var xScale=d3.scaleLinear()
               .domain([0,array.length])
               .range([margins.left+10,width+margins.left])
  var yScale=d3.scaleLinear()
               .domain([d3.min(array),d3.max(array)])
               .range([height,margins.top])
  var line=d3.line()
             .x(function(d,i){return xScale(i)})
             .y(function(d){return yScale(d)})
  svg.append("path")
     .datum(array)
     .classed("line",true)
     .attr("d",line)
     .attr("fill","none")
     .attr("stroke","black");
  var xAxis=d3.axisBottom(xScale);
  var yAxis=d3.axisLeft(yScale);
  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate(0,"+height+")");
  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left+margins.right)+",0)");
  svg.selectAll("circle")
     .data(array)
     .enter()
     .append("circle")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r","5")
     .attr("fill","black")
 var change=[]
 for(var i=0;i+1<array.length;i++){
   change.push(array[i+1]-array[i]);
 }
 var xScale2=d3.scaleLinear()
              .domain([0,change.length])
              .range([margins.left+10,width+margins.left])
 var yScale2=d3.scaleLinear()
              .domain([d3.min(change,function(d){return Math.abs(d)}),d3.max(change,function(d){return Math.abs(d)})])
              .range([height,margins.top])
  var svg2=d3.select("#body")
             .append("svg")
             .attr("width",width+margins.right+margins.left)
             .attr("height",height+margins.top+margins.bottom)
   svg2.selectAll("rect")
       .data(change)
       .enter()
       .append("rect")
       .attr("x",function(d,i){return xScale2(i)})
       .attr("y",function(d){return yScale2(Math.abs(d))})
       .attr("width",width/change.length-5)
       .attr("height",function(d){return height-yScale2(Math.abs(d))})
       .attr("id",function(d,i){
         return "y"+ny[i]
       })
       .attr("fill",function(d){
         if(d>0){
           return "#5FE187"
         }
         else{
           return "#FF6163"
         }
       });
   var xAxis2=d3.axisBottom(xScale2);
   var yAxis2=d3.axisLeft(yScale2);
  svg2.append("g")
      .classed("xAxis",true)
      .call(xAxis2)
      .attr("transform","translate(0,"+height+")");
  svg2.append("g")
      .classed("yAxis",true)
      .call(yAxis2)
      .attr("transform","translate("+(margins.left+margins.right)+",0)");
      var name=geo.features.map(function(d){
        return d.properties.name
      })
  var allstate=geo.features.map(function(d){
    return parseFloat(d.properties.percent[yr]);
  })
      var xScale3=d3.scaleLinear()
                   .domain([0,allstate.length])
                   .range([margins.left+20,width2+margins.left])
      var yScale3=d3.scaleLinear()
                   .domain([d3.min(allstate),d3.max(allstate)])
                   .range([height,margins.top])
       var svg3=d3.select("#body")
                  .append("svg")
                  .attr("width",width2+margins.right+margins.left)
                  .attr("height",height+margins.top+margins.bottom)
        svg3.selectAll("rect")
            .data(allstate)
            .enter()
            .append("rect")
            .attr("x",function(d,i){return xScale3(i)})
            .attr("y",function(d){return yScale3(d)})
            .attr("width",width2/allstate.length-5)
            .attr("height",function(d){return height-yScale3(d)})
            .attr("id",function(d,i){
              return "s"+name[i].split(" ").join("")
            })
            .attr("fill","#CBBFFA")
            svg3.select("#s"+state.split(" ").join(""))
                .attr("stroke","#8FA1FF")
                .attr("stroke-width","3")
            var xAxis3=d3.axisBottom(xScale3);
            var yAxis3=d3.axisLeft(yScale3);
           svg3.append("g")
               .classed("xAxis3",true)
               .call(xAxis3)
               .attr("transform","translate(0,"+height+")");
           svg3.append("g")
               .classed("yAxis3",true)
               .call(yAxis3)
               .attr("transform","translate("+(margins.left+margins.right+10)+",0)");

  svg2.select("#y"+yr)
      .attr("stroke","#8FA1FF")
      .attr("stroke-width","3")
      d3.select("#body")
        .append("div")
        .classed("ex",true)
        .append("p")
        .text(state);
      d3.select(".ex")
        .append("p")
        .text(yr);
      d3.select(".ex")
        .append("p")
        .text(function(){
          var da=ny.indexOf(parseInt(yr,10));
          var c=change[da];
          if (c>0)
          {return "Increase "+c+" corresponding to previous year"}
          else if(c<0)
          {return "Decrease "+Math.abs(c)+" corresponding to previous year"}
          else
          {
           return "No change corresponding to previous year"
          }
        })

}
//////////////////////////////////////////////////////////////////
var drawjob=function(geo,job,state)
{
  var margins={left:30,right:10,top:20,bottom:20}
  var width=1000;
  var height=800;
  var svg=d3.select("#body")
            .append("svg")
            .attr("width",width+margins.right+margins.left)
            .attr("height",height+margins.top+margins.bottom);
  var jobdata=geo.features.map(function(d){
    return d.properties.salary[job];
  })
  var s=geo.features.map(function(d){
    return d.properties.name;
  })
  var xScale=d3.scaleLinear()
               .domain([0,jobdata.length])
               .range([margins.left+10,width+margins.left])
  var yScale=d3.scaleLinear()
               .domain([d3.min(jobdata),d3.max(jobdata)])
               .range([height,margins.top])

  svg.selectAll("rect")
     .data(jobdata)
     .enter()
     .append("rect")
     .attr("x",function(d,i){return xScale(i)})
     .attr("y",function(d){return yScale(Math.abs(d))})
     .attr("width",width/jobdata.length-5)
     .attr("height",function(d){return height-yScale(Math.abs(d))})
     .attr("fill","#dee2e8")
     .attr("id",function(d,i){return s[i]});
     var xAxis=d3.axisBottom(xScale);
     var yAxis=d3.axisLeft(yScale);
     svg.append("g")
        .classed("xAxis",true)
        .call(xAxis)
        .attr("transform","translate(0,"+height+")");
     svg.append("g")
        .classed("yAxis",true)
        .call(yAxis)
        .attr("transform","translate("+(margins.left+margins.right)+",0)");
d3.select("#"+state)
  .attr("fill","#8FA1FF")

}
//////////////////////////////////////////////////////////////////
var draw=function(){
Promise.all([wage,thousand,total,salary,geo,usAverage,nation]).then(function(data){
  var wage=data[0];
  var thousand=data[1];
  var total=data[2];
  var salary=data[3];
  var geo=data[4];
  var usAverage=data[5]
  var nation=data[6]
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
  console.log(geo)
  d3.select("#body")
    .append("div")
    .attr("class","directory")
    .selectAll("button")
    .data(button)
    .enter()
    .append("button")
    .attr("class","di")
    .attr("id",function(d){
      return d;
    })
    .on("click",function(){
      var choice=d3.select(this).attr("id");
      if (choice=="employment"){
        d3.selectAll("path")
          .attr("class","employment");
        d3.selectAll(".style").remove()
        d3.selectAll(".style2").remove()
        d3.selectAll("path").attr("fill","#efe5d4")
        d3.select("#body")
          .append("div")
          .classed("style",true)
          .selectAll("button.new")
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
        d3.selectAll("path")
          .attr("class","wage");
        d3.selectAll(".style").remove()
        d3.selectAll(".style2").remove()
        d3.selectAll("path").attr("fill","#efe5d4")
        d3.select("#body")
          .append("div")
          .classed("style",true)
          .selectAll("button.new2")
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
        d3.selectAll("path")
          .attr("class","percent");
        d3.selectAll(".style").remove()
        d3.selectAll(".style2").remove()
        d3.selectAll("path").attr("fill","#efe5d4")
        d3.select("#body")
          .append("div")
          .classed("style",true)
          .selectAll("button.new3")
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
        d3.selectAll("path")
          .attr("class","salary");
        d3.selectAll(".style").remove()
        d3.selectAll(".style2").remove()
        d3.selectAll("path").attr("fill","#efe5d4")
        d3.select("#body")
          .append("div")
          .classed("style2",true)
          .selectAll("button.new4")
          .data(job)
          .enter()
          .append("button")
          .classed("job",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var j=d3.select(this).attr("id")
            drawsalarycolor(geo,j)
          })
          .text(function(d){return d})
      }
      if(choice=="average"){
        d3.selectAll("path")
          .attr("class","average");
        d3.selectAll(".style").remove()
        d3.selectAll(".style2").remove()
        d3.selectAll("path").attr("fill","#efe5d4")
        d3.select("#body")
          .append("div")
          .classed("style2",true)
          .selectAll("button.new5")
          .data(job)
          .enter()
          .append("button")
          .classed("job",true)
          .attr("id",function(d){return d})
          .on("click",function(){
            var j=d3.select(this).attr("id")
            drawaveragecolor(geo,j,usAverage)
          })
          .text(function(d){return d})
      }
      if(choice=="correlation"){
        var st=geo.features.map(function(d){
          return d.properties.name;
        })
        d3.selectAll("path")
          .attr("class","correlation");
        d3.selectAll(".style").remove()
        d3.selectAll(".style2").remove()
        d3.selectAll("path").attr("fill","#efe5d4")
        d3.select("#body")
          .append("div")
          .classed("style",true)
          .selectAll("button.new6")
          .data(st)
          .enter()
          .append("button")
          .classed("year",true)
          .attr("id",function(d){return d})
          .on("click",function(d){
            d3.select("#body").remove();
            d3.select("body")
              .append("div")
              .attr("id","body");
            correlation(d,geo)
            d3.select("#body")
              .append("button")
              .attr("class","homepage")
              .on("click",function(d)
            {
              d3.select("#body").remove();
              d3.select("body")
                .append("div")
                .attr("id","body");
                 draw()
            })
              .text("Home Page");
          })
          .text(function(d){return d})}
    })
    .text(function(d){
      return d;
    })
/////////////////////////////////////
    drawMap(geo)
    d3.selectAll("path")
      .on("click",function(){
        var state=d3.select(this).attr("id");
        var c=d3.select(this).attr("fill");
        var type=d3.select(this.parentNode).attr("class");
        if(c!="#efe5d4" && type=="employment"){
        var yr=d3.select(this.parentNode).attr("id")
        d3.select("#body").remove();
        d3.select("body")
          .append("div")
          .attr("id","body");
        drawemchange(state,geo,yr)
        d3.select("#body")
          .append("button")
          .attr("class","homepage")
          .on("click",function(d)
        {
          d3.select("#body").remove();
          d3.select("body")
            .append("div")
            .attr("id","body");
             draw()
        })
          .text("Home Page");
      }
      if(c!="#efe5d4" && type=="wage"){
      var yr=d3.select(this.parentNode).attr("id")
      d3.select("#body").remove();
      d3.select("body")
        .append("div")
        .attr("id","body");
      drawannualchange(state,geo,yr,nation)
      d3.select("#body")
        .append("button")
        .attr("class","homepage")
        .on("click",function(d)
      {
        d3.select("#body").remove();
        d3.select("body")
          .append("div")
          .attr("id","body");
           draw()
       })
        .text("Home Page");
    }
    if(c!="#efe5d4" && type=="percent"){
    var yr=d3.select(this.parentNode).attr("id");
    d3.select("#body").remove();
    d3.select("body")
      .append("div")
      .attr("id","body");
    drawpercentchange(state,geo,yr)
    d3.select("#body")
      .append("button")
      .attr("class","homepage")
      .on("click",function(d)
     {
      d3.select("#body").remove();
      d3.select("body")
        .append("div")
        .attr("id","body");
        draw()
     })
      .text("Home Page");
  }
  if(c!="#efe5d4" && type=="salary"){
  var job=d3.select(this.parentNode).attr("id")
  d3.select("#body").remove();
  d3.select("body")
    .append("div")
    .attr("id","body");
  drawjob(geo,job,state)
  d3.select("#body")
    .append("button")
    .attr("class","homepage")
    .on("click",function(d)
   {
    d3.select("#body").remove();
    d3.select("body")
      .append("div")
      .attr("id","body");
      draw()
   })
    .text("Home Page");
}},function(err){console.log(err);})})}
draw();

///////////////////////////////////////////////////
