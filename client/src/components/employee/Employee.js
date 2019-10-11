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
import Register from './Register';

const basicInfoColumns = [
    { title: 'ID', field: 'iden_num', },
    { title: 'Birth Date', field: 'ATTRIB_18' },
    { title: 'Gender', field: 'FLG_01', },
    { title: 'Address', field: 'ATTRIB_01' },
    { title: 'City', field: 'ATTRIB_08' },
    { title: 'State', field: 'ATTRIB_09' },
    { title: 'Zip', field: 'ATTRIB_10' },
    { title: 'Email', field: 'ATTRIB_10' },
    { title: 'Cell #', field: 'ATTRIB_11' },
    { title: 'Phone #', field: 'ATTRIB_12' },
    { title: 'Work Location', field: 'ATTRIB_21' },
    { title: 'Hire Date', field: 'ATTRIB_19' },
    { title: 'Pay Rate Type', field: 'ATTRIB_24' },
    { title: 'Annual Pay Rate', field: 'ATTRIB_14' },
    { title: 'Pay Period Rate', field: 'ATTRIB_14' },
    { title: 'Calculated Pay Period', field: 'ATTRIB_15' },
    { title: 'Calculated Annual Amount', field: 'ATTRIB_15' },
]

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
    { id: '6', label: 'Basic information', icon: <TrendingUpIcon />, columns: basicInfoColumns, component: <Register />, },
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