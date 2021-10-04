
var data_about_words;

function displaytext() {
  var fileToLoad = document.getElementById("formFile").files[0];
  //console.log(fileToLoad);

  var fileReader = new FileReader();

  fileReader.onload = function (fileLoadedEvent) {
	  // console.log(fileLoadedEvent,"akash");
	   	   //console.log("i am the bes",fileLoadedEvent.target.result);
    var textFromFileLoaded = fileLoadedEvent.target.result;

    var arr_words = textFromFileLoaded.split(" ");

    var innerhtmlbx = "";
    var i;
    var words = '';


    for (i = 0; i < arr_words.length; i++) {
      if (i === 0) {
        words = words + arr_words[i];
      }
      else {
        words = words + '+' + arr_words[i]
      }

    }

    var url = 'https://api.textgears.com/spelling?key=AQq2kJmFj129bCFC&text=' + words + '&language=en-GB'

    console.log("b fetchdata");

    fetchdata(url).then((response) => {
      console.log("printing response" + response)
      console.log('in after getting response');
      return response.json();
    }).then(data => {

      data_about_words = data["response"]["errors"];
      console.log(typeof (data_about_words),"aashish");
      console.log(data_about_words,"nikhil")
      console.log(data_about_words.length,"neha")
       console.log(arr_words.length,"mummy_papa")
      for (var j = 0; j < arr_words.length; j++) {
        var flag = 0;
        for (var k = 0; k < data.response.errors.length; k++) {

          console.log('printglobal data inside double for' + data_about_words);
          if (arr_words[j] === data.response.errors[k].bad) {
            flag = 1;
            break;
          }
        }
        if (flag === 1) {
          var options = provide_correct_options(arr_words[j]);
          var liststring = '';
          for (var z = 0; z < options.length; z++) {
            liststring = liststring + '<li><a class="dropdown-item" id="' + options[z] + '" href="#">' + options[z] + '</a></li>'
            console.log(options[z]);
            const ne = options[z];
            console.log("here" + typeof ne)
            console.log(document.getElementById(ne));
          }


          var b = '<span class="dropdown"><a class="bg-danger dropdown-toggle" href="#" role="button" id="' + arr_words[j] + '" data-bs-toggle="dropdown" aria-expanded="false">' + arr_words[j] + '</a><ul class="dropdown-menu" aria-labelledby="' + arr_words[j] + '">' + liststring + '</ul></span>';

          innerhtmlbx = innerhtmlbx + b;
        }
        else {
          innerhtmlbx = innerhtmlbx + '<span>' + arr_words[j] + '</span> '
        }
      }
      document.getElementById("text-display").innerHTML = innerhtmlbx;
      console.log(data_about_words);
      for (var outer = 0; outer < data_about_words.length; outer++) {
        for (var inner = 0; inner < data_about_words[outer].better.length; inner++) {
          console.log("inside assinging event");
          console.log(data_about_words[outer]['bad']);
          if (data_about_words[outer].better[inner] !== null && data_about_words[outer]['bad'] !== null) {
            document.getElementById(data_about_words[outer].better[inner]).addEventListener("click", changetext.bind(null, event, data_about_words[outer]['bad'], data_about_words[outer].better[inner]), false);
          }
        }
      }

      console.log('printglobal data' + data_about_words);

    });



    console.log(words);
    console.log(innerhtmlbx);

  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}

function changetext(d, a, b, event) {
  document.getElementById(a).innerHTML = b;

  document.getElementById(a).classList.remove('bg-danger');
  document.getElementById(a).classList.add('text-dark');





}

function provide_correct_options(current) {

  var options;
  for (var a = 0; a < data_about_words.length; a++) {

    if (data_about_words[a]["bad"] === current) {
      options = data_about_words[a]["better"];
      return options;

    }
  }
}

async function fetchdata(url) {
  console.log('in fetchdata');
  var data = await fetch(url);
  console.log("vikas shrivastava",data);
  return data;
}


function fileValidation() {
  var fileInput =
    document.getElementById('formFile');

  var filePath = fileInput.value;

  var allowedExtensions =
    /(\.txt)$/i;

  if (!allowedExtensions.exec(filePath)) {
    alert('Invalid file type');
    fileInput.value = '';
    return false;
  }
}