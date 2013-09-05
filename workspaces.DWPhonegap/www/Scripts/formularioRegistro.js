/* Funcion que se ejecuta al cambiar la pagina de registro 
 * y que limpia y esconde el formulario
 */
$(document).on('pagehide','#regPage',function(event,ui){

	$('#formRegistro')[0].reset();
	var myselect = $("#selectUser");
	myselect[0].selectedIndex = 0;
	myselect.selectmenu("refresh");
	$('#datosGenericos').hide('fast');
	$('#datosExperto').hide('fast');
	$('#datosCphs').hide('fast');
	$('#datosEmpresa').hide('fast');
	$('#regButton').attr("type","hidden");
});

/* Funcion quue se ejecuta al mostrar la pagina de registro de usuarios
 * Inicializa la forma del formulario
 * da los parametros de validacion del formulario
 * determina el accionar de la pagina en caso de submit
 */
$(document).on('pageshow','#regPage',function(event,ui){

	// funcion para dar formato a los campos de licencias de experto, inicialmente ocultos
	
	inicializarFormularioLicencias();	
	inicializarFormularioCphs();
	inicializarFormularioEmpresa();
	

	// se definen los estados del formulario para el evento submit (envio)
	$('#formRegistro').ajaxForm({
		// funcion que se ejecuta antes del envio del formulario para su evaluacion,
		// para este caso se evaluan los datos especificos de cada tipo de usuario segun la seleccion
		// ya que la validacion del formulario solo fue para los datos genericos
		beforeSubmit: function(e) {	
			var tipoUsuario = $('#selectUser').val();
			
			if(validarTipoUsuario(tipoUsuario) == true){
				$.mobile.showPageLoadingMsg("d","Conectando..");				
			} else {
				return false;
			}			
    	},		
		// funcion que se ejecuta cuando se establece la comunicacion, se muestra el mensaje creando tema    
		success: function() {		        
		   $.mobile.showPageLoadingMsg("a","Conectando..");
		},
		/* la funcion complete recibe el objeto xhr (XmlHttpRequest) el cual contiene la respuesta del servidor en formato 										
		 * xml, esta se inserta en el div 'status' y si es ok, se procede a cambiar la página, de forma contraria se muestra 					
		 * el error y se esconde el mensaje de envío		
		 */
		complete: function(xhr) {			

			var response = xhr.responseText;			
			// si la respuesta del servidor no es Usuario registrado, hubo algun error
			if(response != "Usuario registrado"){
				alertaUsuario("Error",response);
				$.mobile.loading( 'hide', {
					text: '',
					textVisible: false,
					theme: 'd',
					html: ""
				});
			} else {
				/* Si el usuario se creo correctamente
				 * se cambia el mensaje al usuario
				 * se guardan sus datos en localStorage y se redirecciona al menu principal
				 */
				 $.mobile.loading( 'show', {
						text: 'Usuario Registrado',
						textVisible: true,
						theme: 'c',
						html: ""
					});
				setTimeout(function(){
					window.localStorage.setItem('username',$('#username').val());
					window.localStorage.setItem('password',$('#password').val());
					window.location = './main.html';
				}, 3000);				
			}					
		}
	}); // fin funcion ajaxForm
	
	
	// funcion que captura el submit del formulario, retorna false para evitar acciones por defecto del navegador
	$('#formRegistro').submit(function() { 
     
        return false; 
    }); 
	

});


// funcion para inicializar los datos de comite paritario
function inicializarFormularioCphs(){	
	// se esconde el label de error 'required'
	$('#empresaCphsError').hide();
	// al escribir en el input se muestra u oculta el error segun existen caracteres
	$('#empresaCphs').keyup(function(){
		if($('#empresaCphs').val() == ""){
			$('#empresaCphsError').show();
		} else {
			$('#empresaCphsError').hide();
		}
	});	
}

// funcion para inicializar datos de Empresa
function inicializarFormularioEmpresa(){
	
	// se esconde el label de error 'required'
	$('#userEncargadoError').hide();
	$('#ciudadError').hide();
	// al escribir en el input se muestra u oculta el error segun existen caracteres
	$('#userEncargado').keyup(function(){
		if($('#userEncargado').val() == ""){
			$('#userEncargadoError').show();
		} else {
			$('#userEncargadoError').hide();
		}
	});	
	// al escribir en el input se muestra u oculta el error segun existen caracteres
	$('#ciudad').keyup(function(){
		if($('#ciudad').val() == ""){
			$('#ciudadError').show();
		} else {
			$('#ciudadError').hide();
		}
	});	
}

/* Funcion que inicializa los datos de licencias de experto
 * esconde los datos de licencia y los labels que corresponden a error 'required' de los campos
 * Luego define las funciones de escritura sobre estos campos
 * Finalmente define como se desplegaran estos datos segun la seleccion del usuario
 */
