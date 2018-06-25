var svg = null;
var dataset = null;
var dataset_filtered = null;
var count = 0;
var color_opacity = null;
var currentMousePos = {top:0, left:0}
var year = "2010"
<<<<<<< HEAD
var gender = "Any Gender"
var day = "Monday-Sunday"
var activity_decoded = "GHI"
var activity = "GHI"
var filtre = "2010 Any Gender Monday-Sunday"

=======
var gender = "All"
var day = "All"
var activity = "GHI"
var filtre = "2010 All All"

// BAR CHART START
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
var k = 0
var barWidth = 50
var svgWidth = 400;
var svgHeight = 100;
<<<<<<< HEAD
=======
// BAR CHART STOP
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a

// START Xavier Variables
var legendSvg;
//var scales = ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'];
//var scales_other = ['#F0F8FF', '#E6E6FA', '#87CEFA', '#00BFFF', '#1E90FF', '#4169E1', '#408B',  '#191970'];
//var scales_other = ['#f0f8ff', '#e6e6fa', '#87cefa', '#00bfff', '#1e90ff', '#4169e1', '#408b',  '#191970'];
var scales_other;

var scales_GHI = ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd']
var legendWidth;
var scaleFullHeight;
<<<<<<< HEAD
var legendFullHeight = 500;
=======
var legendFullHeight = 550;
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
var legendFullWidth = 60;
var legendMargin = { top: 20, bottom: 20, left: 5, right: 10 };
var colorScale;
var legendHeight;
var gradient;
var min;
var max;
var textMin;
var textMax;
// END Xavier Var


// dictionnaire correspndance entre text filtre et texte table dans data
// Quid de la gestion de plusieurs filtre -> plusieurs textes pour une table
var filtre_dic = {
<<<<<<< HEAD
  "2000 Female Monday-Friday" :"data_2000_F_D1-5.csv",
  "2000 Female Monday-Sunday": "data_2000_F_D1-7.csv",
  "2000 Female Saturday-Sunday": "data_2000_F_D6-7.csv",
  "2000 Male Monday-Friday": "data_2000_M_D1-5.csv",
  "2000 Male Monday-Sunday": "data_2000_M_D1-7.csv",
  "2000 Male Saturday-Sunday": "data_2000_M_D6-7.csv",
  "2000 Any Gender Monday-Friday": "data_2000_T_D1-5.csv",
  "2000 Any Gender Monday-Sunday": "data_2000_T_D1-7.csv",
  "2000 Any Gender Saturday-Sunday": "data_2000_T_D6-7.csv",
  "2010 Female Monday-Friday": "data_2010_F_D1-5.csv",
  "2010 Female Monday-Sunday": "data_2010_F_D1-7.csv",
  "2010 Female Saturday-Sunday": "data_2010_F_D6-7.csv",
  "2010 Male Monday-Friday": "data_2010_M_D1-5.csv",
  "2010 Male Monday-Sunday": "data_2010_M_D1-7.csv",
  "2010 Male Saturday-Sunday": "data_2010_M_D6-7.csv",
  "2010 Any Gender Monday-Friday": "data_2010_T_D1-5.csv",
  "2010 Any Gender Monday-Sunday": "data_2010_T_D1-7.csv",
  "2010 Any Gender Saturday-Sunday": "data_2010_T_D6-7.csv",
=======
  "2000 Female Weekdays" :"data_2000_F_D1-5.csv",
  "2000 Female All": "data_2000_F_D1-7.csv",
  "2000 Female Weekends": "data_2000_F_D6-7.csv",
  "2000 Male Weekdays": "data_2000_M_D1-5.csv",
  "2000 Male All": "data_2000_M_D1-7.csv",
  "2000 Male Weekends": "data_2000_M_D6-7.csv",
  "2000 All Weekdays": "data_2000_T_D1-5.csv",
  "2000 All All": "data_2000_T_D1-7.csv",
  "2000 All Weekends": "data_2000_T_D6-7.csv",
  "2010 Female Weekdays": "data_2010_F_D1-5.csv",
  "2010 Female All": "data_2010_F_D1-7.csv",
  "2010 Female Weekends": "data_2010_F_D6-7.csv",
  "2010 Male Weekdays": "data_2010_M_D1-5.csv",
  "2010 Male All": "data_2010_M_D1-7.csv",
  "2010 Male Weekends": "data_2010_M_D6-7.csv",
  "2010 All Weekdays": "data_2010_T_D1-5.csv",
  "2010 All All": "data_2010_T_D1-7.csv",
  "2010 All Weekends": "data_2010_T_D6-7.csv",
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
}



