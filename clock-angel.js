let H = 12
let M = 60

function* clockGen(hours, minuts) {
    let step = 360/minuts - 360/hours/minuts
    var accumulator = 0

    function* hourGen() {
        for(let m = 0; m < minuts; m++){
            var result = accumulator % 360
            if (result > 180) result = 360 - result
            accumulator += step
            yield result
        }
    }

    for (let h = 0; h < hours; h++){
        yield [...hourGen()]
    }
}

let clock = [...clockGen(H, M)]

function draw(hour, minut) {
    let R = 50 //radius
    let P = 75 //center point

    var canvas = document.getElementById("clock");
    var ctx = canvas.getContext("2d");

    function drawLine(angel, length) {
        ctx.save()
        ctx.moveTo(0, 0)
        ctx.rotate(angel * Math.PI / 180)
        ctx.lineTo(0, -length)
        ctx.restore()
    }

    //clear
    ctx.clearRect(0, 0, P+R, P+R)
    ctx.save()
    ctx.translate(P, P)

    //circle
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, 2 * Math.PI);
    
    //minuts
    drawLine(360 / M * minut, 50)
    
    //hours
    drawLine(360 / H * hour + 360 / H / M * minut, 30)
   
    //draw
    ctx.stroke()
    ctx.restore()
}

function onButtonClick() {
    let h = parseInt(document.getElementById("h").value) % 12
    let m = parseInt(document.getElementById("m").value) % 60
    document.getElementById("result").innerText = clock[h][m]
    draw(h, m)
}
