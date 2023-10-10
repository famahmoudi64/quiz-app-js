const highScores = JSON.parse(localStorage.getItem("highScores")) || []
const list = document.querySelector("ol")
const content = highScores.map((player, index) => {
    return `
         <li>
         <span>${index+1}</span>
         <p>${player.name}</p>
         <span>${player.score}</span>
         </li>
    `
})
list.innerHTML = content.join("")

