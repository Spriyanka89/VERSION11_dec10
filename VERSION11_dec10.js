//PRIYANKA SINGH
//DATA VIZ Project 1
//NOV 25 2018

var worldmapimg; // world map
var USAmapimg;//US MAP
var clat = 0;
var clon =0;
var ww = 1024;
var hh = 512;
var zoom = 1;
var weather; // for accessing url data
var lat;
var lon;
var x;
var y;
var d;
var town;
var input;
var cx;
var cy;
var r;
var g;
var b;
var img;
var gWidth= 30;
var gHeight= 30;
var CO2data;
var ye;
var year;
var OverCircle;
var canvas;
var h1;
var degC;
var co2mapping=10;
var di;

 var api= "https://api.openweathermap.org/data/2.5/weather?q=";
 var apikey= "&appid=ccdc6f53ecbaaa5acf18c0a7f4b0e623";
 var unit = '&units=metric';

function preload() {
  
    img=loadImage("cloud.png");
    img1=loadImage("sun.png");
    img2=loadImage("hot.png");
    img3=loadImage("snow.png");

  
  // The clon and clat in this url are edited to be in the correct order.
  worldmapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoicHJpeWFua2EyNiIsImEiOiJjam9zMDVsZmowbGZuM3BydmpwYWtsaTF1In0.IA8Aeh9godtirGZOBXZalw'); 
    
    USAmapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-95,37,3.4/1024x512?access_token=pk.eyJ1IjoicHJpeWFua2EyNiIsImEiOiJjam9zMDVsZmowbGZuM3BydmpwYWtsaTF1In0.IA8Aeh9godtirGZOBXZalw')
    
    CO2mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/static/0,0,1/1024x512?access_token=pk.eyJ1IjoicHJpeWFua2EyNiIsImEiOiJjam9zMDVsZmowbGZuM3BydmpwYWtsaTF1In0.IA8Aeh9godtirGZOBXZalw')
       
    CO2data = loadTable("CO2.csv","header");
}

// web mercator projection formulaes, from wikipedia

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  
    h1 = createElement("h1","Real Time City Climate Data Visualization");
  
  
//createP("This Interface visualize the Current temperature and the Co2 emission all the countries  around the globe in past 200 Years(1750-2016).");

createCanvas(ww, hh);
   //canvas.position(200,200)

  translate(width / 2, height / 2); // TO ENSURE MAP CENTER AND CANVAS CENTER COINCIDES
  imageMode(CENTER);
  image(worldmapimg, 0, 0);



input = select('#town'); 
var button = select('#submit');
button.mousePressed(askTemp);

var button = select('#co2');
button.mousePressed(CO2);

   // var year=createSlider(1751,2016,2016);  
       //// year.position(880,700);
        //ye=year.value();
        //year.input(CO2);
       //text(ye,100,100);
    

}



function mousePressed(){
}

function USA(){
  
  image(USAmapimg, 0, 0);
   clon= -95;
   clat= 37;
   zoom = 3.4;}

  
function askTemp(){
  
  h1.html("Real time city temperature data");
   

     //co2mapping = 0;
     //image(worldmapimg,0,0);
  
    if (co2mapping==1){  image(worldmapimg, 0, 0);co2mapping=0;}

  
  var url = api+input.value()+apikey+unit; // URL FOR OPEN WEATHER DATA
  
  loadJSON(url,gotdata); // ASYNCHRONOUS FUNCTION LOAD FOR URL
  
  // computation based on the url JSON file starts here
  // corresponding to the url location temp and lat long are defined into variables d, lat, lon
  
   cx= mercX(clon); // map center longitude value converted to canvass co-ordinate system
   cy= mercY(clat); // map center lattitude value converted to canvass co-ordinate system
   
   x= mercX(lon)- cx; 
   y= mercY(lat)- cy;
  
          
     stroke(0);
     if (d<=32){ 
     r=229;
     g=204;
     b=255;
     fill (r,g,b,200);
     textSize(20);
     text (d,x +5,y);
     image(img3,x,y,gWidth, gHeight); }
   
      if ((d<=59)&&(d>32)){
     r=0;
     g=255;
     b=255; 
   
     fill (r,g,b,200);
     textSize(20);
     text (d,x+5 +5,y);
     image(img,x,y,gWidth, gHeight);}
     
     
     
     if ((d>59) && (d<=78)){
     r=0;
     g=255;
     b=0; 
   fill (r,g,b,200);
     textSize(20);
     text (d,x +5,y);
   image(img1,x-4,y,gWidth-3, gHeight-5);}
   
   
  
   
   if (d>78){
     r=255;
     g=0;
     b=0;
     
     fill (r,g,b,200);
     textSize(20);
     text (d,x +5,y);
     image(img2,x-5,y,gWidth-3, gHeight-3); }
   
  
}

function gotdata(data) {
  
weather = data;

degC =weather.main.temp;
//conversion to degF
d=round((1.8*degC)+32);
lat = weather.coord.lat; // lattitude
lon = weather.coord.lon; // longitude
}

//new co2 function

function CO2() {
  
  h1.html("Co2 Emission worldwide: Cumulative CO2 generation since 1851 in Giga(E+12) Tonnes ");

  image(worldmapimg, 0, 0);
  
   co2mapping=1;
    
   year=createSlider(1851,2016,2000);  
   year.position(500,670);
   
    }
     
  





function draw() {

  
  translate(width / 2, height / 2); // do not delete this line, the code doesn't work without this ???????
 

   
 if(co2mapping==1){
  image(CO2mapimg, 0, 0);

   ye=year.value();
        
 for (var i = 0; i < CO2data.getRowCount(); i++) {
    var d = CO2data.getNum(i,"Year");
    
    if(d==ye){
    var lon = CO2data.getNum(i,"Lon");
    var lat = CO2data.getNum(i,"Lat");
    var e = round(CO2data.getNum(i,3)/1000000000);
    var level = CO2data.getNum(i,4);
    
    var lev = round(map(level,0,1,25,50));
    
    var emission = map(e,0,400,3,65);
    
    //rect (-40,0,10,50); 
    //text(lev,100,100);
    
   cx= mercX(clon); // map center longitude value converted to canvass co-ordinate system
   cy= mercY(clat); // map center lattitude value converted to canvass co-ordinate system
   x= mercX(lon)- cx; 
   y= mercY(lat)- cy;
     
     noStroke(); 
     
     if (e=>10){
     fill(255,0,0);}
     if(e<10){fill(100,100,100);}
     
     ellipse(x,y,emission,emission);
     fill(255,0,0);
     textSize(25);
     text(ye,50,200);
     fill(0);
     text(1851,-35, 200);
     text(2016,125,200);
   
   di = dist(x,y,mouseX-width/2,mouseY-height/2);
   //text(di,x+5,y)
     
     if ( di <= emission){fill(11,142,54);textSize(40);textStyle(BOLD);text(e,x+5,y);}
    }
    }        
 
 }

   }
