/* funcion que se ejecuta al carga la pagina 'formularioMensajePrivado'
 * al cargar la pagina se obtiene el username del usuario al que se le enviará el mensaje
 * se cargan los datos necesarios y se espera al submit del formulario para ser enviado al servicio web
 */

$(document).on('pageshow','#formularioMensajePrivado',function(event,ui){
	
	// se establecen las reglas de validacion del formulario
	$("#formMensajePrivado").validate({
		rules: {
			asuntoMensaje: {
				required: true,
				maxlength: 40
			},
			cuerpoMensaje: {
				required: true,
				maxlength: 600
			}
		},
		messages: {
			asuntoMensaje: {
				required: "Campo obligatorio",
				maxlength: "Máximo 40 caract."
			},
			cuerpoMensaje: {
				required: "Campo obligatorio",
				maxlength: "Máximo 600 caract."
			}
		}
	});	
	
	// Se completan datos tipo 'hidden' con el usuario de la aplicacion y el usuario de destino
	 
	var userApp = window.localStorage.getItem('username');
	$("#userLog").val(userApp);
	// se obtiene el usuario al que se enviará el mensaje
	var usernameDestino =  window.localStorage.getItem('idUsuario')
	usernameDestino = usernameDestino.replace(/\*/g, ' ');
	$("#infoMensaje").text("Redactando mensaje para "+usernameDestino);
	$("#userDestino").val(usernameDestino);
	
	$('#formMensajePrivado').ajaxForm({
		// funcion que se ejecuta antes del envio del formulario para su evaluacion, en caso de no cumplir con los campos
		// obligatorios se envia un mensaje y se cancela el submit
   		beforeSubmit: function(e) {
			$.mobile.showPageLoadingMsg("d","Enviando mensaje...");				
    	},// funcion que se ejecuta cuando se establece la comunicacion, se muestra el mensaje creando tema    
   		success: function() {		        
       		$.mobile.showPageLoadingMsg("d","Enviando mensaje...");
    	},// si la respuesta es ok se completo la accion y se realiza la accion siguiente
		complete: function(xhr) {		
			
			var response = xhr.responseText;
			// en caso de error se alerta al usuario
			if(response != "Mensaje creado"){
				alertaUsuario("Error",response);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			} else {
				// en caso de respuesta de mensaje creado se cambia el mensaje de load y se cambia la pagina
				$.mobile.loading( 'show', {
					text: 'Mensaje creado',
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
 
   
     $('#formMensajePrivado').submit(function() { 
  
        return false; 
    }); 
    	
});