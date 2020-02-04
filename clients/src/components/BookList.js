import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";

import BookDetails from "./BookDetails";

const BookList = () => {
	const { loading, error, data } = useQuery(getBooksQuery);
	const [selected, setSelected] = useState(null);

	const displayBooks = () => {
		if (loading) {
			return <div>Loading Books...</div>;
		} else {
			if (error) {
				return <div>{error.message}</div>;
			}
			return data.books.map(book => {
				return (
					<li
						key={book.id}
						onClick={e => {
							setSelected(book.id);
						}}
					>
						{book.name}
					</li>
				);
			});
		}
	};

	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
			<BookDetails bookId={selected} />
		</div>
	);
};

export default BookList;
