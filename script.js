document.getElementById("ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let ticketData = { name, phone, id: Date.now() };

    // Save ticket to localStorage (can be replaced with DB later)
    localStorage.setItem(ticketData.id, JSON.stringify(ticketData));

    // Generate QR
    let qrContainer = document.getElementById("ticket");
    qrContainer.innerHTML = "";
    QRCode.toCanvas(ticketData.id.toString(), { width: 200 }, function (err, canvas) {
        if (err) throw err;
        qrContainer.appendChild(canvas);
    });

    qrContainer.innerHTML += `<p>🎟 Ticket booked for ${name}</p>`;
});
