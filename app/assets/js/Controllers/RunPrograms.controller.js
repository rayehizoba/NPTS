/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('RunPrograms.controller', [])
        .controller('RunProgramsController', function($scope, Global, $timeout) {
        var self = $scope;

        // Private
        var _init = function () {
            // set current channel
            Global.currentChannel = 'RunPrograms';

        }()

        // Public
        var gotoLanguage = function (languageId) {
            $timeout(function () {
                location.hash = "#/run_programs/" + languageId;
            }, 400)
        }

        // Prototype
        self.gotoLanguage = gotoLanguage;
    });
})(window.angular);