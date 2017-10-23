var tabs = document.querySelectorAll("input");
for (i = 0; i < tabs.length; i++) {
  if (tabs[i].checked) {
    document.querySelector("#" + tabs[i].id + "-text").style.display = "block";
  }
  tabs[i].addEventListener("click", function(tab) {
    for (j = 0; j < tabs.length; j++) {
      document.querySelector("#" + tabs[j].id + "-text").style.display = "none";
    }
    var mem = tab.path[0].id;
    document.querySelector("#" + mem + "-text").style.display = "block";
  });
}
