var svg = null;
var dataset = null;
var dataset_filtered = null;
var count = 0;
var color_opacity = null;
var currentMousePos = {top:0, left:0}
var year = "2010"
var gender = "Any Gender"
var day = "Monday-Sunday"
var activity_decoded = "GHI"
var activity = "GHI"
var filtre = "2010 Any Gender Monday-Sunday"

// BAR CHART START
var k = 0
var list_3_countries = [];
var barWidth = 50
var svgWidth = 400;
var svgHeight = 100;  //220
// BAR CHART STOP

// START Xavier Variables
var legendSvg;
var scales_other;
var scales_GHI = ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5']
var legendWidth;
var scaleFullHeight;
var legendFullHeight = 500;
var legendFullWidth = 70;
var legendMargin = { top: 20, bottom: 20, left: 5, right: 40 };
var colorScale;
var legendHeight;
var gradient;
var min;
var max;
// END Xavier Var


// dictionnaire correspndance entre text filtre et texte table dans data
// Quid de la gestion de plusieurs filtre -> plusieurs textes pour une table
var filtre_dic = {
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
}



function draw_legend(scales){
  // add the legend now
  

  // use same margins as main plot
  legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
  legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

  if (activity=="GHI") {
    scaleFullHeight = legendHeight * 0.5;
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

  if (activity == "GHI") {
    colorScale = d3.scaleLinear()
    .domain(linspace(min, 0.5, scales.length)) //ici le domain du color scale
    .range(scales);
  } else {
    colorScale = d3.scaleLinear()
    .domain(linspace(min, max, scales.length)) //ici le domain du color scale
    .range(scales);
  }
  
  
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
      //console.log("Color Scale value = " + colorScale(d[activity]));
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



 
function mouse_over() {
  svg.selectAll(".europe")
  .on("mousemove", function(d) {
        d3.select("#country").text(isoCountries[d.country_code.toUpperCase()]);
        d3.select("#GHI").text(d[activity]);
        $('#info-container').offset(currentMousePos).show();
      })
  .on("mouseout", function(d) {
    $('#info-container').offset(currentMousePos).hide();
  })
  
  // BAR CHART START
  .on("click", function(d){
    var countryName = isoCountries[d.country_code.toUpperCase()];
    console.log("k%3 = " + (k%3))
    list_3_countries[k%3] = countryName;
    console.log("list_3_countries = " + list_3_countries)
    k = k+1
    var tabName = filtre_dic[filtre];
    draw_barcharts(list_3_countries, tabName, svg_barchart_C, svg_barchart_C_name, activities_constraint);  // barchart constraint activities
    draw_barcharts(list_3_countries, tabName, svg_barchart_L, svg_barchart_L_name, activities_leisure);  // barchart leisure activities
   });
   // BAR CHART STOP

    // Show Country name and Value when hover
    $('.europe').hover(function() {
      d3.select("#info-container").show = function() {
        this.style('display', 'initial');
        return this;
      }
    }, function() {
      d3.select("#info-container").hide = function() {
        this.style('display', 'none');
        return this;
      }
    })
  }





function load_data(filtre) {
  var tabName = filtre_dic[filtre];
  var selected_filters_to_display = "with filters : " + year + ", " + gender + ", " + day
  if (activity_decoded != "GHI") {
    activity_decoded = activity_decoded + " (hours)"
  }
  d3.select("h3").text(activity_decoded + " - " + selected_filters_to_display);
  

  d3.csv("./output_tables/" + tabName)
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

    // Get Min and Max values for the current table
    min = d3.min(dataset_filtered, (row) => row[activity] );
    max = d3.max(dataset_filtered, (row) => row[activity] );
    console.log("min:",min)
    console.log("max:",max)


    // Chice of the color scale, depending on GHI to plot or else
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



// Actions to do when a filter (Year, Gender, DayofWeek, Actity) is updated
function changeYear(event) {
  year = event.innerText;
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
  if (list_3_countries.length != 0){
    draw_barcharts(list_3_countries, filtre_dic[filtre], svg_barchart_C, svg_barchart_C_name, activities_constraint);
    draw_barcharts(list_3_countries, filtre_dic[filtre], svg_barchart_L, svg_barchart_L_name, activities_leisure);
  }
}
function changeGender(event) {
  gender = event.innerText;
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
  if (list_3_countries.length != 0){
    draw_barcharts(list_3_countries, filtre_dic[filtre], svg_barchart_C, svg_barchart_C_name, activities_constraint);
    draw_barcharts(list_3_countries, filtre_dic[filtre], svg_barchart_L, svg_barchart_L_name, activities_leisure);
  }
}
function changeDay(event) {
  day = event.innerText;
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
  if (list_3_countries.length != 0){
    draw_barcharts(list_3_countries, filtre_dic[filtre], svg_barchart_C, svg_barchart_C_name, activities_constraint);
    draw_barcharts(list_3_countries, filtre_dic[filtre], svg_barchart_L, svg_barchart_L_name, activities_leisure);
  }
}
function changeAct(event) {
  activity_decoded = event.innerText;
  activity = encodeActivity[activity_decoded]
  filtre = year + " " + gender + " " + day;
  load_data(filtre);
  updateColorScale();
}




// BAR CHARTS - START OF CODE
//============================

var svg_barchart_C = null;
var svg_barchart_L = null;
var svg_barchart_C_name = '#svg_barchart_C';
var svg_barchart_L_name = '#svg_barchart_L';
var activities_constraint = ["basic_needs", "pro_study", "household_family"]
var activities_leisure = ["leisure_media", "leisure_sports_outdoors", "leisure_social_meetings"]

function draw_barcharts(keys, tabName, svg_barchart, svg_barchart_name, activities_chosen) {
  

  d3.select(svg_barchart_name).selectAll("*").remove();

  var margin_bc = {top: 20, right: 20, bottom: 100, left: 45};
  var width_bc = 310;
  var height_bc = 450;

  svg_barchart = d3.select(svg_barchart_name)
    .attr("width", width_bc)
    .attr("height", height_bc)
    .append("g")
      .attr("transform", "translate(" + margin_bc.left + "," + margin_bc.top + ")");

  width_bc = width_bc - margin_bc.left - margin_bc.right;
  height_bc = height_bc - margin_bc.top - margin_bc.bottom;


  var countries_list = [];
  
  d3.csv("./output_tables/"+tabName, function(data) {
    data.forEach(function(d) {
      countries_list.push(d.country);
      d.basic_needs = +d.basic_needs;
      d.pro_study = +d.pro_study;
      d.household_family = +d.household_family;
      d.total_constraint = +d.total_constraint;
      d.leisure_media = +d.leisure_media;
      d.leisure_sports_outdoors = +d.leisure_sports_outdoors;
      d.leisure_social_meetings = +d.leisure_social_meetings;
      d.total_leisure = +d.total_leisure;
    });

  // subgroup of activities
  //var subgroup_act = ["basic_needs", "pro_study", "household_family", "leisure_media", "leisure_sports_outdoors", "leisure_social_meetings"]
  var subgroup_act = activities_chosen;
  console.log("subgroup_act = " + subgroup_act)


  var x0 = d3.scaleBand()
    .domain(subgroup_act)
    .rangeRound([0, width_bc])
    .paddingInner(0.1);

  var x1 = d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05);

  var all_subgroup_act = ["basic_needs", "pro_study", "household_family", "leisure_media", "leisure_sports_outdoors", "leisure_social_meetings"]
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d3.max(all_subgroup_act, function(act) { return d[act]; }); })]).nice()
    //.domain([0, 1600]).nice()  //the maximum over all the table is never higher than 1'600 hours
    .rangeRound([height_bc, 0]);


  if (svg_barchart_name == '#svg_barchart_C') var colors = ["#98abc5", "#6b486b", "#ff8c00"]; //['#d53e4f', '#f46d43', '#fdae61'];
  if (svg_barchart_name == '#svg_barchart_L') var colors = ["#98abc5", "#6b486b", "#ff8c00"]; //['#abdda4', '#66c2a5', '#3288bd'];
  var z = d3.scaleOrdinal()
    .range(colors);
    //.range([d3.rgb(240,248,255), d3.rgb(176,224,230), d3.rgb(135,206,250)]);
    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


  svg_barchart.append("g")
    .selectAll("g")
    .data(subgroup_act)
    .enter().append("g")
      .attr("transform", function(act) { return "translate(" + x0(act) + ",0)"; })
      .selectAll("rect")
      .data(function(act) { return keys.map(function(key) {
        var idx = countries_list.indexOf(key)
        console.log("{key: " + key + ", value: " + data[idx][act] + "}");
        return{key: key, value: data[idx][act]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height_bc - y(d.value); }) 
        .style("fill", function(d) { return z(d.key); });

  var decodeActivity = {
    "basic_needs" : "Basic Needs",
    "pro_study" : "Professional & Study",
    "household_family" : "Household & Family",
    "leisure_media" : "Media (tv, internet, ...)",
    "leisure_sports_outdoors" : "Sports & Outdoors",
    "leisure_social_meetings" : "Social & Meetings"
  };
  var x_axis = subgroup_act.map(function(encoded_act) { return decodeActivity[encoded_act]})
  //var x_axis = ["Basic Needs", "Professional & Study", "Household & Family", "Media (tv, internet, ...)", "Sports & Outdoors", "Social & Meetings"]
  
  svg_barchart.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height_bc + ")")
      //.call(d3.axisBottom(x0));
      .call(d3.axisBottom(x0.domain(x_axis)))
      .selectAll("text")
        .style("font-size", 11)
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");


  if (svg_barchart_name == '#svg_barchart_C') {
    svg_barchart.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .style("fill", "#000")
        .style("font-weight", "bold")
        .style("text-anchor", "start")
        .text("Hours");
  }

  // Take only unique contries in "keys"
  let set_unique_countries = new Set();
  keys.forEach(d => set_unique_countries.add(d));
  let list_unique_countries = [];
  set_unique_countries.forEach(d => list_unique_countries.push(d));

  if (svg_barchart_name == '#svg_barchart_L') {
    var legend = svg_barchart.append("g")
        .style("font-family", "sans-serif")
        .style("font-size", 10)
        .style("text-anchor", "end")
        .style("fill", "#000")
      .selectAll("g")
      .data(list_unique_countries.slice()) //.reverse())
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width_bc - 19)
        .attr("width", 19)
        .attr("height", 19)
        .style("fill", z);

    legend.append("text")
        .attr("x", width_bc - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .style("fill", "#000")
        .text(function(d) { return d; });
    }
  });
}

// BAR CHARTS - END OF CODE
//============================





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
