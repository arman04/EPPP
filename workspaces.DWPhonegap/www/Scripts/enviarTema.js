/* Script para la creacion de un tema
 * al cargar la pagina crearTema, obtiene el id y nombre de la seccion a la que pertenece
 * ademas obtiene el usuario de la aplicacion.
 * luego se definen las funciones de envío del formulario
 */
$(document).on('pageshow','#crearTema',function(event,ui){

	// se establecen las reglas de validacion del formulario
	$("#formTema").validate({
		rules: {
			titulo: "required",
			mensaje:{
				required : true,
				maxlength: 600
			}
		},
		messages: {
			titulo: "Campo obligatorio",
			mensaje: {
				required: "Campo obligatorio",
				maxlength: "Máximo 600 caract."
			}
		}
	});

	// se obtiene la id de la seccion guardada en localStorage
	var idSeccion = window.localStorage.getItem('idSeccion');	
	$("#secId").text(idSeccion);
	
	// se obtiene el usuario de la aplicacion
	var userApp = window.localStorage.getItem('username');
	$("#user").text(userApp);
	
	// ajax form permite definir las funciones que se ejecutaran segun el estado del formulario	
	$('#formTema').ajaxForm({
		// funcion que se ejecuta antes del envio del formulario para su evaluacion, en caso de no cumplir con los campos
		// obligatorios se envia un mensaje y se cancela el submit
		beforeSubmit: function(e) {
			$.mobile.showPageLoadingMsg("d","Creando tema...");					
    	},		
		// funcion que se ejecuta cuando se establece la comunicacion, se muestra el mensaje creando tema    
		success: function() {		        
		   $.mobile.showPageLoadingMsg("d","Creando tema...");
		},
		/* la funcion complete recibe el objeto xhr (XmlHttpRequest) el cual contiene la respuesta del servidor en formato 										
		 * xml, esta se inserta en el div 'status' y si es ok, se procede a cambiar la página, de forma contraria se muestra 					
		 * el error y se esconde el mensaje de envío		
		 */
		complete: function(xhr) {			
			var response = xhr.responseText;			
			// si la respuesta del servidor no es Mensaje creado, hubo algun error
			if(response != "Tema creado"){
				alertaUsuario("Error",response);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			} else {
				// en caso de respuesta de tema creado se cambia el mensaje de load y se cambia la pagina	
				$.mobile.loading( 'show', {
					text: 'Tema creado',
					textVisible: true,
					theme: 'c',
					html: ""
				});
				setTimeout(function(){
					
  					$.mobile.back();
				}, 3000);				
			}					
		}
	}); // fin funcion ajaxForm

// funcion que captura el submit del formulario, retorna false para evitar acciones por defecto del navegador
	$('#formTema').submit(function() { 
      
        return false; 
    }); 
    
});


// verificca la extension para cualquier archivo del formulario
function verificaExt(archivo){
	var file = document.getElementById(archivo).files[0];
	if(file){
		var ext = file.name.split('.').pop().toLowerCase();
		// se verifica extension
		if($.inArray(ext, ['jpg','jpeg','png','gif','bmp']) == -1) {
			// borrar archivo que no corresponde
			$("#"+archivo) = $("#"+archivo).reset();
			

		} else {
			
		}
	}
}	


