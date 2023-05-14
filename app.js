const fromText = document.querySelector(".from-text")
toText = document.querySelector(".to-text")
selectTag = document.querySelectorAll("select")
exchangeIcon = document.querySelector(".exchange")
icons = document.querySelectorAll(".row i")
btntTranslate = document.querySelector("button")

selectTag.forEach((tag, id) => {
    for (let country_code in countries){ 
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "ka-GE" ? "selected" : ""
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option)
    }
})

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value
    tempLang = selectTag[0].value
    fromText.value = toText.value
    toText.value = tempText
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang
})

fromText.addEventListener("keyup", () => {
   if(!fromText.value){
    toText.value = ""
   }
})

btntTranslate.addEventListener("click", () => {
    let text = fromText.value.trim()
    translateFrom = selectTag[0].value
    translateTo = selectTag[1].value
    if(!text) return
    toText.setAttribute("Placeholder", "Translating...")
    let apiURl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiURl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText
        data.matches.forEach(data => {
        if(data.id === 0){
            toText.value = data.translation
        }
       })
       toText.setAttribute("Placeholder", "Translation")
    })
})

icons.forEach( icon => {
   icon.addEventListener("click", ({target}) => {
    if(!fromText.value || toText.value) return
    if(target.classList.contains("fa-copy")){
        if(target.id = "from"){
            navigator.clipboard.writeText(fromText.value)
        } else {
        navigator.clipboard.writeText(toText.value)
        }
    }  else {
        let utterance
        if(target.id = "from"){
            utterance = new SpeechSynthesisUtterance(fromText.value)
            utterance.lang = selectTag[0].value
        } else {
            utterance = new SpeechSynthesisUtterance(toText.value)
            utterance.lang = selectTag[1].value
        }
        speechSynthesis.speak(utterance)
    }
   })
})

