document.getElementById('sendBtn').addEventListener('click', function() {
    const name = document.getElementById('userName').value;
    const msg = document.getElementById('userMsg').value;
    const phone = "917440737602"; // Your verified contact from resume

    if (!name || !msg) {
        alert("Please provide both your name and a message.");
        return;
    }

    const text = encodeURIComponent(`Hi Akash, I'm ${name}. ${msg}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
});
