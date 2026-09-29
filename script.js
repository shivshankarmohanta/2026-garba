document.getElementById("ticketForm").addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let ticketData = { name, phone, ticketId: Date.now() };

  // Send to Google Sheet via Apps Script Web App
  fetch("https://script.google.com/macros/s/AKfycbzz6jUiyrXbmGzQUGDo5pawTAPfn6CHczoFwq6h0JIW_ujz_6puiOa_jzmA1XRL15jtHw/exec", {
    method: "POST",
    body: JSON.stringify(ticketData)
  });

  // Generate QR for ticket
  let qrContainer = document.getElementById("ticket");
  qrContainer.innerHTML = "";
  QRCode.toCanvas(ticketData.ticketId.toString(), { width: 200 }, function (err, canvas) {
    if (err) throw err;
    qrContainer.appendChild(canvas);
  });

  qrContainer.innerHTML += `<p>🎟 Ticket booked for ${name}</p>`;
});
