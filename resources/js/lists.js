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
