$(document).ready(function(){

    // Indsætter data i carousel
    $.getJSON('https://biler-i-danmark-api.ew.r.appspot.com/storage/get_bets').done(function(data) {
    //$.getJSON('http://localhost:5000/local_get_bets').done(function(data) {
        let i;
        let bets_len = data["all_placed_bets"].length;
        for (i = 0; i < bets_len; i++){
            if (i >= 10) break;  // max 10 carousel elementer
            let entry = data["all_placed_bets"][bets_len - (i + 1) ];  // -1 for at undgå off by one

            let text_element = document.createElement("h5")
            text_element.innerText = entry["description"]

            const span = document.createElement("span")
            span.className = (entry["result"] === "win") ? 'badge badge-success' : 'badge badge-danger'
            span.innerText = (entry["result"] === "win") ? "Vundet" : "Tabt"
            span.style.marginLeft = "1rem"
            text_element.appendChild(span)

            const carousel_element = document.createElement('div');
            carousel_element.className = 'carousel-item text-center';
            carousel_element.appendChild(text_element)
            document.getElementById("carousel-inner-id").appendChild(carousel_element)  // Tilføj til carousel
        }
        $('.carousel-item').first().addClass('active');
        $('#bet_carousel').carousel();


        // Graph
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data["graph_data"]["total"]["x-axis"],
                datasets: [{
                    label: "Profit ved indskud af 100 kr",
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

