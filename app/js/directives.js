appDirectives.directive('memory', function($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'partials/memory-detail.html',
		link: function(scope, element, attrs) {
			$timeout(function() {
				$timeout(function () {
					var data = [
						{
							value: Math.ceil(attrs.meminfoTotal - attrs.meminfoFree),
							color:"#F7464A"
						},
						{
							value : Math.ceil(attrs.meminfoFree),
							color : "#4D5360"
						}
					]
					var ctx = element[0].firstChild.getContext("2d");
					//console.log(element[0])
					new Chart(ctx).Doughnut(data);
				}, 0);
			}, 0);
		}
	}
});

appDirectives.directive('cpu', function($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'partials/cpu-detail.html',
		link: function(scope, element, attrs) {
			$timeout(function() {
				$timeout(function () {
					var data = [
						{
							value: Math.ceil(attrs.cpuinfoUsage),
							color: "#F7464A"
						},
						{
							value: Math.ceil(100 - attrs.cpuinfoUsage),
							color: "#4D5360"
						}
					]
					//console.log(data);
					var ctx = element[0].firstChild.getContext("2d");
					new Chart(ctx).Doughnut(data);
				}, 0);

			}, 0);

		}
	}
});

appDirectives.directive('disk', function($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'partials/disk-detail.html',
		link: function(scope, element, attrs) {
			$timeout(function() {
				$timeout(function () {
					var data = [
						{
							value: Math.ceil(attrs.diskinfoUse),
							color:"#F7464A"
						},
						{
							value: Math.ceil(attrs.diskinfoFree),
							color:"#4D5360"
						}
					]
					var ctx = element[0].firstChild.getContext("2d");
					new Chart(ctx).Doughnut(data);
				}, 0);

			}, 0);

		}
	}
});