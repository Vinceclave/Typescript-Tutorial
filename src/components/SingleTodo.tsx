import React, { useState, useRef, useEffect} from 'react'
import { Todo } from "./Model"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './style.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index:number,
    todo: Todo,
    todos: Array<Todo>,
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>,
}

const SingleTodo = ({ index, todo, todos, setTodos }:Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, todo: editTodo } : todo)
        )
        setEdit(false)
    }


    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) =>
               todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        )
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const inputRef = useRef<HTMLInputElement>(null)
    
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            { (provided, snapshot) => (
            <form 
                className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
                onSubmit={(e) => handleEdit(e, todo.id)} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                
            >
            {edit ? (
                <input
                  ref={inputRef}
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="todos__single--text"
                />
              ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
              ) : (
                <span className="todos__single--text">{todo.todo}</span>
              )}
            <div>
                <span 
                    className='icon' 
                    onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit)
                        }}
                    }
                >
                    <AiFillEdit />
                </span>
                <span className='icon' onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className='icon' onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>


            )}

        </Draggable>
    )
}

export default SingleTodo
