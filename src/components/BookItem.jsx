import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export const BookItem = ({ book }) => {
  return (
    <tr className="h-[80px] boder-b overflow-hidden">
      <td>
        <FaRegHeart />
      </td>
      <td>{book.id}</td>
      <td>
        <div>
          <img className="w-13 mr-2" src={book.image_url} alt={book.title} />
        </div>
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
