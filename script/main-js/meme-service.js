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
                align: 'center',
                color: 'white',
                font: 'impact',
                pos: { x: 10, y: 50 }
            },
            {
                txt: 'EnterTxt',
                size: 30,
                align: 'left',
                color: 'white',
                font: 'impact',
                pos: { x: 10, y: 400 }
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

function setNewImgTexts() {
    gMeme.lines.forEach(line =>
        line.txt = 'Enter text'
    )
}

function SetTextColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function setFontSize(diff) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (diff + currLine.size < 0 || diff + gMeme.lines.size > 50) return
    currLine.size += diff
}

function switchLines() {
    const currLine = gMeme.selectedLineIdx
    if (currLine + 1 > gMeme.lines.length - 1) {
        currLine = 0
    } else {
        currLine++
    }
}

function changeFontFamily(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}


function changeTextALign(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}

function moveTextVertical(diff) {
    const canvasInfo = getCanvasInfo()
    const currLine = gMeme.selectedLineIdx

    if (gMeme.lines[currLine].pos.y + diff > canvasInfo.gElCanvas.height) return
    if (gMeme.lines[currLine].pos.y + diff < 0) return
    gMeme.lines[currLine].pos.y += diff
}

function addLine() {
    gMeme.lines.push(createLine())
}

function createLine() {
    const canvasInfo = getCanvasInfo()
    const line = {
        txt: 'Enter text',
        size: 30,
        align: 'center',
        color: 'white',
        font: 'impact',
        pos: { x: 10, y: canvasInfo.gElCanvas.height / 2 }
    }
    return line
}
