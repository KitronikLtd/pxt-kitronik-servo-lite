//% weight=100 color=#0fbc11 icon=""
namespace Kitronik {
	
	/************************************************************************************************************************************************
	* micro:bit Servo:Lite / :MOVE mini blocks 
	************************************************************************************************************************************************/
	
    /*some parameters used for controlling the turn and length of the ServoLite board controlled :MOVE mini */
    let MicroSecInASecond = 1000000
    let DistancePerSec = 100
    let NumberOfDegreesPerSec = 200
   
    
    /**
     * Drives forwards. Call stop to stop
     * @param none
     */
	//%subcategory=ServoLite
    //%blockId=kitronik_servolite_servos_forward
    //% block="drive forward" 
    export function forward(): void {
        pins.servoWritePin(AnalogPin.P1, 0);
        pins.servoWritePin(AnalogPin.P2, 180);
    }

    /**
     * Drives backwards. Call stop to stop
     * @param none
     */
	//%subcategory=ServoLite
    //%blockId=kitronik_servolite_servos_backward
    //% block="drive backward" 
    export function backward(): void {
        pins.servoWritePin(AnalogPin.P1, 180);
        pins.servoWritePin(AnalogPin.P2, 0);
    }

    /**
	* Turns left. Call stop to stop
	* @param none
	*/    
	//%subcategory=ServoLite
    //%blockId=kitronik_servolite_servos_left
    //% block="turn left" 
    export function left(): void {
        pins.servoWritePin(AnalogPin.P1, 0);
        pins.servoWritePin(AnalogPin.P2, 0);
    }

	/**
	 * Turns right. Call stop to stop
	 * @param none
	 */
	//%subcategory=ServoLite
	//%blockId=kitronik_servolite_servos_right
    //% block="turn right" 
    export function right(): void {
        pins.servoWritePin(AnalogPin.P1, 180);
        pins.servoWritePin(AnalogPin.P2, 180);
    }

	/**
	 * Stop for 360 servos. 
	 * rather than write 90, which may not stop the servo moving if it is out of trim
	 * this stops sending servo pulses, which has the same effect.
	 * On a normal servo this will stop the servo where it is, rather than return it to neutral position.
	 * It will also not provide any holding force.
     * @param none
     */
	//%subcategory=ServoLite
    //%blockId=kitronik_servolite_servos_stop
    //% block="stop" 
    export function stop(): void {
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.analogWritePin(AnalogPin.P2, 0);
    }