function inicializarFormularioLicencias(){
	// se esconden los labels para error de licencias y resoluciones y divs que los contienen
	$('#licSnsError').hide();
	$('#resSnsError').hide();
	$('#licSngmError').hide();
	$('#resSngmError').hide();
	$('#datosSns').hide();
	$('#datosSngm').hide();
	
	/* Definicion de accion keyup para los campos de licencia y resolucion
	 * al escribir en algunos de los siguientes campos
	 * se desplegara el error en caso de dejar el input vacio
	 * y se escondera en caso de contener caracteres
	 */
	$('#licSns').keyup(function(){
		if($('#licSns').val() == ""){
			$('#licSnsError').show();
		} else {
			$('#licSnsError').hide();
		}
	});
	
	$('#resSns').keyup(function(){
		if($('#resSns').val() == ""){
			$('#resSnsError').show();
		} else {
			$('#resSnsError').hide();
		}
	});
	
	$('#licSngm').keyup(function(){
		if($('#licSngm').val() == ""){
			$('#licSngmError').show();
		} else {
			$('#licSngmError').hide();
		}
	});
	
	$('#resSngm').keyup(function(){
		if($('#resSngm').val() == ""){
			$('#resSngmError').show();
		} else {
			$('#resSngmError').hide();
		}
	});
	
	// funcion que al cambiar el estado del checkbox SNS muestra u oculta sus datos
	$('#sns').change(function(){
		if(sns.checked){
			$('#datosSns').show();
		} else {
			$('#datosSns').hide();
		}
	});
	// funcion que al cambiar el estado del checkbox SNGM muestra u oculta sus datos
	$('#sngm').change(function(){
		if(sngm.checked){
			$('#datosSngm').show();
		} else {
			$('#datosSngm').hide();
		}
	});
}

// funcion que define la validacion de cada formulario especifico
function validarTipoUsuario(tipoUsuario){
	
	if(tipoUsuario  == 'experto'){
		return validarExperto();
	}
	if(tipoUsuario  == 'cphs'){
		return validarCphs();
	}
	if(tipoUsuario  == 'empresa'){
		return validarEmpresa();
	} 
	
	// en caso de ser alumno
	return true;
	
}

// funcion que valida los datos de comite paritario
function validarCphs(){
	var resp;
	// si no hay nada en el campo empresa cphs se lanza error y retorna false para cancelar submit
	if($('#empresaCphs').val() == ""){
		$('#empresaCphsError').show();
		resp = false;
	} else {
		$('#empresaCphsError').hide();
		resp = true;
	}
	return resp;
}

// funcion que valida los datos de empresa 
function validarEmpresa(){
	var resp = true;
	// si no hay nada en el campo empresa cphs se lanza error y retorna false para cancelar submit
	if($('#userEncargado').val() == ""){
		$('#userEncargadoError').show();
		resp = false;
	} else {
		$('#userEncargadoError').hide();		
	}
	
	if($('#ciudad').val() == ""){
		$('#ciudadError').show();
		resp = false;
	} else {
		$('#ciudadError').hide();		
	}
	return resp;
}

// funcion que valida los datos especificos del experto
function validarExperto(){
	var resp;
	// se valida que una de las opciones (sns o sngm) este marcada, o ambas
	if(!sns.checked && !sngm.checked){
		alertaUsuario("Error",'debes seleccionar un tipo de licencia para experto');
		resp = false;
	} else {
		

		resp = true;
		// si sns esta marcada sus campos son obligatorios, en caso de estar vacios se retorna false para detener el submit
		if(sns.checked){

			if( $('#licSns').val() == ""){	
				$('#licSnsError').show();
				resp = false;
			} else {				
				$('#licSnsError').hide();
			}
			
			if($('#resSns').val() == ""){
				$('#resSnsError').show();		
				resp = false;
			} else {
				$('#resSnsError').hide();
			}
		}
		// si sngm esta marcada sus campos son obligatorios, en caso de estar vacios se retorna false para detener el submit
		if(sngm.checked){
			
			if($('#licSngm').val() == ""){
				$('#licSngmError').show();				
				resp = false;
			}else{
				$('#licSngmError').hide();				
			}
			
			if($('#resSngm').val() == ""){
				$('#resSngmError').show();
				resp = false;
			}else{
				$('#resSngmError').hide();
			}
		}	
		
	}
	return resp;	
}

/* Función que se ejecuta al cambiar la seleccion de usuario en el formulario de registro
 * según la seleccion muestra el formulario con los datos indicados para cada tipo de usuario
 */
