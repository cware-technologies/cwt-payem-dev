import React from 'react';
import MaterialTable from 'material-table';

export default function Employee(props) {
    const [state, setState] = React.useState({
        modalOpen: false,
    });
    console.log("Columns", props.columns)
    console.log("Data", props.data)
    return (
        <React.Fragment>
            <MaterialTable
                title={props.title}
                columns={props.columns}
                data={props.data}
                onRowClick={props.onRowClick}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data[data.indexOf(oldData)] = newData;
                                setState({ ...state, data });
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data.splice(data.indexOf(oldData), 1);
                                setState({ ...state, data });
                            }, 600);
                        }),
                }}
                options={{
                    exportButton: props.exportButton,
                    actionsColumnIndex: -1,
                }}
                actions={
                    props.isFreeAction ?
                        [
                            {
                                icon: props.icon,
                                tooltip: props.tooltip,
                                isFreeAction: props.isFreeAction,
                                onClick: props.handleModalOpen
                            }
                        ] : null}
            />
        </React.Fragment>
    )
}