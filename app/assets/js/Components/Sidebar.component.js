(function(angular) {
    'use strict';
    angular.module('Sidebar.component', [])
        .directive('sidebar', function() {
            return {
                template: '<ng-include src="getTemplateUrl()"/>',
                
                controller: function ($scope, Global) {
                    $scope.getTemplateUrl = function () {
                        switch (Global.currentChannel) {
                            case 'Tutorials':
                                return "pages/partials/tutorials.sidebar.htm";
                            case 'RunPrograms':
                                return "pages/partials/run_programs.sidebar.htm";
                            case 'TestYourself':
                                return "pages/partials/tests.sidebar.htm";
                            default:
                                return "pages/partials/tutorials.sidebar.htm";
                        }
                    }
                },
                restrict: 'E'
            };
        });
})(window.angular);