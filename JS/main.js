// VARIABLES
let txtCorreo       = $("#txtCorreo");
let txtMensaje      = $("#txtMensaje");
let txtAsunto       = $("#txtAsunto");
let modalLoading    = new bootstrap.Modal($("#mdLoading"), {keyboard: false});
let modalMensaje    = new bootstrap.Modal($("#mdMensaje"), {keyboard: false});
let popoverCorreo   = new bootstrap.Popover(txtCorreo);
let popoverAsunto   = new bootstrap.Popover(txtAsunto);
let popoverMensaje  = new bootstrap.Popover(txtMensaje);

// EVENTOS
$("form").on("submit", function(e){

    e.preventDefault();

    let aux = true;

    if(txtCorreo.val().trim() == ""){
        aux = false
        popoverCorreo.show();
        txtCorreo.off("input");
        txtCorreo.addClass("border-danger");
        txtCorreo.on("input", function(){
            $(this).removeClass("border-danger");
            if($(this).val().trim() == ""){
                popoverCorreo.show();
                $(this).addClass("border-danger");
            }else{
                popoverCorreo.hide();
            }
        });
    }else{
        popoverCorreo.hide();
    }

    if(txtAsunto.val().trim() == ""){
        aux = false
        popoverAsunto.show();
        txtAsunto.addClass("border-danger");
        txtAsunto.off("input");
        txtAsunto.on("input", function(){
            $(this).removeClass("border-danger");
            if($(this).val().trim() == ""){
                popoverAsunto.show();
                $(this).addClass("border-danger");
            }else{
                popoverAsunto.hide();
            }
        });
    }else{
        popoverAsunto.hide();
    }

    if(txtMensaje.val().trim() == ""){
        aux = false
        popoverMensaje.show();
        txtMensaje.addClass("border-danger");
        txtMensaje.off("input");
        txtMensaje.on("input", function(){
            $(this).removeClass("border-danger");
            if($(this).val().trim() == ""){
                popoverMensaje.show();
                $(this).addClass("border-danger");
            }else{
                popoverMensaje.hide();
            }
        });
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

// $.getJSON("https://github.com/Niba-Kuro/AdminPortafolio/blob/master/main.json", function(data) {
//     console.log("");
// });