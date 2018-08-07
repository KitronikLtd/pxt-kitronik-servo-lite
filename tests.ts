// go right 90 degrees
input.onButtonPressed(Button.A, () => {
    kitronik_servo_lite.turnRight(90);
})
// go forward 10
input.onButtonPressed(Button.B, () => {
    kitronik_servo_lite.driveForwards(10);
})
// stop
input.onButtonPressed(Button.AB, () => {
    kitronik_servo_lite.stop
})

