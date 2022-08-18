let angle = 90
let da = 5
let k = 0
const colors = [
    0x0f0000,
    0x000f00,
    0x00000f
]
forever(function () {
    modules.kitronikLeds.setPixelColor(k % 5, colors[Math.idiv(k, 5) % colors.length])
    modules.kitronikServo1.setAngle(angle + 90)
    modules.kitronikServo2.setAngle(-angle + 90)

    if (angle > 90)
        da = -5
    else if (angle < -90)
        da = 5
    angle += da
    k++
    pause(100)
})