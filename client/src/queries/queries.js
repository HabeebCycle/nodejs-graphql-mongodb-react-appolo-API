import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

export const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

export const addBookMutation = gql`
	mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

export const addAuthorMutation = gql`
	mutation addAuthor($name: String!, $age: Int) {
		addBook(name: $name, age: $age) {
			name
			id
		}
	}
`;

export const getBookQuery = gql`
	query($bookId: ID) {
		book(id: $bookId) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					id
					name
					genre
				}
			}
		}
	}
`;

export const getAuthorQuery = gql`
	query($authorId: ID) {
		book(id: $authorId) {
			id
			name
			age
			books {
				id
				name
				genre
			}
		}
	}
`;
