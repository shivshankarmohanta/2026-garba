document.getElementById("ticketForm").addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let ticketData = { name, phone, ticketId: Date.now() };

  // Send to Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbzYNXbofPBIgSthu4UCI0CIcApU-g5Esu02otGZExXzE9EbwWb81R8KGAuMhvWziKMmAg/exec", {
    method: "POST",
    body: JSON.stringify(ticketData)
  });

  // Generate QR
  let qrContainer = document.getElementById("ticket");
  qrContainer.innerHTML = "";
  QRCode.toCanvas(ticketData.ticketId.toString(), { width: 200 }, function (err, canvas) {
    if (err) throw err;
    qrContainer.appendChild(canvas);
  });

  qrContainer.innerHTML += `<p>🎟 Ticket booked for ${name}</p>`;
});
