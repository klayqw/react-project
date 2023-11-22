import { redirect } from "react-router-dom";
import { deleteTask } from "../reducer/slicer";
import store from "../reducer/store";

export async function action({ params }) {
    console.log("delete");
    console.log(params.taskid);
    const arr = store.getState()
    store.dispatch(deleteTask(arr.tasks.findIndex(e => e.id === params.taskid)));
    return redirect("/");
  }