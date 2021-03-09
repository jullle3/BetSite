host = "https://biler-i-danmark-api.ew.r.appspot.com"

function login() {
    let form = new FormData(document.getElementById("form_login"));
    let email = form.get("email");
    let password = form.get("password");

    $.post(host + "/login", {email: email, password: password}, function (data) {
        let jwt = data["jwt"]
        window.localStorage.setItem("jwt", jwt)
        document.getElementById("nav_logout").hidden = false
        document.getElementById("nav_login").hidden = true
        document.location = "main.html"
    })
        .fail(function () {
            console.log("Failed!")
            let e = document.getElementById("sign_in_text")
            e.innerHTML = "Forkert brugernavn eller password.<br> Prøv igen"
            e.style = "color: #dc3545"
        })
}


function logout() {
    window.localStorage.removeItem("jwt")
    window.location.reload()
    document.getElementById("nav_logout").hidden = true
    document.getElementById("nav_login").hidden = false
}


function create_user() {
}


function load_index_data() {

    // Indsætter data i carousel
    $.getJSON(host + '/storage/get_bets').done(function (data) {
        let i;
        let bets_len = data["all_placed_bets"].length;
        for (i = 0; i < bets_len; i++) {
            if (i >= 10) break;  // max 10 carousel elementer
            let entry = data["all_placed_bets"][bets_len - (i + 1)];  // -1 for at undgå off by one

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
                    borderColor: "rgb(72, 200, 106)",
                    //backgroundColor:"rgb(72, 200, 106)",
                    fill: true
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

        // Replace tekst for winnings
        ele = document.getElementById("index_jumbo1")
        ele.innerText = ele.innerText.replace("N/A", data["total_winnings"] + "%")

        ele = document.getElementById("index_jumbo2")
        ele.innerText = ele.innerText.replace("N/A", data["total_winnings"] + "%")

        ele = document.getElementById("index_historic_profit")
        ele.innerText = ele.innerText.replace("N/A", data["total_winnings"])

        console.log("replaced")
    })
}


function load_main_data() {
    jwt = window.localStorage.getItem("jwt")
    // Ikke logget ind
    if (jwt == null) {
        document.getElementById("must_login_message").hidden = false
        console.log("not logged in")
        // TODO: vis error message
    } else {
        $.ajax({
            headers: {
                "Authorization": "Bearer " + jwt
            },
            dataType: "json",
            url: host + "/storage/get_upcoming_bets",
            success: function (upcoming_bets) {
                document.getElementById("incoming_bets_outer_div").hidden = false
                let bets = upcoming_bets
                let table_ref = document.getElementById("table-incoming-bets").getElementsByTagName('tbody')[0];

                len = bets.length
                for (let i = 0; i < len; i++) {

                    //bet = bets[len - (i + 1)]
                    bet = bets[i]
                    let desc = bet["description"].split("odds")[0];  // hacky
                    let odds = bet["bet_multiplicator"];
                    let date = bet["date"];
                    let league = bet["league"];

                    let tr = table_ref.insertRow();  // row
                    let td = tr.insertCell(0);  // celle på idx 0
                    let td2 = tr.insertCell(1);  // celle på idx 1
                    td2.style = "color: #1d5aaf; font-size: 1.5rem; font-weight:700"
                    let td3 = tr.insertCell(2);  // celle på idx 2
                    let td4 = tr.insertCell(3);  // celle på idx 3


                    let text = document.createTextNode(desc);  // text til celle på idx 0
                    let text2 = document.createTextNode(odds);  // text til celle på idx 0
                    let text3 = document.createTextNode(date);  // text til celle på idx 0
                    let text4 = document.createTextNode(league);  // text til celle på idx 0

                    let span_date = document.createElement("span");  // text til celle på idx 0
                    span_date.className = 'badge badge-info badge-pill'
                    span_date.innerText = date

                    let span_league = document.createElement("span");  // text til celle på idx 0
                    span_league.className = 'badge badge-info badge-pill'
                    span_league.innerText = league

                    td.appendChild(text);  // tilføjer teksten til cellen
                    td2.appendChild(text2);  // -||-
                    td3.appendChild(span_date);  // -||-
                    td4.appendChild(span_league);  // -||-
                }
            }
        });
    }
}


function load_history_data() {
    $.getJSON( host + '/storage/get_bets').done(function (data) {


        bets = data["all_placed_bets"]
        let table_ref = document.getElementById("table-history").getElementsByTagName('tbody')[0];

        len = bets.length
        for (let i = 0; i < len; i++){

            bet = bets[len - (i + 1)]
            let desc = bet["description"].split("odds")[0];  // hacky
            let odds = bet["bet_multiplicator"];
            let date = bet["date"];

            let tr = table_ref.insertRow();  // row
            let td = tr.insertCell(0);  // celle på idx 0
            let td2 = tr.insertCell(1);  // celle på idx 1
            td2.style = "color: #1d5aaf; font-size: 1.5rem; font-weight:700"
            let td3 = tr.insertCell(2);  // celle på idx 2
            let td4 = tr.insertCell(3);  // celle på idx 3


            let text = document.createTextNode(desc);  // text til celle på idx 0
            let text2 = document.createTextNode(odds);  // text til celle på idx 0
            let text3 = document.createTextNode(date);  // text til celle på idx 0
            //let text4 = document.createTextNode(result);  // text til celle på idx 0

            let span_date = document.createElement("span");  // text til celle på idx 0
            span_date.className = 'badge badge-secondary badge-pill'
            span_date.innerText = date

            let span_result = document.createElement("span");  // text til celle på idx 0
            span_result.className = (bet["result"] === "win") ? 'badge badge-success badge-pill' : 'badge badge-danger badge-pill'
            span_result.innerText = (bet["result"] === "win") ? "Vundet" : "Tabt"

            //span.style.marginLeft = "1rem"


            td.appendChild(text);  // tilføjer teksten til cellen
            td2.appendChild(text2);  // -||-
            td3.appendChild(span_date);  // -||-
            td4.appendChild(span_result);  // -||-
        }
    })
}

