import React, { useEffect, useState } from 'react';
import './QuizApp.css';
import animatedLoader from '../images/b4d657e7ef262b88eb5f7ac021edda87.gif';
import success from '../images/successfully 2.gif'
import alert from '../images/alert.gif'


export default function QuizApp() {

    let [question , setQuestions] = useState([]);
    let [cureentIndex,setCurrentIndex]=useState(0);
    let [correctOptions,setCorrectOptions]=useState([]);
    let[score,setScore] = useState(0);
    let [percent,setPercent]=useState(0);
    // let[restartq,setRestartq]=useState(false)
    useEffect(()=>{
        getDataFromAPI()
    },[])

    let getDataFromAPI=()=>{
        fetch("https://the-trivia-api.com/v2/questions")
        .then(res => res.json())
        .then(res => {
            res.map((data)=>{
                data.options = [...data.incorrectAnswers,data.correctAnswer];
                data.options = shuffle(data.options);
            })
            setQuestions(res)
            console.log(res)

        })
    }
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
      
    if(!question.length){
        return <img src={animatedLoader} alt="" id='loader' />
    }
//    let a = document.querySelector('input')
    let nextQuestion =()=>{
        abc()
        // if(a.checked){
            if(cureentIndex < question.length -1){
                setCurrentIndex(cureentIndex + 1);
            }
        // }else{
            // alert('wrong')
        // }
    }
    let abc=()=>{
        if(correctOptions[correctOptions.length - 1]  === question[cureentIndex].correctAnswer){
            setScore(score + 1)            
            console.log('done');
        }else{
        setScore(score)
            console.log('wrong')
        }
    }
    let restart =()=>{
        // console.log('hi')
        setCurrentIndex(0)
        // if(!restartq){
        //     setRestartq(true)
        //     console.log(restartq)
        // }
    }
    let getOptions=(e)=>{
        let copyArr = [...correctOptions];
        copyArr.push(e.target.value)
        setCorrectOptions(copyArr);   
    }
    let finish=()=>{
        document.querySelector('.result').style.display='block'
        document.querySelector('#quizApp').style.display='none'
        let percentage = (score / question.length) * 100;
        setPercent(percentage);
        // setInterval(() => {
        // }, 1000);
         <h2>loading ......</h2>
        console.log('get score ->', score)
        console.log('get percentage ->', percent)
    }
    console.log(score)

    return (
        <div className='main' >
            <h2>Quiz App</h2>
            <div className="quizApp" id='quizApp'  >     
            <h4>{cureentIndex + 1}) {question[cureentIndex].question.text}</h4>
            <div className="options">
            {
            question[cureentIndex].options.map((data, index)=>{
                return <div key={index}>
                    <input onChange={getOptions}
                    type="radio"
                    value={data}
                    // checked={correctOptions[index] === data}
                    name="options"
                    id=""
                     />
                    <label htmlFor="">{data}</label>
                </div>
            })
            }
            </div>
            <div className="bttns">
             <button id='start' onClick={nextQuestion} style={{ display: cureentIndex == 9 ? 'none': 'block'}} >Next question</button>
            {/* <button id='restart' onClick={restart} style={{ display: cureentIndex == 9 ? 'block': 'none'}}>Restart</button> */}
            <button id='finish' onClick={finish} style={{ display: cureentIndex == 9 ? 'block': 'none'}}>Finish</button>
            </div>
            </div>
            {/* style={{ display: cureentIndex == 9 ? 'block': 'none'}
style={{ display: cureentIndex == 9 ? 'block': 'none'} */}
           <div className="result">
            <img style={{display :percent >=50 ? 'block' : 'none'}} src={success} alt="" />
            <img style={{display :percent <=50 ? 'block' : 'none'}} src={alert} alt="" />
            <h1>Score : {score}</h1>
            <h1>Percentage : {percent}</h1>
            {/* <h1>Remarks :{ percent >=50 ? 'Congratulations' : 'none'}</h1> */}
            <h1 style={{display :percent >=50 ? 'block' : 'none'}}>Remarks : Congratulations</h1>
            <h1 style={{display :percent <=50 ? 'block' : 'none'}}>Remarks : Sorry!</h1>
            {/* <button id='restart' onClick={restart} >Restart</button> */}
           </div>
        </div>
        // {percent >=50 ? 'Congratulations' : 'Sorry'}
        // style={{ display: cureentIndex == 9 ? 'none': 'block'}}
    )
}