function draw_legend(scales){
<<<<<<< HEAD
=======
  // add the legend now
  
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a

  // use same margins as main plot
  legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
  legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

  if (activity=="GHI") {
    scaleFullHeight = legendHeight * 0.4;
  } else {
    scaleFullHeight = legendHeight;
  }

  legendSvg = d3.selectAll('svg#legend-svg')
      .attr('width', legendFullWidth)
      .attr('height', scaleFullHeight)
      .append('g')
      .attr('transform', 'translate(' + legendMargin.left + ',' +
          legendMargin.top + ')');

  legendSvg_0_1 = d3.selectAll('svg#legend-svg')
      .attr('width', legendFullWidth)
      .attr('height', legendFullHeight)
      .append('g')
      .attr('transform', 'translate(' + legendMargin.left + ',' +
          legendMargin.top + ')');

<<<<<<< HEAD
=======

  // create colour scale
  // if (activity == "GHI") {
  //   colorScale = d3.scaleLinear()
  //   .domain(linspace(min, 0.4, scales.length)) //ici le domain du color scale
  //   .range(scales);
  // } else {
  //   var linearcds = d3.scaleLinear()
  //   .domain([min, max])
  //   .range([0, 1]);
  //   colorScale = d3.interpolateBlues(linearcds)
  //   console.log(" D3 INTERPOLATE BLUE = " + d3.interpolateBlues(0.5))
  // }
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
  if (activity == "GHI") {
    colorScale = d3.scaleLinear()
    .domain(linspace(min, 0.4, scales.length)) //ici le domain du color scale
    .range(scales);
  } else {
    colorScale = d3.scaleLinear()
    .domain(linspace(min, max, scales.length)) //ici le domain du color scale
    .range(scales);
  }
<<<<<<< HEAD
=======
  

  
      
  
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a

  // append gradient bar
  gradient = legendSvg.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%') // bottom
      .attr('y1', '100%')
      .attr('x2', '0%') // to top
      .attr('y2', '0%')
      .attr('spreadMethod', 'pad');

  // programatically generate the gradient for the legend
  // this creates an array of [pct, colour] pairs as stop
  // values for legend
  var pct = linspace(0, 100, scales.length).map(function(d) {
      return Math.round(d) + '%';
  });

  var colourPct = d3.zip(pct, scales);

  colourPct.forEach(function(d) {
      gradient.append('stop')
          .attr('offset', d[0])
          .attr('stop-color', d[1]);
      //.attr('stop-opacity', 1);
  });


  var colorscalePos =  legendHeight - scaleFullHeight
  legendSvg.append('rect')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('width', legendWidth)
      .attr('height', scaleFullHeight)
      .attr("transform", "translate(0,"+ colorscalePos +")")
      .style('fill', 'url(#gradient)');


  // create a scale and axis for the legend
  if (activity=="GHI"){
    var legendScale = d3.scaleLinear()
      .domain([0, 1]) //on specifie ici le domaine du scale
      .range([legendHeight, 0]);
  } else {
    var legendScale = d3.scaleLinear()
      .domain([min, max]) //on specifie ici le domaine du scale
      .range([legendHeight, 0]);
  }
<<<<<<< HEAD

=======
  
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a

  var legendAxis = d3.axisRight(legendScale)
      .ticks(10)
      .tickFormat(d3.format(".1f"));

  legendSvg_0_1.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + legendWidth  + ", 0)")
      .call(legendAxis);
}




function draw() {
  svg.selectAll(".europe")
    //données associées à la carte
    .datum(function(d) { return { country_code: d3.select(this).attr("id") }})
    .style("fill", d3.rgb(192, 192, 192))

    .data(dataset_filtered, function(d) { return d.country_code })
    .style("fill", function(d) {
      console.log("Color Scale value = " + colorScale(d[activity]));
      return colorScale(d[activity]);
    });
};



function linspace(start, end, n) {
  var out = [];
  var delta = (end - start) / (n - 1);
  var i = 0;
  while(i < (n - 1)) {
      out.push(start + (i * delta));
      i++;
  }
  out.push(end);
  return out;
}

// update the colour scale, restyle the plot points and legend
function updateColorScale() {
  // clear current legend
  legendSvg.selectAll('*').remove();
  legendSvg_0_1.selectAll('*').remove();
}

<<<<<<< HEAD
=======


>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a

