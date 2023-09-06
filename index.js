import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetings = {
    databaseURL: "https://playground-4de58-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSetings)
const database = getDatabase(app)
const endorsement = ref(database, "endorsement")

const endorsementEl = document.getElementById("endorsement-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-btn")
const ulEl = document.getElementById("ul-el")
const likeBtn = document.getElementsByClassName("like-btn")
const likeCount = document.getElementsByClassName("like-count")
const likeDiv = document.getElementsByClassName("like-div")


publishBtn.addEventListener("click", function() {
    let toTxt = toEl.value
    let endorsementTxt = endorsementEl.value
    let fromTxt = fromEl.value

    if(toTxt&&endorsementTxt&&fromTxt) {
    renderEndorsement(toTxt,endorsementTxt,fromTxt)}
    else {
        alert("Please enter all fields!")
    }

    if(toTxt&&endorsementTxt&&fromTxt) {
        let to = `To:${toTxt}`
        let text = `Text:${endorsementTxt}`
        let from = `From:${fromTxt}`
        let endorsementData = [to,text,from]
        push(endorsement, endorsementData)
    }     
})

function clearEndorsementTxt() {
    toEl.value = ""
    endorsementEl.value = ""
    fromEl.value = ""
}

function clearEndorsementEl() {
    endorsementEl.innerHTML = ""
}

function renderEndorsement(to, endorsement, from) {  
    let newEndorsement = document.createElement("li")
    newEndorsement.innerHTML = `
        <div class="new-Endorsements">
            <div class="endorsement-content">
                <p>To: ${to}</p>
                <p>${endorsement}</p>
            </div>
            <div class="endorsement-footer">
                <p class="from-text">From: ${from}</p>
                <div class="like-div">
                    <button class="like-btn">❤️</button>
                    <h4 class="like-count">0</h4>
                </div>
            </div>
        </div>`
    
    ulEl.insertBefore(newEndorsement, ulEl.firstChild)
    clearEndorsementTxt()

    newEndorsement.querySelector(".like-btn").addEventListener("click", function(event) {
        const likeCountEl = event.target.nextElementSibling
        likeCountEl.textContent = Number(likeCountEl.textContent) + 1
    })
}


    