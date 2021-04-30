//map locations
var selectedBranch = '';

function initMap (){

var locations = {
    zoom:6,
    center: {lat:53.8008, lng:-1.5491},
};

var map = new google.maps.Map(document.getElementById("map"), locations); 

var infoWindow = null;

let pharmacies = [
{name:"Leeds",divid:"leeds",content:'<div class="map-click"><h4>Leeds</h4></div>',coordinates:{lat:53.8013853,lng:-1.5643944}},
{name:"Bradford",divid:"bradford",content:'<div class="map-click"><h4>Bradford</h4></div>',coordinates:{lat:53.7960,lng:-1.7594}},
{name:"Manchester",divid:"manchester",content:'<div class="map-click"><h4>Manchester</h4></div>',coordinates:{lat:53.4668,lng:-2.2339}},
{name:"Sheffield",divid:"sheffield",content:'<div class="map-click"><h4>Sheffield</h4></div>',coordinates:{lat:53.3813,lng:-1.4883}},
{name:"York",divid:"york",content:'<div class="map-click"><h4>York</h4></div>',coordinates:{lat:53.9600,lng:-1.0873}},
{name:"London",divid:"london",content:'<div class="map-click"><h4>London</h4></div>',coordinates:{lat:51.5249,lng:-0.1224}},
{name:"Birmingham",divid:"birmingham",content:'<div class="map-click"><h4>Birmingham</h4></div>',coordinates:{lat:52.4507,lng:-1.9305}},
{name:"Newcastle",divid:"newcastle",content:'<div class="map-click"><h4>Newcastle</h4></div>',coordinates:{lat:54.9791,lng:-1.6146}},
{name:"Nottingham",divid:"nottingham",content:'<div class="map-click"><h4>Nottingham</h4></div>',coordinates:{lat:52.9397,lng:-1.1928}},
{name:"Liverpool",divid:"liverpool",content:'<div class="map-click"><h4>Liverpool</h4></div>',coordinates:{lat:53.4047,lng:-2.9653}},
]

for (let i = 0; i < pharmacies.length; i++) {
    addPharmacy(pharmacies[i]);
}

//map markers

function addPharmacy(details){
    var marker = new google.maps.Marker({
        position:details.coordinates,
        map:map,
        icon:'https://maps.google.com/mapfiles/ms/icons/hospitals.png',
        content:details.content,
        name:details.name,
        divid:details.divid


    });

//map info window

if(details.content){

marker.addListener('click',function(){
    if (infoWindow) {
        infoWindow.close();
    }

    infoWindow = new google.maps.InfoWindow({
    content:this.content
    });

    infoWindow.open(map, marker);
    console.log("clicked the marker ", this.divid);
    var elems = document.querySelectorAll(".branch-item");
    document.getElementById("branch-form").style.display = "none";
    [].forEach.call(elems, function(el) {
        el.style.display = "none";
    });

//map marker click to show branch address and form

    document.getElementById(this.divid).style.display = "block";
    document.getElementById("branch-form").style.display = "block";
    document.getElementById("branchSelected").innerHTML = "You have selected our " + this.divid.toUpperCase() + " branch";
    selectedBranch = this.divid;
});
}}}

//function to have each option selected show a different element

function myOptions(optionSelect)
{
    if(optionSelect){
        showDivId = optionSelect.options[optionSelect.selectedIndex].getAttribute('data-div-id');
        var elems = document.querySelectorAll(".datediv");
        [].forEach.call(elems, function(el) {
            el.style.display = "none";
        });
        document.getElementById(showDivId).style.display = "block";
}}

// email submission for branch form

//alert for map form submission 

 function showAlertMap(){
      alert("Thank you for choosing us!\nYour selected store will get back to you with your confirmed appointment.");
  }



//emailJS map form

function sendEmailMap() {

    var branch = selectedBranch;
    var service = document.getElementById("serviceSelected").value;
	  var email = document.getElementById("fromEmailMap").value;
      var otherMessage = document.getElementById("otherBox").value;
      var date = document.getElementById("date").value;
      
	  
				 var mapEmail ={
                      branchChoice: branch,
                      serviceSelected: service,
					  fromEmailMap: email,
                      otherBox: otherMessage,
					  date: date,
                      
				  };

                  emailjs.send("service_mc16uvn","template_hsw25dm", mapEmail)
				  .then(function(response){
					  console.log("success", response.status);
					  showAlertMap(); 
                      document.getElementById("branchChoice").value = '';
                      document.getElementById("serviceSelected").value = '';
					  document.getElementById("fromEmailMap").value = '';
                      document.getElementById("otherBox").value = '';
					  document.getElementById("date").value = '';
                      
				  });
}


	  
  
