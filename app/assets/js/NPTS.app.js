/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    
    var app = angular.module('NPTS', [
        'ngRoute',
        'ngSanitize',
        'Sidebar.component',
        'Scrollable.component',
        'Splitter.component',
        'Console.component',
        'Menu.component',
        'Controls.component',
        'Tutorials.service',
        'Tests.service',
        'CCompiler.service',
        'PascalCompiler.service',
        'FortranCompiler.service',
        'QBasicCompiler.service',
        'JSInterpreter.service',
        'Tutorials.controller',
        'TutorialCategory.controller',
        'PlayVideo.controller',
        'RunPrograms.controller',
        'LanguageIde.controller',
        'Tests.controller',
        'TestCategory.controller',
        'TestSession.controller',
        'vjs.video',
        'ui.ace',
        'ui.materialize'
    ]);

    app.config(function($routeProvider, $locationProvider) {
            $routeProvider
                // Tutorials
                .when('/tutorials', {
                    templateUrl: 'pages/tutorials/tutorials.htm',
                    controller: 'TutorialsController'
                })
                .when('/tutorials/:categoryId', {
                    templateUrl: 'pages/tutorials/category.htm',
                    controller: 'TutorialCategoryController'
                })
                .when('/play_video/:path/:to/:video/:file', {
                    templateUrl: 'pages/tutorials/play_video.htm',
                    controller: 'PlayVideoController'
                })

                // Run Programs
                .when('/run_programs', {
                    templateUrl: 'pages/run_programs/run_programs.htm',
                    controller: 'RunProgramsController'
                })
                .when('/run_programs/:languageId', {
                    templateUrl: 'pages/run_programs/language_ide.htm',
                    controller: 'LanguageIdeController'
                })

                // Test Yourself
                .when('/tests', {
                    templateUrl: 'pages/test/test_yourself.htm',
                    controller: 'TestsController'
                })
                .when('/tests/:categoryId', {
                    templateUrl: 'pages/test/category.htm',
                    controller: 'TestCategoryController'
                })
                .when('/test/:dirname/:filename', {
                    templateUrl: 'pages/test/test.htm',
                    controller: 'TestSessionController'
                })

                .otherwise('/tutorials');
        });
    
    app.value('Cache', {
        "TutorialCategories": [],
        "TestCategories": []
    });
    
    app.value('Global', {
        "currentChannel": 'Tutorials', // default value
        "console": null
    });
})(window.angular);
