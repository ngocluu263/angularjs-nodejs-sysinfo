appControllers.controller('SysInfosCtrl', ['$scope', '$http', '$location', 'DataService',
	function SysInfosCtrl($scope, $http, $location, DataService) {

		$scope.sysinfos = {};
		$scope.diskinfos = {};

		DataService.getSystemInfo().success(function(data) {
			$scope.sysinfos = data;
		});

		DataService.getDiskInfo().success(function(data) {
			$scope.diskinfos = data;
		});
	}
]);
