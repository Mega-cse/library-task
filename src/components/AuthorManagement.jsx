import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AuthorManagement = () => {
  const apiUrl = 'https://669932552069c438cd7197b7.mockapi.io/api/author';
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    dateofbirth: '',
    biography: ''
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Author name is required'),
    dateofbirth: Yup.date().required('Date of birth is required'),
    biography: Yup.string().required('Biography is required')
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(apiUrl);
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleAddOrUpdateAuthor = async (values, { resetForm }) => {
    try {
      if (editingAuthor) {
        await axios.put(`${apiUrl}/${editingAuthor.id}`, values);
        setEditingAuthor(null);
      } else {
        await axios.post(apiUrl, values);
      }
      resetForm();
      fetchAuthors();
      setInitialValues({
        name: '',
        dateofbirth: '',
        biography: ''
      });
    } catch (error) {
      console.error('Error adding/updating author:', error);
    }
  };

  const handleEditAuthor = (author) => {
    setEditingAuthor(author);
    setInitialValues({
      name: author.name,
      dateofbirth: author.dateofbirth,
      biography: author.biography
    });
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Authors Management</h2>
      <Formik initialValues={initialValues} enableReinitialize validationSchema={validationSchema} onSubmit={handleAddOrUpdateAuthor}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Name:</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-4">
                <label>Date of Birth:</label>
                <Field type="date" name="dateofbirth" className="form-control" />
                <ErrorMessage name="dateofbirth" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-4">
                <label>Biography:</label>
                <Field as="textarea" name="biography" className="form-control" />
                <ErrorMessage name="biography" component="div" className="text-danger" />
              </div>
              <div className="form-group col-md-2">
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  {editingAuthor ? 'Update Author' : 'Add Author'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-4">
        <h3>Author List</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Biography</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.dateofbirth}</td>
                <td>{author.biography}</td>
                <td>
                  <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditAuthor(author)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AuthorManagement;