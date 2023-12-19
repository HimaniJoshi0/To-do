import React, { useState, useEffect } from "react";

const App = () => {
  const [tododata, setTodoData] = useState([]);
  const [taskdata, setTaskData] = useState("");
  const [editindex, setEditIndex] = useState(null);
  const [indexes, setIndexes]= useState([]);
  const [check, setCheck] = useState(false);

  const handleChange = (e) => {
    setTaskData(e.target.value);
  };

  const submitData = () => {
    if (editindex !== null) {
      const updateList = [...tododata];
      updateList[editindex] = taskdata;
      setTodoData(updateList);
      setEditIndex(null);
      setTaskData("");
    } else {
      setTodoData([...tododata, taskdata]);
      localStorage.setItem("tododata", JSON.stringify([...tododata, taskdata]));
      setTaskData("");
    }
  };

  const deleteTask = (index) => {
    const newData = [...tododata];
    newData.splice(index, 1);
    setTodoData(newData);
    localStorage.setItem("tododata", JSON.stringify(newData));
  };

  const editTask = (index) => {
    setTaskData(tododata[index]);
    setEditIndex(index);
  };

  const toggleCheck=(index)=>{
    console.log("hello")
        const updateIndex= indexes.includes(index)? indexes.filter((i)=>i !==index):([...indexes, index]);
        setIndexes(updateIndex);
  }

  const taskDone=()=>{
    const newData = [...tododata];
    const newList = newData.filter((ele,i)=>{
       return !indexes.includes(i);
    })
    console.log(newList)
    setTodoData(newList);
    localStorage.setItem("tododata", JSON.stringify(newList));
  }

  useEffect(() => {
    const storedData = localStorage.getItem("tododata");
    try {
      if (storedData !== undefined && storedData !== null) {
        setTodoData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  }, []);

  const renderData = (item, index) => {
    return (
      <div className="flex bg-white w-4/5 mt-5 justify-between p-2" key={index}>
        <p>{item}</p>
        <div className="flex w-1/5 justify-between">
        <i class="fa-solid fa-pen" onClick={editTask.bind(this, index)}></i>
          <i
            className="fa-solid fa-trash"
            onClick={deleteTask.bind(this, index)}
          ></i>
          <input type="checkbox" 
          
          onChange={()=>{setCheck(true); toggleCheck(index);}} >
            </input>   
        </div>
      </div>
      
    );
  };

  return (
    <>
      <div className="h-[100vh] bg-red-200  flex flex-col items-center ">
        <div className="flex flex-col items-center  w-4/5 ">
          <div className="text-4xl font-bold">
            <h1>YOUR TO-DO</h1>
          </div>

          <div className=" flex flex-col  w-3/5 mt-2">
            <textarea
              rows={5}
              value={taskdata}
              onChange={handleChange}
              placeholder="write your task"
            ></textarea>
            <button
              onClick={submitData}
              className="w-1/5 bg-gray-400 m-auto mt-3 mb-3 p-2"
            >
              Submit
            </button>
          </div>

          <div className="bg-red-600 w-3/5 flex flex-col justify-center items-center p-5">

            {tododata.length > 0 && 
            <h2>YOUR LIST</h2>
            }
            {tododata.length>0 ?
            (tododata.map(renderData)):
            (<h2>YOUR LIST IS EMPTY</h2>)}
          </div>
        
        { check &&
          <button className="bg-green-600  p-2  mt-3" onClick={taskDone}>DONE</button>
        }
          
        </div>
      </div>
    </>
  );
};

export default App;
