(function(angular) {
    'use strict';
    angular.module('Controls.component', [])
        .directive('handlebarControls', function() {
            return {
                templateUrl: 'pages/partials/handlebar_controls.htm',
                
                controller: function($scope, $timeout) {
                    var self = $scope;
                    var gui = require("nw.gui");
                    var win = gui.Window.get();
                    var splashscreen = gui.Window.open('splash.htm', {
                        "transparent": true,
                        'frame': false,
                        'position': 'center',
                        "width": 700,
                        "height": 500,
                        "resizable": false,
                        "toolbar": false,
                        "fullscreen": false
                    });

                    // Private
                    var _init = function () {
                        $timeout(function () {
                            splashscreen.close(true);
                            win.maximize();
                            win.show();
                            splashscreen = null;
                        }, 2500);
                    }()

                    // win.on('restore', function () {
                    //     self.isFullscreen = false;
                    // })

                    win.on('unmaximize', function () {
                        win.isMaximized = false;
                        $timeout(function () {
                            self.isFullscreen = false;
                        });
                    })

                    win.on('maximize', function () {
                        win.isMaximized = true;
                        $timeout(function () {
                            self.isFullscreen = true;
                        });
                    })

                    // Public
                    var minimizeWindow = function () {
                        win.minimize();
                    }

                    var maximizeWindow = function () {
                        if (win.isMaximized) {
                            // win.restore();
                            win.unmaximize();
                        }
                        else {
                            win.maximize();
                        }
                    }

                    var closeWindow = function () {
                        win.close();
                    }

                    // Prototype
                    self.minimizeWindow = minimizeWindow;
                    self.maximizeWindow = maximizeWindow;
                    self.closeWindow = closeWindow;
                }
            };
        });
})(window.angular);