/**
 * Blocks for driving the Kitronik Servo:Lite Board
 */
//% weight=100 color=#00A654 icon="\uf1b9" block="Servo:Lite"
namespace kitronik_servo_lite {

	/************************************************************************************************************************************************
	* micro:bit Servo:Lite / :MOVE mini blocks
	************************************************************************************************************************************************/

    /*some parameters used for controlling the turn and length of the ServoLite board controlled :MOVE mini */
    const microSecInASecond = 1000000
    let distancePerSec = 100
    let numberOfDegreesPerSec = 200
    let movementSpeed = 1
    let turnSpeed = 1

    /**
     * Drives forwards. Call stop to stop
     */
    //% blockId=kitronik_servolite_servos_forward
    //% block="drive forward"
    export function forward(): void {
        let speed = Math.round(90 * movementSpeed);
        pins.servoWritePin(AnalogPin.P1, 90 - speed);
        pins.servoWritePin(AnalogPin.P2, 90 + speed);
    }

    /**
     * Drives backwards. Call stop to stop
     */
    //% blockId=kitronik_servolite_servos_backward
    //% block="drive backward"
    export function backward(): void {
        let speed = Math.round(90 * movementSpeed);
        pins.servoWritePin(AnalogPin.P1, 90 + speed);
        pins.servoWritePin(AnalogPin.P2, 90 - speed);
    }

    /**
	* Turns left. Call stop to stop
	*/
    //% blockId=kitronik_servolite_servos_left
    //% block="turn left"
    export function left(): void {
        let speed = Math.round(90 - 90 * turnSpeed);
        pins.servoWritePin(AnalogPin.P1, speed);
        pins.servoWritePin(AnalogPin.P2, speed);
    }

	/**
	 * Turns right. Call ``stop`` to stop
	 */
    //% blockId=kitronik_servolite_servos_right
    //% block="turn right"
    export function right(): void {
        let speed = Math.round(90 + 90 * turnSpeed);
        pins.servoWritePin(AnalogPin.P1, speed);
        pins.servoWritePin(AnalogPin.P2, speed);
    }

	/**
	 * Stop for 360 servos.
	 * rather than write 90, which may not stop the servo moving if it is out of trim
	 * this stops sending servo pulses, which has the same effect.
	 * On a normal servo this will stop the servo where it is, rather than return it to neutral position.
	 * It will also not provide any holding force.
     */
    //% blockId=kitronik_servolite_servos_stop
    //% block="stop"
    export function stop(): void {
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.analogWritePin(AnalogPin.P2, 0);
    }

	/**
	 * Sends servos to 'neutral' position.
	 * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     */
    //% blockId=kitronik_servolite_servos_neutral
    //% block="goto neutral position"
    export function neutral(): void {
        pins.servoWritePin(AnalogPin.P1, 90);
        pins.servoWritePin(AnalogPin.P2, 90);
    }

    /**
     * Drives forwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=kitronik_servolite_drive_forwards
    //% block="drive forwards %howFar|distance" 
    export function driveForwards(howFar: number): void {
        let timeToWait = (howFar * microSecInASecond) / distancePerSec * (1 / movementSpeed); // calculation done this way round to avoid zero rounding
        forward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Drives backwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=kitronik_servolite_drive_backwards
    //% block="drive backwards %howFar|distance" 
    export function driveBackwards(howFar: number): void {
        let timeToWait = (howFar * microSecInASecond) / distancePerSec * (1 / movementSpeed); // calculation done this way round to avoid zero rounding
        backward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Turns right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple turn, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg how far to turn, eg: 90
     */
    //% blockId=kitronik_servolite_turn_right
    //% block="turn right %deg|degrees"
    export function turnRight(deg: number): void {
        let timeToWait = (deg * microSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P1, 130);
        pins.servoWritePin(AnalogPin.P2, 130);
        control.waitMicros(timeToWait);
        stop();
    }

    /**
    * Turns left through the requested degrees and then stops
    * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
    * a simple turn, wait, stop method.
    * Runs the servos at slower than the right function to reduce wheel slip
    * @param deg how far to turn, eg: 90
    */
    //% blockId=kitronik_servolite_turn_left
    //% block="turn left %deg|degrees"
    export function turnLeft(deg: number): void {
        let timeToWait = (deg * microSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P1, 50);
        pins.servoWritePin(AnalogPin.P2, 50);
        control.waitMicros(timeToWait);
        stop()
    }

	/**
     * Allows the setting of the :MOVE mini turn degrees per second.
     * This allows tuning for the turn x degrees commands
     * @param degPerSec : How many degrees per second the mini does.
     */
    //% blockId=kitronik_servolite_set_turn_speed_param
    //% block="calibrate turn amount to %degPerSec|degrees per second"
    export function setDegreesPerSecond(degPerSec: number): void {
        numberOfDegreesPerSec = degPerSec
    }

    /**
     * Allows the setting of the :MOVE mini distance per second.
     * This allows tuning for the move x distance commands
     * Only measure this when the move speed is 100%.
     * @param distPerSec : How many mm per second the mini moves.
     */
    //% blockId=kitronik_servolite_set_movement_speed_param
    //% block="calibrate movement amount to %distPerSec|mm per second"
    export function setDistancePerSecond(distPerSec: number): void {
        distancePerSec = distPerSec
    }

    /**
     * Allows the setting of the :MOVE mini turn speed.
     * Does not affect the turn x degrees commands.
     * @param percent : Speed percentage from 1% to 100%.
     */
    //% blockId=kitronik_servolite_set_turn_speed_percent
    //% block="set turn speed to %percent|percent"
    export function setTurnSpeed(percent: number): void {
        turnSpeed = percent / 100
    }

    /**
     * Allows the setting of the :MOVE mini movement speed.
     * @param percent : Speed percentage from 1% to 100%.
     */
    //% blockId=kitronik_servolite_set_movement_speed_percent
    //% block="set movement speed to %percent|percent"
    export function setMovementSpeed(percent: number): void {
        movementSpeed = percent / 100
    }
}