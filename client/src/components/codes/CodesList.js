import React from 'react';
import Table from '../widgets/Table';
import FullScreenDialog from '../widgets/FullScreenDialog';
import AddCode from './AddCode';

export default function TaxList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' },
            { title: 'Taxable', field: 'taxable' },
        ],
        data: [
            { name: 'Code 1', description: 'dsfdsfdfdfds dfdfdfdfdsfcxvx erasdsadsad', taxable: 'Yes' },
        ],
        modalOpen: false,
    });

    const handleModalOpen = () => {
        setState({ ...state, modalOpen: true })
    }

    const handleModalClose = () => {
        setState({ ...state, modalOpen: false })
    }

    return (
        <React.Fragment>
            <Table
                title="Tax and Money Codes"
                columns={state.columns}
                data={state.data}
                exportButton={true}
                actions={[
                    { icon: 'add', tooltip: 'Add Code', onClick: handleModalOpen, isFreeAction: true },
                ]}
            />
            <FullScreenDialog
                open={state.modalOpen}
                handleClose={handleModalClose}
                component={<AddCode />}
                title='Add New Code'
            />
        </React.Fragment>
    );
}