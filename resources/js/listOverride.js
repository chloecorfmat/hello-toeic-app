function listOverride(list) {

    list.search(document.querySelector('.search').value);
    emptySearch(list);
    displayButtonPrevNext();

    list.on('searchComplete', function() {
        displayButtonPrevNext();
        emptySearch(list);
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

        lis.forEach(function(li) {
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

        console.log(list.listContainer.querySelector('.table-container'));
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
