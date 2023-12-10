import React, { useState , useEffect} from 'react'

const App = () => {
  const [tododata, setTodoData] = useState([]);
  const [taskdata, setTaskData] = useState("");
  const [editindex, setEditIndex] = useState(null);

  const handle_change = (e) => {
    setTaskData(e.target.value);
  }

  const submit_data = () => { 
      if(editindex!==null){
        const updateList=[...tododata];
        updateList[editindex]= taskdata;
        setTodoData(updateList);
        setEditIndex(null);

      }

      else{
        setTodoData([...tododata, taskdata]);
        localStorage.setItem("tododata", JSON.stringify([...tododata, taskdata]));
        setTaskData(""); 
      } 
  }

  const delete_task=(index)=>{
    const newData= [...tododata];
    newData.splice(index,1);
    setTodoData(newData);
  }

  const edit_task=(index)=>{
      setTaskData(tododata[index])
      setEditIndex(index);
  }

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tododata")) || [];
    setTodoData(storedData);
  }, []);


  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("tododata"));
  //   setShowData(storedData);
  // }, [tododata]);


  const renderData = (item, index) => {
    return (
      <div className='flex bg-white w-4/5 mt-5 justify-between p-2' key={index}>
        <p>{item}</p>
        <div className='flex w-1/5 justify-between'>
        <i className="fa-solid fa-trash" onClick={() => delete_task(index)}></i>
        <i class="fa-solid fa-pen" onClick={() => edit_task(index)}></i>
        </div>  
      </div>  
    );
  }


  return (
    <>
      <div  className="min-height-screen bg-red-200  flex flex-col items-center ">
        <div className='flex flex-col items-center  w-4/5 '>

          <div className='text-4xl font-bold'>
            <h1>YOUR TO-DO</h1>
          </div>

          <div className=' flex flex-col  w-3/5 mt-2'>
            <textarea rows={5} value={taskdata} onChange={handle_change} placeholder='write your task' ></textarea>
            <button onClick={submit_data} className='w-1/5 bg-gray-400 m-auto mt-3 mb-3 p-2'>Submit</button>
          </div>

          <div className="bg-red-600 w-3/5 flex flex-col justify-center items-center p-5" >
             <div>
               <h2 >YOUR TO-DO</h2>
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