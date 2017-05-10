function getQueryVariable() {
   var query = window.location;
   var vars = query.search.split("=");
   return vars[1];
}

var idpeli = getQueryVariable();
var peticion = "http://www.omdbapi.com/?i="+idpeli;

$.ajax({
    url: peticion, success: function(a){
    //que se hace cuando la peticion se responde con exito como se maqueta la respuesta
    maquetaDetalle(a);
    }
});  


function maquetaDetalle(detalle){
    var cuadro = $("<div class='mdl-card'>");  
    var titulo = detalle.Title;
    var foto = detalle.Poster;
    if(detalle.Poster=="N/A"){
        foto = "defecto.jpg";
    }
    var resumen = detalle.Plot;
    var fecha_salida = detalle.Released;
    var duracion = detalle.Runtime;
    var productora = detalle.Production;
    var director = detalle.Director;
    var escritor = detalle.Writer;
    var actores = detalle.Actors;
    $("#cabezada").html("<h1>"+titulo+" ("+fecha_salida+") </h1>");
    $("#imagen").append($("<img src='"+foto+"'>"));
    $("#dire").html("Dirigida por: "+director);
    $("#escr").html("Escrita por: "+escritor);
    $("#repa").html("Elenco: "+actores);
    $("#prod").html("Producida por: "+productora);
    $("#dura").html("Duracion: "+duracion);
    $("#informacion").append($("<p>"+resumen+"</p>"));  
}