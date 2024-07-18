// BookManagement.jsx
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const BookManagement = () => {
  const apiUrl = 'https://669932552069c438cd7197b7.mockapi.io/api/book';
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: '',
    author: '',
    isbn: '',
    year: '',
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    year: Yup.string().required('Year is required'),
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddOrUpdateBook = async (values, { resetForm }) => {
    try {
      if (editingBook) {
        await axios.put(`${apiUrl}/${editingBook.id}`, values);
        setEditingBook(null);
      } else {
        await axios.post(apiUrl, values);
      }
      resetForm();
      fetchBooks();
      setInitialValues({
        title: '',
        author: '',
        isbn: '',
        year: '',
      });
    } catch (error) {
      console.error('Error adding/updating book:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setInitialValues({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      year: book.year,
    });
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Books Management</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize 
        validationSchema={validationSchema}
        onSubmit={handleAddOrUpdateBook}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Title:</label>
                <Field type="text" name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-3">
                <label>Author:</label>
                <Field type="text" name="author" className="form-control" />
                <ErrorMessage name="author" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-3">
                <label>ISBN:</label>
                <Field type="text" name="isbn" className="form-control" />
                <ErrorMessage name="isbn" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-3">
                <label>Year:</label>
                <Field type="text" name="year" className="form-control" />
                <ErrorMessage name="year" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-2">
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  {editingBook ? 'Update Book' : 'Add Book'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-4">
        <h3>Book List</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.year}</td>
                <td>
                  <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditBook(book)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
