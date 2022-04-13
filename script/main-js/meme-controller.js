'use strict'
var gMeme
var gElCanvas
var gCtx
function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    var elImg = document.querySelector('.starting-img')
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText('welcome to  ', 20, 50)
    drawText('memegene you prick', 40, 80)

}
function renderMeme() {
    drawImgFromLocal()
    drawText('welcome', gElCanvas.width / 2, gElCanvas.height / 2)
}

// function renderMeme(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }

function drawImgFromLocal() {
    // gCtx.beginPath()
    var img = new Image()
    img.src = 'imgs/meme-imgs-square/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend

    }
}

function drawText(txt, x, y) {
    gCtx.beginPath()
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y); 
    // gCtx.textBaseline = 'middle';
    // gCtx.textAlign = 'center';
    gCtx.lineWidth = 1;
    gCtx.fillStyle = 'white';
    gCtx.font = '35px impact';
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
}