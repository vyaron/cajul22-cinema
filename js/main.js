'use strict'

// TODO: Render the cinema (7x15 with middle path)
// TODO: implement the Seat selection flow
// TODO: Popup shows the seat identier - e.g.: 3-5 or 7-15
// TODO: Popup should contain seat price (for now 4$ to all) 
// TODO: allow booking the seat ('S', 'X', 'B')
// TODO: Uplift your model - each seat should have its own price... 
// TODO FOR YOU: in seat details, show available seats around 
// TODO: Upload to GitHub Pages

var gElSelectedSeat = null
const gCinema = createCinema()
renderCinema()

function createCinema() {
    const cinema = []
    for (var i = 0; i < 7; i++) {
        cinema[i] = []
        for (var j = 0; j < 15; j++) {
            const cell = {
                isSeat : (j !== 7)
            }
            if (cell.isSeat) {
                cell.price = 4 + i
                cell.isBooked = false
            }
            cinema[i][j] = cell
        }
    }
    cinema[3][3].isBooked = true
    return cinema
}

function renderCinema() {
    var strHTML = ''
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`
        for (var j = 0; j < gCinema[0].length; j++) {
            const cell = gCinema[i][j]

            // add a seat title 
            const cellTitle = `Cell: ${i}, ${j}`
            // for cell of type SEAT add seat class
            // for cell that is booked add booked class
            var className = (cell.isSeat)? 'seat' : ''
            className += (cell.isBooked)? ' booked' : ''
            
            strHTML += `\t<td class="cell ${className}" 
                            title="${cellTitle}" 
                            onclick="cellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    const elSeats = document.querySelector('.cinema-seats')
    elSeats.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    const cell = gCinema[i][j]
    
    // Ignore none seats and booked
    if (!cell.isSeat || cell.isBooked) return
    console.log('Cell clicked: ', elCell, i, j)

    // Only a single seat should be selected
    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }
    
    // Support Unselecting a seat
    gElSelectedSeat = (gElSelectedSeat !== elCell)? elCell : null

    // When seat is selected a popup is shown
    if (gElSelectedSeat) {
        gElSelectedSeat.classList.add('selected')
        showSeatDetails({i:i, j:j})
    } 
}

function showSeatDetails(pos) {
    const elPopup = document.querySelector('.popup')
    const seat = gCinema[pos.i][pos.j]
    elPopup.querySelector('h2 span').innerText = `${pos.i}-${pos.j}`
    elPopup.querySelector('h3 span').innerText = `$${seat.price}`
    
    // update the <button> dataset
    const elBtn = elPopup.querySelector('button')
    elBtn.dataset.i = pos.i
    elBtn.dataset.j = pos.j
    elPopup.hidden = false
}

function hideSeatDetails() {
    document.querySelector('.popup').hidden = true
}

function bookSeat(elBtn) {
    console.log('Booking seat, button: ', elBtn)
    const i = +elBtn.dataset.i
    const j = +elBtn.dataset.j
    
    // book the seat
    gCinema[i][j].isBooked = true
    renderCinema()
    
    unSelectSeat()
}

function unSelectSeat() {
    gElSelectedSeat.classList.remove('selected')
    gElSelectedSeat = null
    hideSeatDetails()
}