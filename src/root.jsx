import { Outlet, useLoaderData,Form } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import store from "./reducer/store";
import { Link } from "react-router-dom";
import { addTask, updateTask,deleteTask } from "./reducer/slicer";
import { useState } from "react";
import { redirect } from "react-router-dom";

export async function loader(){
  const tasks = store.getState();
  console.log(tasks);
  return tasks;
}

export async function action() {
  return store.dispatch(addTask({
    name: "unknow",
    content: "unknow",
    isDone: false,
    id: crypto.randomUUID()
}))
}

export default function Root() {
    const handleCheckboxChange = (task, isDone) => {
      store.dispatch(updateTask({
        id:task.id,
        name:task.name,
        content:task.content,
        isDone: isDone,
      }))
    }

    const handleFilterChange = (e) => {
      setFilter(e.target.value);
    }
   
    const [filter, setFilter] = useState('all');
    const {tasks} = useLoaderData();

    const filteredTasks = tasks.filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'non_completed') return task.isDone === false;
      if (filter === 'completed') return task.isDone === true;
    });
    console.log(tasks);
    console.log(filteredTasks);

    return (
      <>
      
        <div id="sidebar">
          <div>
            <form id="search-form" role="search">
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
             <label>
            <span>Filter:</span>
            <select id="filter"  onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="non_completed">Non Completed</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          </div>   
          <nav>
          {tasks.length ? (
            <ul>
              {filteredTasks.map((task) => (
                <li key={task.id}>
                  <Link to={`tasks/${task.id}`}>                   
                      <>
                        {task.name}
                      </>                                  
                  </Link>
                  <div>
          <Form action="edit">
          <Link to={`tasks/${task.id}/edit`}>                   
              <button type="submit">Edit</button>                        
          </Link>
          </Form>
           
          <form
            method="delete"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }else{
                console.log(1);
                  const index = tasks.findIndex(e => e.id === task.id);
                  console.log(index);
                  store.dispatch(deleteTask(index));
                  return redirect("/");
              }
            }}
          >        
            <button type="submit">Delete</button>                 
          </form>
        
          <label>
          
        <span>is done</span>
          <input
            type="checkbox"
            name="isdone"            
            defaultChecked={task.isDone}
            onChange={(e) => handleCheckboxChange(task,e.target.checked)}
          />
      </label>
        </div>
                </li>
              ))}             
            </ul>
          ) : (
            <p>
              <i>No task</i>
            </p>
          )}
        </nav>   
        </div>
        <div>
            <Outlet/>
        </div> 
        </>
    )
}

