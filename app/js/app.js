'use strict';

var app = angular.module('app', ['ngRoute', 'appControllers', 'appServices', 'appDirectives', 'appFilters']);

var appControllers = angular.module('appControllers', []);

var appServices = angular.module('appServices', []);

var appDirectives = angular.module('appDirectives', []);

var appFilters = angular.module('appFilters', []);

var options = {};
options.api = {};
options.api.base_url = 'http://192.168.1.150:3003';