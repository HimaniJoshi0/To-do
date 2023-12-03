import React, { useState , useEffect} from 'react'

const App = () => {
  const [tododata, setTodoData] = useState([]);
  const [taskdata, setTaskData] = useState("");

  const handle_change = (e) => {
    setTaskData(e.target.value);
  }

  const submit_data = (e) => { 
    setTodoData([...tododata, taskdata]);
    localStorage.setItem("tododata", JSON.stringify([...tododata, taskdata]));
    setTaskData("");  
  }

  const delete_task=(index)=>{
    const newData= [...tododata];
    newData.splice(index,1);
    setTodoData(newData);
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tododata"));
    setTodoData(storedData);
  }, []);


  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("tododata"));
  //   setShowData(storedData);
  // }, [tododata]);

  const renderData=(item,index)=>{
    return (
      <div className='flex bg-white w-70' key={index}>
        <p>{item}</p>
        <i class="fa-solid fa-trash" onClick={(index)=>delete_task(index)}></i>
      </div>  
  )
}
  

  return (
    <>
      <div  className="bg-red-200 w-screen h-screen flex flex-col items-center " >
        <div className='w-80 h-80 flex flex-col items-center bg-blue-400'>

          <div className='text-4xl font-bold'>
            <h1>YOUR TO-DO</h1>
          </div>

          <div className=' w-80 flex flex-col '>
            <textarea rows={5} value={taskdata} onChange={handle_change} placeholder='write your task' ></textarea>
            <button onClick={submit_data}>Submit</button>
          </div>

          <div className="" >
             <div>
               <h2 >TASK TO-DO</h2>
             </div>
           {tododata.length && tododata.map(renderData)
             }
          </div>
        </div>
      </div>
    </>
  )
}

export default App