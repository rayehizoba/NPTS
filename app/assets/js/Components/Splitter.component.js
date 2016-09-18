(function(angular) {
    'use strict';
    angular.module('Splitter.component', [])
        .directive('splitter', function() {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    $(elem).split({orientation: 'horizontal', limit: 0, position: '500px'});
                }
            };
        });
})(window.angular);