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
                        if (radio.checked == false) {
                            radio.disabled = true;
                        }
                    });
                });

                writing(interval);
            }
        });
    }

    //
    document.querySelectorAll("#test .documents img").forEach(function(el) {
        /**el.addEventListener('mouseenter', function (e) {
            if (!el.classList.contains('on-preview')) {
                el.classList.add('on-preview');
            }

            document.querySelector('.preview').style.backgroundImage = "url(" + el.src + ")";
            document.querySelector('.preview').classList.remove('hidden');

            //el.removeEventListener('mouseenter', arguments.callee);
        });

        el.addEventListener('mouseleave', function(e) {
            document.querySelector('.preview').style.backgroundImage = "";
            document.querySelector('.preview').classList.add('hidden');

            document.querySelectorAll('.on-preview').forEach(function(el) {
                el.classList.remove('on-preview');
            });
        }, false);

        document.querySelector('.preview').addEventListener('mouseleave', function(e) {
            document.querySelector('.preview').style.backgroundImage = "";
            document.querySelector('.preview').classList.add('hidden');

            document.querySelectorAll('.on-preview').forEach(function(el) {
                el.classList.remove('on-preview');
            });
        }, false);**/
    });

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
        if (event.target.closest('.preview')) return;
        if (event.target.closest('.img-preview')) return;

        if (!document.querySelector('.preview').classList.contains('hidden')) {
            document.querySelectorAll('.on-preview').forEach(function (el) {
                el.classList.remove('on-preview');
            });

            document.querySelector('.preview').style.backgroundImage = "";
            document.querySelector('.preview').classList.add('hidden');
        }
    }, false);
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
        } else {
            timer.innerText = current.getUTCHours() + ':' + current.getUTCMinutes() + ':' + current.getUTCSeconds();
        }
    }, 1000);
}
