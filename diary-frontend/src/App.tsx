import React from 'react';
import styles from './styles/App.module.css';
import useSwr from "swr";
import fetcher from './services/fetcher';

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

function App() {
  const { data } = useSwr<User | null> (
    "http://localhost:8585/api/curUser",
    fetcher
  );

  return (
    <div>
      { data 
        ? (<div>Welcome! {data.name}</div>) 
        : (<div className={styles.container}>Please login</div>)}
    </div>
  );
}

export default App;
