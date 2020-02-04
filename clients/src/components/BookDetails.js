import React from "react";
import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";

const BookDetails = ({ bookId }) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { bookId }
	});
	const displayBookDetails = () => {
		if (loading) {
			return <div>Loading Book Details...</div>;
		} else {
			if (error) {
				return <div>{error.message}</div>;
			}
			const { book } = data;
			if (book) {
				return (
					<div>
						<h2>{book.name}</h2>
						<p>Genre &nbsp; {book.genre}</p>
						<p>Author &nbsp; {book.author.name} - {book.author.age} years</p>
						<p>- All books by this author:</p>
						<ul className="other-books">
							{book.author.books.map(item => {
								return <li key={item.id}>{item.name} - {item.genre}</li>;
							})}
						</ul>
					</div>
				);
			} else {
				return <div>No book selected...</div>;
			}
		}
	};

	return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
