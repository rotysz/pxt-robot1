Robot.DoPrzodu(0)/**
 * Provides access to basic micro:bit functionality.
 */
//% weight=5 color=#0fbc11 icon="\uf113" block="Robot"
namespace Robot {

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

    let Distance = 0;
    let LineSensors = 0;

    /**
    * Uruchomienie silników na zadany czas
    * @param CzasTrwania  [0-60000] czas trwania w milisekundach 
    */
    //% block
    //% weight = 100
    //% CzasTrawnia.min=0 CzasTrwania.max=60000    
    export function DoPrzodu(CzasTrwania: number) {
        radio.sendValue(CMD_FWD, CzasTrwania)
    }
    /**
    * Jazda w lewo przez zadany czas
    * @param CzasTrwania  [0-60000] czas trwania w milisekundach 
    */
    //% block
    //% CzasTrawnia.min=0 CzasTrwania.max=60000
    export function WLewo(CzasTrwania: number) {
        radio.sendValue(CMD_LEFT, CzasTrwania)
    }
    /**
    * Jazda w prawo przez zadany czas
    * @param CzasTrwania  [0-60000] czas trwania w milisekundach 
    */
    //% block
    //% CzasTrawnia.min=0 CzasTrwania.max=60000
    export function WPrawo(CzasTrwania: number) {
        radio.sendValue(CMD_RIGHT, CzasTrwania)
    }
    /**
    * Ustawienie predkosci na zadana predkosc bez uruchomienia silnikow
    * @param Predkosc  [-255-255] predkosc wartosci dodatnie w przod ujemne w tyl 
    */
    //% block
    //% weight = 100
    //% Predkosc.min=-255 Predkosc.max=255
    export function Predkosc(Predkosc: number) {
        radio.sendValue(CMD_SETSPEED, Predkosc)
    }
    /**
    * Ustawienie predkosci na zadana predkosc bez uruchomienia silnikow
    * @param Predkosc  [-255-255] predkosc wartosci dodatnie w przod ujemne w tyl 
    */
    //% block
    //% Predkosc.min=-255 Predkosc.max=255
    export function PredkoscPrawy(Predkosc: number) {
        radio.sendValue(CMD_SETSPEEDR, Predkosc)
    }
    /**
    * Ustawienie predkosci na zadana predkosc bez uruchomienia silnikow
    * @param Predkosc  [-255-255] predkosc wartosci dodatnie w przod ujemne w tyl 
    */
    //% block
    //% Predkosc.min=-255 Predkosc.max=255
    export function PredkoscLewy(Predkosc: number) {
        radio.sendValue(CMD_SETSPEEDL, Predkosc)
    }
    //% block
    export function Stop() {
        radio.sendValue(CMD_STOP, 0)
    }
    /**
    * Odczyt odleglosci z czujnika ultradzwiekowego w cm
    * @param Odleglosc w cm 
    */
    //% block="%Odleglosc|number"
    //% weight = 10
    export function Odleglosc(): number {
        return Distance
    }


    //% block ="%CzujnikiLini|number"
    //% weight = 10
    export function CzujnikiLini(): number {
        return LineSensors
    }

    radio.onReceivedValue(function (msg: string, value: number) {
        if (msg == MSG_DIST) Distance = value
        if (msg == MSG_LINESENSORS) LineSensors = value
        basic.pause(10)
    })

}


