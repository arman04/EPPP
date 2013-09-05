/* funcion ejecutada al iniciar la pagina de "Mis Temas"
 * obtiene el usuario de la aplicacion y realiza el llamado a la funcion correspondiente 
 * del servicio web, mostrando la respuesta en caso de que no sea un error
 */  
$(document).on('pageshow','#temasUsuario',function(event,ui){	 

	var user = window.localStorage.getItem('username');
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getTemasUsuario',
		data: "{'user':'"+user+"'}",
		contentType:"application/json",
    	success: function (response) {

			if(response.d == "Usuarion inválido" || response.d == "Error de conexión"){
				alertaUsuario("Error",response.d);
			} else {
				
				$("#listaTemasUsuario").empty();
				$("#listaTemasUsuario").append(response.d);

				$('#listaTemasUsuario').listview('refresh');
			}
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
			location.back();
    	}
	}); //end ajax
	
	
	// esta funcion obtiene la id del tema seleccionado en la lista
	// y guarda ese valor en el localStorage para luego ser capturada en la pagina siguiente
	$("#listaTemasUsuario").on("click", "a", function(){
		var idTema = $(this).attr('id');	
			
		window.localStorage.setItem('idTema',idTema);
			
	});
	
});//end function