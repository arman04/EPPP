/* Funcion que se ejecuta al cambiar la pagina 
 * y que limpia el formulario
 */
$(document).on('pagehide','#formularioContactoPage',function(event,ui){

	$('#formContacto')[0].reset();
});

$(document).on('pageshow','#formularioContactoPage',function(event,ui){

	$("#formContacto").validate({
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
	
	//var userApp = window.localStorage.getItem('username');
	$("#user").text("master");
	
	$('#formContacto').ajaxForm({
		beforeSubmit: function(e) {
			$.mobile.showPageLoadingMsg("d","Enviando...");					
    	},		
		success: function() {		        
		   $.mobile.showPageLoadingMsg("d","Enviando...");
		},
		complete: function(xhr) {			
			var response = xhr.responseText;			

			if(response != "Mensaje enviado"){
				alertaUsuario("Error",response);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			} else {
				$.mobile.loading( 'show', {
						text: 'Mensaje enviado',
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
	
	$('#formContacto').submit(function() { 
      
        return false; 
    }); 
});