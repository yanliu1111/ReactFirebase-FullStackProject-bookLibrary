import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const BookItem = ({ book }) => {
  const [savedBook, setSavedBook] = useState(false);
  const { user } = useAuth();
  const bookPath = doc(db, "users", `${user?.email}`);

  const saveBook = async () => {
    if (user?.email) {
      setSavedBook(true);
      await updateDoc(bookPath, {
        readList: arrayUnion({
          id: book.id,
          title: book.title,
          image: book.image_url,
          authors: book.authors,
        }),
      });
    } else {
      alert("Please sign in to save a book to your read list");
    }
  };
  // if readlist has usr.book.id, color keeps red, in Search page

  return (
    <tr className="h-[80px] boder-b overflow-hidden">
      <td onClick={saveBook}>
        {savedBook ? (
          <FaHeart style={{ color: "red", fontSize: "20px" }} />
        ) : (
          <FaRegHeart style={{ color: "green", fontSize: "20px" }} />
        )}
      </td>
      <td>{book.id}</td>
      <td>
        <Link to={`/book/${book.id}`}>
          <div>
            <img
              className="h-40 mr-2 hover:scale-105 ease-in-out duration-300"
              src={book?.image_url}
              alt={book.title}
            />
          </div>
        </Link>
      </td>
      <td>{book.title}</td>
      <td>{book.authors}</td>
      <td className="hidden md:table-cell">
        {book.rating > 4 ? (
          <p className="text-green-600">{book.rating}</p>
        ) : (
          <p className="text-red-600">{book.rating}</p>
        )}
      </td>
    </tr>
  );
};
