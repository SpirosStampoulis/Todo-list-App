import React, { useEffect, useState } from 'react';
import Button from './Button';
import Todo from './Todo';

const uuidv1 = require('uuid/v1');

let existingtodos;

function Form(props) {
    
    const [todos,setTodos] = useState([]);
    const [submitted,setSubmitted] = useState(false);
    const [value,setValue] = useState("");

    useEffect(() => {
    
        existingtodos = JSON.parse(localStorage.getItem('todos')) || [];

        // CHECK IF THERE IS ANYTHING IN LOCAL STORAGE!!! ====
        if(localStorage.getItem('todos') !== null){

            // setting state at beginning if there is anything in local storage.
            setTodos({todos: existingtodos});
        }
        
      }, []);

    // EDIT ITEM =====
    const editToDo = (id) => {
        const todo = todos.filter((todo)=> {
            if(todo.id === id){
                // toggle from false/true
                todo.edit = !todo.edit;
            }
            return todo;
        })
        setTodos({todos: todo}); 
    }

      // DONE ITEM ====
    const completeToDo = id => {
       
        const todo = todos.filter((todo)=> {
            if(todo.id === id){
                todo.complete = !todo.complete;
            }
            return todo;
        })
        setTodos({todos: todo});

        // updating localStorage
        addLocalStorage(todo);
    }

    const updateItem = (data) => {
       
        const {item, id } = data;
    
        const newtodo = todos.map((todo)=> {
            if(todo.id === id){
               todo.item = item;
               todo.edit = !todo.edit;
            }
            return todo;
        })
        setTodos({todos: newtodo});

         // updating localStorage
        addLocalStorage(newtodo);
    }

    // DELETE ITEM =====
    const removeToDo = (id) => {
        
        //filter through the todos and remove the one passed into the function...
        const updatedtodos = todos.filter((todo, i) => id !== todo.id)
        // //set new updated todo with the removed one gone.
        setTodos({todos: updatedtodos});

    }
    
    //Add to local storage function
    const addLocalStorage = (arr) => {
        localStorage.setItem('todos', JSON.stringify(arr));
    }

    // DELETES EVERYTHING IN STATE AND LOCALSTORAGE ===
    const removeAll = () => {
        setTodos([]);
        setSubmitted(false);
        localStorage.clear();
    }

    const handleChange = (e) => {
        
        setValue({value: e.target.value})
    }
    // CREATE ITEM =====
    const handleSubmit = (e) => {
        setSubmitted(true);
        e.preventDefault()
        console.log('to-do add been added!')

        let data = {
            item: value,
            complete: false,
            edit: false,
            id: uuidv1()
        }

        this.setState({
            // spread operator adds new object to exsitiing array.
            todos: [...todos, data ]
        });

        existingtodos.push(data);
        //Add to local storage function
        addLocalStorage(existingtodos);
        
        setValue({value: ""});
    }


 
    return (
      <div>
          <form className="addtodo" onSubmit={handleSubmit}>
            <div className="formgroup">
                <label>Add todo <i className="fas fa-plus"></i></label>
                <input
                    type="text"
                    placeholder="Enter task..."
                    value={value}
                    required
                    onChange={handleChange}
                    />
            </div>
            <input type="submit" className="btn" value="Add Todo +"/>
            </form>

            <div id="to-do-list">
                <h2>Your Todos</h2>
                
                {todos.length === 0 ? <p>List is empty try adding a todo</p> : 
                <React.Fragment>
                <ul>{ todos.map((todo, i) => (
                    
                    // creating a todo Component for each new item, passing all functions
                    <Todo
                        key={todo.id}
                        completeToDo={completeToDo}
                        updateItem={updateItem}
                        editToDo={editToDo}
                        removeToDo={removeToDo}
                        todoObject={todo}
                    />
                    ))
                
                }
                </ul>
                <div className="clearAll">
                    <Button name="Clear All Todos" func={removeAll} nameClass="clear" />
                </div>
                </React.Fragment>
                }
                
            </div>
      </div>
    )
}


export default Form;