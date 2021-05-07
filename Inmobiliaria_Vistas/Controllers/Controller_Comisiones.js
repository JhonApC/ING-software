angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlComisiones', function($scope, $ocLazyLoad, $rootScope, $http, General) {
	$rootScope.clase_menu = "Inmuebles";
	$rootScope.clase_submenu = "Comisiones";  
	

	$scope.Comisiones = {};
	MisComisiones = function(){
		$http( {
			method: 'GET',
			url: $rootScope.Url_Servidor+"/api/inmueble/comision",
			headers: {
			  	'mes1': $("#mesInicial").val(),
                'mes2':$("#mesFinal").val(),  
				'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
			}
		   }).then(function successCallback(response) {              
			    var data =response.data;
				$scope.Comisiones = data; 
                console.log($scope.Comisiones);	
                let valorComisiones =0;
                data.forEach(element => {
                    valorComisiones += element[3]
                });						
                $("#cmt").text('$'+valorComisiones);
                $("#cm1").text($("#mesInicial option:selected").text());
                $("#cm2").text($("#mesFinal option:selected").text());
            }, function errorCallback(response) {
                
            });
	}

	
	$rootScope.InicializarSesion(); 
	$rootScope.ValidarSesion();
	MisComisiones();

});