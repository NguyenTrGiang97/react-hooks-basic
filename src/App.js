import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import './App.scss';
import ColorBox from './components/ColorBox/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagi from './components/Pagination/index';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';

function App() {

   const [todoList, setTodoList] = useState([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' },
   ]);

   // create state save postlist
   const [postList, setPostList] = useState([]);

   // Pagination
   const [pagination, setPagination] = useState({
      _page: 1,
      _limit: 10,
      _totalRows: 1
   }) 

   // dependencies 
   const [filter, setFilter] = useState({
      _limit: 10,
      _page: 1,
      title_like: '',
   })

   function handlePageChangee(newPage) {
      console.log('New Page: ', newPage);
      setFilter({
         ...filter,
         _page: newPage
      })
      
   }

   // sử dụng dependenci empty array, để call 1 lần trong callback và clean up cũng chỉ chạy 1 lần khi unmount
   useEffect(() => {
      async function fetchPostList() {
         try {
            // object -> string : _limit=10&_page=1'
            const paramString = queryString.stringify(filter);
            console.log("paramString: "+paramString);
            
            //const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
            const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            console.log({responseJSON});

            const { data, pagination } = responseJSON;
            console.log(data);
             
            setPostList(data);
            setPagination(pagination);

         } catch (error) {
            console.log(error.message)
         }
      }

      fetchPostList();
   }, [filter])


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

   function handleFiltersChange(newFilters) {
      console.log("new filters: ", newFilters);
      setFilter({
         ...filter,
         _page: 1,
         title_like: newFilters.searchTerm
      })
      
   }

   return (
      <div className="App">
         <h1>Hello ^__^</h1>
         {/* <ColorBox /> */}

         {/* <TodoList todos={todoList} onTodoClick = {handleTodoClick} /> */}

         {/* <TodoForm  onSubmit={handleTodoFormSubmit} /> */}
         {/* <PostFiltersForm onSubmit={handleFiltersChange} />
         <PostList posts={postList} />
         <Pagi pagination={pagination} onPageChange={handlePageChangee} /> */}
      
         <Clock />
      </div>
   );
}

export default App;