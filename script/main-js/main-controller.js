'use strict'

var gElCanvas
var gCtx
var elImg
function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    elImg = document.querySelector('.starting-img')
    renderGallery()
    setInitialMeme()
    renderMeme()
}


function renderMeme() {
    const meme = getMeme()
    const { selectedImgId } = meme
    const { txt, pos,size } = meme.lines[meme.selectedLineIdx]


    elImg.src = `imgs/square-imgs/${selectedImgId}.jpg`
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    // saveAndRestoreExample()
    meme.lines.forEach(function (line, i) { 
        const currLine=meme.lines[i]
        const{txt,pos,color,size,font,align}=currLine
        let sameSize=size
        drawText(txt, pos.x, pos.y,color,size,font,align) 
    })
    drawRect(txt,pos.x,pos.y+size/2)

}

// ******ACTIONS IN EVERY MEME RENDOR*********

function drawText(txt, x, y, color, fontSize,fontStyle,alignValue) {
    gCtx.beginPath()

    gCtx.lineWidth = 1;
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = alignValue;
    gCtx.fillStyle = color;
    gCtx.font = `${fontSize}px ${fontStyle}`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
}

function drawRect(txt, x, y) {
    
    const textWidth = gCtx.measureText(txt).width
    gCtx.rect(x, y + 5, textWidth, 3);
    gCtx.fillStyle = 'white';
    gCtx.fillRect(x, y + 5, textWidth, 3);

}

// 



// *****EDITOR ACTIONS*****




function onSetLineTxt(value) {
    const meme = getMeme()
    setLineTxt(value)
    clearCanvas
    renderMeme()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-wrapper')
    var imgs = getImgs()
    var strHTML = imgs.map(img => `
    <img  onclick="onSelectImg('${img.id}')" class="gallery-img" src="${img.url} "alt="">`
    )
    elGallery.innerHTML = strHTML.join('')

}


function onSelectImg(idNum) {
    const elEditor=document.querySelector('.meme-editor-wrapper')
    elEditor.classList.remove('hide')
    const elShadow=document.querySelector('.shadow')
    elShadow.classList.add('appear')
    const elModalContainer=document.querySelector('.modal-container')
    elModalContainer.classList.add('appear')

    var imgs = getImgs()
    var requestedImg = imgs.find(img => img.id === idNum)
    const { imgNum } = requestedImg
    elImg.src = requestedImg.url
    clearCanvas()
    setNewImgTexts()
    // setLineTxt('enterTxt')
    const meme = getMeme()
    meme.selectedImgId = imgNum
    renderMeme()
}

function onSetTextColor(value) {
    SetTextColor(value)
    renderMeme()
}

function onSetFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onSwitchLines() {
    switchLines()
    clearCanvas()
    renderMeme()
}



function onChangeFontFamily(value) {
    changeFontFamily(value)
    renderMeme()
}
function onChangeTextAlign(value) {
    changeTextALign(value)
    renderMeme()
}
function getCanvasInfo() {
    return { gElCanvas, gCtx }

}

function onMoveTextVertical(diff) {
    moveTextVertical(diff)
    renderMeme()
}

function onAddLine(){
    addLine()
    renderMeme()
}
function onDeleteLine(){
    console.log('hh')
    deleteLine()
    renderMeme()
}


function onDownloadMeme(elLink){
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'paint.jpg'

}

function onCloseModal(){
    const elEditor=document.querySelector('.meme-editor-wrapper')
    elEditor.classList.add('hide')
    const elShadow=document.querySelector('.shadow')
    elShadow.classList.remove('appear')
    const elModalContainer=document.querySelector('.modal-container')
    elModalContainer.classList.remove('appear')
}





























































// function drawImgFromLocal() {
//     // gCtx.beginPath()
//     var img = new Image()
//     img.src = 'imgs/square-imgs/1.jpg';
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
//     }
// }


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

// function saveAndRestoreExample() {
    //     const meme = getMeme()
    
    //     const fontTxt1 = meme.lines[0].txt
    //     const fontStyle1 = meme.lines[0].font
    //     const fontSize1 = meme.lines[0].size
    //     const fontColor1 = meme.lines[0].color
    //     const fontAlign1 = meme.lines[0].color
    //     const x1 = meme.lines[0].pos.x
    //     const y1 = meme.lines[0].pos.y
    
    //     const fontTxt2 = meme.lines[1].txt
    //     const fontStyle2 = meme.lines[1].font
    //     const fontSize2 = meme.lines[1].size
    //     const fontColor2 = meme.lines[1].color
    //     const fontAlign2 = meme.lines[1].align
    //     const x2 = meme.lines[1].pos.x
    //     const y2 = meme.lines[1].pos.y
    
    //     gCtx.font = `normal ${fontSize1}px ${fontStyle1}`;
    //     gCtx.textAlign = fontAlign1
    //     gCtx.fillStyle = `${fontColor1}`;
    //     gCtx.fillText(fontTxt1, x1, y1);
    //     gCtx.strokeText(`${fontTxt1}`, x1, y1);
    //     gCtx.save();
    //     gCtx.textAlign = fontAlign2
    //     gCtx.font = `${fontSize2}px ${fontStyle2}`;
    //     gCtx.fillStyle = `${fontColor2}`;
    //     gCtx.fillText(`${fontTxt2}`, x2, y2);
    //     gCtx.strokeText(`${fontTxt2}`, x2, y2);
    // }
    
