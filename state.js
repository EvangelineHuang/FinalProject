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
var screen={width:900,height:600};
///////////////////////////////////////////////////////////////////
var drawMap=function(geoD){
  var geoGenerator=d3.geoPath().projection(d3.geoAlbersUsa())
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
///////////////////////////////////////////////////////////////////
var drawemploymentcolor=function(data,year){
  var y=data.features.map(function(d){
    return d.properties.employment[year];
  })
  var color = d3.scaleQuantile()
                .domain(y)
                .range(["#1f54c5", "#0078da", "#0096df", "#00b1db", "#00c9d3", "#01d5cd", "#32e0c1", "#5aeab2", "#77edb1", "#8df0b1", "#a1f2b2", "#b3f5b5"])
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
            .range(["#1c758b", "#008a99", "#009f9c", "#00b395", "#00c584", "#43d07a", "#68da6f", "#8ae463", "#a1eb67", "#b7f26c", "#ccf872", "#e0ff79"])
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
            .range(["#932222", "#aa263d", "#bf2e5b", "#d03b7c", "#dc4ca0", "#dd5bb6", "#dc69cb", "#d878df", "#d183e6", "#ca8dec", "#c496f1", "#be9ff4"])
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
      d3.selectAll("g")
        .attr("id",year)
        .attr("class","average");
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
/////////////////////////////////////////////////
var drawemchange=function(state,geo){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=600;
  var height=600;
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
     .attr("r","2")
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
       .attr("height",function(d){return height-yScale2(Math.abs(d))});
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
}
///////////////////////////////////////////////
var drawannualchange=function(state,geo){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=600;
  var height=600;
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
var array=[];
for(var l=0;l<year.length;l++)
{
  array.push(parseInt(w[year[l]],10))
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
     .attr("r","2")
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
       .attr("height",function(d){return height-yScale2(Math.abs(d))});
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
}
///////////////////////////////////////////////
var drawpercentchange=function(state,geo){
  var margins={left:30,right:10,top:20,bottom:20}
  var width=600;
  var height=600;
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
  array.push(parseInt(w[year2[l]],10))
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
     .attr("r","2")
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
       .attr("height",function(d){return height-yScale2(Math.abs(d))});
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
}
//////////////////////////////////////////////////////////////////
var draw=function(){
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
    })
    .text(function(d){
      return d;
    })
    drawMap(geo)
    d3.selectAll("path")
      .on("click",function(){
        var state=d3.select(this).attr("id");
        var c=d3.select(this).attr("fill");
        var type=d3.select(this.parentNode).attr("class");
        if(c!="#efe5d4" && type=="employment"){
        d3.select("#body").remove();
        d3.select("body")
          .append("div")
          .attr("id","body");
        drawemchange(state,geo)
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
      d3.select("#body").remove();
      d3.select("body")
        .append("div")
        .attr("id","body");
      drawannualchange(state,geo)
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
    d3.select("#body").remove();
    d3.select("body")
      .append("div")
      .attr("id","body");
    drawpercentchange(state,geo)
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
},function(err){console.log(err);})})}
draw();
///////////////////////////////////////////////////
