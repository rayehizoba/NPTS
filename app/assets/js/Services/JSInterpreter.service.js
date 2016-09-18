/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('JSInterpreter.service', [])

        .service('JSInterpreterService', function($q) {
            var path_to_interpreter = process.cwd() + '\\app\\bin\\JavaScript\\node.exe';
            var path_to_console_pauser = process.cwd() + '\\app\\bin\\ConsolePauser.exe';
            var exec = require('child_process').exec;
            var q = $q.defer();

            function execute (file_path) {

                exec('start "" "' + path_to_console_pauser + '" "' + path_to_interpreter + '" "' + file_path + '"', function (err) {

                    if (err) {

                        q.reject("Please compile the code first!");
                    }
                    else {

                        q.resolve("Executing " + file_path + '...');
                    }
                });

                return q.promise;
            }

            return {
                execute: execute
            }
        });
})(window.angular);