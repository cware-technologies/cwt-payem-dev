import React from 'react';
import Table from '../widgets/Table';
import FullScreenDialog from '../widgets/FullScreenDialog';
import AddContribution from './AddContribution';

export default function ContributionList() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Description', field: 'description' },
            { title: 'Method', field: 'method' },
            { title: 'Amount', field: 'amount' },
        ],
        data: [
            { name: 'Contribution 1', description: 'kjhkjh khj hkj kjh  kjh  kjh kjh kjh  iuoi  lijh', method: 'Method 1', amount: '45000', },
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
                title="Contributions"
                columns={state.columns}
                data={state.data}
                exportButton={true}
                actions={[
                    { icon: 'add', tooltip: 'Add Contribution', onClick: handleModalOpen, isFreeAction: true },
                ]}
            />
            <FullScreenDialog
                open={state.modalOpen}
                handleClose={handleModalClose}
                component={<AddContribution />}
                title='Add New Contribution'
            />
        </React.Fragment>
    );
}