function setBarChart(Frame, nameConst, colorfill, colorfill2, dataset, max_time){

  var XrectConstrain = 0

  var margin = {top:10, right:0, bottom:20, left:50};

  console.log("max_time")
  console.log(max_time)
  console.log("d3.max(dataset)")
  console.log(d3.max(dataset))



// BARCHART - START
function setBarChart( Frame , nameConst ,colorfill, colorfill2,dataset,max_time){

  var XrectConstrain = 0

  var margin = {top:10, right:0, bottom:20, left:50};

  console.log("max_time")
  console.log(max_time)
  console.log("d3.max(dataset)")
  console.log(d3.max(dataset))

  var yScale = d3.scaleLinear()
<<<<<<< HEAD
=======
      //.domain([0, d3.max(dataset)])
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
      .domain([0, max_time])
      .range([svgHeight - margin.top - margin.bottom,0]);

  var xScale = d3.scaleLinear()
          .range([0, svgWidth - margin.right - margin.left]);

<<<<<<< HEAD

  if (k>2){

=======
 //if ( k == 0 ) {
 //   Frame.innerHTML += message ;
 //  }

  if (k>2){

    //var colorfill = colorfill
    //var colorfill2 = colorfill2
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a

    var barChartConst = d3.select("#"+nameConst)
                   .select("svg").remove()

    var barChartConst = d3.select("#"+nameConst)
                   .append("svg")
                   .attr("width", svgWidth)
                   .attr("height", svgHeight)

  } else {

<<<<<<< HEAD
=======
    //var colorfill = colorfill
    //var colorfill2 = colorfill2

>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
     var barChartConst = d3.select("#"+nameConst)
                    .append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)

  }
     barChartConst.selectAll("rect")
        .data(dataset)
        .enter()
          .append("rect")
          .style("fill",colorfill)
          .attr("y", function(d) {
            if (isNaN(d) == false) {
              return (yScale(d));
            }
          })
          .attr("x", function(d) {
              XrectConstrain = XrectConstrain + barWidth*1.8
              return XrectConstrain })
          .attr("height", function(d) {
            if (isNaN(d) == false) {
              return( svgHeight - margin.top - margin.bottom - yScale(d));
            }
          })
          .attr("width", barWidth)
<<<<<<< HEAD
          .attr("rx", 5) // set the x corner curve radius
          .attr("ry", 5)


}

function barchart(datasetC, datasetUC, country, ghi, max_time_leisure, max_time_constraint) {

  //define the balise name
  k1 = k%3;

  var nameConst = "comparisonConst"+k1
  var nameUnConst= "comparisonUnConst"+k1
  var nameCountry= "countryName"+k1

  var ConsTop = 260
  var ConsLeft = 730

  var doc1 = document.getElementById(nameConst);
  doc1.style.position = "absolute";
  doc1.style.top = ConsTop + 25+100*k1 + 'px';
  doc1.style.left = ConsLeft +'px';

  var doc2 = document.getElementById(nameUnConst);
  doc2.style.position = "absolute";
  doc2.style.top = ConsTop + 25 +100*k1 + 'px';
  doc2.style.left = ConsLeft  + 350 - 50 +'px';

  var doc3 = document.getElementById(nameCountry);
  doc3.style.position = "absolute";
  doc3.style.top = ConsTop + 25 + 30 +100*k1 + 'px';
  doc3.style.right = ConsLeft - 100 + 'px';
  doc3.style.textAlign = "right"
  doc3.innerHTML =  country + "<br>" + "<strong>" + Math.round(ghi*1000)/1000 + "</strong>"

  nameIdUC = 'graphUnconstraint'
  var FrameUnconst = document.getElementById(nameIdUC);
  FrameUnconst.style.position = "absolute";
  FrameUnconst.style.top = ConsTop  + 'px';
  FrameUnconst.style.left = ConsLeft + 450 + svgWidth/4 +'px';
  FrameUnconst.style.textAlign = "left";

  nameTitleUC = 'titleUnconstraint'
  messageU = "Distribution of <strong>Unconstrained activities</strong><p> "
            +"Media  &nbsp &nbsp &nbsp &nbsp  Sport &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Social"
  var TitleUnconst = document.getElementById(nameTitleUC);
  TitleUnconst.style.position = "absolute";
  TitleUnconst.style.top = ConsTop - 50 + 'px';
  TitleUnconst.style.left = ConsLeft + 350 - 50 + svgWidth/4 +'px';
  TitleUnconst.style.textAlign = "left";
  TitleUnconst.innerHTML = messageU


  nameIdC = 'graphConstraint'
  var FrameConst = document.getElementById(nameIdC);
  FrameConst.style.position = "absolute";
  FrameConst.style.top = ConsTop  + 'px';
  FrameConst.style.left = ConsLeft - 100 + svgWidth/4 +'px';
  FrameConst.style.textAlign = "left"

  nameTitleC = 'titleConstraint'
  messageC = "Distribution of <strong>Constrained activities</strong><p> "
            +"Basic  &nbsp &nbsp &nbsp  Professional &nbsp &nbsp &nbsp House"
  var TitleConst = document.getElementById(nameTitleC);
  TitleConst.style.position = "absolute";
  TitleConst.style.top = ConsTop - 50 + 'px';
  TitleConst.style.left = ConsLeft  + svgWidth/4 +'px';
  TitleConst.style.textAlign = "left";
  TitleConst.innerHTML = messageC


  var colorfill = '#d53e4f' //"DeepPink"
  var colorfill2 = '#3288bd' //"Aqua"
  var max_time = max_time_constraint + max_time_leisure

  setBarChart(FrameConst, nameConst, colorfill, colorfill2, datasetC, max_time_constraint)
  setBarChart(FrameUnconst, nameUnConst, colorfill2, colorfill, datasetUC, max_time_leisure)
  k = k+1;
}
 // BAR CHART STOP

function mouse_over() {
  svg.selectAll(".europe")
  .on("mousemove", function(d) {
        d3.select("#country").text(isoCountries[d.country_code.toUpperCase()]);
        d3.select("#GHI").text(d[activity]);

        $('#info-container').offset(currentMousePos).show();
      }
    )
  .on("mouseout", function(d) {
    $('#info-container').offset(currentMousePos).hide();
  })

  .on("click", function(d){
    var countryName = isoCountries[d.country_code.toUpperCase()];

    var idx = 0;
    var max_time;
    var datasetUC = new Array();
    var datasetC = new Array();
    var data ;
    dataset = dataset_filtered;
    for (var elt in dataset) {
      countryRed = dataset[elt]["country"]
      if (countryRed == countryName ){
        data = dataset[elt]["leisure_media"]
        datasetUC.push(data)
        data = dataset[elt]["leisure_sports_outdoors"]
        datasetUC.push(data)
        data = dataset[elt]["leisure_social_meetings"]
        datasetUC.push(data)
        data = dataset[elt]["basic_needs"]
        datasetC.push(data)
        data = dataset[elt]["pro_study"]
        datasetC.push(data)
        data = dataset[elt]["household_family"]
        datasetC.push(data)
        max_time_leisure = dataset[elt]["total_leisure"]
        max_time_constraint = dataset[elt]["total_constraint"]
      }
    }

    if (datasetUC.length > 0) {
      barchart(datasetC,datasetUC,countryName,d.GHI,max_time_leisure,max_time_constraint)
    }

 });
=======
          .attr("rx", 10) // set the x corner curve radius
          .attr("ry", 10)


}

function barchart(datasetC,datasetUC,country,ghi,max_time_leisure,max_time_constraint) {

  //define the balise name
  k1 = k%3;

  var nameConst = "comparisonConst"+k1
  var nameUnConst= "comparisonUnConst"+k1
  var nameCountry= "countryName"+k1

  var ConsTop = 260
  var ConsLeft = 730

  var doc1 = document.getElementById(nameConst);
  doc1.style.position = "absolute";
  doc1.style.top = ConsTop + 25+100*k1 + 'px';
  doc1.style.left = ConsLeft +'px';

  var doc2 = document.getElementById(nameUnConst);
  doc2.style.position = "absolute";
  doc2.style.top = ConsTop + 25 +100*k1 + 'px';
  doc2.style.left = ConsLeft  + 350 - 50 +'px';

  // TO DO : COMMENT
  // Just for test the ghi is not correct in the map
  var doc3 = document.getElementById(nameCountry);
  doc3.style.position = "absolute";
  //doc2.style.top = 800 + 80*k1 + 'px';
  //doc2.style.left = 400 +'px';
  doc3.style.top = ConsTop + 25 + 30 +100*k1 + 'px';
  doc3.style.right = ConsLeft - 100 + 'px';
  doc3.style.textAlign = "right"
  doc3.innerHTML =  country + "<br>" + "<strong>" + Math.round(ghi*1000)/1000 + "</strong>"

  nameIdUC = 'graphUnconstraint'
  var FrameUnconst = document.getElementById(nameIdUC);
  FrameUnconst.style.position = "absolute";
  FrameUnconst.style.top = ConsTop  + 'px';
  FrameUnconst.style.left = ConsLeft + 450 + svgWidth/4 +'px';
  FrameUnconst.style.textAlign = "left";

  nameTitleUC = 'titleUnconstraint'
  messageU = "<strong> Unconstrained activities </strong><p> "
            +"Media  &nbsp &nbsp &nbsp &nbsp  Sport &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Social"
  var TitleUnconst = document.getElementById(nameTitleUC);
  TitleUnconst.style.position = "absolute";
  TitleUnconst.style.top = ConsTop - 50 + 'px';
  TitleUnconst.style.left = ConsLeft + 350 - 50 + svgWidth/4 +'px';
  TitleUnconst.style.textAlign = "left";
  TitleUnconst.innerHTML = messageU


  nameIdC = 'graphConstraint'
  var FrameConst = document.getElementById(nameIdC);
  FrameConst.style.position = "absolute";
  FrameConst.style.top = ConsTop  + 'px';
  FrameConst.style.left = ConsLeft - 100 + svgWidth/4 +'px';
  FrameConst.style.textAlign = "left"


  //FrameUnconst.innerHTML += 'Unconstrained';
  nameTitleC = 'titleConstraint'
  //FrameConst.innerHTML += 'Constrained';
  messageC = "<strong> Constrained activities </strong><p> "
            +"Basic  &nbsp &nbsp &nbsp  Professional &nbsp &nbsp &nbsp House"
  var TitleConst = document.getElementById(nameTitleC);
  TitleConst.style.position = "absolute";
  TitleConst.style.top = ConsTop - 50 + 'px';
  TitleConst.style.left = ConsLeft  + svgWidth/4 +'px';
  TitleConst.style.textAlign = "left";
  TitleConst.innerHTML = messageC


  var colorfill = '#d53e4f' //"DeepPink"
  var colorfill2 = '#3288bd' //"Aqua"
  setBarChart( FrameConst,nameConst ,colorfill, colorfill2,datasetC,max_time_constraint)
  setBarChart( FrameUnconst , nameUnConst , colorfill2, colorfill,datasetUC,max_time_leisure)
  k = k+1;
}
 // BAR CHART STOP


 
function mouse_over() {
  svg.selectAll(".europe")
  .on("mousemove", function(d) {
        d3.select("#country").text(isoCountries[d.country_code.toUpperCase()]);
        d3.select("#GHI").text(d[activity]);
        
        $('#info-container').offset(currentMousePos).show();
      }
    )
  .on("mouseout", function(d) {
    $('#info-container').offset(currentMousePos).hide();
  })
  
  // BAR CHART START
  .on("click", function(d){
    var countryName = isoCountries[d.country_code.toUpperCase()];

    var idx = 0;
    var max_time;
    var datasetUC = new Array();
    var datasetC = new Array();
    var data ;
    dataset = dataset_filtered;
    for (var elt in dataset) {
      countryRed = dataset[elt]["country"]
      console.log("countryRed = " + countryRed)
      if (countryRed == countryName ){
        console.log("countryRed dans le If = " + countryRed)
        data = dataset[elt]["leisure_media"]
        datasetUC.push(data)
        data = dataset[elt]["leisure_sports_outdoors"]
        datasetUC.push(data)
        data = dataset[elt]["leisure_social_meetings"]
        datasetUC.push(data)
        data = dataset[elt]["basic_needs"]
        datasetC.push(data)
        data = dataset[elt]["pro_study"]
        datasetC.push(data)
        data = dataset[elt]["household_family"]
        datasetC.push(data)
        max_time_leisure = dataset[elt]["total_leisure"]
        max_time_constraint = dataset[elt]["total_constraint"]
      }
    }

    console.log(countryName)
    console.log("data const")
    console.log(datasetC)
    if (datasetUC.length > 0) {
      barchart(datasetC,datasetUC,countryName,d.GHI,max_time_leisure,max_time_constraint)
    }

    console.log("data Uconst")
    console.log(datasetUC)
    //barchart(datasetC,datasetUC,countryName)
    // BAR CHART STOP
 });

>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a


    // .on("click", function(d) {
    //   barchart()
    //   console.log("done barchart")
    // });
    
    $('.europe').hover(function() {
      d3.select("#info-container").show = function() {
        this.style('display', 'initial');
        return this;
      }
    }, function() {
      // $("#info-container").hide();
      d3.select("#info-container").hide = function() {
        this.style('display', 'none');
        return this;
      }
    })
  }


<<<<<<< HEAD
    function load_data(filtre) {
      var tabName = filtre_dic[filtre];
      var selected_filters_to_display = "with filters : " + year + ", " + gender + ", " + day
      d3.select("h3").text(activity_decoded + " - " + selected_filters_to_display);

=======



    function load_data(filtre) {
      var tabName = filtre_dic[filtre];
      var selected_filters_to_display = filtre + " " + activity
      d3.select("h2").text(selected_filters_to_display); // change le sous-titre avec le filtre choisi
    
      // load csv
    
      //if (questionCode) {
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
        //load tout le dataset peut importe la question...
        console.log(tabName);
        d3.csv("./output_tables_NEW/"+tabName)
        .row((d,i) => {
          return {
            country: d.country,
            country_code: d.country_code.toLowerCase(),
            basic_needs: +d.basic_needs,
            pro_study: +d.pro_study,
            household_family: +d.household_family,
            total_constraint: +d.total_constraint,
            leisure_media: +d.leisure_media,
            leisure_sports_outdoors: +d.leisure_sports_outdoors,
            leisure_social_meetings: +d.leisure_social_meetings,
            total_leisure: +d.total_leisure,
            GHI : +d.GHI
          };
        })
        .get((error,rows) => {
        console.log("Loaded"+rows.length+"rows");
        if(rows.length > 0) {
            console.log("First row:",rows[0])
            console.log("Last row:",rows[rows.length-1])
        }
        // filter rows with null value
        dataset = rows
        dataset_filtered = dataset.filter( function(row) {
            return row[activity] != 0
        });
        min = d3.min(dataset_filtered, (row) => row[activity] );
        max = d3.max(dataset_filtered, (row) => row[activity] );

        textMin = 0;
        textMax = 1;

        if(activity!="GHI"){
<<<<<<< HEAD
          textMin = min.toString() + " h";
          textMax = max.toString() + " h";
=======
          textMin = min.toString() + " hours";
          textMax = max.toString() + " hours";
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
        };

        console.log("min:",min)
        console.log("max:",max)
        //////color_opacity = d3.scaleLinear().domain(d3.extent(dataset_filtered,(row)=> row[activity])).range([0.1, 1]);

        // affichage des values des legendes
        var maxScale = document.getElementById("maxScale");
        maxScale.style.position = "absolute";
        maxScale.style.left = legendWidth/2 + legendMargin.left + 32 + "px";
        maxScale.style.top = 150 + legendMargin.top + 20 + 0 + "px";
        d3.select("#maxScale").text(textMax);

        var minScale = document.getElementById("minScale");
        minScale.style.position = "absolute";
        var widthtick = legendWidth/2 + legendMargin.left + 32;
        minScale.style.left = widthtick + "px";
        var heighttick = legendFullHeight + 0 + 150;
        minScale.style.top = heighttick + "px";
        d3.select("#minScale").text(textMin);


        // Choix des couleurs de Scales en fonction de l'activité
        if (activity == "GHI") {
          draw_legend(scales_GHI)
        } else {
          scales_other = [d3.rgb(240,248,255), d3.rgb(176,224,230), d3.rgb(135,206,250), d3.rgb(30,144,255), d3.rgb(65,105,225), d3.rgb(0,0,205), d3.rgb(0,0,139), d3.rgb(25,25,112)]
          draw_legend(scales_other)
        }
        draw();
        mouse_over();
        });
      }


  document.addEventListener("DOMContentLoaded", function(e) {
    // add svg to page
    d3.xml("svg/europe.svg").mimeType("image/svg+xml").get(function(error, xml) {
        if (error) throw error;
        $(".europe").replaceWith(xml.documentElement);
        svg = d3.select("svg#svg2");
        load_data(filtre);
    });

  $(document).mousemove(function(event) {
        currentMousePos.left = event.pageX - 70;
        currentMousePos.top = event.pageY + 20;
  });
});


function changeYear(event) {
  year = event.innerText;
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
}
function changeGender(event) {
  gender = event.innerText;
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
}
function changeDay(event) {
  day = event.innerText;
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
}
function changeAct(event) {
<<<<<<< HEAD
  activity_decoded = event.innerText;
  activity = encodeActivity[activity_decoded]
=======
  activity = event.innerText;
>>>>>>> 24dcdb59ac6113aacb187bf9648b17c8e1e5765a
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
}

var encodeActivity = {
  "Basic Needs" : "basic_needs",
  "Professional & Study" : "pro_study",
  "Household & Family" : "household_family",
  "Total Constraint Time" : "total_constraint",
  "Media (tv, internet, ...)" : "leisure_media",
  "Sports & Outdoors" : "leisure_sports_outdoors",
  "Social & Meetings" : "leisure_social_meetings",
  "Total Leisure Time" : "total_leisure",
  "GHI" : "GHI"
};


var isoCountries = {
  'AF' : 'Afghanistan',
  'AX' : 'Aland Islands',
  'AL' : 'Albania',
  'DZ' : 'Algeria',
  'AS' : 'American Samoa',
  'AD' : 'Andorra',
  'AO' : 'Angola',
  'AI' : 'Anguilla',
  'AQ' : 'Antarctica',
  'AG' : 'Antigua And Barbuda',
  'AR' : 'Argentina',
  'AM' : 'Armenia',
  'AW' : 'Aruba',
  'AU' : 'Australia',
  'AT' : 'Austria',
  'AZ' : 'Azerbaijan',
  'BS' : 'Bahamas',
  'BH' : 'Bahrain',
  'BD' : 'Bangladesh',
  'BB' : 'Barbados',
  'BY' : 'Belarus',
  'BE' : 'Belgium',
  'BZ' : 'Belize',
  'BJ' : 'Benin',
  'BM' : 'Bermuda',
  'BT' : 'Bhutan',
  'BO' : 'Bolivia',
  'BA' : 'Bosnia And Herzegovina',
  'BW' : 'Botswana',
  'BV' : 'Bouvet Island',
  'BR' : 'Brazil',
  'IO' : 'British Indian Ocean Territory',
  'BN' : 'Brunei Darussalam',
  'BG' : 'Bulgaria',
  'BF' : 'Burkina Faso',
  'BI' : 'Burundi',
  'KH' : 'Cambodia',
  'CM' : 'Cameroon',
  'CA' : 'Canada',
  'CV' : 'Cape Verde',
  'KY' : 'Cayman Islands',
  'CF' : 'Central African Republic',
  'TD' : 'Chad',
  'CL' : 'Chile',
  'CN' : 'China',
  'CX' : 'Christmas Island',
  'CC' : 'Cocos (Keeling) Islands',
  'CO' : 'Colombia',
  'KM' : 'Comoros',
  'CG' : 'Congo',
  'CD' : 'Congo, Democratic Republic',
  'CK' : 'Cook Islands',
  'CR' : 'Costa Rica',
  'CI' : 'Cote D\'Ivoire',
  'HR' : 'Croatia',
  'CU' : 'Cuba',
  'CY' : 'Cyprus',
  'CZ' : 'Czech Republic',
  'DK' : 'Denmark',
  'DJ' : 'Djibouti',
  'DM' : 'Dominica',
  'DO' : 'Dominican Republic',
  'EC' : 'Ecuador',
  'EG' : 'Egypt',
  'SV' : 'El Salvador',
  'GQ' : 'Equatorial Guinea',
  'ER' : 'Eritrea',
  'EE' : 'Estonia',
  'ET' : 'Ethiopia',
  'FK' : 'Falkland Islands (Malvinas)',
  'FO' : 'Faroe Islands',
  'FJ' : 'Fiji',
  'FI' : 'Finland',
  'FR' : 'France',
  'GF' : 'French Guiana',
  'PF' : 'French Polynesia',
  'TF' : 'French Southern Territories',
  'GA' : 'Gabon',
  'GM' : 'Gambia',
  'GE' : 'Georgia',
  'DE' : 'Germany',
  'GH' : 'Ghana',
  'GI' : 'Gibraltar',
  'EL' : 'Greece',  //GR
  'GL' : 'Greenland',
  'GD' : 'Grenada',
  'GP' : 'Guadeloupe',
  'GU' : 'Guam',
  'GT' : 'Guatemala',
  'GG' : 'Guernsey',
  'GN' : 'Guinea',
  'GW' : 'Guinea-Bissau',
  'GY' : 'Guyana',
  'HT' : 'Haiti',
  'HM' : 'Heard Island & Mcdonald Islands',
  'VA' : 'Holy See (Vatican City State)',
  'HN' : 'Honduras',
  'HK' : 'Hong Kong',
  'HU' : 'Hungary',
  'IS' : 'Iceland',
  'IN' : 'India',
  'ID' : 'Indonesia',
  'IR' : 'Iran, Islamic Republic Of',
  'IQ' : 'Iraq',
  'IE' : 'Ireland',
  'IM' : 'Isle Of Man',
  'IL' : 'Israel',
  'IT' : 'Italy',
  'JM' : 'Jamaica',
  'JP' : 'Japan',
  'JE' : 'Jersey',
  'JO' : 'Jordan',
  'KZ' : 'Kazakhstan',
  'KE' : 'Kenya',
  'KI' : 'Kiribati',
  'KR' : 'Korea',
  'KW' : 'Kuwait',
  'KG' : 'Kyrgyzstan',
  'LA' : 'Lao People\'s Democratic Republic',
  'LV' : 'Latvia',
  'LB' : 'Lebanon',
  'LS' : 'Lesotho',
  'LR' : 'Liberia',
  'LY' : 'Libyan Arab Jamahiriya',
  'LI' : 'Liechtenstein',
  'LT' : 'Lithuania',
  'LU' : 'Luxembourg',
  'MO' : 'Macao',
  'MK' : 'Macedonia',
  'MG' : 'Madagascar',
  'MW' : 'Malawi',
  'MY' : 'Malaysia',
  'MV' : 'Maldives',
  'ML' : 'Mali',
  'MT' : 'Malta',
  'MH' : 'Marshall Islands',
  'MQ' : 'Martinique',
  'MR' : 'Mauritania',
  'MU' : 'Mauritius',
  'YT' : 'Mayotte',
  'MX' : 'Mexico',
  'FM' : 'Micronesia, Federated States Of',
  'MD' : 'Moldova',
  'MC' : 'Monaco',
  'MN' : 'Mongolia',
  'ME' : 'Montenegro',
  'MS' : 'Montserrat',
  'MA' : 'Morocco',
  'MZ' : 'Mozambique',
  'MM' : 'Myanmar',
  'NA' : 'Namibia',
  'NR' : 'Nauru',
  'NP' : 'Nepal',
  'NL' : 'Netherlands',
  'AN' : 'Netherlands Antilles',
  'NC' : 'New Caledonia',
  'NZ' : 'New Zealand',
  'NI' : 'Nicaragua',
  'NE' : 'Niger',
  'NG' : 'Nigeria',
  'NU' : 'Niue',
  'NF' : 'Norfolk Island',
  'MP' : 'Northern Mariana Islands',
  'NO' : 'Norway',
  'OM' : 'Oman',
  'PK' : 'Pakistan',
  'PW' : 'Palau',
  'PS' : 'Palestinian Territory, Occupied',
  'PA' : 'Panama',
  'PG' : 'Papua New Guinea',
  'PY' : 'Paraguay',
  'PE' : 'Peru',
  'PH' : 'Philippines',
  'PN' : 'Pitcairn',
  'PL' : 'Poland',
  'PT' : 'Portugal',
  'PR' : 'Puerto Rico',
  'QA' : 'Qatar',
  'RE' : 'Reunion',
  'RO' : 'Romania',
  'RU' : 'Russian Federation',
  'RU-KALININGRAD' : 'Russian Federation',
  'RW' : 'Rwanda',
  'BL' : 'Saint Barthelemy',
  'SH' : 'Saint Helena',
  'KN' : 'Saint Kitts And Nevis',
  'LC' : 'Saint Lucia',
  'MF' : 'Saint Martin',
  'PM' : 'Saint Pierre And Miquelon',
  'VC' : 'Saint Vincent And Grenadines',
  'WS' : 'Samoa',
  'SM' : 'San Marino',
  'ST' : 'Sao Tome And Principe',
  'SA' : 'Saudi Arabia',
  'SN' : 'Senegal',
  'RS' : 'Serbia',
  'SC' : 'Seychelles',
  'SL' : 'Sierra Leone',
  'SG' : 'Singapore',
  'SK' : 'Slovakia',
  'SI' : 'Slovenia',
  'SB' : 'Solomon Islands',
  'SO' : 'Somalia',
  'ZA' : 'South Africa',
  'GS' : 'South Georgia And Sandwich Isl.',
  'ES' : 'Spain',
  'LK' : 'Sri Lanka',
  'SD' : 'Sudan',
  'SR' : 'Suriname',
  'SJ' : 'Svalbard And Jan Mayen',
  'SZ' : 'Swaziland',
  'SE' : 'Sweden',
  'CH' : 'Switzerland',
  'SY' : 'Syrian Arab Republic',
  'TW' : 'Taiwan',
  'TJ' : 'Tajikistan',
  'TZ' : 'Tanzania',
  'TH' : 'Thailand',
  'TL' : 'Timor-Leste',
  'TG' : 'Togo',
  'TK' : 'Tokelau',
  'TO' : 'Tonga',
  'TT' : 'Trinidad And Tobago',
  'TN' : 'Tunisia',
  'TR' : 'Turkey',
  'TM' : 'Turkmenistan',
  'TC' : 'Turks And Caicos Islands',
  'TV' : 'Tuvalu',
  'UG' : 'Uganda',
  'UA' : 'Ukraine',
  'AE' : 'United Arab Emirates',
  'UK' : 'United Kingdom',
  'US' : 'United States',
  'UM' : 'United States Outlying Islands',
  'UY' : 'Uruguay',
  'UZ' : 'Uzbekistan',
  'VU' : 'Vanuatu',
  'VE' : 'Venezuela',
  'VN' : 'Viet Nam',
  'VG' : 'Virgin Islands, British',
  'VI' : 'Virgin Islands, U.S.',
  'WF' : 'Wallis And Futuna',
  'EH' : 'Western Sahara',
  'YE' : 'Yemen',
  'ZM' : 'Zambia',
  'ZW' : 'Zimbabwe'
};
