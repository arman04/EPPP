/* Funcion que se ejecuta al mostrarse la pagina archivosCategoria
 * para desplegar los archivos de la categoria seleccionada anteriormente
 */
$(document).on('pageshow','#carpetaPublica',function(event,ui){
	getArchivosPublicos();
	
		
	$("#listaArchivos").on("click", "a", function(){
try{
      url = $(this).attr("href");
	  var remoteFile = url;
        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                var localPath = fileEntry.fullPath;
                if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                    localPath = localPath.substring(7);
                }
                var ft = new FileTransfer();
                ft.download(remoteFile,
                    localPath, function(entry) {
                       alert("bajando");
                    }, fail);
            }, fail);
        }, fail);
			}catch(ex){alert(ex);}
		});

});


function getArchivosPublicos(){
	
	var user = window.localStorage.getItem('username');

	var categoria = $('#selectCategoria').val();

	$.ajax({
			type: "POST",
    		dataType: 'json',
    		url: 'http://www.preder.cl/foromovil/foromovil.asmx/getArchivosPublicosCategoria',
			data: "{'user':'"+user+"','categoria':'"+categoria+"'}",
			contentType:"application/json",
    		success: function (response) {
				if(response.d != "Usuario inválido"){
					$("#listaArchivos").empty();
					$("#listaArchivos").append(response.d);
					$('#listaArchivos').listview('refresh');	

				} else {
					// se lanza el error
					alertaUsuario("Error",response.d);
				}				
    		},
    		error: function (xhr, status, error) {
				alertaUsuario("Error","Error de conexión");
				location.back();
    		}
	}); //end ajax	SS	
}

