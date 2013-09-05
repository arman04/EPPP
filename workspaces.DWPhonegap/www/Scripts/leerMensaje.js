$(document).on('pageshow','#leerMensajePrivado',function(event,ui){
	
	var idMensaje =  window.localStorage.getItem('idMensaje');

// se obtiene el usuario de la aplicacion y se establece en el campo userLog para ser parte del formulario
	var user = window.localStorage.getItem('username');
	$("#userLog").val(user);	

	var titulo = "";
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foroMovil.asmx/getMensajePrivadoID',
		data: "{'user':'"+user+"','idMensaje':'"+idMensaje+"'}",
		contentType:"application/json",
    	success: function (response) {
			if(response.d == "usuario inválido" || response.d == "mensaje no encontrado"){
				$('#contenidoMensaje').append("<span>"+response.d+"</span>");
				$("#responderMPButton").attr("disabled","disabled");
			} else {				
				// si la respuesta es ok se llenan los campos del mensaje y el usuario que envio el mensaje (usuario de destino si se desea responder)
				$("#contenidoMensaje").append(response.d);
				
				$("#asuntoMensaje").val("RE: "+$("#asuntoMP").text());
				$("#userDestino").val($("#userMensaje").text());
			}
			
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
    	}
	}); //end ajax*/
	
	$("#formRespuestaMP").validate({
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
	
	
	// aqui se establecen los datos para una respuesta directa al mensaje
	$('#formRespuestaMP').ajaxForm({
		// funcion que se ejecuta antes del envio del formulario para su evaluacion, en caso de no cumplir con los campos
		// obligatorios se envia un mensaje y se cancela el submit
   		beforeSubmit: function(e) {
			$.mobile.showPageLoadingMsg("d","Enviando respuesta al mensaje...");		
    	},// funcion que se ejecuta cuando se establece la comunicacion, se muestra el mensaje creando tema    
   		success: function() {		        
       		$.mobile.showPageLoadingMsg("d","Enviando respuesta al mensaje...");
    	},
		// si la respuesta es ok se completo la accion y se realiza la accion siguiente
		complete: function(xhr) {
			
			var response = xhr.responseText;
			// en caso de que la respuesta no sea mensaje creado ha ocurrido un error y se alerta al usuario
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
					
  				$.mobile.changePage('Mensajes.html');
				}, 3000);	
				
			}		
		}
	}); // fin funcion ajaxForm
 
    // bind form using 'ajaxForm' 
     $('#formRespuestaMP').submit(function() { 
        return false; 
    }); 
    	
});