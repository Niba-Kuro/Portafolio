// VARIABLES
let txtCorreo       = $("#txtCorreo");
let txtMensaje      = $("#txtMensaje");
let txtAsunto       = $("#txtAsunto");
let modalLoading    = new bootstrap.Modal($("#mdLoading"), {keyboard: false});
let modalMensaje    = new bootstrap.Modal($("#mdMensaje"), {keyboard: false});
let popoverCorreo   = new bootstrap.Popover(txtCorreo);
let popoverAsunto   = new bootstrap.Popover(txtAsunto);
let popoverMensaje  = new bootstrap.Popover(txtMensaje);

// INICIO
$(document).ready(function(){
        
    // $.getJSON("https://raw.githubusercontent.com/Niba-Kuro/Portafolio/master/Config/portafolio.json", function(data) {
    $.getJSON("../Config/portafolio.json", function(data) {
        
        let contenedorHabilidad     = $("#contenedorHabilidad");
        let contenedorExperiencia   = $("#contenedorExperiencia");

        $("#fmCv").attr('src', data["cv"]["url"]);

        for(let i = 0; i < data["habilidad"].length; i++){
            contenedorHabilidad.append(data["habilidad"][i]["html"]);
        }

        for(let i = 0; i < data["habilidad"].length; i++){
            // contenedorExperiencia.find("div[role='button']")
        }

        for(let i = 0; i < data["proyecto"].length; i++){
            $.modeloCard({
                idProyecto        : data["proyecto"][i]["idProyecto"],
                nombre            : data["proyecto"][i]["nombre"],
                descripcionVista  : data["proyecto"][i]["descripcionVista"],
                tipoApp           : data["proyecto"][i]["tipoApp"],
                imagen            : data["proyecto"][i]["imagenes"][0]["url"]
            });
        }    
        

    });
});

// EVENTOS
txtCorreo.on("input", function(){
    $(this).removeClass("border-danger");
    if($(this).val().trim() == ""){
        popoverCorreo.show();
        $(this).addClass("border-danger");
    }else{
        popoverCorreo.hide();
    }
});

txtAsunto.on("input", function(){
    $(this).removeClass("border-danger");
    if($(this).val().trim() == ""){
        popoverAsunto.show();
        $(this).addClass("border-danger");
    }else{
        popoverAsunto.hide();
    }
});

txtMensaje.on("input", function(){
    $(this).removeClass("border-danger");
    if($(this).val().trim() == ""){
        popoverMensaje.show();
        $(this).addClass("border-danger");
    }else{
        popoverMensaje.hide();
    }
});

$("form").on("submit", function(e){

    e.preventDefault();

    let aux = true;

    if(txtCorreo.val().trim() == ""){
        aux = false
        popoverCorreo.show();
        txtCorreo.addClass("border-danger");
    }else{
        popoverCorreo.hide();
    }

    if(txtAsunto.val().trim() == ""){
        aux = false
        popoverAsunto.show();
        txtAsunto.addClass("border-danger");
    }else{
        popoverAsunto.hide();
    }

    if(txtMensaje.val().trim() == ""){
        aux = false
        popoverMensaje.show();
        txtMensaje.addClass("border-danger");
    }else{
        popoverMensaje.hide();
    }

    if(aux){

        modalLoading.show();

        let serviceID = "default_service";
        let templateID = "template_a8his7p";
        
        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            modalLoading.hide();
            $("#txtMdMensaje").text("Su correo se ha enviado");
            modalMensaje.show();
        }, (err) => {
            modalLoading.hide();
            $("#txtMdMensaje").text("Su correo no se ha podido enviar");
            modalMensaje.show();
        });

    }

});
