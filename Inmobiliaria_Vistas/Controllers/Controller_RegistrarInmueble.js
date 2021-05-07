angular.module('myApp', ['ui', 'ngSanitize', 'ngTable']).controller('ControlRegistrarInmuebles', function ($scope, $ocLazyLoad, $rootScope, $http, General) {
	$rootScope.clase_menu = "Inmuebles";
	$rootScope.clase_submenu = "RegistrarInmueble";

	$scope.InicializarRegistro = function () {
		$scope.Registro = {
			titulo: '',
			descripcion: '',
			tipo: '',
			servicio: '',
			sanitarios: '',
			habitaciones: '',
			sala: 'NO',
			cocina: 'NO',
			pisos: '1',
			metroscuadrados: '',
			pais: '',
			departamento: '',
			ciudad: '',
			zona: '',
			fecha_creacion: output2,
			estado: 'EN VENTA',
			garaje: 'NO',
			precio: '',
			imagen: '',
			idpersona: $rootScope.Sesion.id * 1,
		}
	}
	$scope.Ingreso = {};

	$scope.Registrar = function () {
		if ($scope.Registro.titulo == '' || $scope.Registro.descripcion == '' ||
			$scope.Registro.tipo == '' || $scope.Registro.servicio == '' || $scope.Registro.sanitarios == '' || $scope.Registro.habitaciones == '' ||
			$scope.Registro.habitaciones == '' || $scope.Registro.sala == '' || $scope.Registro.cocina == '' || $scope.Registro.pisos == ''
			|| $scope.Registro.metroscuadrados == '' || $scope.Registro.pais == '' || $scope.Registro.departamento == '' || $scope.Registro.ciudad == ''
			|| $scope.Registro.zona == '' || $scope.Registro.fecha_creacion == '' || $scope.Registro.estado == '' || $scope.Registro.idpersona == '') {
			swal("Advertencia", "Verifique los campos", "warning");
			return false;
		}
	

		$scope.Persona = {
			"titulo": $scope.Registro.titulo,
			"descripcion": $scope.Registro.descripcion,
			"habitaciones": $scope.Registro.habitaciones,
			"sanitarios": $scope.Registro.sanitarios,
			"fechaCreacion": $scope.Registro.fecha_creacion,
			"pisos": $scope.Registro.pisos,
			"tipo": $scope.Registro.tipo,
			"estado": $scope.Registro.estado,
			"pais": $scope.Registro.pais,
			"departamento": $scope.Registro.departamento,
			"ciudad": $scope.Registro.ciudad,
			"zona": $scope.Registro.zona,
			"cocina": $scope.Registro.cocina,
			"sala": $scope.Registro.sala,
			"servicio": $scope.Registro.servicio,
			"metrosCuadrados": $scope.Registro.metroscuadrados,
			"garaje": $scope.Registro.garaje,
			"precio": $scope.Registro.precio,
			"idpersona": $scope.Registro.idpersona,
			"foto": { "imagen": $scope.Registro.imagen }

		};
		console.log($scope.Persona);
		$http({

			method: 'POST',
			url: 'http://localhost:8080/api/inmueble/save',
			headers: {
				"Content-Type": "application/json"
			},
			data: JSON.stringify($scope.Persona),
			dataType: ("json")
		}).then(function successCallback(response) {
			swal("Información", "Inmueble registrado con exito", "success")
			$scope.InicializarRegistro();
		}, function errorCallback(response) {
			swal("Error", "Inmueble no registrado", "error")
		});


	}

	const $seleccionArchivos = document.querySelector("#imagen"),
		$imagenPrevisualizacion = document.querySelector("#imgInmueble");

	$seleccionArchivos.addEventListener("change", () => {
		const archivos = $seleccionArchivos.files;
		if (!archivos || !archivos.length) {
			$imagenPrevisualizacion.src = "";
			return;
		}
		const primerArchivo = archivos[0];
		const objectURL = URL.createObjectURL(primerArchivo);
		$imagenPrevisualizacion.src = objectURL;
		$imagenPrevisualizacion.style.display = "block";
		var promise = getBase64(document.querySelector("#imagen")['files'][0]);
	promise.then(function(result) {
		$scope.Registro.imagen =result;
		console.log(result);
	});
	});
	function getBase64(file, onLoadCallback) {
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();
			reader.onload = function() { resolve(reader.result); };
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}
	
	
	$rootScope.InicializarSesion();
	$scope.InicializarRegistro();
	$rootScope.ValidarSesion();

});