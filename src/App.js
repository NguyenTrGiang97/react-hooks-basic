import React, { useState } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox/ColorBox';
import TodoList from './components/TodoList';


function App() {

   const [todoList, setTodoList] = useState([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' },
   ]);

   function handleTodoClick(todo) {
      //console.log(todo);
      // tìm id của từng phần tử
      const index = todoList.findIndex(x => x.id === todo.id );
      // console.log(index);
      // index < 0 thì k làm gì cả
      if(index <0) return;
      // clone ra 1 array mới để tránh làm thay đổi mảng hiện tại
      const newTodoList = [...todoList];
      // cắt 1 phần tử tại vị trí index
      newTodoList.splice(index, 1);
      // cập nhật lại todo
      setTodoList(newTodoList);
   }

   return (
      <div className="App">
         <h1>Hello ^__^</h1>
         {/* <ColorBox /> */}

         <TodoList todos={todoList} onTodoClick = {handleTodoClick} />
      </div>
   );
}

export default App;
