/**
* Provides access to basic micro:bit functionality.
*/
//% weight=5 color=#0fbc11 icon="\uf113" block="Robot"
namespace Robot {

    const CMD_FWD = "do_przod"
    const CMD_LEFT = "w_lewo"
    const CMD_RIGHT = "w_prawo"
    const CMD_STOP = "stop"
    const CMD_EMPTY = "empty"
    const CMD_SETSPEED = "predkosc"
    const CMD_SETSPEEDL = "p_prawy"
    const CMD_SETSPEEDR = "p_lewy"
    const CMD_CHGMTRSPEED = "zmienszy"
    const CMD_CHGGROUP = "grupa"
    const CMD_GETDIST = "odl"
    const CMD_GETLINE = "lsensor"
    const CMD_SETOPT = "set_opt"
    const CMD_GETDURATION = "dczas"

    const ON = true
    const OFF = false

    const MSG_DIST = "odleg"
    const MSG_LINESENSORS = "czlini"

    const RET_DIST = "rodl"
    const RET_LINESENSORS = "rlsens"
    const RET_DURATION = "pczas"
    const RET_END_TIME = "kczas"

    const LS_ACTIVE = 2

    let Distance = 0;
    let LineSensors = 0;
    let LastLSTime = -LS_ACTIVE
    let Duration = - 1
    let DurationRetRecv = false
    

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
        radio.setGroup(NowaGrupa)
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
        let endloop = false
        let loopcount = 0

        Distance = - 1
        radio.sendValue(CMD_GETDIST, 1)
        do {
            basic.pause(1)
            if (Distance < 0) loopcount = loopcount + 1
            else {
                endloop = true
                            }
            if (loopcount > 100) endloop = true

        } while (!endloop)
        return Distance
    }

    function GetLineSensors() {

        if (input.runningTime() - LastLSTime >= LS_ACTIVE) {

            let endloop = false
            let loopcount = 0

            LineSensors = - 1
            radio.sendValue(CMD_GETLINE, 1)
            do {
                basic.pause(1)
                if (LineSensors < 0) loopcount = loopcount + 1
                else {
                    endloop = true
                    LastLSTime = input.runningTime()
                }
                if (loopcount > 100) endloop = true

            } while (!endloop)

        }
    }
    
    /**
    * Odczyt pozostalego czasu pracy silnikow w ms  
    */
    //% block
    //% weight = 10
    export function PozostalyCzas():number {

        if (input.runningTime() - LastLSTime >= LS_ACTIVE) {

            let endloop = false
            let loopcount = 0

            Duration = - 1
            DurationRetRecv = false
            radio.sendValue(CMD_GETDURATION, 1)
            do {
                basic.pause(1)
                if (!DurationRetRecv) loopcount = loopcount + 1
                else {
                    endloop = true
                    LastLSTime = input.runningTime()
                }
                if (loopcount > 100) endloop = true

            } while (!endloop)

        }
        if (Duration > 0 ) return Duration
        else return 0 
    }


    /**
   * Odczyt stanu czujnikow lini wartosci 0,1,10,11  
   */
    //% block 
    //% weight = 10
    export function CzujnikiLini(): number {
        GetLineSensors()
        return LineSensors
    }

    /**
    * Odczyt stanu czujnika lini prawej True - dla białego podłoża  
    */
    //% block 
    //% weight = 10
    export function LiniaPrawa(): boolean {
        GetLineSensors()
        return ((LineSensors % 10) == 1)
    }


    /**
  * Odczyt stanu czujnika lini lewej True - dla białego podłoża  
  */
    //% block 
    //% weight = 10
    export function LiniaLewa(): boolean {
        GetLineSensors()
        return ((LineSensors % 10) == 0)
    }

    /**
 * Odczyt stanu czujnika lini o zadanym numerze  
 */
    //% block 
    //% weight = 15
    //% CzujnikNo.min=1 CzujnikNo.max=5
    export function StanLini(CzujnikNo: number = 1): number {
        GetLineSensors()
        if (CzujnikNo < 6) return Math.idiv(LineSensors, Math.pow(10, CzujnikNo - 1)) % 10
        else return 0
    }

    radio.onReceivedValue(function (msg: string, value: number) {
        if (msg == MSG_DIST) Distance = value
        if (msg == RET_DIST) Distance = value
        if (msg == MSG_LINESENSORS) LineSensors = value
        if (msg == RET_LINESENSORS) LineSensors = value
        if (msg == RET_DURATION) {
            Duration = value
            DurationRetRecv = true
        }    
    })

}


