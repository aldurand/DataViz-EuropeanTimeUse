var svg = null;
var dataset = null;
var count = 0;
var color_opacity = null;
//var dsv = d3.dsv(";", "text/plain");
var currentMousePos = {top:0, left:0}

var question_dic = { // à modifier
  "Happiness index" :"Y11_Q41",
  "Satisfaction with education": "Y11_Q40a",
  "Satisfaction with present job": "Y11_Q40b",
  "Satisfaction with present standard of living": "Y11_Q40c",
  "Satisfaction with accommodation": "Y11_Q40d",
  "Satisfaction with family life": "Y11_Q40e",
  "Satisfaction with health": "Y11_Q40f",
  "Satisfaction with social life": "Y11_Q40g",
  "Satisfaction with economic situation of the country": "Y11_Q40h"
}

function draw() {
    svg.selectAll(".europe")
       .datum(function(d) { return { countryCode: d3.select(this).attr("id") }})
       .data(dataset, function(d) { return d.countryCode })
       .style("fill", "Blue")
       .style("fill-opacity", function(d) {
            return color_opacity(d.mean);
       });
};

/*function draw2() {
    svg.selectAll(".europe")
       .datum(function(d) { return { countryCode: d3.select(this).attr("id") }})
       .data(dataset, function(d) { return d.countryCode })
       .style("fill", function(d) {
          if(d.meanMale > d.meanFemale)
            return "#107FC9";
          if (d.meanMale == d.meanFemale)
            return "grey"
          return "#CB5B7C";
       })
       .style("fill-opacity", 1);
};*/

function barchart() {

  // console.log("in barChart")

  //https://medium.freecodecamp.org/how-to-create-your-first-bar-chart-with-d3-js-a0e8ea2df386
  console.log("in barChart")
  var svgWidth = 100;
  var svgHeight = 100;

  //var dataset1 = [80, 100, 56, 120, 180, 30, 40, 120, 160];
  var dataset1 = [10,20,30,40,50,60]; //,30,40,50,60];
  var barPadding = 5;
  var barWidth = (svgWidth / dataset1.length);

  var barChart = d3.select("#comparison")
      .data(dataset1)
      .enter()
      .append("svg")
      .append("rect")
      .style("fill","MidnightBlue")
      .attr("y",10)
      .attr("x",10)
      //.attr("y", function(d) {
      //    return svgHeight - d
      //})
      //.attr("height", function(d) {
      //    return d;
      //})
      .attr("height", 100)
      .attr("width", 10);
      //.text(function(d) { return d; });

      //.attr("width", barWidth - barPadding);
      //.attr("transform", function (d, i) {
      //     var translate = [barWidth * i, 0];
      //     return "translate("+ translate +")";
      //});


    //https://bost.ocks.org/mike/bar/
    /*
    var data1 = [4, 8, 15, 16, 23, 42];

    var xb = d3.scaleLinear()
        .domain([0, d3.max(data1)])
        .range([0, 420]);

    svg.select("chart")
      .data(data1)
      .enter().append("chart")
      .style("width", function(d) { return xb(d) + "px"; })
      .text(function(d) { return d; });
      */
      /*
      var data1 = [25,50];

      var xb = d3.scaleLinear()
          .domain([0, d3.max(data1)])
          .range([0, 100]);

      d3.select("#comparison")
        .data(data1)
        .enter()
        .append("svg")
        .append("rect")
        .attr("width", function(d) { return xb(d) ; })
        .attr("height", function(d) { return xb(d) ; })
        /*.attr("width",(d) => {
            if ( isNaN( xb(d) ) == false)  {
              return(x(d.longitude))
            }

         })

        //.attr("width",100)
        //.attr("height",100)
        //.attr("fill-opacity", 1)
        .style("fill","MidnightBlue")
        .text(function(d) { return d; });
*/

/*
        svg.selectAll("rect")
             .data(dataset)
             .enter()
             .append("rect")
             .attr("width",1)
             .attr("height",1)
             .attr("fill-opacity", (d) => (d.density+100)/1000) // set the fill opacity
             .style("fill","MidnightBlue")
             .attr("x",(d) => {
                 if ( isNaN( d.longitude ) == false)  {
                   return(x(d.longitude))
                 }

              })

  */

/*
        var data = [10, 5, 12, 15];

         var width = 300
            scaleFactor = 20,
            barHeight = 30;

         var graph = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", barHeight * data.length);

         var bar = graph.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
               return "translate(0," + i * barHeight + ")";
            });
         bar.append("rect").attr("width", function(d) {
            return d * scaleFactor;
         })

         .attr("height", barHeight - 1);

         bar.append("text")
            .attr("x", function(d) { return (d*scaleFactor); })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });

    */

    }

