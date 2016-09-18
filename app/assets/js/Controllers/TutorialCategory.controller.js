/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('TutorialCategory.controller', [])
        .controller('TutorialCategoryController', function($scope, $routeParams, Cache) {
        var self = $scope;

        // Private
        var _init = function () {
            var categories = Cache.TutorialCategories;
            var categoryId = $routeParams.categoryId;
            for (var i in categories) {
                if (categoryId == categories[i].id) {
                    self.categoryTitle = categories[i].title;
                    self.subcategories = categories[i].subcategories;
                    break;
                }
            }
        }();

        // Public
        var goBack = function () {
            history.back();
        }

        // Prototype
        self.goBack = goBack;
    });
})(window.angular);
