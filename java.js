/// START DEPARTURES

function departures(SiteId)
{
avgangar();

var data1 = new Date();
var data2;
var diffWalk;  
var minutediff;
var goom;


const span = document.getElementById('information');
span.innerHTML= "<tr class='rubrik'><td>Destination</td><td>Avgång</td><td>Gå om</td></tr>";
  const url = "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=39c82cc54837421385bf8f2eb08f5306&siteid="+SiteId+"&timewindow=30";
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let infos = data.ResponseData.Metros;
      return infos.map(function (info) {
      
        data2 = new Date(Date.parse(info.ExpectedDateTime));
        /// funktionen som räknar bort gångtid.
        minutediff = (data2 - data1) / 1000 / 60;
        console.log(minutediff);
        console.log(walkingDistance.value);
        diffWalk = minutediff - walkingDistance.value;
        goom = (Math.floor(minutediff - walkingDistance.value)) + " min";
        if (goom == 0 + " min") {
        goom = " Gå Nu"; // ändrar 0 min till Gå Nu
        }
     

        console.log(goom);
      if (diffWalk > 0)
      { 
        console.log("hej");

        
      // första if-satsen ändrar om nu till 0 min
      if (info.DisplayTime == "Nu") 
      { info.DisplayTime = "0 min"
      
      span.innerHTML += "<tr><td>" + info.LineNumber + " " +  info.Destination + "</td><td>" + info.DisplayTime + "</td><td>" + goom + "</td></tr>";   
      
    }
      
      // andra if-satsen som kör om tecknet : finns i displaytime
      else if (info.DisplayTime.indexOf(":") >-1)
      {

      data2 = new Date(Date.parse(info.ExpectedDateTime));
      console.log(data1);
      console.log(data2);


        minutediff = (data2 - data1) / 1000 / 60;
        console.log(minutediff);

        info.DisplayTime = Math.floor(minutediff) + " min";

        span.innerHTML += "<tr><td>" + info.LineNumber + " " +  info.Destination + "</td><td>" + info.DisplayTime + "</td><td>" + goom + "</td></tr>"; 
    
      }

      // kör om inget annat stämmer. 
      else {
        span.innerHTML += "<tr><td>" + info.LineNumber + " " +  info.Destination + "</td><td>" + info.DisplayTime + "</td><td>" + goom + "</td></tr>";    
      
      }
      }
      })
    })

    .catch(function (error) {
      console.log(error);
    });

  }
  
/// END DEPARTURES




/// START SÖKRUTA - funktionen som händer när man klickar på Sök Resa

function resa(skaspara)
{
  var from = document.getElementById("utresa").value;
  var walktime =document.getElementById("walkingDistance").value;
  if (skaspara === true){ sparadata (from, walktime); 
  
  }

  const span3 = document.getElementById('search');
  const url = "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=29930f15b553491fbe25c6ed44b14096&searchstring="+ from +"&stationsonly=true&maxresults=1";
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let infos = data.ResponseData;
        return infos.map(function (info) {
          departures(info.SiteId);
        })
      })
      .catch(function (error) {
        console.log(error);
      });

     
  
}

/// END SÖKRUTA


/// START LADDA - laddar senaste resan. 
const span = document.getElementById("utresa");
const span2 = document.getElementById("walkingDistance");
const url = 'https://cors-anywhere.herokuapp.com/http://primat.se/services/data/alexander.sjoholm@hotmail.com-resapp_user1.json';
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let infos = data.data;
    return infos.map(function (info) {
      span.value = info.stations;
      span2.value = info.walktime;
      console.log(info.stations)
      console.log(info.walktime)
      resa();

    })
  })
  .catch(function (error) {
    console.log(error);
  });
  
  /// END LADDA


  /// START SPARA - sparar sökningar 

  function sparadata(stationName, walkingDistance)
  {
  const url = 'https://cors-anywhere.herokuapp.com/http://primat.se/services/sendform.aspx?xid=resapp_user1&xmail=alexander.sjoholm@hotmail.com&stations='+stationName + '&walktime=' +walkingDistance;
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let infos = data.data;
      return infos.map(function (info) {
        
        
  
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }  

/// END SPARA


// VISA AVGÅNG //- visar avgång från station ovanför tidtabellen. 
function avgangar()
{ document.getElementById("avgangar").innerHTML = "Visar avgångar från " + utresa.value; 

}