function mouse_over() {
    svg.selectAll(".europe")
       .on("mousemove", function(d) {
         d3.select("#country").text(isoCountries[d.countryCode.toUpperCase()]);
            //$("#country").text(isoCountries[d.countryCode.toUpperCase()]);

            if (d.meanMale)
              d3.select("#mean").text("Male:" + d.meanMale + "; Female:" + d.meanFemale);
              //$("#mean").text("Male:" + d.meanMale + "; Female:" + d.meanFemale);
            else
              d3.select("#mean").text(d.mean);
             // $("#mean").text(d.mean);

             //d3.select("#info-container").
             $('#info-container').offset(currentMousePos).show();

            if(!d.mean && !d.meanMale)
              d3.select("#info-container").hide = function() {
                this.style('display', 'none');
                return this;
            }
             // d3.select("#info-container").hide();
              //$("#info-container").hide();
       })
       .on("click", function(d){
         //$("#comparison").text("selected country");
         barchart()
       });

    $('.europe').hover(function() {
      //$("#info-container").show();
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
};

function load_data(theme) {
  var questionCode = question_dic[theme];
  d3.select("#h1").text(theme);
  //$("h1").text(theme);
  // load csv

  //if (questionCode) {

    d3.csv("data_2/all_questions.csv").row((d,i) => {
      return {
        countryCode: d.CountryCode.toLowerCase(),
        questionCode: d.question_code,
        subset: d.subset,
        answer: d.answer,
        mean: +d.Mean
      };
    }).get((error,rows)=>{
    dataset = rows;
    color_opacity = d3.scaleLinear()
                        .domain(d3.extent(rows,(row)=> row.mean
                      )).range([0.2, 1]);

        var min = d3.min(rows, (row) => row.mean );
        var max = d3.max(rows, (row) => row.mean );
        d3.select("#grad1").text(min);
        //$("#grad1").text(min);
        d3.select("#grad2").text(max);
        //$("#grad2").text(max);
        //partie dédiée à l'échelle
        //var text = "-webkit-linear-gradient(left,rgba(0,67,132,"+color_opacity(min)+"),rgba(0,67,132,"+color_opacity(max)+")";
        //$("#gradient").css("background", text);
        //$("#gradient-container").show();
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
  }, function(error, rows) {
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
 /* } else {
    $("#legend").text('Countries are colored in red when women are happier than men, blue when men are happier than women and grey when men and women have the same happiness score.')
    dsv("data/happiness-male-female.csv", function(d) {
      return {
        countryCode: d.CountryCode.toLowerCase(),
        meanMale: d.mean_male,
        meanFemale: d.mean_female
      }
    }, function(error, rows) {
        $("#gradient-container").hide();
      dataset = rows;
      console.log(rows[0]);
      draw2();
    });
  }

}*/

//$(document).ready(function() {
  document.addEventListener("DOMContentLoaded", function(e) {
    /* Your D3.js here */

    // add svg to page
    d3.xml("svg/europe.svg").mimeType("image/svg+xml").get(function(error, xml) {
        if (error) throw error;
        $("svg").replaceWith(xml.documentElement);
        svg = d3.select("svg");

        load_data("Happiness index");

    });

    // dropdown
    $(".dropdown li").click(function(e) {
      load_data(e.target.text);
    });

    // mouse position
    $(document).mousemove(function(event) {
        currentMousePos.left = event.pageX - 70;
        currentMousePos.top = event.pageY + 20;
    });
  });
//});



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
    'GB' : 'United Kingdom',
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
