function eventHandlers() {
  document.getElementById("RESTART").addEventListener("click", () => startGame("RELOAD"));
  document.getElementById("UP").addEventListener("click", () => startGame("UP"));
  document.getElementById("DOWN").addEventListener("click", () => startGame("DOWN"));
  document.getElementById("LEFT").addEventListener("click", () => startGame("LEFT"));
  document.getElementById("RIGHT").addEventListener("click", () => startGame("RIGHT"));

  document.addEventListener('gestureend', e => {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });
}
eventHandlers();
