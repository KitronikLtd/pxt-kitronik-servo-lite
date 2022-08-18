namespace modules {
    /**
    *   5 LEDs on the Kitornik SERVO:LITE
    */
    //% fixedInstance whenUsed block="kitronik leds"
    export const kitronikLeds = new LedClient("kitronik leds?dev=self&variant=Stick&num_pixels=5")

    /**
     * Kitornik SERVO:LITE servo connector 1
     */
    //% fixedInstance whenUsed block="kitronik servo 1"
    export const kitronikServo1 = new ServoClient("kitronik servo 1?dev=self&srvo=0")

    /**
     * Kitornik SERVO:LITE servo connector 1
     */
    //% fixedInstance whenUsed block="kitronik servo 2"
    export const kitronikServo2 = new ServoClient("kitronik servo 2?dev=self&srvo=1")
}

namespace servers {
    function start() {
        jacdac.productIdentifier = 0x3b532d5f
        jacdac.deviceDescription = "Kitronik SERVO:LITE"
        jacdac.startSelfServers(() => {
            pins.digitalWritePin(DigitalPin.P0, 0)
            const servers = [
                new jacdac.LedServer(5, jacdac.LedPixelLayout.RgbGrb, (p, b) => light.sendWS2812BufferWithBrightness(p, DigitalPin.P0, b)),
                new jacdac.ServoServer(AnalogPin.P1, { instanceName: "S1" }),
                new jacdac.ServoServer(AnalogPin.P2, { instanceName: "S2" })
            ]
            return servers
        })
    }
    start()
}