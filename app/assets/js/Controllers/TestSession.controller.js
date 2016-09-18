/**
 * Created by Raymond() on 12-May-16.
 */
(function(angular) {
    'use strict';
    angular.module('TestSession.controller', [])
        .controller('TestSessionController', function($scope, $routeParams, TestsService, $timeout) {
            var self = $scope;
            self.questions = [];
            self.current_question = 0;
            self.test_started = false;

            // Private
            var _formatTitle = function (title, year) {
              // expected format for title is in snakecase
              // expected output should be in Sentence case
              title = title.replace(title[0], title[0].toUpperCase());
              title = title.split('_');
              title = title.join(' ');

              // expected format for year is : yy-yy.json eg. 12-13.json
              // to denote the json file (questions) for years 2012-2013
              // expected output is : yyyy/yyyy eg. 2012/2013
              year = year.replace('.json', '');
              year = year.split('-');
              for (var i in year) {
                year[i] = '20' + year[i];
              }
              year = year.join('/');
              return title + ' ' + year;
            }

            var _init = function () {
                var dirname = $routeParams.dirname;
                var filename = $routeParams.filename;

                TestsService.getTestQuestions(dirname, filename).then(
                    function (res) {
                        for (var i in res.data) {
                            res.data[i].selected_option = '';
                            res.data[i].isFocused = false;
                        }
                        self.questions = res.data;
                        console.log(res);
                        $timeout(function () {
                            $timeout(function () {
                                self.pageLoaded = true;
                            }, 1000);
                        });
                    },
                    function (err) {
                        console.log(err, "File not found " + filename);
                    }
                );

                self.title = _formatTitle(dirname, filename);
            }();

            // Public
            var goBack = function () {
                history.back();
            };

            var startTest = function () {
                self.current_question = 0;
                self.test_started = true;
                self.questions[self.current_question].isFocused = true;
            };

            var selectOption = function (index, option) {
                self.questions[index].selected_option = option
                $timeout(function () {
                    gotoNext();
                }, 1000);
            };

            var gotoNext = function () {
                if (self.questions.length-1 == self.current_question) return;
                self.questions[self.current_question].isFocused = false;
                self.current_question++;
                self.questions[self.current_question].isFocused = true;
            };

            var gotoPrev = function () {
                if (self.current_question == 0) return;
                self.questions[self.current_question].isFocused = false;
                self.current_question--;
                self.questions[self.current_question].isFocused = true;
            };

            // Prototype
            self.goBack = goBack;
            self.selectOption = selectOption;
            self.gotoNext = gotoNext;
            self.gotoPrev = gotoPrev;
            self.start = startTest;
        });
})(window.angular);
