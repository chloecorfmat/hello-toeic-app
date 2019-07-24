window.addEventListener('load', lists);

function lists(e) {
    if (document.getElementById('composite-tests') !== null) {
        var options = {
            valueNames: ['name', 'version', 'visibility', 'exercises'],
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

    if (document.getElementById('exercises') !== null) {
        var options = {
            valueNames: ['name', 'part', 'visibility'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('exercises', options);
        listOverride(list);
    }

    if (document.getElementById('explanations') !== null) {
        var options = {
            valueNames: ['title', 'explanation'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('explanations', options);
        listOverride(list);
    }

    if (document.getElementById('parts') !== null) {
        var options = {
            valueNames: ['name', 'version'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('parts', options);
        listOverride(list);
    }

    if (document.getElementById('groups') !== null) {
        var options = {
            valueNames: ['name', 'teacher', 'start', 'end'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('groups', options);
        listOverride(list);
    }

    if (document.getElementById('users') !== null) {
        var options = {
            valueNames: ['matricule', 'user', 'role'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('users', options);
        listOverride(list);
    }

    if (document.getElementById('results-composite-tests') !== null) {
        var options = {
            valueNames: ['date', 'student', 'test', 'score'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('results-composite-tests', options);
        listOverride(list);
    }

    if (document.getElementById('results-exercises') !== null) {
        var options = {
            valueNames: ['date', 'student', 'exercise', 'score'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('results-exercises', options);
        listOverride(list);
    }

    if (document.getElementById('students-lesson') !== null) {
        var options = {
            valueNames: ['student', 'datetime', 'score'],
            page: 30,
            pagination: {
                paginationClass: "pagination",
                outerWindow: 0,
                innerWindow: 2
            }
        };

        var list = new List('students-lesson', options);
        listOverride(list);
    }
}
