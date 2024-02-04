import React from 'react'
import './style.css'
import { Todo } from "./Model"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
    completedTodos: Array<Todo>
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos}) => {
  return <div className='container'>
     <Droppable droppableId='TodosList'>
        { (provided, snapshot) => (
          <div 
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={`todos__heading ${snapshot.isDraggingOver ? "dragactive" : ""}`}>
              Actives Tasks
            </span>
            {
              todos.map((todo, index) => (
                  <SingleTodo 
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos} />
              ))
            }
            {provided.placeholder}
        </div>


        )}
     </Droppable>
        
     <Droppable droppableId='TodosRemove'>
        { (provided, snapshot) => (
          <div 
            className='todos remove'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={`todos__heading ${snapshot.isDraggingOver ? "dragremove" : ""}`}>
              Actives Tasks
            </span>
            {
              completedTodos.map((todo, index) => (
                  <SingleTodo 
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos} />
              ))
            }
            {provided.placeholder}
        </div>
        )}
     </Droppable>


  </div>
}

export default TodoList
