angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlConsultaEmpleado', function ($scope, $ocLazyLoad, $rootScope, $http, General) {
    $rootScope.clase_menu = "colaborador";

    $scope.InicializarRegistro = function () {
        $scope.Registro = {
            id: $rootScope.Sesion.id * 1,
            nombres: '',
            apellidos: '',
            email: '',
            estado: '',
            fecha_nacimiento:{
				value: null,
				id:''
			}
        }
    }
    $scope.Empleados = {};

    $scope.NuestrosEmpleados = function () {
        $http({
            method: 'GET',
            url: $rootScope.Url_Servidor + "/api/persona/findAll",
            headers: {
                'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
            }
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.Empleados = data;
            console.log($scope.Empleados);

        }, function errorCallback(response) {

        });
    }

    $scope.ObtenerEmpleado = function (id) {
        
        $("#ActModal").modal("show");
        $http({
            method: 'GET',
            url: $rootScope.Url_Servidor + "/api/persona/findById",
            headers: {
                'id': id,
                'Content-Type': 'application/JSON',
                'Accept-Charset': undefined
            }
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.Registro.nombres = data.nombres;
            $scope.Registro.apellidos =data.apellidos;
            $scope.Registro.email=data.email;
            $scope.Registro.fecha_nacimiento.value = new Date(data.fechaNacimiento);
            $scope.Registro.fecha_nacimiento.id = $rootScope.Obtener_Fecha($scope.Registro.fecha_nacimiento.value);

            console.log(data);
        }, function errorCallback(response) {

        });
    }
    $scope.ActualizarDatos = function(){
		if($scope.Registro.nombres==''||$scope.Registro.apellidos==''||$scope.Registro.fecha_nacimiento.id==''||$scope.Registro.email==''||$rootScope.msg_correo!=''){
			swal("Advertencia", "Verifique los campos", "warning");
			return false;
		}
		if($scope.formclave=='true'){
			if($scope.Registro.clave_act==''||$scope.Registro.nue_clave==''||$scope.Registro.conf_clave==''||$scope.Registro.conf_clave!=$scope.Registro.nue_clave){
				swal("Advertencia", "Verifique los campos", "warning");
				return false;
			}		
			if($scope.Registro.clave_act == $scope.Registro.clave)	{
				$scope.Persona = {
					"id": $scope.Registro.id,
					"nombres": $scope.Registro.nombres,
					"apellidos": $scope.Registro.apellidos,
					"email": $scope.Registro.email,
					"password": $scope.Registro.nue_clave,
					"rol": $scope.Registro.rol,
					"fechaNacimiento": $scope.Registro.fecha_nacimiento.id,
					"fechaCreacion": $scope.Registro.fecha_creacion,
					"estado": $scope.Registro.estado					
				};
			}
			else{
				swal("Advertencia", "La contraseña actual es incorrecta", "warning");
				return false;
			}
		}
		else{
			$scope.Persona = {
				"id": $scope.Registro.id,
				"nombres": $scope.Registro.nombres,
				"apellidos": $scope.Registro.apellidos,
				"email": $scope.Registro.email,
				"password": $scope.Registro.clave,
				"rol": $scope.Registro.rol,
				"fechaNacimiento": $scope.Registro.fecha_nacimiento.id,
				"fechaCreacion": $scope.Registro.fecha_creacion,
				"estado": $scope.Registro.estado
			};
		}
		$http({
			method: 'PUT',
			url: 'http://localhost:8080/api/persona/edit',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify($scope.Persona),
			dataType: ("json")
		}).then(function successCallback(response) {
			swal("Información", "Datos Actualizados con exito", "success")
			$scope.InicializarRegistro();
			$scope.DatosPersonales();
			$scope.formclave='false';
		}, function errorCallback(response) {
			swal("Error", "Datos no actualizados", "error")
		});
		
	}
    $rootScope.InicializarSesion();
    $scope.InicializarRegistro();
    $rootScope.ValidarSesion();
    $scope.NuestrosEmpleados();

});