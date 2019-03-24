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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/all.js":
/*!*****************************!*\
  !*** ./resources/js/all.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('load', initialiser);
var DURATION_WRITING = 75;
var DURATION_UNIT = 'minutes';
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

  if (document.getElementById('students') !== undefined) {
    var options = {
      valueNames: ['matricule', 'student', 'course', 'passed']
    };
    new List('students', options);
  } // Accordions in tests.


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
        var checked = document.getElementById('part_' + part).querySelectorAll('input[type="radio"]:checked'); // Part 2 has only 4 proposals by question.

        var radioPerQuestion = container.querySelectorAll('input[type="radio"]').length;

        if (checked.length == radios.length / radioPerQuestion) {
          var partContainer = container.parentElement.parentElement;

          if (!partContainer.classList.contains('part-completed')) {
            partContainer.classList.add('part-completed');
          }
        }
      });
    });
  } // Audio player.


  var interval;

  if (document.getElementById('player') !== null) {
    var audio = document.querySelector('#player audio');
    var tracks = audio.dataset.sources.split(',');
    var i = 1;
    timer.innerText = listening_duration.format("hh:mm:ss", {
      trim: false
    });
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
  });
} // Get timer for listening exercises.


function listening() {
  var timer = document.getElementById('timer');
  listening_duration.subtract(SECOND);
  timer.innerText = listening_duration.format("hh:mm:ss", {
    trim: false
  });
} // Get timer for writing exercises.


function writing(interval) {
  var timer = document.getElementById('timer');
  var duration = moment.duration(DURATION_WRITING, DURATION_UNIT);
  interval = setInterval(function () {
    duration = duration.subtract(SECOND);
    timer.innerText = duration.format("hh:mm:ss", {
      trim: false
    });

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

window.addEventListener('load', function () {
  if (document.getElementById('progression') !== null) {
    var ctx = document.getElementById("progression").getContext('2d');
    var data = [];
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: JSON.parse("[" + chart_axisX.replace(/&quot;/g, '"') + "]"),
        datasets: Object.values(JSON.parse(chart_axisY.replace(/&quot;/g, '"')))
      },
      options: {
        title: {
          display: true,
          text: 'Progression sur les différents types d\'exercices'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  if (document.getElementById('challenges') !== null) {
    var ctx = document.getElementById("challenges").getContext('2d');
    var data = [];
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: JSON.parse("[" + chart_axisX.replace(/&quot;/g, '"') + "]"),
        datasets: [{
          'label': 'Challenges',
          'data': chart_axisY.replace('[', '').replace(']', '').split(','),
          'backgroundColor': 'transparent',
          'borderColor': '#4b3f72'
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Progression sur les challenges'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/all.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/chloecorfmat/Documents/HelloToeic/Src/resources/js/all.js */"./resources/js/all.js");
module.exports = __webpack_require__(/*! /Users/chloecorfmat/Documents/HelloToeic/Src/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });