const scoreEle = document.querySelector("p")
const input = document.querySelector("input")
const button = document.querySelector("button")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const Score = JSON.parse(localStorage.getItem("score"))
scoreEle.innerText = Score

const saveHandler = () => {
    if(input.value === '' || Score === 0){
        alert("invalid username or score")
    }else{
        const finalScore = {name:input.value , score:Score}
        highScores.push(finalScore)
        highScores.sort((a,b) => b.score - a.score);
        highScores.splice(10)
        localStorage.setItem("highScores", JSON.stringify(highScores)) 
        localStorage.removeItem("score")
        window.location.assign("/")    
    }
}
button.addEventListener('click',saveHandler)