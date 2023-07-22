var gameStarted = false
var gameEnded = false
var startTime = 0
var endTime = 0
function start() {
    $("body").keydown(function space(event) {
        if (event.which == 32 && !gameStarted) {
            stopwatch(1,0);
            gameStarted = true;
        }
    })
}
document.addEventListener('keyup', function(e) {
    if (e.which === 32 && gameStarted && !gameEnded) {
        moveRacer()
    }
    else if (e.which == 82 && gameEnded) {
        gameStarted = false
        gameEnded = false
        startTime = 0
        endTime = 0
        $("#alert_placeholder").html('<div id="alert_placeholder"></div>')
        var racer = document.getElementById("racer");
        racer.style.left = 0 + 'px'
        start()
    }
})
function moveRacer() {
    var meter = $(document).width() / 100;
    var racer = document.getElementById("racer");
    var currLeft = racer.style.left;
    racer.style.left = parseInt(currLeft) + meter + 'px';
    stopwatch(0,0)
    var right = parseInt(racer.style.left) + parseInt(racer.style.width)
    if (right >= window.innerWidth) {
        stopwatch(0,1)
        gameOver()
    }
}
function stopwatch(start,end) {
    if (start == 1) {
        startTime = Date.now()
    }
    else if (end == 1) {
        endTime = Date.now()
    }
    var currTime = Date.now()
    $("#time").text((currTime-startTime) / 1000)
    
    if (startTime != 0 && endTime != 0) {
        var completionTime = (endTime - startTime) / 1000
        $("#time").text(completionTime)
    }
}
function gameOver() {
    $("#alert_placeholder").html('<div class="alert alert-danger" \
        role="alert"> Well done! Press "r" to restart. Click <a href="trophy.html" \
        class="alert-link">here</a> to view your prize.</div>')
    gameEnded = true
}
