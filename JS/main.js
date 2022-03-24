// VARIABLES
let txtCorreo       = $("#txtCorreo");
let txtMensaje      = $("#txtMensaje");
let txtAsunto       = $("#txtAsunto");
let modalLoading    = new bootstrap.Modal($("#mdLoading"), {keyboard: false});
let modalMensaje    = new bootstrap.Modal($("#mdMensaje"), {keyboard: false});
let mdVisualizar    = new bootstrap.Modal($("#mdVisualizar"), {keyboard: false});
let popoverCorreo   = new bootstrap.Popover(txtCorreo);
let popoverAsunto   = new bootstrap.Popover(txtAsunto);
let popoverMensaje  = new bootstrap.Popover(txtMensaje);

// INICIO
$(document).ready(function(){
        
    let contenedorPdf = $(".pdf")
    let auxPx = 0;
    let ua = navigator.userAgent.toLowerCase(); 
    let movil = ua.indexOf("mobile") > -1;

    if(movil){
        contenedorPdf.css("height", "500px");
    }

    $.getJSON("https://raw.githubusercontent.com/Niba-Kuro/Configuraciones/master/ConfigPortafolio/portafolio.json", function(data) {    
        
        let contenedorHabilidad     = $("#contenedorHabilidad");        

        $("#fmCv").attr('src', data["cv"]["url"]);

        for(let i = 0; i < data["habilidad"].length; i++){
            contenedorHabilidad.append(data["habilidad"][i]["html"]);
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

        for(let i = 0; i < data["experiencia"].length; i++){
            $.modeloExperiencia({
                empresa       : data["experiencia"][i]["empresa"],
                nombreCargo   : data["experiencia"][i]["nombreCargo"],
                comienzo      : data["experiencia"][i]["comienzo"],
                finalizacion  : data["experiencia"][i]["finalizacion"],
                descripcion   : data["experiencia"][i]["descripcion"]
            });
        }
        
        let tooltipTriggerList = [].slice.call($("[data-bs-toggle=\"tooltip\"]"));
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
        
        $("[data-idp]").on("click", function(){

            let jsonProyecto = Object.values(data)[3].find(proyecto => proyecto.idProyecto == parseInt($(this).data("idp")));
            let contenedor  = $("#mdVisualizar");
            let aux         = "";            

            contenedor.find("h5").html(jsonProyecto["nombre"]);
            contenedor.find("#pDescripcion").html(jsonProyecto["descripcionDet"]);

            for(let i = 0; i < jsonProyecto["imagenes"].length; i++){
                if(i == 0){
                    aux += '<div class="carousel-item active">';
                }else{
                    aux += '<div class="carousel-item">';
                }
                aux += '    <img src="' + jsonProyecto["imagenes"][i]["url"] + '" class="d-block w-100">';
                aux += '</div>';
            }

            contenedor.find(".carousel-inner").html(aux);

            aux = "";

            for(let i = 0; i < jsonProyecto["tecnologia"].length; i++){
                let auxJson = jsonProyecto["tecnologia"][i];
                aux += '<span class="badge rounded-pill m-1 ' + auxJson["class"] + '">' + auxJson["nombre"] + '</span>';
            }

            contenedor.find("#dvTec").html("<p class=\"fs-1\">tecnología</p> " + aux);
            contenedor.find("#btnlink").attr("href", jsonProyecto["linkGithub"]);

            if(jsonProyecto["descargarLink"] == ""){
                contenedor.find("#btnDescargar").addClass("disabled");
                contenedor.find("#btnDescargar").removeAttr("href");
                contenedor.find("#btnDescargar").removeAttr("download");
            }else{
                contenedor.find("#btnDescargar").removeClass("disabled");
                contenedor.find("#btnDescargar").attr("href", jsonProyecto["descargarLink"]);
                contenedor.find("#btnDescargar").attr("download", jsonProyecto["nombre"]);
            }            

            mdVisualizar.show();
        });

    });
});

// EVENTOS
txtCorreo.on("input focusout focusin", function(){
    $(this).removeClass("border-danger");
    if($(this).val().trim() == ""){
        popoverCorreo.show();
        $(this).addClass("border-danger");
    }else{
        popoverCorreo.hide();
    }
});

txtAsunto.on("input focusout", function(){
    $(this).removeClass("border-danger");
    if($(this).val().trim() == ""){
        popoverAsunto.show();
        $(this).addClass("border-danger");
    }else{
        popoverAsunto.hide();
    }
});

txtMensaje.on("input focusout", function(){
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