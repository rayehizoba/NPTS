/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('QBasicCompiler.service', [])

        .service('QBasicCompilerService', function($q) {
            var path_to_compiler = process.cwd() + '\\app\\bin\\Basic\\fbc.exe';
            var path_to_console_pauser = process.cwd() + '\\app\\bin\\ConsolePauser.exe';
            var execFile = require('child_process').execFile;
            var exec = require('child_process').exec;
            var q = $q.defer();

            function compile (file_path) {

                execFile(path_to_compiler, [file_path], function (error, stdout, stderr) {

                    var msg = stdout.split('\n');
                    if (error) {

                        q.reject(msg);
                    }
                    else {

                        q.resolve(msg == '' ? ["Compilation successful"] : msg);
                    }
                });

                return q.promise;
            }

            function execute (filepath) {

                filepath = filepath.split(".bas")[0] + ".exe";

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