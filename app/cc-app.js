angular.module('CCApp', ['ngRoute', 'ngAnimate'])
    .value('ccCountries', 
        ['Peru', 'America', 'Venezuela'])
	.config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: './home.html',
            controller : 'HomeCtrl'
        })
        .when('/country/:country', {
            templateUrl : './country.html',
            controller : 'CountryCtrl',
            resolve : {
                country: function(ccCountries, $route, $location) {
                    var country = $route.current.params.country;
                    if(ccCountries.indexOf(country) == -1 ) {
                        $location.path('/error');
                        return;
                    }
                    return country;
                }
            }
        })
        .when('/countries', {
            templateUrl : './countries.html',
            controller : 'CountriesCtrl'
        })
        .when('/error', {
		    template : '<p>Error Page Not Found</p>'
		})
        .otherwise({
            redirectTo : '/error'
        });
    })
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $timeout(function() {
                $rootScope.isLoading = false;
            }, 1000);
        });
    })
    .controller('HomeCtrl', function($scope) {
        //empty for now
    })
    .controller('CountriesCtrl', function($scope) {
        //empty for now
    })
    .controller('CountryCtrl', function($scope, country) {
   		$scope.country = country;
	});