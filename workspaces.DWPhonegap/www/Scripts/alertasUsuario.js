function alertaUsuario(cabecera,texto){

	$(document).simpledialog2({
		mode: 'button',
		headerText: cabecera,
		headerClose: false,
		buttonPrompt: texto,
		buttons : {
			'OK': {
				click: function () { 
					$('#buttonoutput').text('Aceptar');
				}
			}
		}
	});
}


function cerrarSesion(){
	var cabecera = "Cerrar Sesión";
	var texto = "¿Está seguro de querer salir de su sesión?";
	$(document).simpledialog2({
		mode: 'button',
		headerText: cabecera,
		headerClose: false,
		buttonPrompt: texto,
		buttons : {
			'OK': {
		 		click:function () {

						$('#buttonoutput').text('Aceptar');
           				window.localStorage.clear();
						window.location = './inicio.html';
          		}
			},
			'Cancel': {
				click: function () { 
					$('#buttonoutput').text('Cancelar');
				}
		  	}
		}
	});
}