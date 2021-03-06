$(document).ready(function () {

    // Indsætter data i carousel
    $.getJSON('https://biler-i-danmark-api.ew.r.appspot.com/storage/get_bets').done(function (data) {


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
            let td3 = tr.insertCell(2);  // celle på idx 2
            let td4 = tr.insertCell(3);  // celle på idx 3


            let text = document.createTextNode(desc);  // text til celle på idx 0
            let text2 = document.createTextNode(odds);  // text til celle på idx 0
            let text3 = document.createTextNode(date);  // text til celle på idx 0
            //let text4 = document.createTextNode(result);  // text til celle på idx 0
            let span = document.createElement("span");  // text til celle på idx 0
            span.className = (bet["result"] === "win") ? 'badge badge-success' : 'badge badge-danger'
            span.innerText = (bet["result"] === "win") ? "Vundet" : "Tabt"
            //span.style.marginLeft = "1rem"


            td.appendChild(text);  // tilføjer teksten til cellen
            td2.appendChild(text2);  // -||-
            td3.appendChild(text3);  // -||-
            td4.appendChild(span);  // -||-
        }
    })
})

