input.onButtonPressed(Button.A, () => {
Kitronik.MotorOn(Kitronik.eMotors.Motor1, Kitronik.eDirection.Forward, 100);
Kitronik.MotorOn(Kitronik.eMotors.Motor2, Kitronik.eDirection.Reverse, 100);
})
input.onButtonPressed(Button.B, () => {
Kitronik.MotorOn(Kitronik.eMotors.Motor1, Kitronik.eDirection.Reverse, 100);
Kitronik.MotorOn(Kitronik.eMotors.Motor2, Kitronik.eDirection.Forward, 100);
})

input.onButtonPressed(Button.AB, () => {
Kitronik.MotorOff(Kitronik.eMotors.Motor1);
Kitronik.MotorOff(Kitronik.eMotors.Motor2);
})
