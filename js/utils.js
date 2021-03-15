host = "https://biler-i-danmark-api.ew.r.appspot.com"
//host = "http://localhost:5000"

function login() {
    let form = new FormData(document.getElementById("form_login"));
    let email = form.get("email");
    let password = form.get("password");
    let error_element = document.getElementById("sign_in_text")

    if (!valid_email(email)){
        error_handler(error_element, "Ugyldig email. <br>Prøv igen")
        return
    }

    $.post(host + "/login", {email: email, password: password}, function (data) {
        let jwt = data["jwt"]
        window.localStorage.setItem("jwt", jwt)
        document.getElementById("nav_logout").hidden = false
        document.getElementById("nav_login").hidden = true
        document.location = "main.html"
    })
        .fail(function () {
            console.log("Failed!")
            error_handler(error_element, "Forkert brugernavn eller password.<br>Prøv igen")
        })
}


function logout() {
    window.localStorage.removeItem("jwt")
    window.location.reload()
    document.getElementById("nav_logout").hidden = true
    document.getElementById("nav_login").hidden = false
}


function create_user() {
    let form = new FormData(document.getElementById("form_create_user"));
    let email1 = form.get("email1");
    let email2 = form.get("email2");
    let password1 = form.get("password1");
    let password2 = form.get("password2");

    let error_text_ref = document.getElementById("create_user_text")

    if (email1.length === 0 || email2.length === 0 || password1.length === 0 || password2.length === 0){
        error_handler(error_text_ref, "Udfyld alle felter")
        return
    }

    if (email1 !== email2){
        error_handler(error_text_ref, "Emails er ikke ens")
        return
    }

    if (!valid_email(email1)){
        error_handler(error_text_ref, "Ugyldig email. <br>Prøv igen")
        return
    }

    if (password1 !== password2){
        error_handler(error_text_ref, "Passwords er ikke ens")
        return
    }

    $.post(host + "/create_user", {email: email1, password: password1}, function (data) {
        //document.getElementById("nav_logout").hidden = false
        //document.getElementById("nav_login").hidden = true
        //document.location = "main.html"
        error_text_ref.style.color = "#19aa8d"
        console.log(data)
        error_text_ref.innerText = data["Message"]

    })
        .fail(function () {
            console.log("Failed!")
            error_handler(error_text_ref, "En bruger med det denne email adresse eksisterer allerede")  // Brug fejlen fra serveren?
        })
}

