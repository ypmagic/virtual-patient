var currentPatient = {};
var selector = document.querySelector(".events"); // change office visits/events
selector.addEventListener("change", function() {
  replaceData();
})

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

function loadJSON() {
  // get example JSON file
  $.getJSON("resources/data/george-farmer.json", (data) => {
    console.log(data);
    currentPatient = data;
  });
}

function replaceData() {
  // get current event from selector
  var currentEvent = selector.options[selector.selectedIndex].value;
  // get the relevant office data from JSON
  var data = currentPatient["visits"][parseInt(currentEvent)-1];
  // replace inner HTML with new data
  // inbox
  document.querySelector("#tab1-text").innerHTML = data["inbox"];
  // history
  document.querySelector("#tab2-text").innerHTML = data["history"];
  // physical
  document.querySelector("#tab3-text").innerHTML = data["physical"]["examination"];
  // office procedures
  document.querySelector("#tab1-text").innerHTML = data["procedures"];
  // investigate
  document.querySelector("#tab1-text").innerHTML = data["investigate"];
}

loadJSON();
addTabs();
