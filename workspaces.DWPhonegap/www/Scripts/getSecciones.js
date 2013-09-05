/* funcion ejecutada al iniciar la pagina de secciones
 * obtiene el usuario de la aplicacion y realiza el llamado a la funcion correspondiente 
 * del servicio web, mostrando la respuesta en caso de que no sea un error
 */  
$(document).on('pageshow','#secciones',function(event,ui){
	 

	var user = window.localStorage.getItem('username');
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getSecciones',
		data: "{'user':'"+user+"'}",
		contentType:"application/json",
    	success: function (response) {

			if(response.d == "Usuarion inválido" || response.d == "Error de conexión"){
				alertaUsuario("Error",response.d);
			} else {
				
				$("#listaSecciones").empty();
				$("#listaSecciones").append(response.d);

				$('#listaSecciones').listview('refresh');
			}
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
			location.back();
    	}
	}); //end ajax
	
	
	// esta funcion obtiene la id de la seccion seleccionada en la lista
	// y guarda ese valor en el localStorage para luego ser capturada en la pagina siguiente
	$("#listaSecciones").on("click", "a", function(){
	  var idSeccion = $(this).attr('id');		  
	  window.localStorage.setItem('idSeccion',idSeccion);
	  
	});
	
});//end function