const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numberOfStars = Math.floor((canvas.width + canvas.height) / 15); // Aumentato per più stelle

// Funzione per verificare la distanza dalle stelle esistenti
function isTooClose(newStar) {
    for (const star of stars) {
        const dx = newStar.x - star.x;
        const dy = newStar.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 30) { // Distanza minima tra le stelle
            return true; // Se la nuova stella è troppo vicina a una esistente
        }
    }
    return false; // Altrimenti è abbastanza lontana
}

// Creazione delle stelle
while (stars.length < numberOfStars) {
    const newStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5, // Raggio delle stelle
        brightness: Math.random() < 0.3 ? Math.random() * 4 + 1 : Math.random() * 2 + 0.5, // 30% delle stelle più luminose
        speed: Math.random() * 0.1 + 0.05,  // Velocità ridotta delle stelle
        direction: Math.random() * 2 * Math.PI // Direzione casuale
    };

    if (!isTooClose(newStar)) {
        stars.push(newStar); // Aggiungi la stella solo se non è troppo vicina
    }
}

// Funzione per disegnare le stelle
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach((star, index) => {
        // Creazione di un gradiente
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * star.brightness);
        
        // Colori più scuri e opachi
        if (index % 2 === 0) {
            gradient.addColorStop(0, 'rgba(150, 0, 0, 1)'); // Rosso scuro opaco
            gradient.addColorStop(1, 'rgba(150, 0, 0, 0.5)'); // Sfumatura rossa più scura
        } else {
            gradient.addColorStop(0, 'rgba(0, 150, 150, 1)'); // Celeste scuro opaco
            gradient.addColorStop(1, 'rgba(0, 150, 150, 0.5)'); // Sfumatura celeste più scura
        }

        ctx.beginPath();
        ctx.fillStyle = gradient; // Usa il gradiente come colore
        ctx.arc(star.x, star.y, star.radius * star.brightness, 0, Math.PI * 2); // Raggio della stella basato sulla luminosità
        ctx.fill();

        // Aggiorna la posizione della stella
        star.x += Math.cos(star.direction) * star.speed;
        star.y += Math.sin(star.direction) * star.speed;

        // Cambia la direzione se la stella esce dai bordi
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
            star.direction = Math.random() * 2 * Math.PI; // Nuova direzione casuale
        }
    });

    // Limita il numero di linee da disegnare
    const maxLines = Math.floor(numberOfStars / 3); // Numero massimo di linee
    const drawnLines = new Set(); // Usato per evitare linee duplicate

    stars.forEach((star, i) => {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = star.x - stars[j].x;
            const dy = star.y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Disegna una linea se la distanza è inferiore a un certo valore e il numero di linee è inferiore al massimo
            if (distance < 150 && drawnLines.size < maxLines) {
                drawnLines.add(`${i}-${j}`); // Aggiungi una identificazione unica per la linea
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(stars[j].x, stars[j].y);
                
                // Alterna i colori delle linee tra rosso e celeste
                ctx.strokeStyle = (i % 2 === 0) ? 'rgba(150, 0, 0, 0.8)' : 'rgba(0, 150, 150, 0.8)';
                
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(drawStars);
}

// Assicurati che il canvas si ridimensioni con la finestra
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = []; // Resetta le stelle
    const numberOfStars = Math.floor((canvas.width + canvas.height) / 15); // Recalcola le stelle
    // Rivedere il processo di creazione delle stelle
    while (stars.length < numberOfStars) {
        const newStar = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            brightness: Math.random() < 0.3 ? Math.random() * 4 + 1 : Math.random() * 2 + 0.5, // Luminosità
            speed: Math.random() * 0.1 + 0.05,
            direction: Math.random() * 2 * Math.PI
        };

        if (!isTooClose(newStar)) {
            stars.push(newStar);
        }
    }
});

// Inizializza l'animazione
drawStars();