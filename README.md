# Kitronik blocks for micro:bit

Blocks that support [Kitronik Servo:Lite board for the micro:bit](https://www.kitronik.co.uk/5623)

## ServoLite

* turn around ``A``
```blocks
input.onButtonPressed(Button.A, function () {
    kitronik_servo_lite.turnRight(90)
})
```

* go forward ``B``
```blocks
input.onButtonPressed(Button.B, function () {
    kitronik_servo_lite.driveForwards(10)
})
```

* stop both motors when pressing ``A+B``
```blocks
input.onButtonPressed(Button.AB, function () {
    kitronik_servo_lite.stop()
})
```

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
