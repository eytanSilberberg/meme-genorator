'use strict'
var gMeme
function setInitialMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'welcome to memeGene you prick',
                size: 30,
                align: 'left',
                color: 'white',
                font: 'impact'
            },
            {
                txt: 'EnterTxt',
                size: 30,
                align: 'left',
                color: 'white',
                font: 'impact'
            }
        ]
    }
}


function getMeme() {
    return gMeme
}


function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value

}

function SetTextColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function setFontSize(diff) {
    if (diff + gMeme.lines[gMeme.selectedLineIdx].size < 0 || diff + gMeme.lines.size > 50) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function switchLines() {
    if (gMeme.selectedLineIdx + 1 > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}
