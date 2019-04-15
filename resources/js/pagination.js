window.addEventListener('load', pagination);

function pagination(e) {

    displayButtonPrevNext();

    document.querySelectorAll('.pagination li').forEach(function(li) {
        li.addEventListener('click', displayButtonPrevNext);
    });

    document.getElementById('js-pagination-prev').addEventListener('click', function() {
       var lis = document.querySelectorAll('.pagination li');

       lis.forEach(function(li, pos) {
           if (li.classList.contains('active')) {
               var p = pos-1;

               if (p >= 0) {
                   lis[p].click();
               }
           }
       });

        displayButtonPrevNext();
    });

    document.getElementById('js-pagination-next').addEventListener('click', function() {
        var lis = document.querySelectorAll('.pagination li');

        lis.forEach(function(li, pos) {
            if (li.classList.contains('active')) {
                var p = pos+1;
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

    lis.forEach(function(li) {
        li.addEventListener('click', displayButtonPrevNext);
    });
}
