window.addEventListener('load', initialiser);

//const DURATION_WRITING = 45*60*1000; // in milliseconds.
const DURATION_WRITING = 20*1000; // in milliseconds.

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



    var interval;
    if (document.getElementById('player') !== null) {
        var audio = document.querySelector('#player audio');
        var tracks = audio.dataset.sources.split(',');
        var i = 1;

        document.getElementById('play').addEventListener('click', function(e) {
            this.removeEventListener('click', arguments.callee);
            document.querySelector('.btn-play').classList.add('btn-play--disabled');
            audio.play();
            interval = setInterval(timer, 1000);
        });

        audio.addEventListener('ended', function () {
            if (i < tracks.length) {
                this.src = tracks[i];
                i++;
                this.play();
            } else {
                clearInterval(interval);
                var audioQuestions = document.querySelectorAll('.fa-volume-up');
                audioQuestions.forEach(function(question) {
                    var radios = question.parentNode.parentNode.querySelectorAll('input[type="radio"]');
                    radios.forEach(function(radio) {
                        radio.disabled = true;
                    });
                });

                writing(interval);
            }
        });
    }
}

function timer() {
    var timer = document.getElementById('timer');
    t = parseInt(timer.innerText) + 1;
    //t = new Date(SECONDS * 1000).toISOString().substr(11, 8);
    timer.innerText = t.toString();
}

function writing(interval) {
    var end;
    var timer;
    var start;
    var current;

    interval = setInterval(function() {
        timer = document.getElementById('timer');
        if (end === undefined) {
            end = new Date(new Date().getTime()+DURATION_WRITING).getTime(); // 45 min.
        }

        start = new Date().getTime();
        current = new Date(end - start);

        if (current.getTime() <= 0) {
            clearInterval(interval);
            document.getElementById('test').submit();
        } else {
            timer.innerText = current.getUTCHours() + ':' + current.getUTCMinutes() + ':' + current.getUTCSeconds();
        }
    }, 1000);
}