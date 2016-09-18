/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('CCompiler.service', [])

        .service('CCompilerService', function($q) {
                var path_to_compiler = process.cwd() + '\\app\\bin\\C&C++\\MinGW32\\bin\\gcc.exe';
                var path_to_console_pauser = process.cwd() + '\\app\\bin\\ConsolePauser.exe';
                var execFile = require('child_process').execFile;
                var exec = require('child_process').exec;
                var q = $q.defer();

                function compile (file_path) {
console.log(process.cwd() + '\\a.exe');
                    execFile(
                        '"' + path_to_compiler + '"',
                        [
                            '"' + file_path + '"'/*,
                            '-o',
                            '"' + process.cwd() + '\\a.exe"',
                            '-I"' + process.cwd() + '\\app\\bin\\C&C++\\MinGW32\\include"',
                            '-I"' + process.cwd() + '\\app\\bin\\C&C++\\MinGW32\\mingw32\\include"',
                            '-I"' + process.cwd() + '\\app\\bin\\C&C++\\MinGW32\\mingw32\\lib\\gcc\\mingw32\\4.8.1\\include"',
                            '-L"' + process.cwd() + '\\app\\bin\\C&C++\\MinGW32\\lib"',
                            '-L"' + process.cwd() + '\\app\\bin\\C&C++\\MinGW32\\mingw32\\lib"',
                            "-static-libstdc++",
                            "-static-libgcc"*/
                        ],

                        function (error, stdout, stderr) {
                            // var msg = stdout.split("\n");
                            // msg.splice(0, 3);  // format error/success message
                            // msg.pop();  // format error/success message

                            if (error) {
                                console.log(error);
                                //
                                // msg.pop();  // format error message
                                q.reject(["error"]);
                            }
                            else {

                                q.resolve(["success"]);
                            }
                        }
                    );

                    return q.promise;
                }

                function execute (filepath) {

                    filepath = filepath.split(".pas")[0] + ".exe";

                    exec('start "" "' + path_to_console_pauser + '" "' + filepath + '"', function (err) {

                        if (err) {

                            q.reject("Please compile the code first!");
                        }
                        else {

                            q.resolve("Successfully executed " + filepath);
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