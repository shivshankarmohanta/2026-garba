function onScanSuccess(decodedText) {
    let ticket = localStorage.getItem(decodedText);
    if (ticket) {
        let data = JSON.parse(ticket);
        document.getElementById("result").innerHTML =
            `<p>✅ Verified: ${data.name}, Phone: ${data.phone}</p>`;
        localStorage.removeItem(decodedText); // Prevent reuse
    } else {
        document.getElementById("result").innerHTML = "<p>❌ Invalid or already used ticket</p>";
    }
}

function onScanFailure(error) {
    console.warn(`Scan error: ${error}`);
}

let html5QrCode = new Html5Qrcode("reader");
html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, onScanSuccess, onScanFailure);

