'use strict'
var gImgs = []
var imgNumber = 0



function createImg() {
    return { id: makeId(), imgNum: ++imgNumber, url: `imgs/square-imgs/${imgNumber}.jpg`, keywords: ['funny', 'cat'] }
}


function getImgs() {
    if (!gImgs || gImgs.length === 0) {
        for (let i = 0; i < 18; i++) {
            gImgs.push(createImg())
        }

    }
    return gImgs
}