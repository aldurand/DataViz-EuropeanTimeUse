var svg = null;
var dataset = null;
var count = 0;
var color_opacity = null;
var currentMousePos = {top:0, left:0}
var year = "2000"
var gender = "All"
var day = "All"
var activity = "GHI"
var filtre = "2000 All All"
var k = 0;
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

function draw() {
    svg.selectAll(".europe")
      //données associées à la carte
        .datum(function(d) { return { country_code: d3.select(this).attr("id") }})
        .data(dataset, function(d) { return d.country_code })
       .style("fill", "Blue")
       .style("fill-opacity", function(d) {return color_opacity(d[activity]);
       });
};

function setBarChart( doc,nameConst ,colorfill, colorfill2,dataset ){

    var XrectConstrain = 0

    var margin = {top:0, right:0, bottom:20, left:50};
    var barWidth = 50
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

            d3.select("#GHI").text(d[activity]);

            $('#info-container').offset(currentMousePos).show();
       })
       .on("click", function(d){

         barchart()
         console.log("done barchart")
       });

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
};

function load_data(filtre) {
  var tabName = filtre_dic[filtre];
  var selected_filters_to_display = filtre + " " + activity
  d3.select("h2").text(selected_filters_to_display); // change le sous-titre avec le filtre choisi

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
    })
    .get((error,rows) => {
    console.log("Loaded"+rows.length+"rows");
    if(rows.length > 0) {
        console.log("First row:",rows[0])
        console.log("Last row:",rows[rows.length-1])
    }
    // filter rows with null value
    dataset = rows.filter( function(row) {
        return row[activity] != 0
    });
    var min = d3.min(dataset, (row) => row[activity] );
    var max = d3.max(dataset, (row) => row[activity] );
    console.log("min:",min)
    console.log("max:",max)
    color_opacity = d3.scaleLinear().domain(d3.extent(dataset,(row)=> row[activity])).range([0.1, 1]);
    draw();
    mouse_over();
    });
  }


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
    year = event.innerText;
    filtre = year + " " + gender + " " + day;
    load_data(filtre);
}
function changeGender(event) {
    gender = event.innerText;
    filtre = year + " " + gender + " " + day;
    load_data(filtre);
}
function changeDay(event) {
    day = event.innerText;
    filtre = year + " " + gender + " " + day;
    load_data(filtre);
}
function changeAct(event) {
    activity = event.innerText;
    filtre = year + " " + gender + " " + day;
    load_data(filtre);
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
