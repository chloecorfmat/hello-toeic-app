window.addEventListener('load', initialiser);

const DURATION_UNIT = 'seconds';
const SECOND = moment.duration(1, 'seconds');

var listening_duration = moment.duration(DURATION_LISTENING, DURATION_UNIT);
var reading_duration = moment.duration(DURATION_READING, DURATION_UNIT);

function initialiser(e) {
    // Accordions in tests.
    if (document.getElementsByClassName('js-part-close') !== null) {
        var btns = document.getElementsByClassName('js-part-close');

        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function() {
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
        radios.forEach(function(el) {
            el.addEventListener('change', function() {
                var container = el.parentElement.parentElement.parentElement.parentElement;
                var part = container.dataset.part;
                var radios = document.getElementById('part_' + part).querySelectorAll('input[type="radio"]');
                var checked = document.getElementById('part_' + part).querySelectorAll('input[type="radio"]:checked');

                // Part 2 has only 4 proposals by question.
                var radioPerQuestion = container.querySelectorAll('input[type="radio"]').length;
                if (checked.length == (radios.length/radioPerQuestion)) {
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
        if (DURATION_LISTENING !== 0) {
            var audio = document.querySelector('#player audio');
            var tracks = audio.dataset.sources.split(',');
            var i = 1;
            timer.innerText = listening_duration.format("hh:mm:ss", {trim: false});

            document.getElementById('play').addEventListener('click', function(e) {
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
                    audioQuestions.forEach(function(question) {
                        var radios = question.parentNode.parentNode.querySelectorAll('input[type="radio"]');
                        radios.forEach(function(radio) {
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
        } else {
            reading(interval);
        }


        document.addEventListener('scroll', stickyPlayer);
    }

    // To avoid double submissions on exercises or tests.
    document.querySelectorAll('.test').forEach(function(form) {
        form.addEventListener('submit', function() {
            form.querySelector('button[type="submit"]').setAttribute("disabled", "disabled");
        })
    })
}

// Get timer for listening exercises.
function listening() {
    var timer = document.getElementById('timer');
    listening_duration.subtract(SECOND);
    timer.innerText = listening_duration.format("hh:mm:ss", {trim: false});
}

function stickyPlayer(e) {
    var player =  document.getElementById('player');
    var previousEl = player.previousElementSibling.getBoundingClientRect();
    if ((previousEl.top + previousEl.height) < 0) {
        if (!player.classList.contains('sticky-player')) {
            player.classList.add('sticky-player');
        }
    } else {
        if (player.classList.contains('sticky-player')) {
            player.classList.remove('sticky-player');
        }
    }
}

// Get timer for reading exercises.
function reading(interval) {
    var timer = document.getElementById('timer');

    interval = setInterval(function() {
        duration = reading_duration.subtract(SECOND);
        timer.innerText = duration.format("hh:mm:ss", {trim: false});

        if (duration.asSeconds() <= 0) {
            clearInterval(interval);
            document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
                if (radio.checked == false) {
                    radio.disabled = true;
                }
            });
        }

    }, 1000);
}
