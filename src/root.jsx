import { Outlet, useLoaderData,Form } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import store from "./reducer/store";
import { Link } from "react-router-dom";
import { addTask } from "./reducer/slicer";

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
    const {tasks} = useLoaderData();
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
          </div>   
          <nav>
          {tasks.length ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <Link to={`tasks/${task.id}`}>                   
                      <>
                        {task.name}
                      </>                                  
                  </Link>
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

