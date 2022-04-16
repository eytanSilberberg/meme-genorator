'use strict'

var gElCanvas
var gCtx
var elImg
var gElBody=document.querySelector('body')
var gStartPos
const gTouchEvs=['touchstart','touchmove','touchend']
var gUploadedImg
function onInit() {
    var render=function (){
        var canvasWidth=gCtx.canvas.width=document.documentElement.offsetWidth*0.4
        gCtx.canvas.height=canvasWidth
    }
    
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    elImg = document.querySelector('.starting-img')
    
    renderGallery()
    window.addEventListener("resize",render)
    window.addEventListener("resize",renderMeme)
    render()
    addEventListeners()
    setRandText()
    setInitialMeme()
    renderMeme()
    
}

function addEventListeners(){
    addMouseListeners()
    addTouchListeners()
}


function addMouseListeners(){
    gElCanvas.addEventListener('mousedown',onDown)
    gElCanvas.addEventListener('mouseup',onUp)
    gElCanvas.addEventListener('mousemove',onMove)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev){
    const pos=getEvPos(ev)
    if(isMemeClicked(pos)) return
    setMemeDrag(true)
    gStartPos=pos
    document.body.style.cursor='grabbing'
}

function onMove(ev){
    const meme=getMeme()
    if(!meme.isMemeDrag) return 
    const pos= getEvPos(ev)
    const dx=pos.x-gStartPos.x
    const dy=pos.y-gStartPos.y
    moveMeme(dx,dy)
    gStartPos=pos
    renderMeme()
}
function onUp(){
    setMemeDrag(false)
    document.body.style.cursor='default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        console.log(ev.type)
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}


function renderMeme() {
    const meme = getMeme()
    const { selectedImgId } = meme
    const { txt, pos,size,rotate } = meme.lines[meme.selectedLineIdx]

    if( !gUploadedImg) {
        elImg.src = `imgs/square-imgs/${selectedImgId}.jpg` 
    }else{
        elImg.src=gUploadedImg.src
    }
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach(function (line, i) { 
        const currLine=meme.lines[i]
        const{txt,pos,color,size,font,align,rotate}=currLine
        drawText(txt, pos.x, pos.y,color,size,font,align,rotate) 
    })
    drawRect(txt,pos.x,pos.y+size/2)

}

// ******ACTIONS IN EVERY MEME RENDOR*********

function drawText(txt, x, y, color, fontSize,fontStyle,alignValue,rotate) {
    gCtx.beginPath()
    gCtx.lineWidth = 1;
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = alignValue;
    gCtx.fillStyle = color;
    gCtx.font = `${fontSize}px ${fontStyle}`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(txt, x, y);
    gCtx.closePath()
}

function drawRect(txt, x, y) {
    
    const textWidth = gCtx.measureText(txt).width
    gCtx.rect(x, y + 5, textWidth, 3);
    gCtx.fillStyle = 'white';
    gCtx.fillRect(x, y + 5, textWidth, 3);

}

// 

// ****SEARCH BAR ACTIONS**** 

    function onRandomMeme(){

        const imgs=getImgs()
        const randImgIdx=getRandomIntExclusive(1,imgs.length)
        randomizeMeme(randImgIdx)
        const elEditor=document.querySelector('.meme-editor-wrapper')
        elEditor.classList.remove('hide')
        const elShadow=document.querySelector('.shadow')
        elShadow.classList.add('appear')
        const elModalContainer=document.querySelector('.modal-container')
        elModalContainer.classList.add('appear')
        renderMeme()


    }


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
    gUploadedImg=null
    onOpenModal()
    var imgs = getImgs()
    var requestedImg = imgs.find(img => img.id === idNum)
    const { imgNum } = requestedImg
    elImg.src = requestedImg.url
    clearCanvas()
    setNewImgTexts()
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
    changeTextAlign(value)
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

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}
function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
    }

function onImgInput(ev){

        clearCanvas()
        onOpenModal()
        loadImageFromInput(ev,renderImg)

    }

function loadImageFromInput(ev, onImageReady) {
        document.querySelector('.share-container').innerHTML = ''
        var reader = new FileReader()
    
        reader.onload = (event) => {
            var img = new Image()
            img.src = event.target.result
            gUploadedImg=img
            img.onload = onImageReady.bind(null, img)
        }
        reader.readAsDataURL(ev.target.files[0])
    }

function renderImg(img){
        gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    }

function onOpenModal(){
        const elEditor=document.querySelector('.meme-editor-wrapper')
    elEditor.classList.remove('hide')
    const elShadow=document.querySelector('.shadow')
    elShadow.classList.add('appear')
    const elModalContainer=document.querySelector('.modal-container')
    elModalContainer.classList.add('appear')
    }

    function onSearchBy(value){
        searchBy(value)
        
        renderGallery()
    }

function onRotateText(){
    rotateText()
}


function onToggleNav(){
    const elNav=document.querySelector('.pages-list')
    const elMenuShadow=document.querySelector('.menu-shadow')
    elMenuShadow.classList.add('appear')
    elNav.classList.add('appear')
}

function onCloseMenuShadowModal(){
    const elNav=document.querySelector('.pages-list')
    elNav.classList.remove('appear')
    const elMenuShadow=document.querySelector('.menu-shadow')
    elMenuShadow.classList.remove('appear')

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
    
