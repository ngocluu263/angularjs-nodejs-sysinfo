appServices.factory('DataService', function($http) {
    return {
        getSystemInfo: function() {
            return $http.get(options.api.base_url + '/sysinfos');
        },

        getDiskInfo: function() {
        	return $http.get(options.api.base_url + '/diskinfos');
        }
    }
});