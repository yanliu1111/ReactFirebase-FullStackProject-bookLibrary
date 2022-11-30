import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import BookPage from "./routes/BookPage";
import axios from "axios";
import Footer from "./components/Footer";
import AuthContextProvider from "./context/AuthContext";
function App() {
  const [books, setBooks] = useState([]);
  let url = "https://example-data.draftbit.com/books?_limit=10";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path=":id" />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
