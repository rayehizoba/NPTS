/**
 * Created by Raymond() on 12-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('TestCategory.controller', [])
        .controller('TestCategoryController', function($scope, $routeParams, Cache, $timeout) {
            var self = $scope;

            // Private
            var _init = function () {
                var categories = Cache.TestCategories;
                var categoryId = $routeParams.categoryId;
                for (var i in categories) {
                    if (categoryId == categories[i].id) {
                        self.categoryTitle = categories[i].title;
                        self.testDirname = categories[i].dirname;
                        self.tests = categories[i].tests;
                        break;
                    }
                }
            }()

            // Public
            var goBack = function () {
                history.back();
            }
            
            var gotoTest = function (filename) {
                $timeout(function () {
                    location.hash = "#/test/" + self.testDirname + "/" + filename;
                }, 400);
            }

            // Prototype
            self.goBack = goBack;
            self.gotoTest = gotoTest;
        });
})(window.angular);