import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../Assets/data';
const Quiz = () => {
  let [index,setIndex] = useState(0) ; 
  let [question,setQuestion] = useState(data[index]) ;
  let [scoor,setScoor]= useState(0) ;  
  let [lock,setLock] = useState(false) ;
  let [result,setResult]=useState(false) ;
  let option1 = useRef(null) ;
  let option2 = useRef(null) ; 
  let option3 = useRef(null) ; 
  let option4 = useRef(null) ; 
  let option_array = [option1,option2,option3,option4]
  const checkAns = (e,ans) => { 
    if(!lock){
      if(question.ans===ans){ 
        e.target.classList.add("correct") ; 
        setLock(true) ; 
        setScoor(prev=> prev+1) ; 
      }else { 
        e.target.classList.add("wrong");
        setLock(true) ; 
        option_array[question.ans-1].current.classList.add("correct")
      }
      
    }  
  }
  const next = ()=> { 
    if(lock===true){
      if(index=== data.length-1){ 
        setResult(true); 
        return 0 ; 
      }
      setIndex(++index) ; 
      setQuestion(data[index]) ;
      setLock(false)  ; 
      option_array.map((option)=> { 
        option.current.classList.remove('correct');
        option.current.classList.remove('wrong'); 
        return null ; 
      })
    }
  }
  const reset =()=> { 
    setIndex(0) ; 
    setQuestion(data[0]) ; 
    setScoor(0);
    setLock(false) ; 
    setResult(false) ; 
  }
  return (
    <div className='container'>
        <h1>Quiz app </h1>
        <hr />
        {result===true ? 
        <><h2>you Scored {scoor} out of {data.length}</h2>
       <button onClick={reset}>Reset</button></>: 
        <>
         <h2>{index+1}.{question.question} </h2>
        <ul>
            <li ref={option1} onClick={(e)=> {checkAns(e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=> {checkAns(e,2)}} >{question.option2}</li>
            <li ref={option3}  onClick={(e)=> {checkAns(e,3)}}>{question.option3}</li>
            <li ref={option4}  onClick={(e)=> {checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index +1} of {data.length} questions</div>
        </>
        }
       
    </div>
  )
}

export default Quiz