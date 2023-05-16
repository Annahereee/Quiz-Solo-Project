import React from "react"
import { nanoid } from 'nanoid'

const {useState, useEffect} = React

export default function Quiz(props) {   
    const [score, setScore] = useState(0)
    
    props.answersArray.sort().reverse()
    
    // Need to do this funciton again
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    function addChosenClass(el) {
        let classes = ['answers']
         if (el == props.userChoice)
            {classes.push('chosen')}
        return classes.join(' ')
    }

    function addClasses(el) {
        let classes = ['answers']
        if (el == props.userChoice && el == props.correctAnswers) {
            classes.push('correct')
        }
        
        else if (el == props.userChoice && el != props.correctAnswers) {
            classes.push('incorrect')
        } 
        return classes.join(' ')
    }
 
    const answersHtml = props.answersArray.map(el => {
        return (
            <button key={nanoid()}
                    className={props.showResults ? addClasses(el) : addChosenClass(el)}
                    onClick={() => props.selectAnswer(el, props.correctAnswers, props.id)}
                    disabled={props.showResults}
                    >
                {el}
            </button>
        )
    })
    
        return (
         <div className="quiz">
            <h2 className="question">{decodeHTMLEntities(props.question)}</h2>
            <div className="answers-container">
                {answersHtml}
            </div>
        </div>     
    )
}
