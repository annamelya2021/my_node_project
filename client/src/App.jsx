import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate, RouterProvider } from 'react-router-dom';
// import { register, login, getPosts, createPost, addComment, getComments,deleteComment } from './utils/fetch.js';
// import { saveToken, getToken, removeToken } from './utils/local.js';
import routing from './routes/router.jsx';
// import './App.css';

const App = () => {

  return (
    <>
    <RouterProvider router={routing} />
    </>
    
  );
};
 export default App; 
