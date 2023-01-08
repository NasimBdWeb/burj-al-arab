import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  const [bookings, setBookinigs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/bookinglist?email=" + loggedInUser.email, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }) 
      .then((res) => res.json())
      .then((data) => setBookinigs(data));
  }, []);

  return (
            <div>
            <h3>Bookings Total : {bookings.length}</h3>
            {bookings.map((book) => (
                <li>
                {book.name} from:{new Date(book.checkin).toDateString("dd/MM/yyyy")}{" "}
                to:{new Date(book.checkout).toDateString("dd/MM/yyyy")}
                </li>
            ))}
            </div>
  );
};

export default Bookings;
