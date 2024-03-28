'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {

const [inputValue, setInputValue] = useState("");
//onChange={(e) => setInputValue(e.target.value)} 
//value={inputValue}

  const [jokes, setjokes] = useState([])
  const inputJokeRef = useRef('')
  const selectedRef = useRef('')
  const selectedTextRef = useRef('')

  function addToJokes(joke){
    console.log('joke',joke)
    setjokes(prev=>
      [...prev,
        {
          'joke':joke,
          'selectedText':selectedTextRef.current,
          'selectedClass':'selectedEL' + (Math.floor(Math.random()*10))
        }
      ]
    )
    setInputValue('')

  }

  function getTextfrom(){
    
    if (window.getSelection()) {
      var select = window.getSelection();
      selectedTextRef.current = select.toString()
    }

  }

  const startf = () => {
    selectedRef.current.addEventListener("mouseup",getTextfrom)
  };

  useEffect(() => {
      startf()
  },[inputValue])

  console.log(jokes)
  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 bg-gray-900 p-24">
      <h1>The Notebook for a chuckle</h1>
      <ul className='block_select-UL'>
      {jokes.map((elem, index)=>{

          let temparr = []
          if(elem.selectedText!=''){
            temparr = elem.joke.split(elem.selectedText)
            console.log(temparr)
          }else{
            temparr = ['',elem.joke,'']
          }
          return (
            <li className="block_select" key={'s' + index}> 
              {temparr[0]}
                <em className={'selected_text ' + elem.selectedClass}>
                {elem.selectedText}
                </em>
              {temparr[1]}
            </li>
          )
        })
      }
      </ul>


      <input className="FieldAdd" type="text" ref={inputJokeRef} />
      
      <button onClick={() => {setInputValue(inputJokeRef.current.value)}}>Make Joke</button>

      <div className="beforeInput" ref={selectedRef}>{inputValue}</div>
      
      <button onClick={() => {addToJokes(inputJokeRef.current.value);inputJokeRef.current.value=''}}>Add Joke</button>
            
    </main>
  )
}
