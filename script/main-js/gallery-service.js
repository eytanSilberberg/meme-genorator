'use strict'
var gImgs = [
    { id: makeId(), imgNum: 1, url: `imgs/square-imgs/1.jpg`, keywords: ['funny', 'cat'] },
    { id: makeId(), imgNum: 2, url: `imgs/square-imgs/2.jpg`, keywords: ['politics', 'movies'] },
    { id: makeId(), imgNum: 3, url: `imgs/square-imgs/3.jpg`, keywords: ['funny', 'movies'] },
    { id: makeId(), imgNum: 4, url: `imgs/square-imgs/4.jpg`, keywords: ['funny', 'politics'] },
    { id: makeId(), imgNum: 5, url: `imgs/square-imgs/5.jpg`, keywords: ['funny', 'cat'] },
    { id: makeId(), imgNum: 6, url: `imgs/square-imgs/6.jpg`, keywords: ['politics', 'movies'] },
    { id: makeId(), imgNum: 7, url: `imgs/square-imgs/7.jpg`, keywords: ['funny', 'movies'] },
    { id: makeId(), imgNum: 8, url: `imgs/square-imgs/8.jpg`, keywords: ['funny', 'cat', 'baby', 'politics', 'movies'] },
    { id: makeId(), imgNum: 9, url: `imgs/square-imgs/9.jpg`, keywords: ['funny', 'cat'] },
    { id: makeId(), imgNum: 10, url: `imgs/square-imgs/10.jpg`, keywords: ['funny', 'cat'] },
    { id: makeId(), imgNum: 11, url: `imgs/square-imgs/11.jpg`, keywords: ['politics', 'movies'] },
    { id: makeId(), imgNum: 12, url: `imgs/square-imgs/12.jpg`, keywords: ['funny', 'movies'] },
    { id: makeId(), imgNum: 13, url: `imgs/square-imgs/13.jpg`, keywords: ['cat', 'baby'] },
    { id: makeId(), imgNum: 14, url: `imgs/square-imgs/14.jpg`, keywords: ['funny', 'cat', 'baby', 'politics', 'movies'] },
    { id: makeId(), imgNum: 15, url: `imgs/square-imgs/15.jpg`, keywords: ['funny', 'movies'] },
    { id: makeId(), imgNum: 16, url: `imgs/square-imgs/16.jpg`, keywords: ['funny', 'cat'] },
    { id: makeId(), imgNum: 17, url: `imgs/square-imgs/17.jpg`, keywords: ['politics', 'movies'] },
    { id: makeId(), imgNum: 18, url: `imgs/square-imgs/18.jpg`, keywords: ['funny', 'cat'] }

]

var imgsToDisplay
var imgNumber = 0




function getImgs() {
    if (!imgsToDisplay || imgsToDisplay.length === 0) {
        return gImgs
    } else {
        return imgsToDisplay
    }
}

function searchBy(value) {

    imgsToDisplay = []
    if (value === '') return
    // var imgsToDisplay = []
    imgsToDisplay = gImgs.reduce((acc, img) => {
        img.keywords.forEach(keyword => {
            if (keyword.includes(value)) acc.push(img)
        })
        return acc
    }, [])
}