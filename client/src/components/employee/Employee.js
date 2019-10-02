import React, { useEffect } from 'react';
import axios from 'axios';
import TabsHorizontal from '../widgets/TabsHorizontal';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ContributionNew from './ContributionNew';
import DeductionNew from './DeductionNew';

const contributionsColumns = [
    { title: 'Name', field: 'type' },
    { title: 'Method', field: 'ATTRIB_21' },
    { title: 'Amount Limit', field: 'ATTRIB_11' },
    { title: 'Amount Per Day', field: 'ATTRIB_12' },
    { title: 'Active', field: 'FLG_01' },
]

const deductionsColumns = [
    { title: 'Name', field: 'type' },
    { title: 'Method', field: 'ATTRIB_21' },
    { title: 'Amount Limit', field: 'ATTRIB_11' },
    { title: 'Amount Per Day', field: 'ATTRIB_12' },
    { title: 'Active', field: 'FLG_01' },
]

const salaryInfoColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const taxInfoColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const bankInfoColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const tabs = [
    { id: '1', label: 'Contributions', icon: <TrendingUpIcon />, columns: contributionsColumns, component: <ContributionNew /> },
    { id: '2', label: 'Deductions', icon: <TrendingDownIcon />, columns: deductionsColumns, component: <DeductionNew /> },
    { id: '3', label: 'Salary Info', icon: <AccountBalanceWalletIcon />, columns: salaryInfoColumns, },
    { id: '4', label: 'Tax Info', icon: <AttachMoneyIcon />, columns: taxInfoColumns },
    { id: '5', label: 'Bank Info', icon: <AccountBalanceIcon />, columns: bankInfoColumns },
]

export default function Employee(props) {
    const [state, setState] = React.useState({
        data: [
            // { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
            // { id: '2', name: 'Saad', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
        ],
        modalOpen: false,
    });

    const handleModalOpen = () => {
        setState({ ...state, modalOpen: true })
    }

    const handleModalClose = () => {
        setState({ ...state, modalOpen: false })
    }

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`http://localhost:4000/employees/${id}`)
            .then(res => {
                const data = res.data.data
                setState({ ...state, data })
                console.log("DATA ", data)
            })
        console.log(state)
    }, []);

    return (
        <React.Fragment>
            <TabsHorizontal
                pageTitle="Sajeel"
                tabs={tabs}
                data={state.data}
            />
        </React.Fragment>
    )
}