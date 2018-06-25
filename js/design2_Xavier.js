var svg = null;
var dataset = null;
var count = 0;
var color_opacity = null;
var currentMousePos = {top:0, left:0}
var year = "2000"
var gender = "All"
var day = "All"
var filtre = "2000 All All"
var k = 0;
var legendSvg;
var scales = ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'];
var legendWidth;
var scaleFullHeight;
var legendFullHeight = 400;
var legendFullWidth = 60;
var legendMargin = { top: 20, bottom: 20, left: 5, right: 10 };
var colorScale;
var legendHeight;
var gradient;
var min;
var max;
var textMin;
var textMax;
// dictionnaire correspndance entre text filtre et texte table dans data
// Quid de la gestion de plusieurs filtre -> plusieurs textes pour une table
var filtre_dic = {
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
}

function draw_legend(){
    // add the legend now
    scaleFullHeight = legendFullHeight*max;

    // use same margins as main plot
    legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
    legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

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


    // create colour scale
    colorScale = d3.scaleLinear()
        .domain(linspace(0, max, scales.length)) //ici le domain du color scale
        .range(scales);

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
    var legendScale = d3.scaleLinear()
        .domain([0, 1]) //on specifie ici le domaine du scale
        .range([legendHeight, 0]);

    var legendAxis = d3.axisRight(legendScale)
        .ticks(10)
        .tickFormat(d3.format(".1f"));

    legendSvg_0_1.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + legendWidth  + ", 0)")
        .call(legendAxis);

    //updateColourScale(scales);
}

