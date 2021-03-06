function populateAccordion() {
    // Opfylder accordion med data, som viser kommende odds

    $.getJSON('https://biler-i-danmark-api.ew.r.appspot.com/storage/get_upcoming_bets').done(function (upcoming_bets) {
        //$.getJSON('http://localhost:5000/storage/get_upcoming_bets').done(function(upcoming_bets) {
        let i;
        let upcoming_bets_count = upcoming_bets.length
        for (i = 0; i < upcoming_bets_count; i++) {
            const bet = upcoming_bets[i]
            const card = document.createElement("div")
            card.className = "card"
            if (i % 2 === 0) {
                card.style = "background-color: rgba(0,0,0,.00)"
            } else {
                card.style = " background-color: rgba(0,0,0,.05)"
            }

            // Create Card Header
            const card_header = document.createElement("div")
            card_header.className = "card-header text-center"
            //card_header.setAttribute("id", "headingTest")

            const text = document.createElement("h5")
            text.className = "mb-0 text-center"

            const button = document.createElement("button")
            button.className = "btn"
            button.setAttribute("data-toggle", "collapse")
            button.setAttribute("data-target", "#num-" + i.toString())
            button.innerHTML = bet["description"]

            const span = document.createElement("span")
            span.className = "badge badge-info"
            span.innerHTML = bet["date"]

            // Byg card-header hierarki
            card.appendChild(card_header)
            card_header.appendChild(text)
            text.appendChild(button)
            text.appendChild(span)

            // Create Card Body
            const collapse = document.createElement("div")
            collapse.className = "collapse"
            collapse.setAttribute("id", "num-" + i.toString())

            const card_body = document.createElement("div")
            card_body.className = "card-body"
            card_body.innerHTML = "<div> Dato: " + bet["date"] + "</div>" + "<div>Link til bookmaker: " + "<a href='https://nordicbet.dk/betting/esports/'>https://nordicbet.dk/betting/esports/</a></div>"

            // Byg card-collapse hierarki samt tilføj til card
            card.appendChild(collapse)
            collapse.appendChild(card_body)
            document.getElementById("accordion").appendChild(card)  // Tilføj til accordion list view

            console.log("added one")
        }
    })
}
