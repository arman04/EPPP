$(document).on('pagehide','#editPage',function(event,ui){

	// al salir de la pagina se limpia el formulario
	$('#formularioPerfil')[0].reset();
});

$(document).on('pageshow','#editPage',function(event,ui){
	
	// se cargan los datos del usuario
	cargarDatos();
	
	// para validacion del formulario
	$('#formularioPerfil').validate({
		rules:{
			nombre: {
				required: true,
				maxlength: 40
			},
			email:{
				required: true,
				maxlength: 40
			}		
		},
		messages: {
			nombre: {
				required: "Campo obligatorio",
				maxlength: "Máximo 40 caract."
			},
			email: {
				required: "Campo obligatorio",
				maxlength: "Máximo 40 caract."
			}
		}
	});// fin funcion de validacion
	
	// funcion para eventos en envio del formulario a servidor
	$('#formularioPerfil').ajaxForm({
		
		beforeSubmit: function(e){
			$.mobile.showPageLoadingMsg('d',"Conectando..");
		},
		success: function(e){
			$.mobile.showPageLoadingMsg('d',"Actualizando..");
		},
		complete: function(xhr){
			if(xhr.responseText != 'OK'){
				alertaUsuario("Error",xhr.responseText);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			} else {
					
				$.mobile.loading( 'show', {
						text: 'Actualzación correcta',
						textVisible: false,
						theme: 'd',
						html: ""
					});
				window.location = './main.html';
			}
		}
	});// fin funcion ajaxForm
	
	$('#formularioPerfil').submit(function(){
		return false;
	});
	
});


// funcion encargada de cargar los datos del usuario en el formulario para su edicion
function cargarDatos(){
	
	// se obtiene al usuario de la aplicacion
	var user = window.localStorage.getItem('username');	
	// se obtienen los datos editables del usuario
	$.ajax({
		type: "POST",
    	dataType: 'json',
    	url: 'http://www.preder.cl/foromovil/foromovil.asmx/getDatosUsuario',
		data: "{'user':'"+user+"'}",
		contentType:"application/json",
    	success: function (response) {

			if(response.d == "Usuarion inválido" || response.d == "Error de conexión"){
				alertaUsuario("Error",response.d);
			} else {
					var datos = response.d.split(';');	
					
					$('#usuario').val(user);
					$('#nombre').val(datos[0].toString());
					$('#email').val(datos[1].toString());
					$('#avatar').attr('src',datos[2].toString());
					$('#avatar').attr('width','50px');
					$('#avatar').attr('height','50px');
			}
    	},
    	error: function (xhr, status, error) {
			alertaUsuario("Error","Error de conexión");
			location.back();
    	}
	}); //end ajax	
}