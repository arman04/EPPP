/* Funcion que carga los usuarios para su seleccion desde un control de busqueda 
 * para luego enviar un mensaje privado
 */

$(document).on('pageshow','#crearMensajePrivado',function(event,ui){
	// se obtiene el usuario de la aplicacion
	var user = window.localStorage.getItem('username');
	$.ajax({
			type: "POST",
    		dataType: 'json',
    		url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getListaUsuarios',
			data: "{'user':'"+user+"'}",
			contentType:"application/json",
    		success: function (response) {
				if(response.d != "Usuario inválido" && response.d != "No existen usuarios"){
						$("#listaUsuarios").prepend(response.d);
						$('#listaUsuarios').listview('refresh');
						$('#listaUsuarios').hide();
						$('#listaUsuarios').show();
				} else {
					// se lanza el error
					alertaUsuario("Error",response.d);
				}				
    		},
    		error: function (xhr, status, error) {
				alertaUsuario("Error","Error de conexión");
				location.back();
    		}
	}); //end ajax	
	
	$("#listaUsuarios").on("click", "a", function(){
		var idUsuario = $(this).attr('id');		  
		window.localStorage.setItem('idUsuario',idUsuario);
		  
	});
});//end function

