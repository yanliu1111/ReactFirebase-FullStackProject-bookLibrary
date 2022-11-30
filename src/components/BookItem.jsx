import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
export const BookItem = ({ book }) => {
  return (
    <tr className="h-[80px] boder-b overflow-hidden">
      <td>
        <FaRegHeart />
      </td>
      <td>{book.id}</td>
      <td>
        <Link to={`/book/${book.id}`}>
          <div>
            <img
              className="h-40 mr-2 hover:scale-105 ease-in-out duration-300"
              src={book.image_url}
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
