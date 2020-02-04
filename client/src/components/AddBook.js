import React, { useState, useRef } from "react";
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery
} from "../queries/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const AddBook = () => {
	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");
    
    const refNameInput = useRef();
    const refGenreInput = useRef(); 
    const refSelInput = useRef();

	const { loading, error, data } = useQuery(getAuthorsQuery);
	//const [addBook, { data }] = useMutation(addBookMutation);
	const [addBook] = useMutation(addBookMutation);

	const displayAuthors = () => {
		if (loading) {
			return <option disabled>Loading Authors...</option>;
		} else {
			if (error) {
				return "";
			}
			return data.authors.map(author => {
				return (
					<option value={author.id} key={author.id}>
						{author.name}
					</option>
				);
			});
		}
	};

	const submitForm = e => {
		e.preventDefault();
		addBook({
			variables: {
				name,
				genre,
				authorId
			},
			refetchQueries: [{ query: getBooksQuery }]
        });
        refNameInput.current.value = "";
        refGenreInput.current.value = "";
        refSelInput.current.value = "";
	};

	return (
		<form id="add-book" onSubmit={submitForm}>
			<div className="field">
				<label>Book Name:</label>
				<input type="text" ref={refNameInput} onChange={e => setName(e.target.value)} />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" ref={refGenreInput} onChange={e => setGenre(e.target.value)} />
			</div>

			<div className="field">
				<label>Author:</label>
				<select onChange={e => setAuthorId(e.target.value)} ref={refSelInput}>
					<option value="">Select Author</option>
					{displayAuthors()}
				</select>
			</div>

			<button>+</button>
		</form>
	);
};

export default AddBook;
