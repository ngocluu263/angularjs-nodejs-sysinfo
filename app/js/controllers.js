appControllers.controller('SysInfosCtrl', ['$scope', '$http', '$location', 
	function SysInfosCtrl($scope, $http, $location) {

		$scope.sysinfos = {};
		$scope.diskinfos = {};

		$http.get('http://localhost:3000/sysinfos').success(function(data) {
			$scope.sysinfos = data;
		});

		$http.get('http://localhost:3000/diskinfos').success(function(data) {
			$scope.diskinfos = data;
		});
	}
]);
