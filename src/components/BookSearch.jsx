import { onSnapshot, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { BookItem } from "./BookItem";
import ReactPaginate from "react-paginate";

export const BookSearch = ({ books }) => {
  const { user } = useAuth();

  const [searchText, setSearchText] = React.useState("");
  const [offset, setOffset] = useState(0);
  const [userData, setUserData] = useState();
  const number = 8;

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setUserData(doc.data());
    });
  }, [user?.email]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * number) % books.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setOffset(newOffset);
  };

  return (
    <div className="rounded-div my-4 ">
      <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h1 className="text-2xl font-bold my-2">Search Book</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            type="text"
            placeholder="Search a Book"
          />
        </form>
      </div>

      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">ID</th>
            <th className="text-center">Book Image</th>
            <th>Book Title</th>
            <th>Authors</th>
            <th className="hidden md:table-cell">Rating</th>
          </tr>
        </thead>

        <tbody>
          {books
            .filter((value, index) => {
              if (!(index >= offset && index < offset + number)) return false;

              if (searchText === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              }
            })
            .map((book) => (
              <BookItem key={book.id} book={book} userData={userData} />
            ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={books.length / number}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      {/* <div
        className="p-4 hover:text-accent"
        onClick={() => {
          setOffset(offset - number);
        }}
      >
        prev
      </div>
      <div
        className="p-4 hover:text-accent"
        onClick={() => {
          setOffset(offset + number);
        }}
      >
        next
      </div> */}
    </div>
  );
};