function reset_password() {
    let error_text_ref = document.getElementById("new_password_text")
    let form = new FormData(document.getElementById("form_reset_password"));
    let email = form.get("email");
    let password1 = form.get("password1");
    let password2 = form.get("password2");


    if (email.length === 0|| password1.length === 0 || password2.length === 0){
        error_handler(error_text_ref, "Udfyld alle felter")
        return
    }

    if (!valid_email(email)){
        error_handler(error_text_ref, "Ugyldig email. <br>Prøv igen")
        return
    }

    if (password1 !== password2){
        error_handler(error_text_ref, "Passwords er ikke ens")
        return
    }

    $.post(host + "/change_password", {email: email, password: password1}, function (data) {
        error_text_ref.style.color = "#19aa8d"
        console.log(data)
        error_text_ref.innerText = data["Message"]
        console.log("Password reset requested")

    })
        .fail(function (e) {
            console.log("Failed!")
            console.log(e)
            error_handler(error_text_ref, e.responseText)  // Brug fejlen fra serveren?
        })
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
        var ctx = document.getElementById('full_overview_chart');
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
                },
                responsive: true,
                maintainAspectRatio: false,
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
    let urlParams1 = new URLSearchParams(window.location.search);
    console.log(urlParams1)
    console.log(urlParams1.get("invoice"))

    jwt = window.localStorage.getItem("jwt")
    // Ikke logget ind
    if (jwt == null) {
        document.getElementById("must_login_message").hidden = false
        console.log("not logged in")
        // TODO: vis error message
    } else {
        $.ajax({
            headers: {
                "Authorization": "Bearer " + jwt,
                "invoice_id": urlParams1.get("invoice")
            },
            dataType: "json",
            url: host + "/storage/get_upcoming_bets",
            success: function (upcoming_bets) {
                document.getElementById("incoming_bets_outer_div").hidden = false
                let bets = upcoming_bets
                let table_ref = document.getElementById("table-incoming-bets").getElementsByTagName('tbody')[0];

                let current_date = new Date("2010-1-1")  // Bare det er en dato før 2021 egentlig.. :)
                len = bets.length
                for (let i = 0; i < len; i++) {
                    bet = bets[i]

                    if (new Date(bet["date"]) > current_date) {
                        bet["bet_multiplicator"] = 1337
                        // Add new header row with only a date. Saves space on screen.. :)
                        console.log("Added new date header")
                        console.log(bet["date"])

                        current_date = new Date(bet["date"])

                        let tr = table_ref.insertRow();  // row
                        let th = document.createElement("td") // header
                        th.setAttribute("colspan", "3")

                        let d = document.createElement("div")
                        d.className = "d-flex justify-content-center"
                        d.style = "margin-bottom: -1rem; font-size: 1.5rem;"

                        let p = document.createElement("p")
                        p.className = "badge badge-info badge-pill"
                        p.style = "text-align: center;"
                        p.innerHTML = "Odds d. " + bet["date"]

                        tr.appendChild(th)
                        th.appendChild(d)
                        d.appendChild(p)
                    }

                    let desc = bet["description"].split("odds")[0];  // hacky
                    let odds = bet["bet_multiplicator"];
                    //let date = bet["date"];
                    let league = bet["league"];

                    let tr = table_ref.insertRow();  // row
                    let td = tr.insertCell(0);  // celle på idx 0

                    let td2 = tr.insertCell(1);  // celle på idx 1
                    td2.style = "color: #1d5aaf; font-size: 1.5rem; font-weight:700"
                    //let td3 = tr.insertCell(2);
                    let td4 = tr.insertCell(2);


                    let text = document.createTextNode(desc);  // text til celle på idx 0
                    let text2 = document.createTextNode(odds);  // text til celle på idx 0
                    //let text3 = document.createTextNode(date);  // text til celle på idx 0
                    let text4 = document.createTextNode(league);  // text til celle på idx 0

                    //let span_date = document.createElement("span");  // text til celle på idx 0
                    //span_date.className = 'badge badge-info badge-pill'
                    //span_date.innerText = date

                    let span_league = document.createElement("span");  // text til celle på idx 0
                    span_league.className = 'badge badge-info badge-pill'
                    span_league.innerText = league

                    td.appendChild(text);  // tilføjer teksten til cellen
                    td2.appendChild(text2);  // -||-
                    //td3.appendChild(span_date);  // -||-
                    td4.appendChild(span_league);  // -||-
                }
            },
            error: function (error){
                // Brugere behøver kun vide, at der mangler betaling. Alle fejlbeskederne udelader vi for dem... for deres skyld
                document.getElementById("must_pay_message").hidden = false
                console.log(error.responseText)
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


function error_handler(error_element, error_text) {
    // Sort magi til at genstarte en animation :)
    error_element.classList.remove("error-message");
    void error_element.offsetWidth;
    error_element.classList.add("error-message");

    error_element.innerHTML = error_text
    error_element.style.color = "#dc3545"

    error_element.style.animationPlayState = "running"
}


function valid_email(email){
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}


function get_charge_session(){
    $.ajax({
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("jwt")
        },
        dataType: "text",
        url: host + "/create_charge_session",
        success: function (payment_url) {
            console.log(payment_url)
            document.location = payment_url
        },
        error: function (error){
            // Brugere behøver kun vide, at der mangler betaling. Alle fejlbeskederne udelader vi for dem... for deres skyld
            //document.getElementById("must_pay_message").hidden = false
            console.log(error.responseText)
        }
    })
}

function go_to_payment(){
}
