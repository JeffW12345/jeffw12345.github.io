function eventHandlers() {
    document.getElementById("RESTART").addEventListener("click", function() {
        startGame("RELOAD");
    });
    document.getElementById("UP").addEventListener("click", function() {
        startGame("UP");
    });
    document.getElementById("DOWN").addEventListener("click", function() {
        startGame("DOWN");
    });
    document.getElementById("LEFT").addEventListener("click", function() {
        startGame("LEFT");
    });
    document.getElementById("RIGHT").addEventListener("click", function() {
        startGame("RIGHT");
    });

    // Prevent pinch-zoom on mobile
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
    });
}

eventHandlers();
