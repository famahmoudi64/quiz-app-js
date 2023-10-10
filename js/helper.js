const formatData = (questionData) => {
    const result = questionData.map((item) => {
          const questionObject = {
             question: item.question,
          }
          const answers = [...item.incorrect_answers]
         //  answers.push(item.correct_answer)
         const correctAnswerIndex = Math.floor(Math.random()*4)
         answers.splice(correctAnswerIndex,0,item.correct_answer)
          questionObject.answers= answers;
          questionObject.correctAnswerIndex= correctAnswerIndex
         //  console.log(answers,correctAnswerIndex)
         return questionObject
    })
          return result
}
export default formatData