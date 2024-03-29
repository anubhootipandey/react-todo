import React, { useEffect, useState } from 'react';
import "../App.css";

const TodoTask = ({ formData, setFormData }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedFormData = localStorage.getItem('key');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [setFormData]);

  const getFilteredData = () => {
    return formData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const handleDeleteTask = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1); // Remove the task at the specified index
    setFormData(updatedFormData);
    localStorage.setItem('key', JSON.stringify(updatedFormData));
  };

  const getArrayData = () => {
    const filteredData = getFilteredData();
    return filteredData.map((item, index) => (
      <tr key={index}>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.dueDate}</td>
        <td>{item.priority}</td>
        <td><button onClick={() => handleDeleteTask(index)}>Delete</button></td>
      </tr>
    ));
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className='todo-container'>
      <h3>List of todo item:</h3>
      <input
        type='search'
        placeholder='Search by task title or description'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      
      <table id='data'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getArrayData()}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTask;
