/* Funcion para mostrar los temas pertenecientes a una seccion
 * llama al servicio web para buscar una seccion por su id 
 * y desplegar las secciones en forma de lista
 */
$(document).on('pageshow','#temasSeccion',function(event,ui){

	// se obtiene el id de la seccion seleccionada en la pagina anterior
	var idSeccion =  window.localStorage.getItem('idSeccion');

	var user = window.localStorage.getItem('username');
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getTemasSeccion',
		data: "{'user':'"+user+"','idSeccion':'"+idSeccion+"'}",
		contentType:"application/json",
    	success: function (response) {
			if(response.d == "Usuario inválido" || response.d == "Seccion no existe" || response.d == "No existen temas"){
				alertaUsuario("Error",response.d);
			} else {
				$("#listaTemas").empty();
				$("#listaTemas").append(response.d);
				$('#listaTemas').listview('refresh');						
			}
			$("#crearTemaPlusButton").attr("href","crearTema.html");
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
    	}
	}); //end ajax*/
	
	
	// esta funcion obtiene la id del tema seleccionadp en la lista
	// y guarda ese valor en el localStorage para luego ser capturado en la pagina siguiente
	$("#listaTemas").on("click", "a", function(){
		var idTema = $(this).attr('id');	
			
		window.localStorage.setItem('idTema',idTema);
			
	});
	
	
});//end function