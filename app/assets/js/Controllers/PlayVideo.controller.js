/**
 * Created by Raymond() on 07-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('PlayVideo.controller', [])
        .controller('PlayVideoController', function($scope, $routeParams) {
        var self = $scope;

        // Private
        var _init = function () {
            var path_to_video_file = $routeParams.path + '/' + $routeParams.to + '/' + $routeParams.video + '/' + $routeParams.file;
            self.video_title = $routeParams.file;
            self.finisedPlaying = false;
            self.video = {
                sources: [
                    {
                        src: path_to_video_file,
                        type: 'video/ogg'
                    }
                ],
                tracks: [],
                poster: 'resources/Tutorials/posters/thumb1.jpg'
            };

            // when a video finishes
            $('video').on('ended',function(){
                _onVideoEnded();
            });
        }()

        var _onVideoEnded = function () {
            console.log('Video has ended!');
            // save to DB -> watched
        }

        // Public
        var goBack = function () {
            history.back();
        }

        // Prototype
        self.goBack = goBack;
    });
})(window.angular);