$(document).ready(function(){

    // Indsætter data i carousel
    $.getJSON('https://biler-i-danmark-api.ew.r.appspot.com/storage/get_bets').done(function(data) {
    //$.getJSON('http://localhost:5000/local_get_bets').done(function(data) {
        let i;
        let bets_len = data["all_placed_bets"].length;
        for (i = 0; i < bets_len; i++){
            if (i >= 10) break;  // max 10 carousel elementer
            let entry = data["all_placed_bets"][bets_len - (i + 1) ];  // -1 for at undgå off by one

            const div = document.createElement('div');
            let s = '<p>' + entry["description"] + " "
            s += (entry["result"] === "win") ? '✔' : '️❌';
            s += '</p>';
            div.className = 'carousel-item text-center';
            div.innerHTML = s
            document.getElementById("carousel-inner-id").appendChild(div)  // Tilføj til carousel

        }
        $('.carousel-item').first().addClass('active');
        $('#bet_carousel').carousel();


        // Graph
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data["graph_data"]["total"]["x-axis"],
                datasets: [{
                    label: "Winnings",
                    data: data["graph_data"]["total"]["y-axis"],
                    borderColor:"rgb(72, 200, 106)",
                    //backgroundColor:"rgb(72, 200, 106)",
                    fill:true
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    })
});

/* Grafer! */
// Any of the following formats may be used
//var ctx = document.getElementById('myChart').getContext('2d');
//var ctx = $('#myChart');
//var ctx = 'myChart';
//var Chart = require('chart.js');
//var myChart = new Chart(ctx, {...});
