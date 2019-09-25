import React from 'react';
import Table from '../widgets/Table';
import FullScreenDialog from '../widgets/FullScreenDialog';
import Register from './Register';

export default function EmployeeList(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Status', field: 'status' },
      { title: 'Pay Type', field: 'pay_type' },
      { title: 'Frequency', field: 'frequency' },
      { title: 'Registration', field: 'registration' },
    ],
    data: [
      { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
      { id: '2', name: 'Saad', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
    ],
    modalOpen: false,
  });

  const handleModalOpen = () => {
    setState({ ...state, modalOpen: true })
  }

  const handleModalClose = () => {
    setState({ ...state, modalOpen: false })
  }

  const handleRowClick = (event, rowData) => {
    props.history.push("/employee/" + rowData.id);
    console.log(event)
    console.log(rowData)
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
        tooltip="Add Employee"
        isFreeAction={true}
        handleModalOpen={(event) => handleModalOpen()}
        onRowClick={handleRowClick}
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