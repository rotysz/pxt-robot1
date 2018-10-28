/**
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
    const CMD_CHGMTRSPEED = "zmienszybk"
    const CMD_CHGGROUP = "grupa"

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
    //% CzasTrwania.min=0 CzasTrwania.max=60000
    export function DoPrzodu(CzasTrwania: number) {
        radio.sendValue(CMD_FWD, CzasTrwania)
    }

    /**
    * Jazda w lewo przez zadany czas
    * @param CzasTrwania  [0-60000] czas trwania w milisekundach 
    */
    //% block
    //% CzasTrwania.min=0 CzasTrwania.max=60000
    export function WLewo(CzasTrwania: number) {
        radio.sendValue(CMD_LEFT, CzasTrwania)
    }

    /**
    * Jazda w prawo przez zadany czas
    * @param CzasTrwania  [0-60000] czas trwania w milisekundach 
    */
    //% block
    //% CzasTrwania.min=0 CzasTrwania.max=60000
    export function WPrawo(CzasTrwania: number) {
        radio.sendValue(CMD_RIGHT, CzasTrwania)
    }

    /**
    * Ustawienie predkosci na zadana predkosc bez uruchomienia silnikow
    * @param Predkosc [-255-255] predkosc wartosci dodatnie w przod ujemne w tyl 
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

    /**
    * Zmiana predkosci na zadana predkosc w czasie ruchu 
    * @param PredkoscLewy [-255-255] predkosc wartosci dodatnie w przod ujemne w tyl 
    * @param PredkoscPrawy [-255-255] predkosc wartosci dodatnie w przod ujemne w tyl
    */
    //% block
    //% PredkoscLewy.min=-255 PredkoscLewy.max=255
    //% PredkoscPrawy.min=-255 PredkoscPrawy.max=255
    export function ZmienPredkosc(PredkoscLewy: number, PredkoscPrawy: number) {
        let EncodedValue: number = (PredkoscLewy + 256) * 512 + (PredkoscPrawy + 256)
        radio.sendValue(CMD_CHGMTRSPEED, EncodedValue)
    }

    /**
    * Zmiana Grupy radiowej na nowa na 60 sekund
    * @param NowaGrupa  [0-255] Nowa grupa radiowa 
    */
    //% block
    //% NowaGrupa.min=0 NowaGrupa.max=255
    export function ZmianaRadioGroup(NowaGrupa: number) {
        radio.sendValue(CMD_CHGGROUP, NowaGrupa)
    }

    //% block
    export function Stop() {
        radio.sendValue(CMD_STOP, 0)
    }

    /**
    * Odczyt odleglosci z czujnika ultradzwiekowego w cm  
    */
    //% block
    //% weight = 10
    export function Odleglosc(): number {
        return Distance
    }

    /**
   * Odczyt stanu czujnikow lini wartosci 0,1,10,11  
   */
    //% block 
    //% weight = 10
    export function CzujnikiLini(): number {
        return LineSensors
    }

    radio.onReceivedValue(function (msg: string, value: number) {
        if (msg == MSG_DIST) Distance = value
        if (msg == MSG_LINESENSORS) LineSensors = value
    })

}


