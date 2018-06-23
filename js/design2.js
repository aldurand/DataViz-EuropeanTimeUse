var svg = null;
var dataset = null;
var count = 0;
var color_opacity = null;
var currentMousePos = {top:0, left:0}
var year = "2000"
var gender = "All"
var day = "All"
var filtre = "2000 All All"

// BAR CHART START
var k = 0
var barWidth = 50;
var svgWidth = 400;
var svgHeight = 100;
// BAR CHART STOP

// dictionnaire correspndance entre text filtre et texte table dans data
// Quid de la gestion de plusieurs filtre -> plusieurs textes pour une table
var filtre_dic = {
  "2000 Female Weekdays" :"data_2000_F_D1-5.csv",
  "2000 Female All": "data_2000_F_D1-7",
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

function draw() {
    svg.selectAll(".europe")
      //données associées à la carte
         .datum(function(d) { return { countryCode: d3.select(this).attr("id") }})
        .data(dataset, function(d) { return d.country })
       .style("fill", "Blue")
      // .style("fill-opacity", function(d) {return color_opacity(d.mean);
      // });
};

// BARCHART - START
function setBarChart( Frame , nameConst ,colorfill, colorfill2,dataset ){

  var XrectConstrain = 0

  var margin = {top:10, right:0, bottom:20, left:50};


  var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([svgHeight - margin.top - margin.bottom,0]);

  var xScale = d3.scaleLinear()
          .range([0, svgWidth - margin.right - margin.left]);

 //if ( k == 0 ) {
 //   Frame.innerHTML += message ;
 //  }

  if (k>2){

    //var colorfill = colorfill
    //var colorfill2 = colorfill2

    var barChartConst = d3.select("#"+nameConst)
                   .select("svg").remove()

    var barChartConst = d3.select("#"+nameConst)
                   .append("svg")
                   .attr("width", svgWidth)
                   .attr("height", svgHeight)

  } else {

    //var colorfill = colorfill
    //var colorfill2 = colorfill2

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
              return (yScale(d));
          })
          .attr("x", function(d) {
              XrectConstrain = XrectConstrain + barWidth*1.8
              return XrectConstrain })
          .attr("height", function(d) {
              //return (d) })
              return( svgHeight - margin.top - margin.bottom - yScale(d)) })
          .attr("width", barWidth)
          .attr("rx", 10) // set the x corner curve radius
          .attr("ry", 10)


}

function barchart(datasetC,datasetUC,country,ghi) {

  //define the balise name
  k1 = k%3;

  var nameConst = "comparisonConst"+k1
  var nameUnConst= "comparisonUnConst"+k1
  var nameCountry= "countryName"+k1

  var ConsTop = 300
  var ConsLeft = 650

  var doc1 = document.getElementById(nameConst);
  doc1.style.position = "absolute";
  //doc1.style.top = 800 + 80*k1 + 'px';
  //doc1.style.left = 0 +'px';
  doc1.style.top = ConsTop + 25+100*k1 + 'px';
  doc1.style.left = ConsLeft +'px';
  //doc1.innerHTML = "<strong> " + country + "&nbsp <p>" //+ ghi + "&nbsp" + "</strong> "

  var doc2 = document.getElementById(nameUnConst);
  doc2.style.position = "absolute";
  //doc2.style.top = 800 + 80*k1 + 'px';
  //doc2.style.left = 400 +'px';
  doc2.style.top = ConsTop + 25 +100*k1 + 'px';
  doc2.style.left = ConsLeft  + 350 +'px';


  var doc3 = document.getElementById(nameCountry);
  doc3.style.position = "absolute";
  //doc2.style.top = 800 + 80*k1 + 'px';
  //doc2.style.left = 400 +'px';
  doc3.style.top = ConsTop +25 +100*k1 + 'px';
  doc3.style.left = ConsLeft +'px';
  doc3.style.textAlign = "right"
  doc3.innerHTML =  country

  nameIdUC = 'graphUnconstraint'
  var FrameUnconst = document.getElementById(nameIdUC);
  FrameUnconst.style.position = "absolute";
  FrameUnconst.style.top = ConsTop  + 'px';
  FrameUnconst.style.left = ConsLeft + 450 + svgWidth/4 +'px';
  FrameUnconst.style.textAlign = "left";
  //messageU = "Unconstrained activities <p style="text-indent: 5em;" activity1 "

  nameTitleUC = 'titleUnconstraint'
  messageU = "<strong> Unconstrained activities </strong><p> "
            +"Media  &nbsp &nbsp &nbsp &nbsp  Sport &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Social"
  var TitleUnconst = document.getElementById(nameTitleUC);
  TitleUnconst.style.position = "absolute";
  TitleUnconst.style.top = ConsTop - 50 + 'px';
  TitleUnconst.style.left = ConsLeft + 350 + svgWidth/4 +'px';
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


  var colorfill = "DeepPink"
  var colorfill2 = "Aqua"
  setBarChart( FrameConst,nameConst ,colorfill, colorfill2,datasetC)
  setBarChart( FrameUnconst , nameUnConst , colorfill2, colorfill,datasetUC )
  k = k+1;
}
 // BAR CHART STOP

function mouse_over() {
    svg.selectAll(".europe")
       .on("mousemove", function(d) {
         d3.select("#country").text(isoCountries[d.countryCode.toUpperCase()]);

            if (d.meanMale)
              d3.select("#mean").text("Male:" + d.meanMale + "; Female:" + d.meanFemale);
            else
              d3.select("#mean").text(d.mean);

             $('#info-container').offset(currentMousePos).show();

            if(!d.mean && !d.meanMale)
              d3.select("#info-container").hide = function() {
                this.style('display', 'none');
                return this;
            }

       })
       // BAR CHART START
       .on("click", function(d){
         var countryName = isoCountries[d.countryCode.toUpperCase()];

         var idx = 0
         var datasetUC = new Array();
         var datasetC = new Array();
         var data ;
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

           }
         }

         console.log(countryName)
         console.log("data const")
         console.log(datasetC)

         barchart(datasetC,datasetUC,countryName,d.GHI)

         console.log("data Uconst")
         console.log(datasetUC)
         //barchart(datasetC,datasetUC,countryName)
      });
    }

// BAR CHART STOP
function load_data(filtre) {
  var tabName = filtre_dic[filtre];
  d3.select("#h1").text(filtre); // change le titre avec le filtre choisi
  //$("h1").text(theme);
  // load csv

  //if (questionCode) {
    //load tout le dataset peut importe la question...
    console.log(tabName)
    d3.csv("output_tables/"+tabName)
    .row((d,i) => {
      return {
        country: d.country,
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
    var min = d3.min(rows, (row) => row.GHI );
    var max = d3.max(rows, (row) => row.GHI );
    console.log("min:",min)
    console.log("max:",max)
    color_opacity = d3.scaleLinear().domain(d3.extent(rows,(row)=> row.GHI)).range([0.2, 1]);

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
        $("svg").replaceWith(xml.documentElement);
        svg = d3.select("svg");

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
  filtre = year+" "+gender+" "+day
  console.log(question_dic[year+" "+gender+" "+day])
}
function changeGender(event) {
  var newGender = event.innerText;
  gender = newGender;
  filtre = year+" "+gender+" "+day

}
function changeDay(event) {
  var newDay = event.innerText;
  day = newDay;
  filtre = year+" "+gender+" "+day
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
    'BA' : 'Bosnia',
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
    'CZ' : 'Czech Rep',
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
