/* Script para la creacion de un tema
 * al cargar la pagina crearTema, obtiene el id y nombre de la seccion a la que pertenece
 * ademas obtiene el usuario de la aplicacion.
 * luego se definen las funciones de envío del formulario
 */
$(document).on('pageshow','#startPage',function(event,ui){

	// se establecen las reglas de validación del formulario
	$("#formlogIn").validate({
		rules: {
			username: "required",
			passwordinput: "required",
		},
		messages: {
			username: "Campo obligatorio",
			passwordinput: "Campo obligatorio",
		}
	});
	// ajax form permite definir las funciones que se ejecutaran segun el estado del formulario
	
	$('#formlogIn').ajaxForm({
		// funcion que se ejecuta antes del envio del formulario para su evaluacion, en caso de no cumplir con los campos
		// obligatorios se envia un mensaje y se cancela el submit
		beforeSubmit: function(e) {	
			$.mobile.showPageLoadingMsg("d","Conectando..");		
    	},		
		// funcion que se ejecuta cuando se establece la comunicacion, se muestra el mensaje creando tema    
		success: function() {		        
		   $.mobile.showPageLoadingMsg("d","Conectando..");
		},
		/* la funcion complete recibe el objeto xhr (XmlHttpRequest) el cual contiene la respuesta del servidor en formato 										
		 * xml, esta se inserta en el div 'status' y si es ok, se procede a cambiar la página, de forma contraria se muestra 					
		 * el error y se esconde el mensaje de envío		
		 */
		complete: function(xhr) {			
			
			var response = xhr.responseText;		
				
			if(response == "Usuario no existe"){
				alertaUsuario("Error",response);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			}else if(response == "login correcto"){
				$.mobile.loading( 'show', {
					text: 'Entrando',
					textVisible: false,
					theme: 'd',
					html: ""
				});
				window.localStorage.setItem('username',$('#username').val());
				window.localStorage.setItem('password',$('#passwordinput').val());
				window.location = './main.html';
			} else {
				alertaUsuario("Error",response);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			}
		}
	}); // fin funcion ajaxForm

// funcion que captura el submit del formulario, retorna false para evitar acciones por defecto del navegador
	$('#formlogIn').submit(function() { 
     
        return false; 
    }); 
    
});

