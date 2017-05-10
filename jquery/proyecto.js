$(document).ready(function(){
    $("#botoncillo").click(busquedaNueva);
    $(window).scroll(detectaFondo);
});

var pedible=false;
var contador = 1;

function detectaFondo(){
    if(($(document).height() - $(window).height()) <= ($(window).scrollTop())) {
    //llamada ajax, el fin de la pagina esta localizado
        busquedaDelAverno();
    }
}

function busquedaDelAverno(){
    var ent = document.getElementById("busqueda").value;
    var peticion = "http://www.omdbapi.com/?s="+ent+"&page="+contador;
    if(pedible==false){
         pedible=true;
        $("#loading").show();
        $.ajax({
            url: peticion, success: function(d){
            //que se hace cuando la peticion se responde con exito como se maqueta la respuesta
                //ocultar loader
                $("#loading").hide();
                if(d.Response == "False"){
                     $("#resultados").append($("<h2 class='fallaco'>"+d.Error+"</h2>"))  
                }
                maquetaEntradas(d);
                pedible=false;
                contador++;
            }
        });     
    }  
}

function busquedaNueva(){
    contador = 1;
    pedible = false;
    $(".main").hide();
    $(".fallaco").hide();
    busquedaDelAverno();
}

function maquetaEntradas(datos){
    // acceso a cada entrada del json
    $.each(datos.Search, function(i, item){
        var texto = item.Title;
        var imagen = item.Poster;
        if(item.Poster=="N/A"){
            imagen = "defecto.jpg";
        }
        var ano = item.Year;
        var id = item.imdbID;
        var cuadro = "<div class='main' id="+id+"><div class='mdl-cell mdl-cell--6-col'><div class='mdl-card'>";
        //$("#resultados").append($("<div id='"+ id +"'class='pelicard'><h2>"+texto+"</h2><img src='"+imagen+"'/><h1>"+ano+"</h1></div>"));
        cuadro += "<div class='mdl-card__media'><img src='"+imagen+"' width='303' height='200' border='0'  alt='' style='padding:10px;'></div>";
        cuadro += "<div class='mdl-card__supporting-text'> "+texto+" <br>("+ano+")</div> </div></div></div>";
        $("#resultados").append(cuadro);
        $("#"+id).click(buscaDetalle);
    });
}

function buscaDetalle(){
    enlace = $(this).attr("id");
    window.open("detalle.html?id="+enlace);
}



