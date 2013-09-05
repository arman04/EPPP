/* Función para capturar el cambio de esta pagina
 * ya que puede contener galerias de imagenes
 * si una de estas esta siendo visualizada, al presionar el boton volver del dispositivo
 * queda sobre la aplicacion, para evitar esto se cierra fancybox
 */
 $(document).on('pagehide','#vistaTema',function(event,ui){
	 jQuery.fancybox.close();
});
 /* Funcion para mostrar un tema de forma completa
 * llama al servicio web para buscar un tema por su id 
 * y desplegar el tema y los comentarios
 * http://www.preder.cl/foromovil/foromobilews.asmx/getTemaId
 */
$(document).on('pageshow','#vistaTema',function(event,ui){
	var idTema = window.localStorage.getItem('idTema');
	var user = window.localStorage.getItem('username');
	// se obtiene el tema
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getTemaId',
		data: "{'user':'"+user+"','idTema':'"+idTema+"'}",
		contentType:"application/json",
    	success: function (response) {
			$("#listaComentarios").empty();
			$("#listaComentarios").append(response.d);
			$("#listaComentarios").listview('refresh');
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
			$.mobile.back();
    	}
	}); //end ajax*/
});//end function