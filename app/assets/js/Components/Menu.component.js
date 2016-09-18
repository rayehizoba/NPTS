(function(angular) {
    'use strict';
    angular.module('Menu.component', [])
        .directive('menu', function() {
            return {
                templateUrl: 'pages/partials/menu.htm',
                
                controller: function($scope) {
                    var self = $scope;
                    self.activeTab = 1;

                    // Private

                    // Public
                    var setActiveTab = function (tabNum) {
                        switch (tabNum) {
                            case 1:
                                self.activeTab = 1;
                                break;
                            case 2:
                                self.activeTab = 2;
                                break;
                            case 3:
                                self.activeTab = 3;
                        }
                    }

                    // Prototype
                    self.setActiveTab = setActiveTab;
                }
            };
        });
})(window.angular);