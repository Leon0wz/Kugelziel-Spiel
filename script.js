// Holen Sie eine Referenz auf das Ziel- und Kugel-Element
const ziel = document.getElementById('ziel');
const kugel = document.getElementById('kugel');
const button = document.getElementById('neustarten');
const MOVEMENT_SPEED = 240; // Anzahl der Frames für die Animation, erhöhen oder verringern um die Geschwindigkeit anzupassen


// Funktion, um die Position eines Elements zufällig innerhalb des sichtbaren Bereichs zu setzen
function setRandomPosition(element, speed = 0) {
    const maxX = window.innerWidth - element.clientWidth;
    const maxY = window.innerHeight - element.clientHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    if (speed) {
        const currentX = parseFloat(element.style.left || 0);
        const currentY = parseFloat(element.style.top || 0);
        const deltaX = (randomX - currentX) / speed;
        const deltaY = (randomY - currentY) / speed;

        let frame = 0;
        const animate = () => {
            if (frame < speed) {
                element.style.left = (currentX + deltaX * frame) + 'px';
                element.style.top = (currentY + deltaY * frame) + 'px';
                frame++;
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    } else {
        element.style.left = randomX + 'px';
        element.style.top = randomY + 'px';
    }
}

function getRandomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function moveTargetRandomly(target) {
    setRandomPosition(target, MOVEMENT_SPEED);


    const randomInterval = getRandomInterval(300, 1000);
    setTimeout(() => moveTargetRandomly(target), randomInterval);
}




// Zufällige Positionen für das Ziel und die Kugel festlegen
setRandomPosition(kugel);
moveTargetRandomly(ziel);



// Event-Listener für die Kugel, um auf Mausklicks und -bewegungen zu reagieren
kugel.addEventListener('mousedown', () => {
    // Mausbewegungen verfolgen, um die Kugel zu bewegen
    document.addEventListener('mousemove', moveKugel);

    // Maustaste loslassen, um das Bewegen der Kugel zu beenden
    document.addEventListener('mouseup', stopMovingKugel);
});

button.addEventListener('click', restart)

// Funktion zum Bewegen der Kugel basierend auf der Mausposition
function moveKugel(event) {
    kugel.style.left = event.clientX - kugel.clientWidth / 2 + 'px';
    kugel.style.top = event.clientY - kugel.clientHeight / 2 + 'px';
}

// Funktion, um das Bewegen der Kugel zu beenden
function stopMovingKugel() {
    // Event-Listener für Mausbewegungen und Maustaste loslassen entfernen
    document.removeEventListener('mousemove', moveKugel);
    document.removeEventListener('mouseup', stopMovingKugel);

    // Die Positionen der Kugel und des Ziels überprüfen, um festzustellen, ob die Kugel das Ziel getroffen hat
    const kugelRect = kugel.getBoundingClientRect();
    const zielRect = ziel.getBoundingClientRect();

    if (
        kugelRect.left >= zielRect.left &&
        kugelRect.right <= zielRect.right &&
        kugelRect.top >= zielRect.top &&
        kugelRect.bottom <= zielRect.bottom
    ) {
        // Wenn die Kugel das Ziel getroffen hat, wird eine Gewinnmeldung angezeigt
        alert('Gewonnen!');

        // Das Ziel und die Kugel auf neue zufällige Positionen verschieben
        button.style.display = 'inline'
    }
}

function restart() {
    setRandomPosition(ziel);
    setRandomPosition(kugel);
    button.style.display = 'none'
}
