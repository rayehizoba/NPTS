(function(angular) {
    'use strict';
    angular.module('Console.component', [])
        .directive('console', function(Global) {
            return {
                link: function (scope, elem, attrs) {
                    Global.console = $(elem).jqconsole('', '> ');
                    var startPrompt = function () {
                        // Start the prompt with history enabled.
                        Global.console.Prompt(true, function (input) {
                            // Output input with the class jqconsole-output.
                            Global.console.Write(input + '\n', 'jqconsole-output');
                            // Restart the prompt.
                            startPrompt();
                        });
                    };
                    startPrompt();
                },
                restrict: 'E'
            };
        });
})(window.angular);