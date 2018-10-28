/**
 * Provides access to basic micro:bit functionality.
 */
//% color=190 weight=100 icon="\uf1ec" block="Robot"
namespace robot {

    const CMD_EMPTY = "empty"
    const CMD_FWD = "do_przodu"
    const CMD_LEFT = "w_lewo"
    const CMD_RIGHT = "w_prawo"
    const CMD_STOP = "stop"
    const CMD_SETSPEED = "predkosc"
    const CMD_SETSPEEDL = "p_prawy"
    const CMD_SETSPEEDR = "p_lewy"

    const MSG_DIST = "odleglosc"
    const MSG_LINESENSORS = "czlini"

    
    //% block    
    export function DoPrzodu(CzasTrwania: number) {
        radio.sendValue(CMD_FWD, CzasTrwania)
    }
    //% block
    export function WLewo(CzasTrwania: number) {
        radio.sendValue(CMD_LEFT, CzasTrwania)
    }
    //% block
    export function WPrawo(CzasTrwania: number) {
        radio.sendValue(CMD_RIGHT, CzasTrwania)
    }
    //% block
    export function Predkosc(Predkosc: number) {
        radio.sendValue(CMD_SETSPEED, Predkosc)
    }
    //% block
    export function PredkoscPrawy(Predkosc: number) {
        radio.sendValue(CMD_SETSPEEDR, Predkosc)
    }
    //% block
    export function PredkoscLewy(Predkosc: number) {
        radio.sendValue(CMD_SETSPEEDL, Predkosc)
    }
    //% block
    export function Stop() {
        radio.sendValue(CMD_STOP, 0)
    }

})


} 