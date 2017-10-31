//--------- INSTANCE VARIABLES ------------------
var currentPatient = {};
var currentEvent = "";
var eventSelector = document.querySelector(".events"); // change office visits/events
eventSelector.addEventListener("change", function() {
  currentEvent = eventSelector.options[eventSelector.selectedIndex].value;
  replaceData(currentEvent);
});
var patientSelector = document.querySelector(".patients"); // change patients
patientSelector.addEventListener("change", function() {
  var patientValue = patientSelector.options[patientSelector.selectedIndex].value;
  loadJSON(patientValue);
});
//-----------------------------------------------

// this function could be much more eloquent (works)
function addTabs() {
  // get all tabs
  var tabs = document.querySelectorAll("input");
  for (i = 0; i < tabs.length; i++) {
    // if the tab is checked, display it
    if (tabs[i].checked) {
      document.querySelector("#" + tabs[i].id + "-text").style.display = "block";
    }
    // add event listener to each
    tabs[i].addEventListener("click", function(tab) {
      // make everything blank
      for (j = 0; j < tabs.length; j++) {
        document.querySelector("#" + tabs[j].id + "-text").style.display = "none";
      }
      // make current selected tab display
      var mem = tab.path[0].id;
      document.querySelector("#" + mem + "-text").style.display = "block";
    });
  }
}
addTabs();

/*
Purpose: Retrieves JSON file according to the selected value of the patient

Passes patient JSON to instance variable currentPatient and calls changePatient.
*/
function loadJSON(name) {
  // get example JSON file
  $.getJSON("resources/data/" + name + ".json", (data) => {
    currentPatient = data;
    changePatient(name);
  });
}

/*
Purpose: Changes the patient being displayed.
*/
function changePatient(name) {
  // change image
  var image = document.querySelector(".patient-picture");
  image.src = "resources/images/" + name + "/" + name + ".jpg";
  // get the table of patient bio and change
  var bio = document.querySelectorAll(".info");
  bio[0].innerHTML = currentPatient["name"];
  bio[1].innerHTML = currentPatient["age"];
  bio[2].innerHTML = currentPatient["sex"];
  bio[3].innerHTML = currentPatient["marital"];
  bio[4].innerHTML = currentPatient["race"];
  bio[5].innerHTML = currentPatient["education"];
  bio[6].innerHTML = currentPatient["occupation"];
  // populate event selection from json
  var events = document.querySelector(".events");
  events.innerHTML = "";
  var visitsFromJSON = currentPatient["visits"]; // an array of office visits
  for (var i = 0; i < visitsFromJSON.length; i++) {
    events.innerHTML = events.innerHTML + "<option value=" + visitsFromJSON[i]["id"] + ">" + visitsFromJSON[i]["name"] + "</option>";
  }
  // change to first event
  replaceData(0);
}

/*
Purpose: Changes the event currently being displayed.
*/
function replaceData(currentEvent) {
  // get the relevant office data from JSON
  var data = currentPatient["visits"][currentEvent];
  // replace inner HTML with new data
  // inbox
  document.querySelector("#tab1-text").innerHTML = data["inbox"];
  // history
  document.querySelector("#tab2-text").innerHTML = data["history"];
  // physical
  document.querySelector("#tab3-text").innerHTML = data["physical"]["examination"];
  // office procedures
  document.querySelector("#tab4-text").innerHTML = data["procedures"];
  // investigate
  document.querySelector("#tab5-text").innerHTML = data["investigate"];
}

// FIRST TIME LOAD
loadJSON("georgefarmer");
