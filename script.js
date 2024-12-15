const symbols = ['A','S','D','F','J','K','L']; 
let currentSymbol = '';
let score = 0;

// Funkce pro zobrazení nového náhodného symbolu
function showNewSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  currentSymbol = symbols[randomIndex];
  document.getElementById('current-symbol').textContent = currentSymbol;
  document.getElementById('message').textContent = '';
}

// Obsluha stisku klávesy
document.addEventListener('keydown', (e) => {
  const pressedKey = e.key.toUpperCase();
  if (pressedKey === currentSymbol) {
    score++;
    document.getElementById('message').textContent = 'Správně!';
    document.getElementById('message').style.color = 'green';
  } else {
    score--;
    document.getElementById('message').textContent = 'Špatně!';
    document.getElementById('message').style.color = 'red';
  }
  document.getElementById('score').textContent = score;
  showNewSymbol();
});

// První symbol při startu
showNewSymbol();
