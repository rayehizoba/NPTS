/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('Tutorials.service', [])

        .service('TutorialsService', function($http) {
            function getAllCategories() {
                return $http.get('resources/Tutorials/categories.json');
            }

            return {
                getAll: getAllCategories
            }
        });
})(window.angular);