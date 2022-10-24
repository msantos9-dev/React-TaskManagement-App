import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ActiveTodoList from "../components/ActiveTodoList";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

function ActiveTodos() {
  const [todos, setTodos] = React.useState<TodoModel[]>([]);
  const title: any = React.useRef();

  // get all todos not completed with respect to userid
  const getAllNotCompletedTodos = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setTodos(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  const saveTodo = async () => {
    if (title.current.value == "") {
      toast.info("Cannot add empty task");
      return;
    }
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.post(
        ApiConstants.TODO.ADD(userId),
        {
          title: title.current.value,
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      getAllNotCompletedTodos();
      title.current.value = "";
      toast.success("Task Added Successfully!!");
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  React.useEffect(() => {
    if (todos.length == 0) getAllNotCompletedTodos();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <span className="text-black text-2xl ">Enter Task Description : <input ref={title} className="mt-2 mr-2 p-1 rounded "></input>
          
          <button onClick={saveTodo} className="w-36 px-2 py-1 text-white mx-auto mb-12 mt-2 bg-black rounded hover:text-black hover:bg-yellow-400 text-2xl">
            Add Task
          </button>
          </span>

          {todos.map((todo) => {
            return (
              <ActiveTodoList
                key={todo.id}
                dateTime={todo.date}
                deleteTodo={async () => {
                  const response = await custom_axios.delete(ApiConstants.TODO.DELETE(todo.id), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                  getAllNotCompletedTodos();
                  toast.success("Task Deleted Successfully!!");
                }}
                markComplete={async () => {
                  const response = await custom_axios.patch(ApiConstants.TODO.MARK_COMPLETE(todo.id), {}, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                  getAllNotCompletedTodos();
                  toast.success("Task Marked Completed");
                }}
                id={todo.id}
                todo={todo.title}
              ></ActiveTodoList>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ActiveTodos;
