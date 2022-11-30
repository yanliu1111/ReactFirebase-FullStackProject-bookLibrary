import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";

const BookPage = () => {
  const [book, setBook] = useState({});
  const params = useParams();

  const url = `https://example-data.draftbit.com/books/${params.id}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setBook(res.data);
      console.log(res.data);
    });
  }, [url]);

  return (
    <div className="rounded-div my-12 py-8">
      <div className="flex py-4">
        <img className="h-50" src={book.image_url} alt={book.title} />

        <div>
          <p className="text-3xl font-bold p-4">{book?.title}</p>
        </div>
      </div>
      {/* grid start */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="justify-between py-4">
            <p className="text-xl font-bold">Book genres</p>
            {book?.genres}
          </div>
          <div className="justify-between py-4">
            <p className="text-xl font-bold">Genre list</p>
            {book?.genre_list}
          </div>
        </div>
        {/* grid right */}
        <div>
          <p className="text-xl font-bold">Book Details</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-xl font-bold">Authors</p>
              {book?.authors}
            </div>
            <div>
              <p className="text-xl font-bold">Book Edition</p>
              {book?.edition}
            </div>
          </div>
          {/* seperate again */}
          <div className="flex justify-between py-4">
            <div>
              <p className="text-xl font-bold">Number of Pages</p>
              {book?.num_pages}
            </div>
            <div>
              <p className="text-xl font-bold">Book Rating</p>
              {book?.rating}
            </div>
          </div>
          <div className="flex justify-around p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaReddit />
            <FaGithub />
          </div>
        </div>
      </div>
      {/* Book description on the bottom */}
      <div className="py-4">
        <p className="text-xl font-bold">Book Description</p>
        {book?.description}
      </div>
    </div>
  );
};

export default BookPage;
