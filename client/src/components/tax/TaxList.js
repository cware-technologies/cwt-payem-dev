import React from 'react';
import Table from '../widgets/Table';
import FullScreenDialog from '../widgets/FullScreenDialog';
import AddTax from './AddTax';

export default function TaxList() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Amount From', field: 'amount_start' },
      { title: 'Amount Upto', field: 'amount_end' },
      { title: 'Fixed Amount', field: 'amount_fixed' },
      { title: 'Tax %', field: 'tax_percent' },
    ],
    data: [
      { name: 'Tax 1', amount_start: '40000', amount_end: '50000', amount_fixed: '45000', tax_percent: '2.5' },
    ],
    modalOpen: false,
  });

  const handleModalOpen = () =>  {
    setState({ ...state, modalOpen: true })
  
  }
  const handleModalClose = () =>  {
    setState({ ...state, modalOpen: false })
  }

  return (
    <React.Fragment>
    <Table
        title="Tax"
        columns={state.columns}
        data={state.data}
        exportButton={true}
        actions = {[
          {icon:'add', tooltip: 'Add Tax', onClick: handleModalOpen, isFreeAction: true},
          ]}
      />
      <FullScreenDialog 
        open={state.modalOpen}
        handleClose={handleModalClose}
        component={<AddTax />}
        title= 'Add New Tax'
      />
      </React.Fragment>
      );
}