'use strict'
var gMeme
var gText



function setInitialMeme() {
    const canvasInfo = getCanvasInfo()
    gMeme = {
        isMemeDrag: false,
        selectedImgId: null,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'welcome to memeGene you prick',
                size: canvasInfo.gElCanvas.width / 20,
                align: 'start',
                color: 'white',
                font: 'impact',
                pos: { x: 10, y: 50 },
                rotate: (Math.PI)
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


function changeTextAlign(value) {
    const canvasInfo = getCanvasInfo()
    gMeme.lines[gMeme.selectedLineIdx].align = value
    switch (value) {
        case 'start':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 50
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = canvasInfo.gElCanvas.width / 2
            break;
        case 'end':
            gMeme.lines[gMeme.selectedLineIdx].pos.x = canvasInfo.gElCanvas.width - 50
            break;
    }
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
        size: canvasInfo.gElCanvas.width / 20,
        align: 'start',
        color: 'white',
        font: 'impact',
        pos: { x: 10, y: canvasInfo.gElCanvas.height / 2 }
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

function randomizeMeme(idx) {
    if (gMeme.lines.length >= 2) {
        gMeme.lines = [createLine()]
        gMeme.lines[0].pos.y = 50
    }
    const canvasInfo = getCanvasInfo()
    gMeme.selectedImgId = idx
    const amountOfTextLines = getRandomIntExclusive(0, 2)
    const randTxt = gText.splice(getRandomIntExclusive(0, gText.length) - 1, 1)

    gMeme.lines[0].txt = randTxt
    console.log(randTxt)
    if (amountOfTextLines === 1) {
        gMeme.lines.push(createLine())
        gMeme.lines[1].txt = gText.splice(getRandomIntExclusive(0, gText.length) - 1, 1)
        gMeme.lines[1].pos.y = canvasInfo.gElCanvas.height - 30
    }
    setRandText()
}

function setRandText() {
    gText = ['out of all the flavors you choose to be salty!', 'frankley my dear, I dont give a damn', 'troo face', 'I\'m so popular', 'Smell ya later']
}

function setMemeDrag(value) {
    gMeme.isMemeDrag = value
}

function moveMeme(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}


function isMemeClicked(clickedPos) {
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}

function rotateText() {

}