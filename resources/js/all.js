window.addEventListener('load', initialiser);

const DURATION_WRITING = 10;
const DURATION_UNIT = 'seconds';
const SECOND = moment.duration(1, 'seconds');

var listening_duration = moment.duration(DURATION_LISTENING, DURATION_UNIT);

function initialiser(e) {

    if (document.getElementById('profile-tests') !== undefined) {
        var options = {
            valueNames: ['date', 'test', 'student', 'score'],
        };

        new List('profile-tests', options);
    }

    if (document.getElementById('tests') !== undefined) {
        var options = {
            valueNames: ['name', 'version'],
        };

        new List('tests', options);
    }

    if (document.getElementById('games') !== undefined) {
        var options = {
            valueNames: ['date', 'student', 'score'],
        };

        new List('games', options);
    }

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
                    writing(interval);
                }
            }
        });
    }

    document.querySelectorAll("#test .img-preview").forEach(function(el) {
       el.addEventListener('click', function() {
           var i = this.querySelector('img');

           if (i.classList.contains('on-preview')) {
               i.classList.remove('on-preview');
               document.querySelector('.preview').style.backgroundImage = "";
               document.querySelector('.preview').classList.add("hidden");
           } else {

               document.querySelectorAll('.on-preview').forEach(function(on) {
                   on.classList.remove('on-preview');
               });

               i.classList.add('on-preview');
               document.querySelector('.preview').style.backgroundImage = "url(" + i.src + ")";
               document.querySelector('.preview').classList.remove('hidden');
           }
       }, false);
    });

    document.body.addEventListener('click', function(e) {
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
    timer.innerText = listening_duration.format("hh:mm:ss", {trim: false});
}

// Get timer for writing exercises.
function writing(interval) {
    var timer = document.getElementById('timer');
    var duration = moment.duration(DURATION_WRITING, DURATION_UNIT);

    interval = setInterval(function() {
        duration = duration.subtract(SECOND);
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

window.addEventListener('load', function() {
    var toto = JSON.parse(chart_axisY.replace(/&quot;/g,'"'));
    if (document.getElementById('progression') !== null) {
        var ctx = document.getElementById("progression").getContext('2d');
        var data = [];

        var myChart = new Chart(ctx, {
            type: 'line',
            data:
                {
                    labels: JSON.parse("[" + chart_axisX.replace(/&quot;/g,'"') + "]"),
                    datasets: Object.values(JSON.parse(chart_axisY.replace(/&quot;/g,'"')))
                },
            options: {
                title: {
                    display: true,
                    text: 'Progression sur les différents types d\'exercices'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    }
});
