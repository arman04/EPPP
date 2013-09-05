/* Funcion que obtiene los mensajes privados del usuario
 * inserta la respuesta en la lista de mensajes
 */
$(document).on('pageshow','#mensajesPrivadosPage',function(event,ui){

     
	var user = window.localStorage.getItem('username');
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getMensajesPrivados',
		data: "{'user':'"+user+"'}",
		contentType:"application/json",
    	success: function (response) {

			if(response.d == "Usuario inválido"){
				alertaUsuario("Error",response.d);
			} else {
				$("#listaMensajes").empty();
				$("#listaMensajes").append(response.d);

				$('#listaMensajes').listview('refresh');
			}
		
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
			$.mobile.back();
    	}
	}); //end ajax
	
	$("#listaMensajes").on("click", "a", function(){
	  var idMensaje = $(this).attr('id');		  
	  window.localStorage.setItem('idMensaje',idMensaje);
	  
	});
});//end function