/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('CCompiler.service', [])

        .service('CCompilerService', function($http) {
            var path_to_compiler = '';
            var path_to_def_dir = '';

            function compile (sourceText, filename) {
                console.log(sourceText);
            }

            function execute (filename) {

            }

            return {
                compile: compile,
                execute: execute
            }
        });
})(window.angular);