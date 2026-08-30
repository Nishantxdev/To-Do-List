import { useState, useEffect } from 'react'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaBeer } from 'react-icons/fa';

import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todo1 = JSON.parse(localStorage.getItem("todos"))
      setTodos(todo1)
    }
  }, [])


  const saveToLS = (updateTodo) => {
    localStorage.setItem("todos", JSON.stringify(updateTodo))
  }


  
  const toggleFinished = () => {
    setshowfinished(!showfinished)
  }



  const handleEdit = (id) => {
    let t = todos.filter((i) => {
      return i.id === id
    });
    
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)


  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }



  const handleAdd = () => {
    let a = { id: uuidv4(), todo, isCompleted: false}
    setTodos([...todos, a])
    
    setTodo("")
    saveToLS([...todos, a])

  }

  const handleCheckbox = (e) => {
    
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id
    })
  
    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)

  }


  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">

        <h1 className='font-bold text-center text-3xl'>iTask - Manage Your Todos At One Place</h1>

        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className='text-2xl font-bold'>Add a Todo</h2>

          <div className="flex">

            <input onChange={handleChange} value={todo} className='w-full rounded-full px-5 py-1 bg-white ' type="text" />

            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-600 p-4 py-2 text-sm font-bold text-white cursor-pointer mx-2 rounded-full'>Save</button>
          </div>
        </div>

        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
        <hr className='my-2' />

        <h2 className='text-2xl font-bold'>Your Todos</h2>

        <div className="todos">
          
          {(!showfinished && todos.every(todo => todo.isCompleted)) && <div className='m-5'>No Todos to display</div>}

          {showfinished && !todos.some(todo => todo.isCompleted) && (
          <div className='m-5'>No finished Todos to display</div>
          )}
          {todos.map(item => {

            return (showfinished ? !item.isCompleted : item.isCompleted) || <div key={item.id} className="todo flex  my-3 justify-between">

              <div className='flex gap-5 '>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />

                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>

              </div>
              <div className="buttons flex h-full">

                <button onClick={(e) => handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm  text-white rounded-md mx-1 cursor-pointer'><FaEdit /></button>

                <button onClick={(e) => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 cursor-pointer'><MdDelete /></button>

              </div>

            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
