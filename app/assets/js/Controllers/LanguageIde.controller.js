/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('LanguageIde.controller', [])
        .controller(
            'LanguageIdeController',
            function($scope, $routeParams, $timeout, CCompilerService,
                     PascalCompilerService, JSInterpreterService,
                      FortranCompilerService, QBasicCompilerService, Global
            ) {

        var self = $scope;
        var fs = require('fs');
        var path_to_examples = process.cwd() + "\\app\\resources\\RunPrograms\\examples";


        // Private Methods
        //
        var _aceEditorChanged = function (e) {
            //
        };

        var _openFile = function (filename, filePath) {

            var tab = {
                filename: filename,
                sourceText: fs.readFileSync(filePath).toString()
            };
            newTab(tab);
        };

        var _saveFile = function (file_path, content, callback) {
            fs.writeFile(file_path, content, callback);
        };

        var _showConsoleMsg = function (msgArr) {
            $timeout(function () {

                for (var i in msgArr) {

                    Global.console.SetPromptText(msgArr[i]);
                    Global.console.AbortPrompt();
                    Global.console.Prompt();
                }
            });
        };

        var _showToastErr = function (msg, duration) {
            if (msg) {

                var $toastContent = $('<span><i class="fa fa-times red-text"></i><i class="fa fa-fw"></i>' +
                    'An error occured<br><i class="fa fa-fw"></i><i class="fa fa-fw"></i>' + msg + '</span>');
            }
            else {

                var $toastContent = $('<span><i class="fa fa-times red-text"></i><i class="fa fa-fw"></i>An error occured</span>');
            }
            Materialize.toast($toastContent, duration || 3000);
        };

        var _showToastSuccess = function (msg, duration) {
            var $toastContent = $('<span><i class="fa fa-check green-text"></i><i class="fa fa-fw"></i>' + msg + '</span>');
            Materialize.toast($toastContent, duration || 2000);
        };

        var _initIde = function () {

            self.languageId = $routeParams.languageId;

            // make #main-container full width
            $('#main-container')
                .removeClass('l18')
                .addClass('l23')
                .css({padding: 0});

            // initialize editor
                // set font-size
            if (!localStorage.getItem("editorFontsize")) {

                localStorage.setItem("editorFontsize", "12"); // default font-size
            }

            self.selectedFontsize = localStorage.getItem("editorFontsize");

                // set theme
            if (!localStorage.getItem("editorTheme")) {
                localStorage.setItem("editorTheme", "iplastic"); // default theme
            }
            self.selectedTheme = localStorage.getItem("editorTheme");

                // set soft-wrap
            if (!localStorage.getItem("editorUseSoftWrap")) {

                localStorage.setItem("editorUseSoftWrap", 'true'); // default
            }
            self.useSoftWrap = localStorage.getItem("editorUseSoftWrap") == 'true';

            self.sourceText = "";

            self.status = {
                language: "",
                lines: 0,
                curPos: {
                    row: 0,
                    col: 0
                }
            }
        }();

        /*
        * Ensures that the default system directories that
        * the program needs to function properly (save codes)
        * is always available
        */
        var _initFS = function () {

            // check if NPTS directory exists
            // if not make such a directory
            fs.readdir(process.env.USERPROFILE + "\\NPTSCodes", function (err) {

                if (err) {

                    fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes");
                }

                // check if QBasic subfolder exists
                fs.readdir(process.env.USERPROFILE + "\\NPTSCodes\\QBasic", function (err) {

                    if (err) {

                        fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes\\QBasic");
                    }
                });

                // check if Pascal subfolder exists
                fs.readdir(process.env.USERPROFILE + "\\NPTSCodes\\Pascal", function (err) {

                    if (err) {

                        fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes\\Pascal");
                    }
                });

                // check if Fortran subfolder exists
                fs.readdir(process.env.USERPROFILE + "\\NPTSCodes\\Fortran", function (err) {

                    if (err) {

                        fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes\\Fortran");
                    }
                });

                // check if C subfolder exists
                fs.readdir(process.env.USERPROFILE + "\\NPTSCodes\\C", function (err) {

                    if (err) {

                        fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes\\C");
                    }
                });

                // check if C++ subfolder exists
                fs.readdir(process.env.USERPROFILE + "\\NPTSCodes\\C++", function (err) {

                    if (err) {

                        fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes\\C++");
                    }
                });

                // check if JavaScript subfolder exists
                fs.readdir(process.env.USERPROFILE + "\\NPTSCodes\\JavaScript", function (err) {

                    if (err) {

                        fs.mkdir(process.env.USERPROFILE + "\\NPTSCodes\\JavaScript");
                    }
                });
            });

            $(document).on("change", '#openFileDialog', function () {

                _openFile(this.files[0].name, this.value);
            });
        }();

        var _initLangTools = function () {

            switch (self.languageId) {

                case 'qb':
                    self.extension = ".bas";
                    self.isCompiledLang = true;
                    self.compiler = QBasicCompilerService;
                    self.defDir = process.env.USERPROFILE + "\\NPTSCodes\\QBasic";
                    self.fileTypesFilter = ".bas";
                    self.compilerInfo = 'FBC 1 "2014-09-16" "FreeBASIC Compiler 1.05.0" "FreeBASIC Compiler"';
                    break;

                case 'pas':
                    self.extension = ".pas";
                    self.isCompiledLang = true;
                    self.compiler = PascalCompilerService;
                    self.defDir = process.env.USERPROFILE + "\\NPTSCodes\\Pascal";
                    self.fileTypesFilter = ".pas";
                    self.compilerInfo = "Free Pascal Compiler version 3.0.0 [2015/11/16] for i386\n" +
                        "Copyright (c) 1993-2015 by Florian Klaempfl and others";
                    break;

                case 'for':
                    self.extension = ".f95";
                    self.isCompiledLang = true;
                    self.compiler = FortranCompilerService;
                    self.defDir = process.env.USERPROFILE + "\\NPTSCodes\\Fortran";
                    self.fileTypesFilter = ".f95";
                    self.compilerInfo = "GNU g95 compiler";
                    break;

                case 'c':
                    self.extension = ".c";
                    self.isCompiledLang = true;
                    self.compiler = CCompilerService;
                    self.defDir = process.env.USERPROFILE + "\\NPTSCodes\\C";
                    self.fileTypesFilter = ".c, .h";
                    self.compilerInfo = "GNU gcc compiler";
                    break;

                case 'c++':
                    self.extension = ".cpp";

                    self.defDir = process.env.USERPROFILE + "\\NPTSCodes\\C++";
                    self.fileTypesFilter = ".c++, .cpp, .h";
                    break;

                case 'js':
                    self.extension = ".js";
                    self.isCompiledLang = false;
                    self.interpreter = JSInterpreterService;
                    self.defDir = process.env.USERPROFILE + "\\NPTSCodes\\JavaScript";
                    self.fileTypesFilter = ".js";
                    self.interpreterInfo = "Node.js V8 JavaScript engine v0.10.24";
            }

            _showConsoleMsg([self.compilerInfo || self.interpreterInfo]);
        }();

        var _initTabs = function () {

            self.tabs = [];
            self.currentTab = 0;
            self.newTabFilename = "";
        }();

        var _initOnExit = function () {

            $timeout(function () {

                window.onhashchange = function () {

                    // reset #main-container
                    $('#main-container')
                        .removeClass('l23')
                        .addClass('l18')
                        .css({padding: "0 0.75rem"});
                    window.onhashchange = null;
                }
            });
        }();

        var _getDefaultTemplate = function () {

            switch (self.languageId) {

                case 'qb':
                    path_to_examples += '\\QBasic\\default.bas';
                    break;

                case 'pas':
                    path_to_examples += '\\Pascal\\default.pas';
                    break;

                case 'for':
                    path_to_examples += '\\Fortran\\default.f95';
                    break;

                case 'c':
                    path_to_examples += '\\C\\default.c';
                    break;

                case 'c++':
                    path_to_examples += '\\C++\\default.cpp';
                    break;

                case 'js':
                    path_to_examples += '\\JavaScript\\default.js';
            }

            fs.readFile(path_to_examples, 'utf8', function (err, data) {

                if (err) {

                    console.log(err)
                }
                else {

                    self.defaultTemplate = data;
                }
            });
        }();




        // Public Methods
        //
        var goBack = function () {

            history.back();
        };

        var aceEditorLoaded = function(_editor){

            console.log("editor loaded", _editor);
            self.editor = _editor;
            self.session = _editor.getSession();

            // Editor part
            var _session = _editor.getSession();
            // var _renderer = _editor.renderer;

            // Options
            // self.status.curPos.row = _editor.selection.getCursor().row + 1;
            // self.status.curPos.col = _editor.selection.getCursor().column + 1;
            // self.status.lines = _editor.session.getLength();

            _editor.setFontSize(self.selectedFontsize / 1); // cast to int
            _editor.setTheme("ace/theme/" + self.selectedTheme);
            _session.setUseWrapMode(self.useSoftWrap);

            // set language
            switch (self.languageId) {

                case 'qb':
                    _session.setMode("ace/mode/vbscript");
                    self.status.language = "QBasic";
                    break;

                case 'pas':
                    _session.setMode("ace/mode/pascal");
                    self.status.language = "Pascal";
                    break;

                case 'for':
                    _session.setMode("ace/mode/fortran");
                    self.status.language = "Fortran";
                    break;

                case 'c':
                    _session.setMode("ace/mode/c_cpp");
                    self.status.language = "C";
                    break;

                case 'c++':
                    _session.setMode("ace/mode/c_cpp");
                    self.status.language = "C++";
                    break;

                case 'js':
                    _session.setMode("ace/mode/javascript");
                    self.status.language = "JavaScript";
            }

            // Events
            _session.on("change", function(){

                self.status.lines = _editor.session.getLength();
            });

            _session.selection.on('changeCursor', function(e) {

                self.status.curPos.row = _editor.selection.getCursor().row + 1;
                self.status.curPos.col = _editor.selection.getCursor().column + 1;
            });
        };

        var themeChanged = function () {

            localStorage.setItem("editorTheme", self.selectedTheme);
            self.editor.setTheme("ace/theme/" + self.selectedTheme);
        };

        var fontsizeChanged = function () {

            localStorage.setItem("editorFontsize", self.selectedFontsize);
            self.editor.setFontSize(self.selectedFontsize / 1); // cast to int
        };

        var useSoftWrapChanged = function () {

            localStorage.setItem("editorUseSoftWrap", self.useSoftWrap+""); // cast to string
            self.session.setUseWrapMode(self.useSoftWrap);
        };

        var newTab = function (tab) {

            var newTab = tab || {filename:null, sourceText:null};

            $('#newTabModal').closeModal();

            if (self.newTabFilename == '' && !tab) {

                self.newTabFilename = null;
                return;
            }

            // if a tab already exists
            // save its content
            if (self.tabs.length > 0) {

                self.tabs[self.currentTab].sourceText = self.sourceText;
            }

            self.tabs.push({
                filename: newTab.filename || self.newTabFilename + self.extension,
                sourceText: newTab.sourceText || self.defaultTemplate,
                curPos: {
                    x: 0,
                    y: 0
                }
            });

            self.currentTab = self.tabs.length - 1;

            // unhide editor if this is the first tab to be created
            if (self.tabs.length == 1) {

                $(self.editor.container).removeClass("hide");
            }

            self.newTabFilename = "";
            self.sourceText = self.tabs[self.currentTab].sourceText;
            self.editor.textInput.focus();

            // change focus to new tab
            $timeout(function () {

                $(document).find('a#tab' + self.currentTab).trigger('click');
                $(document).find('a#tab' + self.currentTab).trigger('click');
            });
        };

        var closeTab = function (tabIndex) {

            self.tabs.splice(tabIndex, 1);

            self.currentTab = self.tabs.length - 1;

            // hide editor if this is the last tab
            if (self.tabs.length == 0) {

                $(self.editor.container).addClass("hide");
            }
            else {

                self.sourceText = self.tabs[self.currentTab].sourceText;
                self.editor.textInput.focus();

                // change focus to new tab
                $timeout(function () {

                    $(document).find('a#tab' + self.currentTab).trigger('click');
                    $(document).find('a#tab' + self.currentTab).trigger('click');
                });
            }
        };

        var onChangeTab = function(tabNum) {

            // save state of old tab
            self.tabs[self.currentTab].sourceText = self.sourceText;
            // self.tabs[self.currentTab].curPos.x = self.editor.selection.getCursor().row;
            // self.tabs[self.currentTab].curPos.y = self.editor.selection.getCursor().column;
            //
            // console.log(self.editor.selection.getCursor());

            // load new tab
            self.currentTab = tabNum;
            self.sourceText = self.tabs[self.currentTab].sourceText;
            // self.editor.selection.moveCursorToPosition({
            //     row: self.tabs[self.currentTab].curPos.y,
            //     column: self.tabs[self.currentTab].curPos.x,
            // });

            // focus editor
            self.editor.textInput.focus();

            // update statusbar
            self.status.curPos.row = self.editor.selection.getCursor().row + 1;
            self.status.curPos.col = self.editor.selection.getCursor().column + 1;
            self.status.lines = self.editor.session.getLength();
        };
            
        var compile = function () {
            var path_to_file = self.defDir + "\\" + self.tabs[self.currentTab].filename;

            _saveFile(path_to_file, self.sourceText, function (err) {

                if (err) {

                    _showToastErr();
                }
                else {
                    
                    self.compiler.compile(path_to_file).then(
                        
                        function (res) {
                            
                            _showToastSuccess('Compilation complete');
                            _showConsoleMsg(res);
                        },
                        
                        function (err) {

                            _showToastErr('Compilation aborted');
                            _showConsoleMsg(err);
                        }
                    );
                }
            });
        };

        var saveFile = function () {

            var path_to_file = self.defDir + "\\" + self.tabs[self.currentTab].filename;
            _saveFile(path_to_file, self.sourceText, function (err) {

                if (err) {

                    _showToastErr('File not saved');
                }
                else {

                    _showToastSuccess("Saved");
                }
            });
        };

        var execute = function () {

            var path_to_file = self.defDir + "\\" + self.tabs[self.currentTab].filename;

            if (!self.isCompiledLang) {
                // for interpreted languages

                // save the file to be interpreted
                _saveFile(path_to_file, self.sourceText, function (err) {

                    if (err) {

                        _showToastErr();
                    }
                    else {

                        self.interpreter.execute(path_to_file).then(

                            function (res) {__onSuccess(res);},

                            function (err) {__onError(err);}
                        );
                    }
                });
            }
            else {
                // for compiled languages

                self.compiler.execute(path_to_file).then(

                    function (res) {__onSuccess(res);},

                    function (err) {__onError(err);}
                );
            }

            function __onSuccess(res) {
                _showConsoleMsg([res]);
            }

            function __onError(err) {
                _showToastErr(err);
            }
        };


        // Prototype
        self.goBack = goBack;
        self.aceLoaded = aceEditorLoaded;
        self.themeChanged = themeChanged;
        self.fontsizeChanged = fontsizeChanged;
        self.softWrapChanged = useSoftWrapChanged;
        self.newTab = newTab;
        self.closeTab = closeTab;
        self.onChangeTab = onChangeTab;
        self.compile = compile;
        self.saveFile = saveFile;
        self.execute = execute;
    });
})(window.angular);
