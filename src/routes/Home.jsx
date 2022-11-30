import React from "react";
import { BookSearch } from "../components/BookSearch";

export const Home = ({ books }) => {
  // console.log(books);

  return (
    <div>
      <BookSearch books={books} />
    </div>
  );
};
