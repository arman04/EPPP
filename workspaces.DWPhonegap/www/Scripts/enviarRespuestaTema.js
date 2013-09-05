$(document).on('pageshow','#crearRespuestaTema',function(event,ui){
	
	// se establecen las reglas de validacion del formulario
	$("#formRespuesta").validate({
		rules: {			
			mensaje: {
				required: true,
				maxlength: 600
			}
		},		
		messages: {			
			mensaje: {
				required: "Campo obligatorio",
				maxlength: "Máximo 600 caract."
			}
		}
	});
	
	// se obtiene la id del tema que está almacenada en localStorage y se inserta en el input temaId para ser parte del formulario enviado
	var idTema =  window.localStorage.getItem('idTema');
	$("#temaId").val(idTema);
	
	// se obtiene el usuario de la aplicaicon
	var userApp = window.localStorage.getItem('username');
	$("#userLog").val(userApp);
	
	$('#formRespuesta').ajaxForm({
		// funcion que se ejecuta antes del envio del formulario para su evaluacion, en caso de no cumplir con los campos
		// obligatorios se envia un mensaje y se cancela el submit
   		beforeSubmit: function(e) {
				$.mobile.showPageLoadingMsg("d","Enviando comentario...");		
    	},// funcion que se ejecuta cuando se establece la comunicacion, se muestra el mensaje creando tema    
   		success: function() {		        
       		$.mobile.showPageLoadingMsg("d","Enviando comentario...");
    	},// si la respuesta es ok se completo la accion y se realiza la accion siguiente
		complete: function(xhr) {
			
			var response = xhr.responseText;			
				// si la respuesta del servidor no es Comentario enviado, hubo algun error
			if(response != "Comentario enviado"){
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
					text: 'Comentario creado',
					textVisible: true,
					theme: 'd',
					html: ""
				});
				setTimeout(function(){
					
  					$.mobile.back();
				}, 3000);	

			}
		}
	}); // fin funcion ajaxForm
 
    // bind form using 'ajaxForm' 
     $('#formRespuesta').submit(function() { 
       
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
