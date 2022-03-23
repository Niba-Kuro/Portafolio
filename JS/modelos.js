(function(){

    const contenedorProycto     = $("#contenedorProyecto");
    const contenedorExperiencia = $("#contenedorExperiencia");

    $.modeloCard = function(opciones){

        opciones = $.extend({
            idProyecto        : undefined,
            nombre            : undefined,
            descripcionVista  : undefined,
            tipoApp           : undefined,
            imagen            : undefined
        }, opciones);

        let modelo = "";        

        modelo += '<div class="card mx-auto" style="width: 18rem;">';
        modelo += '    <img class="card-img-top" src="' + opciones.imagen + '" alt="Card image cap">';
        modelo += '    <div class="card-body">';
        modelo += '    <h5 class="card-title">' + opciones.nombre + '</h5>';
        modelo += '    <p class="card-text">' + opciones.descripcionVista + '</p>';
        modelo += '    </div>';
        modelo += '    <ul class="list-group list-group-flush">';
        modelo += '    <li class="list-group-item">' + opciones.tipoApp + '</li>';
        modelo += '    </ul>';
        modelo += '    <div class="card-body">';
        modelo += '    <button class="btn btn-primary">ir al proyecto</button>';
        modelo += '    </div>';
        modelo += '</div>';

        contenedorProycto.append(modelo);
    
    }

    $.modeloExperiencia = function(opciones){

        opciones = $.extend({
            empresa         : undefined,
            nombreCargo     : undefined,
            comienzo        : undefined,
            finalizacion    : undefined,
            descripcion     : undefined
        }, opciones);

        let modelo = "";        

        modelo += '<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 text-center" role="button"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="' + opciones.descripcion + '">';
        modelo += '    <p class="text-uppercase">';
        modelo += '        ' + opciones.comienzo;
        modelo += '        <br>';
        modelo += '        hasta';
        modelo += '        <br>';
        modelo += '        ' + opciones.finalizacion;
        modelo += '    </p>';
        modelo += '    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>';
        modelo += '    <p class="text-uppercase pt-3">';
        modelo += '        ' + opciones.nombreCargo;
        modelo += '        <br><small class="badge bg-info text-dark">' + opciones.empresa + '</small>';
        modelo += '    </p>';
        modelo += '</div>';

        contenedorExperiencia.append(modelo);

    }

})();