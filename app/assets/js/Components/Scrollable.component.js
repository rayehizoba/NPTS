(function(angular) {
    'use strict';
    angular.module('Scrollable.component', [])
        .directive('scrollable', function() {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $(elem).mCustomScrollbar({theme:"light-thin"});
                }
            };
        });
})(window.angular);