	/**
	 * Sends servos to 'neutral' position. 
	 * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     * @param none
     */
	//%subcategory=ServoLite
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
	//%subcategory=ServoLite
    //% blockId=kitronik_servolite_drive_forwards
    //% block="drive forwards %howFar|distance" 
    export function DriveForwards(howFar: number): void {
        let timeToWait = (howFar * MicroSecInASecond) / DistancePerSec; // calculation done this way round to avoid zero rounding
        forward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Drives backwards the requested distance and then stops
     * @param howFar distance to move
     */
	//%subcategory=ServoLite
    //% blockId=kitronik_servolite_drive_backwards
    //% block="drive backwards %howFar|distance" 
    export function DriveBackwards(howFar: number): void {
        let timeToWait = (howFar * MicroSecInASecond) / DistancePerSec; // calculation done this way round to avoid zero rounding
        backward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Turns right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple turn, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg :how far to turn
     */
	//%subcategory=ServoLite
    //% blockId=kitronik_servolite_turn_right
    //% block="turn right %deg|degrees"
    export function TurnRight(deg: number): void {
        let timeToWait = (deg * MicroSecInASecond) / NumberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
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
     * @param deg :how far to turn
     */
	//%subcategory=ServoLite
    //% blockId=kitronik_servolite_turn_left
    //%block="turn left %deg|degrees"
    export function TurnLeft(deg: number): void {
        let timeToWait = (deg * MicroSecInASecond) / NumberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(AnalogPin.P1, 50);
        pins.servoWritePin(AnalogPin.P2, 50);
        control.waitMicros(timeToWait);
		stop()
    }
	
	/**
     * Allows the setting of the :MOVE mini turn speed.
     * This allows tuning for the turn x degrees commands
     * @param DegPerSec : How many degrees per second the mini does.
     */
	//%subcategory=ServoLite
	//%blockId=kitronik_servolite_set_turn_speed_param
    //% block="calibrate turn speed to %DegPerSec|degrees per second" 
	export function SetDegreesPerSecond(DegPerSec:number): void {
        NumberOfDegreesPerSec = DegPerSec
    }

    /**
     * Allows the setting of the :MOVE mini forward / reverse speed.
     * This allows tuning for the move x distance commands
     * @param DegPerSec : How many degrees per second the mini does.
     */
	//%subcategory=ServoLite
	//%blockId=kitronik_servolite_set_movement_speed_param 
    //% block="calibrate forward speed to %DistPerSec|mm per second"
    export function SetDistancePerSecond(DistPerSec: number): void {
        NumberOfDegreesPerSec = DistPerSec
    }
	
	/************************************************************************************************************************************************
	* micro:bit motor driver blocks 
	************************************************************************************************************************************************/
	/*Note that Forward and reverse are slightly arbitrary, as it depends on how the motor is wired...*/
	export enum eDirection {
	//%blockId=kitronik_motordriver_motor_forward	
    //% block="forward"
    Forward,
	//%blockId=kitronik_motordriver_motor_reverse
    //% block="reverse"
    Reverse
	}
	
	export enum eMotors {
	//%blockId=kitronik_motordriver_motor_one
    //% block="motor 1"
    Motor1,
	//%blockId=kitronik_motordriver_motor_two
    //% block="motor 2"
    Motor2
	}
	
	/**
     * Turns on motor specified by eMotors in the direction specified
     * by eDirection, at the requested speed 
     *
	 * @param motor :which motor to turn on
	 * @param dir   :which direction to go
	 * @param speed :how fast to spin the motor
     */
	//%subcategory=MotorDriver
    //% blockId=kitronik_motordriver_motor_on
    //%block="%motor|on direction %dir|speed %speed"
	//%speed.min=0 speed.max=100
    export function MotorOn(motor: eMotors, dir: eDirection, speed: number ): void {
		/*first convert 0-100 to 0-1024 (approx) We wont worry about the lsat 24 to make life simpler*/
		let OutputVal = speed*10;
		
		switch(motor){
		case eMotors.Motor1: /*Motor 1 uses Pins 8 and 12*/
			switch(dir){
				case eDirection.Forward:
					pins.analogWritePin(AnalogPin.P8, OutputVal);
					pins.digitalWritePin(DigitalPin.P12, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
				break
				case eDirection.Reverse:
					pins.analogWritePin(AnalogPin.P12, OutputVal);
					pins.digitalWritePin(DigitalPin.P8, 0);
				break
			}
		
		break;
		case eMotors.Motor2: /*Motor 2 uses Pins 0 and 16*/
			switch(dir){
				case eDirection.Forward:
					pins.analogWritePin(AnalogPin.P0, OutputVal);
					pins.digitalWritePin(DigitalPin.P16, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
				break
				case eDirection.Reverse:
					pins.analogWritePin(AnalogPin.P16, OutputVal);
					pins.digitalWritePin(DigitalPin.P0, 0);
				break
			}
		
		break;
		}
    }
	/**
     * Turns off the motor specified by eMotors
     * @param motor :which motor to turn off
     */
	//%subcategory=MotorDriver
    //% blockId=kitronik_motordriver_motor_off
    //%block="turn off %motor"
    export function MotorOff(motor: eMotors): void {
		switch(motor){
				case eMotors.Motor1:
					pins.digitalWritePin(DigitalPin.P8, 0);
					pins.digitalWritePin(DigitalPin.P12, 0); 
				break
				case eMotors.Motor2:
					pins.digitalWritePin(DigitalPin.P0, 0);
					pins.digitalWritePin(DigitalPin.P16, 0);
				break
			}
    }
}