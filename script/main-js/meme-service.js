'use strict'
var gMeme



function setInitialMeme() {
    const canvasInfo = getCanvasInfo()
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'welcome to memeGene you prick',
                size: 20,
                align: 'start',
                color: 'white',
                font: 'impact',
                pos: { x: 80, y: 50 }
            }
            // {
            //     txt: 'EnterTxt',
            //     size: 20,
            //     align: 'start',
            //     color: 'white',
            //     font: 'impact',
            //     pos: { x: 80, y: canvasInfo.gElCanvas.height - 50 }
            // }
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
    if (diff + gMeme.lines[gMeme.selectedLineIdx].size < 0 || diff + gMeme.lines.size > 50) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function switchLines() {
    const currLine = gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx + 1 > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function changeFontFamily(value) {
    console.log('hh')
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
        align: 'start',
        color: 'white',
        font: 'impact',
        pos: { x: 80, y: canvasInfo.gElCanvas.height / 2 }
    }
    return line
}
function deleteLine() {
    console.log('hh')
    const currLine = gMeme.selectedLineIdx
    gMeme.lines.splice(currLine, 1)
    gMeme.selectedLineIdx = 0
}

function getLineById(id) {
    var line = gMeme.lines.find(book => book.id === id)
    return line
}

function getLineIdx(id) {
    var requestedLineIdx = gMeme.lines.findIndex(line => line.id === id)
    return requestedLineIdx
}


