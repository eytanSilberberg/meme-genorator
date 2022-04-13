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
    const { txt } = meme.lines[0]
    // gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    renderMeme(txt, selectedImgId)

    // drawText(txt, 20, 50)
}
function renderMeme(txt, picNum) {
    elImg.src = `imgs/square-imgs/${picNum}.jpg`
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText(txt, 250, 50)
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

function drawText(txt, x, y) {
    gCtx.beginPath()

    gCtx.lineWidth = 1;
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.fillStyle = 'white';
    gCtx.font = '35px impact';
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
}

function onSetLineTxt(value) {
    const meme = getMeme()
    setLineTxt(value)
    clearCanvas
    const { selectedImgId } = gMeme
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
    <img class="gallery-img" src="${img.url} "alt="">`
    )
    elGallery.innerHTML = strHTML.join('')

}