'use strict'

var gCurrLang = 'en-us'

function doTrans(lang) {
    // setPriceByLang(lang)
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        el.innerText = txt
    })
}

function getTrans(transKey) {

    var key = gTrans[transKey]
    if (!key) return 'unknown'
    const translate = key[gCurrLang]
    if (!translate) return key[en]

    return translate
}

function setLang(lang) {
    gCurrLang = lang
}