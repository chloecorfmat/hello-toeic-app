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
var DURATION_UNIT = 'seconds';
var SECOND = moment.duration(1, 'seconds');
var listening_duration = moment.duration(DURATION_LISTENING, DURATION_UNIT);

function initialiser(e) {
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
          reading(interval);
        }
      }
    });
    document.addEventListener('scroll', stickyPlayer);
  }
} // Get timer for listening exercises.


function listening() {
  var timer = document.getElementById('timer');
  listening_duration.subtract(SECOND);
  timer.innerText = listening_duration.format("hh:mm:ss", {
    trim: false
  });
}

function stickyPlayer(e) {
  var player = document.getElementById('player');
  var previousEl = player.previousElementSibling.getBoundingClientRect();

  if (previousEl.top + previousEl.height < 0) {
    if (!player.classList.contains('sticky-player')) {
      player.classList.add('sticky-player');
    }
  } else {
    if (player.classList.contains('sticky-player')) {
      player.classList.remove('sticky-player');
    }
  }
} // Get timer for reading exercises.


function reading(interval) {
  var timer = document.getElementById('timer');
  var duration = moment.duration(DURATION_READING, DURATION_UNIT);
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
window.addEventListener('load', lists);

function lists(e) {
  if (document.getElementById('composite-tests') !== null) {
    var options = {
      valueNames: ['name', 'version', 'exercises'],
      page: 30,
      pagination: {
        paginationClass: "pagination",
        outerWindow: 0,
        innerWindow: 2
      }
    };
    var list = new List('composite-tests', options);
    listOverride(list);
  }

  if (document.getElementById('profile-tests') !== null) {
    var options = {
      valueNames: ['date', 'test', 'student', 'score'],
      page: 30,
      pagination: {
        paginationClass: "pagination",
        outerWindow: 0,
        innerWindow: 2
      }
    };
    var list = new List('profile-tests', options);
    listOverride(list);
  }

  if (document.getElementById('tests') !== null) {
    var options = {
      valueNames: ['name', 'part'],
      page: 30,
      pagination: {
        paginationClass: "pagination",
        outerWindow: 0,
        innerWindow: 2
      }
    };
    var list = new List('tests', options);
    listOverride(list);
  }

  if (document.getElementById('games') !== null) {
    var options = {
      valueNames: ['date', 'student', 'score'],
      page: 30,
      pagination: {
        paginationClass: "pagination",
        outerWindow: 0,
        innerWindow: 2
      }
    };
    var list = new List('games', options);
    listOverride(list);
  }

  if (document.getElementById('students') !== null) {
    var options = {
      valueNames: ['matricule', 'student', 'course', 'passed'],
      page: 30,
      pagination: {
        paginationClass: "pagination",
        outerWindow: 0,
        innerWindow: 2
      }
    };
    var list = new List('students', options);
    listOverride(list);
  }
}

function listOverride(list) {
  list.search(document.querySelector('.search').value);
  emptySearch(list);
  displayButtonPrevNext();
  list.on('searchComplete', function () {
    displayButtonPrevNext();
    emptySearch(list);
  });
  document.getElementById('js-pagination-prev').addEventListener('click', function () {
    var lis = document.querySelectorAll('.pagination li');
    lis.forEach(function (li, pos) {
      if (li.classList.contains('active')) {
        var p = pos - 1;

        if (p >= 0) {
          lis[p].click();
        }
      }
    });
    displayButtonPrevNext();
  });
  document.getElementById('js-pagination-next').addEventListener('click', function () {
    var lis = document.querySelectorAll('.pagination li');
    lis.forEach(function (li, pos) {
      if (li.classList.contains('active')) {
        var p = pos + 1;

        if (p < lis.length) {
          lis[p].click();
        }
      }
    });
    displayButtonPrevNext();
  });
}

function displayButtonPrevNext() {
  var lis = document.querySelectorAll('.pagination li');
  var active = document.querySelector('.pagination li.active');

  if (lis.length === 0) {
    if (document.getElementById('js-pagination-prev').classList.contains('is-visible')) {
      document.getElementById('js-pagination-prev').classList.remove('is-visible');
    }

    if (document.getElementById('js-pagination-next').classList.contains('is-visible')) {
      document.getElementById('js-pagination-next').classList.remove('is-visible');
    }
  } else {
    if (lis[0] === active) {
      if (document.getElementById('js-pagination-prev').classList.contains('is-visible')) {
        document.getElementById('js-pagination-prev').classList.remove('is-visible');
      }
    } else {
      if (!document.getElementById('js-pagination-prev').classList.contains('is-visible')) {
        document.getElementById('js-pagination-prev').classList.add('is-visible');
      }
    }

    if (lis[lis.length - 1] === active) {
      if (document.getElementById('js-pagination-next').classList.contains('is-visible')) {
        document.getElementById('js-pagination-next').classList.remove('is-visible');
      }
    } else {
      if (!document.getElementById('js-pagination-next').classList.contains('is-visible')) {
        document.getElementById('js-pagination-next').classList.add('is-visible');
      }
    }

    lis.forEach(function (li) {
      li.addEventListener('click', displayButtonPrevNext);
    });
  }
}

function emptySearch(list) {
  var trs = document.querySelectorAll('.list tr');
  var emptySearch = document.getElementById('js-empty-search');

  if (trs.length === 0) {
    if (!emptySearch.classList.contains('is-visible')) {
      emptySearch.classList.add('is-visible');
    }

    emptySearch.setAttribute('aria-hidden', 'false');

    if (list.listContainer.querySelector('.table-container').classList.contains('is-visible')) {
      list.listContainer.querySelector('.table-container').classList.remove('is-visible');
    }
  } else {
    if (emptySearch.classList.contains('is-visible')) {
      emptySearch.classList.remove('is-visible');
    }

    emptySearch.setAttribute('aria-hidden', 'true');

    if (!list.listContainer.querySelector('.table-container').classList.contains('is-visible')) {
      list.listContainer.querySelector('.table-container').classList.add('is-visible');
    }
  }
}

window.addEventListener('load', imageZoomInitialize);
var lens, image;

function imageZoomInitialize(e) {
  var images = document.querySelectorAll('.documents img');

  for (var i = 0; i < images.length; i++) {
    images[i].parentElement.addEventListener('mouseenter', function () {
      imageZoom(this.querySelector('img').id, 'preview');
    });
    images[i].parentElement.addEventListener('mouseleave', function () {
      var p = document.getElementById('preview');

      if (!p.classList.contains('hidden')) {
        p.classList.add('hidden');
      }

      var l = document.getElementById('lens');

      if (l !== null) {
        l.parentElement.removeChild(l);
      }
    });
  }
}

function imageZoom(imageID, resultID) {
  var image, result, cx, cy;
  image = document.getElementById(imageID);
  result = document.getElementById(resultID);
  lens = document.createElement("div");
  lens.setAttribute("class", "img-zoom-lens");
  lens.setAttribute("id", "lens");
  image.parentElement.insertBefore(lens, image);

  if (result.classList.contains('hidden')) {
    result.classList.remove('hidden');
  }

  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  result.style.backgroundImage = "url('" + image.src + "')";
  result.style.backgroundSize = image.width * cx + "px " + image.height * cy + "px";
  image.addEventListener('mousemove', moveLens);
  image.addEventListener('touchmove', moveLens);
  lens.addEventListener('mousemove', moveLens);
  lens.addEventListener('touchmove', moveLens);

  function moveLens(e) {
    var pos, x, y; // Prevent others actions that may occur when moving over image.

    e.preventDefault(); // Pos top, right.

    pos = getCursorPos(e);
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    if (x > image.width - lens.offsetWidth) {
      x = image.width - lens.offsetWidth;
    }

    if (x < 0) {
      x = 0;
    }

    if (y > image.height - lens.offsetHeight) {
      y = image.height - lens.offsetHeight;
    }

    if (y < 0) {
      y = 0;
    }

    lens.style.left = x + "px";
    lens.style.top = y + "px";
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }

  function getCursorPos(e) {
    var a,
        x = 0,
        y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */

    a = image.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */

    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {
      x: x,
      y: y
    };
  }
}

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