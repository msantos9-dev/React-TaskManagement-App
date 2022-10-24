import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface CompeletedTodosProps {
  id: number;
  todo: string;
  dateTime: string;
  deleteTodo: (id: number) => void;
}

const CompletedTodoList = (props: CompeletedTodosProps) => {
  return (
    <li className="border-gray-400  flex flex-row">
      <div className="select-none bg-white flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded border-2 p-2 hover:shadow-2xl border-black">
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">{props.todo}</div>
          <div className="font-medium">{props.dateTime}</div>
        </div>
        <button onClick={() => props.deleteTodo(props.id)} className="bg-black hover:bg-gray-700 ml-2 text-white font-bold py-2 px-4 rounded">
        <FontAwesomeIcon className="h-4 w-4" icon={faTrashCan} /> 
        </button>
      </div>
    </li>
  );
};

export default CompletedTodoList;
