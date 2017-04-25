// go right 90 degrees
input.onButtonPressed(Button.A, () => {
    kitronik.turnRight(90);
})
// go forward 10
input.onButtonPressed(Button.B, () => {
    kitronik.driveForwards(10);
})
// stop
input.onButtonPressed(Button.AB, () => {
    kitronik.stop
})

