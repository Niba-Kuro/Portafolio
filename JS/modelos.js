(function(){

    const contenedorProycto = $("#contenedorProyecto");

    $.modeloCard = function(opciones){

        opciones = $.extend({
            idProyecto        : undefined,
            nombre            : undefined,
            descripcionVista  : undefined,
            tipoApp           : undefined,
            imagen            : undefined
        }, opciones);

        let card = "";        

        card += '<div class="card mx-auto" style="width: 18rem;">';
        card += '    <img class="card-img-top" src="' + opciones.imagen + '" alt="Card image cap">';
        card += '    <div class="card-body">';
        card += '    <h5 class="card-title">' + opciones.nombre + '</h5>';
        card += '    <p class="card-text">' + opciones.descripcionVista + '</p>';
        card += '    </div>';
        card += '    <ul class="list-group list-group-flush">';
        card += '    <li class="list-group-item">' + opciones.tipoApp + '</li>';
        card += '    </ul>';
        card += '    <div class="card-body">';
        card += '    <button class="btn btn-primary">ir al proyecto</button>';
        card += '    </div>';
        card += '</div>';

        contenedorProycto.append(card);
    
    }

})();