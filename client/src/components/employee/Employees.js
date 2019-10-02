import React, { useEffect } from 'react';
import Table from '../widgets/Table';
import FullScreenDialog from '../widgets/FullScreenDialog';
import Register from './Register';
import axios from 'axios';

export default function EmployeeList(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'fst_name' },
      { title: 'Status', field: 'ATTRIB_25' },
      { title: 'Pay Type', field: 'ATTRIB_23' },
      { title: 'Frequency', field: 'ATTRIB_22' },
      { title: 'Registration', field: 'FLG_02' },
    ],
    data: [
      // { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
      // { id: '2', name: 'Saad', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
    ],
    modalOpen: false,
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/employees`)
      .then(res => {
        const data = res.data.data
        setState({ ...state, data })
        console.log("DATA ", data)
      })
    console.log(state)
  }, []);

  const handleModalOpen = () => {
    setState({ ...state, modalOpen: true })
  }

  const handleModalClose = () => {
    setState({ ...state, modalOpen: false })
  }

  const handleRowClick = (event, rowData) => {
    props.history.push("/employee/" + rowData.row_id);
    console.log(event)
    console.log(rowData)
  }

  const handleDelete = (rowData) => {
    return new Promise((resolve) => {
      axios.delete(`http://localhost:4000/employees/${rowData.row_id}`);
      resolve()
      const data = [...state.data];
      data.splice(data.indexOf(rowData), 1);
      setState({ ...state, data });
    })
  }

  const handleUpdate = (newData, oldData) => {
    console.log(newData)
    return new Promise((resolve) => {
      axios.put(`http://localhost:4000/employees/${newData.row_id}`, {newData});
      resolve();
      const data = [...state.data];
      const index = data.indexOf(oldData);
      data[index] = newData;
      setState({ ...state, data });
      console.log("new Data ", newData)
      console.log("Old Data ", oldData)
    })
  }

  return (
    <React.Fragment>
      <Table
        title="Employees"
        columns={state.columns}
        data={state.data}
        exportButton={true}
        icon='add'
        tooltip='Add Employee'
        isFreeAction={true}
        handleModalOpen={(event) => handleModalOpen()}
        onRowClick={handleRowClick}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <FullScreenDialog
        open={state.modalOpen}
        handleClose={handleModalClose}
        component={<Register />}
        title='Add Employee'
      />
    </React.Fragment>
  );
}