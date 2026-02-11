// WhatsApp Integration
document.getElementById('sendBtn').addEventListener('click', function() {
    const name = document.getElementById('userName').value;
    const msg = document.getElementById('userMsg').value;
    const phone = "917440737602";

    if (!name || !msg) {
        alert("Please fill in both fields.");
        return;
    }

    const text = encodeURIComponent(`Hi Akash, I'm ${name}. ${msg}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
});

// QR Code Auto-Generation
window.onload = function() {
    const qrImg = document.getElementById('qrCode');
    const currentUrl = window.location.href;
    
    // We use the Google Chart API for reliability
    qrImg.src = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(currentUrl)}&chs=300x300&choe=UTF-8&chld=L|2`;
};