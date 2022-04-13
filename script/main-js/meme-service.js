'use strict'
var gMeme
function setInitialMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'welcome to memeGene you prick',
                size: 20,
                align: 'left',
                color: 'red'
            }
        ]
    }
}


function getMeme() {
    return gMeme
}


function setLineTxt(value) {
    gMeme.lines[0].txt = value
}
