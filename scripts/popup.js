// Get the <datalist> and <input> elements.

function  loadd(){

var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');
var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search="+input.value+"&namespace=0&limit=10&suggest=true";
var da = document.getElementById('data');
var request = new XMLHttpRequest();
dataList.innerHTML="";
dataList.style.display = "block";
// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
      // Loop over the JSON array.
      var ch =0;
      var ou = jsonOptions[2];
      jsonOptions[1].forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('a');
        option.href = jsonOptions[3][ch];
          option.onclick = function(){
            input.value = item;
         dataList.style.display = "none";
       //  da.innerHTML=jsonOptions[2][ch];
          loadfd();
        };
        var n = document.createElement('div');
        
        n.innerHTML = item;
        option.appendChild(n);
        // Set the value using the item in the JSON array.
        //option.value = item;
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
        ch++;
      });
      
      // Update the placeholder text.
      input.placeholder = "e.g. datalist";
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', url, true);
request.send();
}

function  loadfd(){

 
var input = document.getElementById('ajax');
var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles="+input.value;
var da = document.getElementById('data');
var request = new XMLHttpRequest();
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
      var num =  Object.keys(jsonOptions.query.pages);
      var c = num[0];
      da.innerHTML=  jsonOptions["query"]["pages"][c]["extract"];
       
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
 

// Set up and make the request.
request.open('GET', url, true);
request.send();
}


document.getElementById("ajax").onkeyup = loadd;

