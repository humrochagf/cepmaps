/* Custom Site JS */

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var cepToMaps = function queryCorreios(cep) {
  $.ajax({
    url: 'http://correiosapi.apphb.com/cep/' + cep,
    dataType: 'jsonp',
    crossDomain: true,
    contentType: "application/json",
    statusCode: {
      200: function(data) {
        var src = (
          'https://www.google.com/maps/embed/v1/place?q=' +
          data.tipoDeLogradouro + '+' +
          data.logradouro + '+' +
          data.cidade + ',+' +
          data.estado + '&key=AIzaSyBDuF-GFLAvbNdr_nKbvD4WPoxe68nFVSc'
        ).replace(/\s+/g, '+');

        $('iframe').attr('src', src);
      }, 400: function(msg) {
        alert(msg);
      }, 404: function(msg) {
        alert("CEP não encontrado!!");
      }
    }
  });
};


var cep = getUrlParameter('cep');

if (cep != undefined)
  cepToMaps(cep);
