import React from "react"
import { nanoid } from 'nanoid'
import Quiz from './Quiz'
import StartScreen from "./StartScreen"

const {useState, useEffect} = React

export default function QuizScreen(props) {
    const [allQuizes, setAllQuizes] = useState([])
    const [userAnswers, setUserAnswers] = useState([])
    const [userChoiceId, setUserChoiceId] = useState('')
    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${props.input.numOfQuestion}&category=${props.input.category}&difficulty=${props.input.difficulty}&type=${props.input.type}`)
        .then(res => res.json())
        .then(data => setAllQuizes(data.results.map(el => ({...el, id: nanoid()}))))
    }, [])    
    
    //  This adds object to the current state
    function selectAnswer(chosenAnswer, correctAnswer, id) {
        setUserChoiceId(id)
        const savedAns = userAnswers.find(item => item.id == id) 
        setUserAnswers(prevAns => {
            return savedAns ? prevAns.map(item => {
                return item.id == id ? {...item, chosenAnswer: chosenAnswer} : item
            })
            : [...prevAns, {id: id, correctAnswer: correctAnswer, chosenAnswer: chosenAnswer}]
        })
    }

    const quizHtml = allQuizes.map(quiz => {
        const matchId = userAnswers.find(answer => answer.id == quiz.id)
        const answers = quiz.incorrect_answers.concat(quiz.correct_answer)
        return <Quiz
            id={quiz.id}
            key={quiz.id}
            question={quiz.question}
            correctAnswers={quiz.correct_answer}
            incorrectAnswers={quiz.incorrect_answers}
            answersArray={answers}
            showResults={props.showResults}
            selectAnswer={selectAnswer}
            userChoice={matchId && matchId.chosenAnswer}
        />
    })  
    
    function updateScore() {
        const correctAns = userAnswers.filter(item => item.correctAnswer == item.chosenAnswer)
        return correctAns.length
    }

    const correctAns = userAnswers.filter(item => item.correctAnswer == item.chosenAnswer)
    return (
        <div className="quiz-container">
            {quizHtml}
        {props.showResults && <h3>You scored {updateScore()}/{props.input.numOfQuestion} questions</h3>} 
        </div>
    )
}