function mostrarFormularioRegistro(){

	var tipoUsuario = $('#selectUser').val();
	// se guarda el valor en el campo oculto para ser parte del formulario
	$('#tipoUsuario').val(tipoUsuario);
	// cambia el atributo type del boton aceptar de hidden a submit
	$('#regButton').attr("type","submit");
	// se muestra el formulario generico de usuarios
	$('#datosGenericos').show('fast');
	
	// se establece la validacion de los datos genericos del formulario
		validacionGenerica();
	
	if(tipoUsuario == 'experto'){
		$('#datosExperto').show('fast');
		$('#datosCphs').hide('fast');
		$('#datosEmpresa').hide('fast');
		
		
	} else if(tipoUsuario == 'cphs'){
		$('#datosExperto').hide('fast');
		$('#datosCphs').show('fast');
		$('#datosEmpresa').hide('fast');
		
		
	} else if(tipoUsuario == 'empresa'){
		$('#datosExperto').hide('fast');
		$('#datosCphs').hide('fast');
		$('#datosEmpresa').show('fast');
		
		
	} else {
		$('#datosExperto').hide('fast');
		$('#datosCphs').hide('fast');
		$('#datosEmpresa').hide('fast');
	}	
}

// funcion que valida los datos genericos del formulario de registro
function validacionGenerica(){
	
	// FUNCIONES DE VALIDACION PARA ENTRADAS ESPECIALES Y FORMATOS
	
		// metodo para comparar el formato de rut
	$.validator.methods.validarRut = function(value, element, param) {
		var rut = value;
		// se saca el guion
		rut = rut.replace('-','');
		
		// se formatea el rut para que quede de esta forma 12.345.678-9 y luego poder validarlo
		
		var rutFor = $.Rut.formatear(rut);
		// se evalua el formato del rut y que este sea valido (rut plugin)
		if(	value == value.match(param) && $.Rut.validar(rutFor) == true){
			// al retornar el valor el campo se valida correctamente
			return value;
		} 
	}
	// metodo que valida que solo existan letras en el campo requerido
	$.validator.methods.validarLetras = function(value, element, param) {
		
		
		if(	value == value.match(param)){
			// al retornar el valor el campo se valida correctamente
			return value;
		} 
	}	
	
	$("#formRegistro").validate({
		rules: {
			rut: {
				required: true,
				minlength: 9,
				maxlength: 10,
				validarRut: /^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/,
			},
			nombre: {
				required: true,
				validarLetras: /^[a-zA-ZñÑ\s]*$/,
			},
			email: {
				required: true,
				email: true,
			},
			username: {
				required: true,
				minlength: 5,
				maxlength: 15,
			},
			password: {
				required: true,
				minlength: 6
			},
			password2: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			}	
		},
		messages: {
			rut: {
				required: "Campo obligatorio",
				maxlength: 'máximo 10 caract.',
				minlength: 'mínimo 9 caract.',
			},
			nombre: {
				required: "Campo obligatorio",
			},
			email: {
				required: "Campo obligatorio",
				email: "email inválido",
			},
			username: {
				required: "Campo obligatorio",
				minlength: "mínimo 5 caract.",
				maxlength: "máximo 15 caract.",
			},
			password: {
				required: "Campo obligatorio",
				minlength: "mínimo 6 caract."
			},
			password2: {
				required: "Campo obligatorio",
				minlength: "mínimo 6 caract.",
				equalTo: "las contraseñas no coinciden"
			}	
		}
	});
	
}

/* funcion que evalua un rut
 * segun sus digitos para obtener el digito verificador
 * retorna true si es valido
 */
function evaluarRut(rut){
	if ( rut.length == 0 ){ return false; }
	if ( rut.length < 9 || rut.length > 10 ){ return false; }
 
	rut = rut.replace('-','')
	rut = rut.replace(/\./g,'')
 
	var suma = 0;
	var caracteres = "1234567890kK";
	var contador = 0;    
	for (var i=0; i < rut.length; i++){
		u = rut.substring(i, i + 1);
		if (caracteres.indexOf(u) != -1)
		contador ++;
	}
	if ( contador==0 ) { return false }
	
	var rut = rut.substring(0,rut.length-1)
	var drut = rut.substring( rut.length-1 )
	var dvr = '0';
	var mul = 2;
	
	for (i= rut.length -1 ; i >= 0; i--) {
		suma = suma + rut.charAt(i) * mul
                if (mul == 7) 	mul = 2
		        else	mul++
	}
	res = suma % 11
	if (res==1)		dvr = 'k'
                else if (res==0) dvr = '0'
	else {
		dvi = 11-res
		dvr = dvi + ""
	}
	if ( dvr != drut.toLowerCase() ) { return false; }
	else { return true; }
}
