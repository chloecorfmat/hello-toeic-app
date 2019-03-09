/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

window.addEventListener('load', initialiser);

var DURATION_WRITING = 10;
var DURATION_UNIT = 'seconds';
var SECOND = moment.duration(1, 'seconds');

var listening_duration = moment.duration(DURATION_LISTENING, DURATION_UNIT);

function initialiser(e) {

    if (document.getElementById('profile-tests') !== undefined) {
        var options = {
            valueNames: ['date', 'test', 'student', 'score']
        };

        new List('profile-tests', options);
    }

    if (document.getElementById('tests') !== undefined) {
        var options = {
            valueNames: ['name', 'version']
        };

        new List('tests', options);
    }

    if (document.getElementById('games') !== undefined) {
        var options = {
            valueNames: ['date', 'student', 'score']
        };

        new List('games', options);
    }

    // Accordions in tests.
    if (document.getElementsByClassName('js-part-close') !== null) {
        var btns = document.getElementsByClassName('js-part-close');

        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var toggle = this.parentNode.classList.toggle('part-hide');

                if (toggle) {
                    this.innerHTML = '<i class="fas fa-chevron-down fa-2x"></i>';
                    this.title = 'Open';
                } else {
                    this.innerHTML = '<i class="fas fa-times fa-2x"></i>';
                    this.title = 'Close';
                }
            });
        }
    }

    if (document.getElementById('test') != undefined) {
        var radios = document.querySelectorAll('#test input[type="radio"]');
        radios.forEach(function (el) {
            el.addEventListener('change', function () {
                var container = el.parentElement.parentElement.parentElement.parentElement;
                var part = container.dataset.part;
                var radios = document.getElementById('part_' + part).querySelectorAll('input[type="radio"]');
                var checked = document.getElementById('part_' + part).querySelectorAll('input[type="radio"]:checked');

                // Part 2 has only 4 proposals by question.
                var radioPerQuestion = container.querySelectorAll('input[type="radio"]').length;
                if (checked.length == radios.length / radioPerQuestion) {
                    var partContainer = container.parentElement.parentElement;

                    if (!partContainer.classList.contains('part-completed')) {
                        partContainer.classList.add('part-completed');
                    }
                }
            });
        });
    }

    // Audio player.
    var interval;
    if (document.getElementById('player') !== null) {
        var audio = document.querySelector('#player audio');
        var tracks = audio.dataset.sources.split(',');
        var i = 1;
        timer.innerText = listening_duration.format("hh:mm:ss", { trim: false });

        document.getElementById('play').addEventListener('click', function (e) {
            this.removeEventListener('click', arguments.callee);
            document.querySelector('.btn-play').classList.add('btn-play--disabled');
            audio.play();
            interval = setInterval(listening, 1000);
        });

        audio.addEventListener('ended', function () {
            if (i < tracks.length) {
                this.src = tracks[i];
                i++;
                this.play();
            } else {
                clearInterval(interval);
                timer.innerText = '00:00:00';
                var audioQuestions = document.querySelectorAll('.fa-volume-up');
                audioQuestions.forEach(function (question) {
                    var radios = question.parentNode.parentNode.querySelectorAll('input[type="radio"]');
                    radios.forEach(function (radio) {
                        if (radio.checked == false) {
                            radio.disabled = true;
                        }
                    });
                });

                if (document.querySelector('.fa-glasses') != null) {
                    writing(interval);
                }
            }
        });
    }

    document.querySelectorAll("#test .img-preview").forEach(function (el) {
        el.addEventListener('click', function () {
            var i = this.querySelector('img');

            if (i.classList.contains('on-preview')) {
                i.classList.remove('on-preview');
                document.querySelector('.preview').style.backgroundImage = "";
                document.querySelector('.preview').classList.add("hidden");
            } else {

                document.querySelectorAll('.on-preview').forEach(function (on) {
                    on.classList.remove('on-preview');
                });

                i.classList.add('on-preview');
                document.querySelector('.preview').style.backgroundImage = "url(" + i.src + ")";
                document.querySelector('.preview').classList.remove('hidden');
            }
        }, false);
    });

    document.body.addEventListener('click', function (e) {
        if (e.target.closest('.preview')) return;
        if (e.target.closest('.img-preview')) return;

        if (!document.querySelector('.preview').classList.contains('hidden')) {
            document.querySelectorAll('.on-preview').forEach(function (el) {
                el.classList.remove('on-preview');
            });

            document.querySelector('.preview').style.backgroundImage = "";
            document.querySelector('.preview').classList.add('hidden');
        }
    }, false);
}

// Get timer for listening exercises.
function listening() {
    var timer = document.getElementById('timer');
    listening_duration.subtract(SECOND);
    timer.innerText = listening_duration.format("hh:mm:ss", { trim: false });
}

// Get timer for writing exercises.
function writing(interval) {
    var timer = document.getElementById('timer');
    var duration = moment.duration(DURATION_WRITING, DURATION_UNIT);

    interval = setInterval(function () {
        duration = duration.subtract(SECOND);
        timer.innerText = duration.format("hh:mm:ss", { trim: false });

        if (duration.asSeconds() <= 0) {
            clearInterval(interval);
            document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
                if (radio.checked == false) {
                    radio.disabled = true;
                }
            });
        }
    }, 1000);
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);