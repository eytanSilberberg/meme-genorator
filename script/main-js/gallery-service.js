'use strict'
var gImgs = []
var imgNumber = 0



function createImg() {
    return { id: 1, url: `imgs/square-imgs/${++imgNumber}.jpg`, keywords: ['funny', 'cat'] }
}


function getImgs() {
    if (!gImgs || gImgs.length === 0) {
        gImgs = [createImg(), createImg()]
    }
    return gImgs
}