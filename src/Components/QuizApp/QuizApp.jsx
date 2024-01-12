import React, { useEffect, useState } from 'react'

export default function QuizApp() {

    let [question , setQuestions] = useState([]);
    let [cureentIndex,setCurrentIndex]=useState(0);
    let [correctOptions,setCorrectOptions]=useState([]);
    let[score,setScore] = useState(0)
    
    
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
      
      // Used like so
      var arr = [2, 11, 37, 42];
      shuffle(arr);
    //   console.log(arr);
// setQuestions(res)
    if(!question.length){
        return <h2>Loading ...</h2>
    }
    // let input = document.getElementsByName('options')

    let nextQuestion =()=>{
        if(cureentIndex < question.length -1){
            Score()
            setCurrentIndex(cureentIndex + 1);
            console.log(score)
        }
        // input.disabled =true
    console.log(correctOptions)

    }
    let Score=()=>{
        if(correctOptions === question[cureentIndex].correctAnswer){
            setScore(score++)
        }
    }
    let restart =()=>{
        setCurrentIndex(0)
    }
    
    let getOptions=(e)=>{
        let copyArr = [...correctOptions];
        copyArr.push(e.target.value)
        setCorrectOptions(copyArr);
        // bttn.disabled=false
        // console.log(e.target.value)
    }
    // let a = question[cureentIndex].correctAnswer;
    // console.log(a)
    // let finish=()=>{
    //     if(correctOptions === question[cureentIndex].correctAnswer){
    //         alert('good')
    //     }
    // }
//    let show=()=>{
//     console.log(correctOptions)
//    }
//    show()

    return (
        <div>
            <h4>{question[cureentIndex].question.text}</h4>
            {
                question[cureentIndex].options.map((data, index)=>{
                    return <div key={index}>
                        <input onChange={getOptions} type="radio" value={data} name="options" id="" />
                        <label htmlFor="">{data}</label>
                    </div>
                    // console.log(data)
                })
            }
            {/* <p>{question[cureentIndex].incorrectAnswers[0]}</p> */}
            {/* <input type="radio" name="" id="" />
            <label htmlFor="">{question[cureentIndex].incorrectAnswers[0]}</label><br />
            <input type="radio" name="" id="" />
            <label htmlFor="">{question[cureentIndex].incorrectAnswers[1]}</label><br />
            <input type="radio" name="" id="" />
            <label htmlFor="">{question[cureentIndex].incorrectAnswers[2]}</label><br />
            <input type="radio" name="" id="" />
            <label htmlFor="">{question[cureentIndex].incorrectAnswers[3]}</label>             */}
            <button onClick={nextQuestion} style={{ display: cureentIndex == 9 ? 'none': 'block'}}>Next question</button>
            <button onClick={restart}  style={{ display: cureentIndex == 9 ? 'block': 'none'}}>Back</button>
            {/* <button onClick={finish} style={{ display: cureentIndex == 9 ? 'block': 'none'}}>Finish</button> */}
        </div>
    )























//     let [questions,setQuestions] =useState([]);
//     let [nextnextQuestion,setNextQuestion] = useState(0);
//     let{correctAnswer,setCorrectAnswers} =useState()
//     useEffect(()=>{
//         getDataFromAPI()

//     },[])
//     let getDataFromAPI=()=>{
//         fetch('https://the-trivia-api.com/v2/questions')
//         .then(res => res.json())
//         .then(res => {setQuestions(res);
//             // console.log(questions.correctAnswer,questions.incorrectAnswers)
//             console.log(res.correctAnswer)
//             // getAnswer(res[0].correctAnswer,res[0].incorrectAnswers)
//           })
//     }
//     // let getAnswer = (options,inCorrectAnswer)=>{
//     //     let a = options;
//     //     let b = inCorrectAnswer
//     //     b.push(a)
//     //     b.sort(() => Math.random() - 0.5);
//     //     // setCorrectAnswer( b )
//     //     getincorrectanswer(b)
//     //     console.log(b)
//     // }
//     // let getincorrectanswer =(options)=>{
//     //     console.log(questions)
//     //     // if(options){
//     //     //     setCorrectAnswers(options)

//     //     // }
//     // }
    
//     if(!questions.length){
//         return <h2>Loding ...</h2>
//     } 
//     let nextQuestion =()=>{
//         // console.log(correctAnswer)
//         // console.log(shuffledOptions)
//         setNextQuestion(nextnextQuestion + 1)
//     }
//     // let getAnswers=(answer)=>{
//     //     setiNCorrectAnswer(answer[0].correctAnswer)
//     // }
//     // getAnswers(questions);
//     // let getCorrectAnswer =(correctAnswer)=>{
//     //     console.log(correctAnswer[0])
//     // }
//     // getCorrectAnswer(questions)
//   return (
//     <div>
//         <h4>{questions[nextnextQuestion].question.text}</h4>
//         {/* <p>{inCorrectAnswer} 
//             {
//                 questions.map((value)=>{
                    
//                     console.log(value.incorrectAnswers
//                         )
//                 })

//             }
//         </p> */}
//         {/* <p>{correctAnswer}</p> */}
//         {/* <p>{questions[nextnextQuestion].incorrectAnswers[0]}</p>
//         <p>{questions[nextnextQuestion].incorrectAnswers[1]}</p>
//         <p>{questions[nextnextQuestion].incorrectAnswers[2]}</p>
//         <p>{questions[nextnextQuestion].incorrectAnswers[3]}</p> */}
//         <button onClick={nextQuestion}>Next</button>
//     </div>
//   )
}
