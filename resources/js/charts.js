window.addEventListener('load', function() {
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

    if (document.getElementById('challenges') !== null) {
        var ctx = document.getElementById("challenges").getContext('2d');
        var data = [];

        var myChart = new Chart(ctx, {
            type: 'line',
            data:
                {
                    labels: JSON.parse("[" + chart_axisX.replace(/&quot;/g,'"') + "]"),
                    datasets: [{
                        'label' : 'Challenges',
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
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
});
