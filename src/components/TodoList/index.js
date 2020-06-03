import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
};

// set giá trị mặc định
TodoList.defaultProps = {
    todos: [],
    onTodoClick: null,
}

function TodoList(props) {
    const { todos, onTodoClick } = props;

    function handleClick(todo) {
        if (onTodoClick) {
            onTodoClick(todo);
        }
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <div>
                    <li key={todo.id} onClick={() => handleClick(todo)}>
                        {todo.title}
                    </li>
                    
                </div>
            ))}
        </ul>
    );
}

export default TodoList;