/**
 * Created by Raymond() on 12-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('Tests.service', [])

        .service('TestsService', function($http) {
            function getAllCategories() {
                return $http.get('resources/TestYourself/categories.json');
            };
        
            function getTestQuestions(dir, file) {
                return $http.get('resources/TestYourself/' + dir + '/' + file);
            };

            return {
                getAll: getAllCategories,
                getTestQuestions: getTestQuestions
            }
        });
})(window.angular);
