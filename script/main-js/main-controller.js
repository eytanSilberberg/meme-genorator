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
    const { color } = meme.lines[meme.selectedLineIdx]
    const { size } = meme.lines[meme.selectedLineIdx]
    // gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    renderMeme(txt, selectedImgId, color, size)

    // drawText(txt, 20, 50)
}
function renderMeme(txt, picNum, color, size) {
    elImg.src = `imgs/square-imgs/${picNum}.jpg`
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    saveAndRestoreExample()
    // drawText(txt, 30, 30, color, size)
}

// function renderMeme(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }

function drawImgFromLocal() {
    // gCtx.beginPath()
    var img = new Image()
    img.src = 'imgs/square-imgs/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(txt, x, y, color, fontSize) {
    gCtx.beginPath()

    gCtx.lineWidth = 1;
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'start';
    gCtx.fillStyle = color;
    gCtx.font = `${fontSize}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
}

function onSetLineTxt(value) {
    const meme = getMeme()
    setLineTxt(value)
    clearCanvas
    const { selectedImgId } = meme
    renderMeme(value, selectedImgId)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
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
    // debugger

    var requestedImg = imgs.find(img => img.id === idNum)
    const { imgNum } = requestedImg
    elImg.src = requestedImg.url
    clearCanvas()
    setLineTxt('enterTxt')
    const meme = getMeme()

    meme.selectedImgId = imgNum
    renderMeme('EnterTxt', imgNum)
    // gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetTextColor(value) {
    SetTextColor(value)
    const meme = getMeme()
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { selectedImgId } = meme

    renderMeme(txt, selectedImgId, value)


}

function onSetFontSize(diff) {
    setFontSize(diff)
    const meme = getMeme()
    const { txt } = meme.lines[meme.selectedLineIdx]
    const { selectedImgId } = meme
    const { color } = meme.lines[meme.selectedLineIdx]
    const { size } = meme.lines[meme.selectedLineIdx]

    renderMeme(txt, selectedImgId, color, size)
}

function onSwitchLines() {
    switchLines()
}

function saveAndRestoreExample() {
    const meme = getMeme()
    const fontTxt1 = meme.lines[0].txt
    const fontStyle1 = meme.lines[0].font
    const fontSize1 = meme.lines[0].size
    const fontColor1 = meme.lines[0].color
    const fontAlign1 = meme.lines[0].color

    const fontTxt2 = meme.lines[1].txt
    const fontStyle2 = meme.lines[1].font
    const fontSize2 = meme.lines[1].size
    const fontColor2 = meme.lines[1].color
    const fontAlign2 = meme.lines[1].align

    gCtx.font = `${fontSize1}px ${fontStyle1}`;

    gCtx.fillStyle = `${fontColor1}`;
    gCtx.fillText(fontTxt1, 10, 50);
    gCtx.strokeText(`${fontTxt1}`, 10, 50);
    // gCtx.textAlign = 'left';
    gCtx.save();

    gCtx.font = `${fontSize2}px ${fontStyle2}`;
    gCtx.fillStyle = `${fontColor2}`;
    gCtx.fillText(`${fontTxt2}`, 10, 400);
    gCtx.strokeText(`${fontTxt2}`, 10, 400);
    // gCtx.textAlign = 'left';
    // gCtx.restore();
    // gCtx.strokeText('Back to previous', 10, 150);
}