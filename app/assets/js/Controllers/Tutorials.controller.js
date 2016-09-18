/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('Tutorials.controller', [])
        .controller('TutorialsController', function($scope, TutorialsService, Cache, $timeout, Global) {
        var self = $scope;

        // Private
        var _init = function () {
            // set current channel
            Global.currentChannel = 'Tutorials';

            // get all tutorial categories
            TutorialsService.getAll().then(function (response) {
                self.categories = response.data;
                Cache.TutorialCategories = self.categories;
            });
        }();

        // Public
        var gotoCategory = function (id) {
            $timeout(function () {
                location.hash = "#/tutorials/" + id;
            }, 400)
        };

        // Prototype
        self.gotoCategory = gotoCategory;
    });
})(window.angular);