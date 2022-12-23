import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const SaveBook = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      console.log("Current data: ", doc.data()?.readList);
      if (doc.data()?.readList === undefined) {
        console.log("need to create readlist");
        giveUserEmptyBooklist(user?.email);
      }
      setBooks(doc.data()?.readList);
    });
  }, [user?.email]);

  const giveUserEmptyBooklist = async (email) => {
    const bookPath = doc(db, "users", `${email}`);

    await setDoc(bookPath, {
      readList: [],
    });
  };

  const bookPath = doc(db, "users", `${user?.email}`);
  const deleteBook = async (passedid) => {
    try {
      const result = books.filter((item) => item.id !== passedid);
      await updateDoc(bookPath, {
        readList: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("#######", books);
  return (
    <div>
      {!books || books.length === 0 ? (
        <p>
          You don't have any books saved. Please save a book to add it to your
          read list.<Link to="/">Click here to search books.</Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Book Id</th>
              <th className="text-left">Book</th>
              <th className="text-left hidden sm:table-cell">Authors</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.id} className="h-[60px] overflow-hidden">
                <td>{book?.id}</td>
                <td>
                  <Link to={`/book/${book.id}`}>
                    <div className="flex items-center">
                      <img src={book?.image} className="w-16 mr-4" alt="/" />
                      <div>
                        {/* {JSON.stringify(book)} */}
                        <p className="hidden sm:table-cell">{book?.title}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="hidden sm:table-cell">
                  <p className="flex items-center">{book?.authors}</p>
                </td>
                <td className="pl-8">
                  <AiOutlineClose
                    onClick={() => deleteBook(book.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SaveBook;
