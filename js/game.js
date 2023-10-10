import formatData from "./helper.js"

const level = localStorage.getItem("level") || "medium"
const loader = document.getElementById("loader")
const container = document.getElementById("container")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll(".answer-text")
const scoreText = document.getElementById("score")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")
const questionNumber = document.getElementById("question-number")
const showError = document.getElementById("error")

const URL= `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let correct_Bonus = 10;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
    try{
        const response = await fetch(URL)
        const json = await response.json()
        formattedData= formatData(json.results)
        console.log(formattedData)
        start() 
    }catch(err){
     loader.style.display = "none";
     showError.style.display = "block"
    }
 
}
 const start = () => {
    showQuestion()
    container.style.display= "block";
    loader.style.display= "none"
 }

 const showQuestion = () =>{
    questionNumber.innerText = questionIndex + 1;
  const {question, answers, correctAnswerIndex} =
   formattedData[questionIndex];
   correctAnswer = correctAnswerIndex;
   questionText.innerText = question;
   answerList.forEach((button,index) =>{
    button.innerText = answers[index]
   })
   console.log(answerList)
 }

const checkAnswer = (event,index) => {
    if(!isAccepted) return
    isAccepted = false
console.log(scoreText)
const isCorrect = index === correctAnswer ? true : false;
if (isCorrect){
    event.target.classList.add("correct")
    score += correct_Bonus;
    scoreText.innerText = score
} else {
    event.target.classList.add("incorrect")
    answerList[correctAnswer].classList.add("correct")
}
}

const nextHandler = () => {
    answerList.forEach((button) => (button.className = "answer-text"))
    questionIndex++
    if(questionIndex < formattedData.length){
         isAccepted = true;
        showQuestion()
    } else {
       finishHandler()
    }   
console.log(nextButton)
}
const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score))
    window.location.assign("/end.html")
}
window.addEventListener("load",fetchData)
nextButton.addEventListener("click", nextHandler)
finishButton.addEventListener("click", finishHandler)
answerList.forEach((button, index) => {
    const handler = (event) => checkAnswer(event,index)
    button.addEventListener("click", handler)
})
 