'use strict'
var gMeme
var gElCanvas
var gCtx
var elImg
function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    elImg = document.querySelector('.starting-img')
    renderGallery()

    setInitialMeme()
    const meme = getMeme()
    const { selectedImgId } = meme
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { pos } = meme.lines[meme.selectedLineIdx]


    renderMeme(txt, selectedImgId, pos.x, pos.y)

}
function renderMeme(txt, picNum, posX, posY) {
    const meme = getMeme()

    elImg.src = `imgs/square-imgs/${picNum}.jpg`
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    saveAndRestoreExample()
    drawRect(txt, posX, posY)


}



function drawImgFromLocal() {
    // gCtx.beginPath()
    var img = new Image()
    img.src = 'imgs/square-imgs/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}



function onSetLineTxt(value) {
    const meme = getMeme()
    setLineTxt(value)
    clearCanvas
    const { selectedImgId } = meme
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { pos } = meme.lines[meme.selectedLineIdx]
    renderMeme(txt, selectedImgId, pos.x, pos.y)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-wrapper')
    var imgs = getImgs()
    var strHTML = imgs.map(img => `
    <img onclick="onSelectImg('${img.id}')" class="gallery-img" src="${img.url} "alt="">`
    )
    elGallery.innerHTML = strHTML.join('')

}


function onSelectImg(idNum) {

    var imgs = getImgs()
    var requestedImg = imgs.find(img => img.id === idNum)
    const { imgNum } = requestedImg
    elImg.src = requestedImg.url
    clearCanvas()
    setLineTxt('enterTxt')
    const meme = getMeme()

    meme.selectedImgId = imgNum

    const { pos } = meme.lines[meme.selectedLineIdx]
    renderMeme('EnterTxt', imgNum, pos.x, pos.y)
}

function onSetTextColor(value) {
    SetTextColor(value)

    const meme = getMeme()
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { pos } = meme.lines[meme.selectedLineIdx]
    const { selectedImgId } = meme

    renderMeme(txt, selectedImgId, pos.x, pos.y)


}

function onSetFontSize(diff) {
    setFontSize(diff)
    const meme = getMeme()
    const { selectedImgId } = meme
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { pos } = meme.lines[meme.selectedLineIdx]

    renderMeme(txt, selectedImgId, pos.x, pos.y)
}

function onSwitchLines() {
    switchLines()
    const meme = getMeme()
    const { selectedImgId } = meme
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { pos } = meme.lines[meme.selectedLineIdx]
    clearCanvas()
    renderMeme(txt, selectedImgId, pos.x, pos.y)


}

function saveAndRestoreExample() {
    const meme = getMeme()

    const fontTxt1 = meme.lines[0].txt
    const fontStyle1 = meme.lines[0].font
    const fontSize1 = meme.lines[0].size
    const fontColor1 = meme.lines[0].color
    const fontAlign1 = meme.lines[0].color
    const x1 = meme.lines[0].pos.x
    const y1 = meme.lines[0].pos.y

    const fontTxt2 = meme.lines[1].txt
    const fontStyle2 = meme.lines[1].font
    const fontSize2 = meme.lines[1].size
    const fontColor2 = meme.lines[1].color
    const fontAlign2 = meme.lines[1].align
    const x2 = meme.lines[1].pos.x
    const y2 = meme.lines[1].pos.y

    gCtx.font = `${fontSize1}px ${fontStyle1}`;

    gCtx.fillStyle = `${fontColor1}`;
    gCtx.fillText(fontTxt1, x1, y1);
    gCtx.strokeText(`${fontTxt1}`, x1, y1);
    gCtx.save();

    gCtx.font = `${fontSize2}px ${fontStyle2}`;
    gCtx.fillStyle = `${fontColor2}`;
    gCtx.fillText(`${fontTxt2}`, x2, y2);
    gCtx.strokeText(`${fontTxt2}`, x2, y2);
}

function drawRect(txt, x, y) {

    const textWidth = gCtx.measureText(txt).width
    gCtx.rect(x, y + 5, textWidth, 3);
    gCtx.fillStyle = 'white';
    gCtx.fillRect(x, y + 5, textWidth, 3);

}





// function drawText(txt, x, y, color, fontSize) {
//     // gCtx.beginPath()

//     gCtx.lineWidth = 1;
//     gCtx.textBaseline = 'middle';
//     gCtx.textAlign = 'start';
//     gCtx.fillStyle = color;
//     gCtx.font = `${fontSize}px impact`;
//     gCtx.fillText(txt, x, y);
//     gCtx.strokeStyle = 'black';
//     gCtx.strokeText(txt, x, y);
// }