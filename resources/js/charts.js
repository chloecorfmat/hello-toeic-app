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