function draw() {
    /*svg.selectAll(".europe")
      //données associées à la carte
        .datum(function(d) { return { country_code: d3.select(this).attr("id") }})
        .data(dataset, function(d) { return d.country_code })
       .style("fill", "Blue")
       .style("fill-opacity", function(d) {return color_opacity(d.GHI);
       });*/
    // style carte
    svg.selectAll('.europe')
        .datum(function(d) { return { country_code: d3.select(this).attr("id") }})
        .data(dataset, function(d) { return d.country_code })
        .style('fill', function(d) {
            return colorScale(d.GHI);
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
function updateColourScale(scale) {
    // clear current legend
    legendSvg.selectAll('*').remove();
    legendSvg_0_1.selectAll('*').remove();
}


function setBarChart( doc,nameConst ,colorfill, colorfill2, dataset ){

    var XrectConstrain = 0;

    var margin = {top:0, right:0, bottom:20, left:50};
    var barWidth = 50;
    var svgWidth = 400;
    var svgHeight = 100;

    var yScale = d3.scaleLinear()
    //.domain([0, d3.max(dataset1)])
        .range([svgHeight - margin.top - margin.bottom, 0]);

    var xScale = d3.scaleLinear()
        .range([0, svgWidth - margin.right - margin.left]);


    if (k>3){

        var colorfill = colorfill
        var colorfill2 = colorfill2

        var barChartConst = d3.select("#"+nameConst)
            .select("svg").remove()

        var barChartConst = d3.select("#"+nameConst)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

    } else {

        var colorfill = colorfill2
        var colorfill2 = colorfill

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
            return (svgHeight-d);
        })
        .attr("x", function(d) {
            XrectConstrain = XrectConstrain + barWidth
            return XrectConstrain })
        .attr("height", function(d) {
            return (d) })
        .attr("width", barWidth)

}

function barchart() {


    var dataset1 = [50,20,30,50];
    var dataset2 = [10,20,30,60];

    //define the balise name
    k1 = k%4;

    var nameConst = "comparisonConst"+k1
    var nameUnConst= "comparisonUnConst"+k1

    console.log(k1)
    console.log(k)
    console.log(nameConst)

    var doc1 = document.getElementById(nameConst);
    doc1.style.position = "absolute";
    doc1.style.top = 800 + 80*k1 + 'px';
    doc1.style.left = 0 +'px';

    var doc2 = document.getElementById(nameUnConst);
    doc2.style.position = "absolute";
    doc2.style.top = 800 + 80*k1 + 'px';
    doc2.style.left = 300 +'px';

    var colorfill = "Red"
    var colorfill2 = "MidnightBlue"
    setBarChart( doc1,nameConst ,colorfill, colorfill2,dataset1)
    setBarChart( doc2,nameUnConst ,colorfill2, colorfill,dataset2 )
    k = k+1;
}

function mouse_over() {
    svg.selectAll(".europe")
       .on("mousemove", function(d) {
            d3.select("#country").text(isoCountries[d.country_code.toUpperCase()]);
            d3.select("#GHI").text(d.GHI);
            /*if (d.meanMale){
              d3.select("#mean").text("Male:" + d.meanMale + "; Female:" + d.meanFemale);}
            else{
                console.log(d.mean);d3.select("#GHI").text(d.GHI);*/
            //}

            $('#info-container').offset(currentMousePos).show();

            /*if(!d.mean && !d.meanMale){
              d3.select("#info-container").hide = function() {
                this.style('display', 'none');
                return this;}
            }*/

       })
       .on("click", function(d){
         barchart()
         console.log("done barchart")
       });

    $('.europe').hover(function() {
      d3.select("#info-container").show = function() {
          console.log('#info-container')
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
};


function load_data(filtre) {
  var tabName = filtre_dic[filtre];
  d3.select("#h1").text(filtre); // change le titre avec le filtre choisi
  //$("h1").text(theme);
  // load csv

  //if (questionCode) {
    //load tout le dataset peut importe la question...
    console.log(tabName);
    d3.csv("output_tables/"+tabName)
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
    }).get((error,rows)=>{
        console.log("Loaded"+rows.length+"rows");
        if(rows.length>0){
            console.log("First row:",rows[0])
            console.log("Last row:",rows[rows.length-1])
        }
        dataset = rows;
        min = d3.min(rows, (row) => row.GHI );
        max = d3.max(rows, (row) => row.GHI );
        textMin = min.toString();
        textMax = max.toString();
        console.log("min:",min)
        console.log("max:",max)
        color_opacity = d3.scaleLinear().domain(d3.extent(rows,(row)=> row.GHI)).range([0.2, 1]);

        // affichage des values des legendes
        var maxScale = document.getElementById("maxScale");
        maxScale.style.position = "absolute";
        maxScale.style.left = legendWidth/2 + legendMargin.left + 32 + "px";
        maxScale.style.top = 150 + legendMargin.top + 20 + "px";
        d3.select("#maxScale").text(textMax);

        var minScale = document.getElementById("minScale");
        minScale.style.position = "absolute";
        var widthtick = legendWidth/2 + legendMargin.left + 32;
        minScale.style.left = widthtick + "px";
        var heighttick = legendFullHeight + 150;
        minScale.style.top = heighttick + "px";
        d3.select("#minScale").text(textMin);

        draw_legend();
        draw();
        mouse_over();

    });
  }

   /* dsv("data/all_questions.csv", function(d) {
        return {
            countryCode: d.CountryCode.toLowerCase(),
            questionCode: d.question_code,
            subset: d.subset,
            answer: d.answer,
            mean: +d.Mean
        }
  }, function(error, rows) { // FILTRE QUESTION CODE POUR GARDER QUE LES DATA CORRESPONDANT AU FILTRE
        console.log(rows[0]);
        dataset = rows.filter(function(row) {
            return row.questionCode == questionCode;
        });

        color_opacity = d3.scale.linear()
                        .domain(d3.extent(dataset, function(row) {
                            return row.mean;
                        })).range([0.2, 1]);

        var min = d3.min(dataset, function(d) { return d.mean; });
        var max = d3.max(dataset, function(d) { return d.mean; });
        $("#grad1").text(min);
        $("#grad2").text(max);
        var text = "-webkit-linear-gradient(left,rgba(0,67,132,"+color_opacity(min)+"),rgba(0,67,132,"+color_opacity(max)+")";
        $("#gradient").css("background", text);
        $("#gradient-container").show();


        draw();
        mouse_over();
    });*/

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

    var newYear = event.innerText;
    year = newYear;
    filtre = year+" "+gender+" "+day;
    load_data(filtre);
    updateColourScale(scales);
    //console.log(question_dic[year+" "+gender+" "+day])
}
function changeGender(event) {
    var newGender = event.innerText;
    gender = newGender;
    filtre = year+" "+gender+" "+day;
    load_data(filtre);
    updateColourScale(scales);

}
function changeDay(event) {
    var newDay = event.innerText;
    day = newDay;
    filtre = year+" "+gender+" "+day;
    load_data(filtre);
    updateColourScale(scales);
}


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
    'GR' : 'Greece',
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
