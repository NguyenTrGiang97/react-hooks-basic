import React, { useState, useEffect } from 'react';
import './App.scss';
import ColorBox from './components/ColorBox/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';


function App() {

   const [todoList, setTodoList] = useState([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' },
   ]);

   // create state save postlist
   const [postList, setPostList] = useState([]);
   // sử dụng dependenci empty array, để call 1 lần trong callback và clean up cũng chỉ chạy 1 lần khi unmount
   useEffect(() => {
      async function fetchPostList() {
         try {
            const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            // console.log({responseJSON});

            const { data } = responseJSON;
            console.log(data);

            setPostList(data);
         } catch (error) {
            console.log(error.message)
         }
      }

      fetchPostList();
   }, [])


   function handleTodoClick(todo) {
      //console.log(todo);
      // tìm id của từng phần tử
      const index = todoList.findIndex(x => x.id === todo.id);
      // console.log(index);
      // index < 0 thì k làm gì cả
      if (index < 0) return;
      // clone ra 1 array mới để tránh làm thay đổi mảng hiện tại
      const newTodoList = [...todoList];
      // cắt 1 phần tử tại vị trí index
      newTodoList.splice(index, 1);
      // cập nhật lại todo
      setTodoList(newTodoList);
   }

   function handleTodoFormSubmit(formValues) {
      console.log(formValues);
      const newTodo = {
         id: todoList.length + 3,
         ...formValues,
      }

      const newTodoList = [...todoList];
      newTodoList.push(newTodo);
      setTodoList(newTodoList);
   }

   return (
      <div className="App">
         <h1>Hello ^__^</h1>
         {/* <ColorBox /> */}

         {/* <TodoList todos={todoList} onTodoClick = {handleTodoClick} /> */}

         {/* <TodoForm  onSubmit={handleTodoFormSubmit} /> */}

         <PostList posts={postList} />
      </div>
   );
}

export default App;
