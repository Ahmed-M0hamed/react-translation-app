import {useState} from 'react'
import axios from 'axios'
// import ReactAudioPlayer from 'react-audio-player';
import translation from './translation.mp3'
const Home = () => {
    const [input_text , setInput] = useState('')
    const [output , setOutput] = useState(null)
    const handleChange = (e) =>{
        const inputText = e.target.value 
        setInput(inputText)
        console.log(inputText)
    }
    
    const handleClick = () => {
        setOutput(null)
        const data = {
            'input_text' : input_text
        }
        axios.post('http://localhost:8000/translate/' ,data ) 
        .then(res => {
            setOutput(res.data)
            console.log(res.data)
    
        } )
    } 
    
    return ( 

        <div>
            <h1>
                Translation 
            </h1>
            
            <div className='translation'>
                <div className='input_div'>

                    <textarea placehoder='text' value={input_text} onChange={handleChange}> </textarea>
                    <button onClick={handleClick}>translate</button>

                </div>
                <div className='output_div'>

                    {output && <span>
                    <p>{output}</p> 
                    <audio controls src={translation}> </audio>
                    </span> }
                </div>
            </div>
        </div>
    );
}

export default Home;