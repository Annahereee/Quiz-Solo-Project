import React from "react"
import QuizScreen from "./QuizScreen"
import StartScreen from "./StartScreen"
import { data } from "./data"
import { nanoid } from 'nanoid'

const {useState, useEffect} = React
export default function App() {
    const [isStart, setIsStart] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [input, setInput] = React.useState({
        numOfQuestion: 5,
        category: 9,
        difficulty: '',
        type:''
    })
    
    function startQuiz() {
        setIsStart(prevState => !prevState)
        setShowResults(false)
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setInput(prevInput => ({
             ...prevInput, [name]: value}
        ))
    }
    
   return (
        <section className="screen">         
            {isStart ? <QuizScreen showResults={showResults}
                                   input={input}/> 
                     : <StartScreen/>}
                     
            {!isStart && 
            <div className="form">
                <label>
                Number of question:  
                    <input
                        type='text'
                        className='form--input'
                        name='numOfQuestion'
                        placeholder="Number of questions"
                        value={input.numOfQuestion}
                        onChange={handleChange}
                    />
                </label>
                <label>
                Category:  
                    <select name="category" id="category" value={input.category} onChange={handleChange}>
                        {data.map((option, index) => 
                            <option key={nanoid()}
                                    value={index + 9}>
                                {option.label}
                            </option>
                        )}
                    </select>
                </label>
                <label>
                Difficulty:
                    <select name="difficulty" id="difficulty" onChange={handleChange}>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                </label>
                <label>
                Type:
                    <select name="type" id="type" onChange={handleChange}>
                        <option value="multiple">multiple choice</option>
                        <option value="boolean">True/ False</option>
                    </select>
                </label>
            </div>}
            
            <div className='btn-container'>         
                <button className="primary-btn start-btn" 
                        onClick={startQuiz}>
                    {isStart ? 'New Quiz' : 'Start quiz'}
                </button> 
                {isStart && <button className="primary-btn" 
                            onClick={() => {
                            setShowResults(prevState => !prevState)}}>
                            {showResults ? "Try Again" : "Check Answers"}
                            </button>}
            </div>
            <img className="top-img" src="./blobs.png"/>
            <img className="bottom-img" src="./blue.png"/>
        </section>
   ) 
}

