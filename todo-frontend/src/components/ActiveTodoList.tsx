import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface ActiveTodoListProps {
  id: number;
  todo: string;
  dateTime: string;
  markComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ActiveTodoList = (props: ActiveTodoListProps) => {
  return (
    <li className="border-gray-400  flex flex-row">
      <div className="select-none bg-white flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded border-2 p-hover:shadow-2xl border-black">
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">{props.todo}</div>
          <div className="font-medium">{props.dateTime}</div>
        </div>
        <button onClick={() => props.markComplete(props.id)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded">
        <FontAwesomeIcon className="h-6 w-6" icon={faCalendarCheck} /> 
        </button>
        <button onClick={() => props.deleteTodo(props.id)} className="bg-black hover:bg-gray-700 ml-2 text-white font-bold py-2 px-2 rounded">
        <FontAwesomeIcon className="h-6 w-6" icon={faTrashCan} /> 
        </button>
      </div>
    </li>
  );
};

export default ActiveTodoList;
