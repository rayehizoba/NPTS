/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('Tests.controller', [])
        .controller('TestsController', function($scope, Global, Cache, TestsService, $timeout) {
            var self = $scope;

            // Private
            var _init = function () {
                // set current channel
                Global.currentChannel = 'TestYourself';

                // get all tutorial categories
                TestsService.getAll().then(function (response) {
                    self.categories = response.data;
                    Cache.TestCategories = self.categories;
                });
            }()

            // Public
            var gotoCategory = function (id) {
                $timeout(function () {
                    location.hash = "#/tests/" + id;
                }, 400)
            }

            // Prototype
            self.gotoCategory = gotoCategory;
        });
})(window.angular);