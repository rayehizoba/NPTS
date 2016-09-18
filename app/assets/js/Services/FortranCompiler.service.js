/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('FortranCompiler.service', [])

        .service('FortranCompilerService', function($q) {
            var path_to_compiler = process.cwd() + '\\app\\bin\\Fortran\\bin\\g95.exe';
            var path_to_console_pauser = process.cwd() + '\\app\\bin\\ConsolePauser.exe';
            var execFile = require('child_process').execFile;
            var exec = require('child_process').exec;
            var q = $q.defer();

            function compile (file_path) {
                
                var output = file_path.split(".f95")[0];

                execFile(path_to_compiler, ["-o", output, file_path], function (error, stdout, stderr) {

                    if (error) {
                        
                        var msg = stderr.split('\n');
                        q.reject(msg);
                    }
                    else {

                        q.resolve(["Compilation successful"]);
                    }
                });

                return q.promise;
            }

            function execute (filepath) {

                filepath = filepath.split(".f95")[0] + ".exe";

                exec('start "" "' + path_to_console_pauser + '" "' + filepath + '"', function (err) {

                    if (err) {

                        q.reject(["Please compile the code first!"]);
                    }
                    else {

                        var msg = [];
                        msg.push("Successfully executed " + filepath);
                        console.log(msg);
                        q.resolve(msg);
                    }
                });

                return q.promise;
            }

            return {
                compile: compile,
                execute: execute
            }
        });
})(window.angular);