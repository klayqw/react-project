import { Form } from "react-router-dom";
import { useSelector } from "react-redux";

function Task({taskData}) {
    const taskdata = taskData;
    return (

        <div id="task">
        <div>
        <h1>
            {taskdata.name}
        </h1>

        <p>         
            {taskdata.content}
        </p>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
      </div>
    )
}

export default Task;