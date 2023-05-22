# Kitronik blocks for micro:bit

Blocks that support [Kitronik Servo:Lite board for the micro:bit](https://www.kitronik.co.uk/5623-servolite-board-for-move-mini.html)

## ServoLite

* turn around

```blocks
input.onButtonPressed(Button.A, () => {
    kitronik_servo_lite.turnRight(90);
})
```

* go forward

```blocks
input.onButtonPressed(Button.B, () => {
    kitronik_servo_lite.driveForwards(10);
})
```

* stop both motors when pressing ``A+B``

```blocks
input.onButtonPressed(Button.AB, () => {
    kitronik_servo_lite.stop();
})
```

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
