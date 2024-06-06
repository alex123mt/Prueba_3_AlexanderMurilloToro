const cardFlight = document.getElementById('row');

fetch('http://localhost:4500/flights')
    .then(res => res.json())
    .then(flights => {
        flights.forEach(flight => {
            const tableData = `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="../assets/background1.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title"><strong>Flight number: </strong> ${flight.flightNumber}</h5>
                    <p class="card-text"><strong>origin: </strong> ${flight.origin}</p>
                    <p class="card-text"><strong>destination: </strong>${flight.destination} </p>
                    <p class="card-text"><strong>capacity: </strong>${flight.capacity}</p>
                    <p class="card-text"><strong>reservedseats: </strong>${flight.reservedSeats}</p>
                    <a href="#" class="btn btn-primary">reservations:</a>
                </div>
            </div>
        </div>
            `;

            cardFlight.innerHTML += tableData;
        });
    })
