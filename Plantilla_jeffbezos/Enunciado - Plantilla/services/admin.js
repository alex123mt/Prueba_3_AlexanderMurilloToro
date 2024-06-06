const flightForm = document.getElementById('flightForm');

flightForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const flightNumber = document.getElementById('flightNumber').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const capacity = document.getElementById('capacity').value;
    const reservedSeats = document.getElementById('reservedSeats').value;
    const image = document.getElementById('image').value;

    
    const flightData = {
        flightNumber,
        origin,
        destination,
        capacity,
        reservedSeats,
        image
    };

    
    fetch('http://localhost:4500/flights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(flightData)
    })
        .then(response => response.json()) // Handle response (optional)
        .catch(error => console.error('Error creating flight:', error)); // Handle errors
});

const table = document.getElementById('tabledata');


fetch('http://localhost:4500/flights')
    .then(res => res.json())
    .then(flights => {
        flights.forEach(flight => {
            const tableData = `
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">flightNumber</th>
                    <th scope="col">origin</th>
                    <th scope="col">destination</th>
                    <th scope="col">capacity</th>
                    <th scope="col">reservedSeats</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${flight.id}</td>
                    <td>${flight.flightNumber}</td>
                    <td>${flight.origin}</td>
                    <td>${flight.destination}</td>
                    <td>${flight.capacity}</td>
                    <td>${flight.reservedSeats}</td>
                    <td>
                        <button onclick="deleted(event)" data-id="${flight.id}" class="btn btn-danger">delete</button>
                        <button onclick="edit()" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            edit
                        </button>
                    </td>
                </tr>
            </tbody>
            </table>
            `;

            table.innerHTML += tableData;
        });
    })
    .catch(error => console.error('Error fetching flights:', error));  

function deleted(event) {
    const id = parseInt(event.target.dataset.id);

    fetch(`http://localhost:4500/flights/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            event.target.parentNode.remove(); 
        })
        .catch(error => console.error('Error deleting flight:', error));  
}

function edit(flightData) {
    const id = flightData.id; 
  
    fetch(`http://localhost:4500/flights/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flightData)
    })
      .then(response => {
        if (response.ok) {
          const flightRow = document.querySelector(`[data-id="${id}"]`).parentNode.parentNode;
          flightRow.querySelector('flightNumber2').textContent = flightData.flightNumber;
          flightRow.querySelector('origin2').textContent = flightData.origin;
          flightRow.querySelector('destination2').textContent = flightData.destination;
          flightRow.querySelector('capacity2').textContent = flightData.capacity;
          flightRow.querySelector('reservedSeats2').textContent = flightData.reservedSeats;
        } else {
          console.error('Error updating flight:', response.statusText);
        }
      })
      .catch(error => console.error('Error editing flight:', error));
  }
