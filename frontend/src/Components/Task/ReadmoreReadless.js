import {useState} from "react";
const ReadmoreReadless = ({limit,children}) => { 

    const [isReadMoreShown, setReadMoreShown] = useState(false)
    const text =children;

    const togglebtn = () => {
        setReadMoreShown(prevState => !prevState)
    }
return (
    <div className=".read-more-read-less">
       {isReadMoreShown ? text : text.substr(0,limit)}
       <button className="read" onClick={togglebtn}> {isReadMoreShown ? 'Read Less' : '...Read More'}</button>
    </div>
)
}

export default ReadmoreReadless