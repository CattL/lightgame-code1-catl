let spieler_muster: Image[] = []
let symbole: Image[] = []
let level_muster: Image[] = []
let level = 0
let maximales_level = 0
let punkte = 0
let sind_muster_gleich = false
input.onPinPressed(TouchPin.P0, function () {
    spieler_muster.push(symbole[0])
})
function level_muster_generieren () {
    level_muster = []
    for (let index = 0; index < 2 + level; index++) {
        level_muster.push(symbole[randint(0, symbole.length - 1)])
    }
}
input.onButtonPressed(Button.A, function () {
    muster_vergleichen()
    if (level != maximales_level) {
        level += 1
        spiele_level()
    } else {
        basic.showString("Punkte:")
        basic.showNumber(punkte)
    }
})
function spiele_level () {
    level_muster_generieren()
    spieler_muster = []
    for (let level_symbol of level_muster) {
        level_symbol.showImage(0)
        basic.pause(1000)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
input.onPinPressed(TouchPin.P2, function () {
    spieler_muster.push(symbole[2])
})
function muster_vergleichen () {
    if (spieler_muster.length == level_muster.length) {
        sind_muster_gleich = true
        for (let index2 = 0; index2 <= level_muster.length - 1; index2++) {
            if (level_muster[index2] != spieler_muster[index2]) {
                sind_muster_gleich = false
            }
        }
        if (sind_muster_gleich) {
            punkte += 1
        }
    }
}
input.onButtonPressed(Button.B, function () {
    starte_spiel()
})
input.onPinPressed(TouchPin.P1, function () {
    spieler_muster.push(symbole[1])
})
function starte_spiel () {
    maximales_level = 2
    punkte = 0
    level = 1
    symbole = [images.iconImage(IconNames.Meh), images.iconImage(IconNames.Rollerskate), images.iconImage(IconNames.Ghost)]
    level_muster = []
    spieler_muster = []
    spiele_level()
}
