import React, { useState } from 'react'
import "./App.css"

const App = () => {
  const [data, UpdateData] = useState([]);
  const [task_data, Updatetask_Data] = useState("");

  const handle_change = (e) => {
    Updatetask_Data(e.target.value);
  }

  const submit_data = (e) => {
    UpdateData([...data, task_data]);
    Updatetask_Data("");
  }

  const delete_task=(index)=>{
    const newData= [...data];
    newData.splice(index,1);
        UpdateData(newData);
  }

  return (
    <>
      <div className='to-do_wrapper'>
        <div className='to-do'>

          <div className='heading'>
            <h1>YOUR TO-DO</h1>
          </div>

          <div className='task'>
            <textarea rows={5} value={task_data} onChange={(e) => handle_change(e)} placeholder='write your task' ></textarea>
            <button onClick={(e) => submit_data(e)}>Submit</button>
          </div>


        {
        <div className='your_list' >
             <div>
               <h2>TASK TO-DO</h2>
             </div>
       {data && data.map((item, index) => {
         return (
             <div className='list' key={index}>
               <p>{item}</p>
               <i class="fa-solid fa-trash" onClick={(index)=>delete_task(index)}></i>
             </div>  
         )
       })
       }
       </div>

        }

         



        </div>
      </div>
    </>
  )
}

export default App