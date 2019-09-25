import React from 'react';
import Table from '../widgets/Table';
import TabsHorizontal from '../widgets/TabsHorizontal';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const contributionsColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const contributionsData = [
    { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
]

const deductionsColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const deductionsData = [
    { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
]

const salaryInfoColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const salaryInfoData = [
    { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
]

const taxInfoColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const taxInfoData = [
    { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
]

const bankInfoColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Status', field: 'status' },
    { title: 'Pay Type', field: 'pay_type' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Registration', field: 'registration' },
]

const bankInfoData = [
    { id: '1', name: 'Sajeel', status: 'Active', pay_type: 'Salary', frequency: 'Monthly', registration: 'Complete' },
]

const tabs = [
    { id: '1', label: 'Contributions', icon: <TrendingUpIcon />, panel: <Table title="Contributions" columns={contributionsColumns} data={contributionsData} isFreeAction = {false} />, },
    { id: '2', label: 'Deductions', icon: <TrendingDownIcon />, panel: <Table title="Deductions" columns={deductionsColumns} data={deductionsData} isFreeAction = {false} />, },
    { id: '3', label: 'Salary Info', icon: <AccountBalanceWalletIcon />, panel: <Table title="Salary Info" columns={salaryInfoColumns} data={salaryInfoData} isFreeAction = {false} />, },
    { id: '4', label: 'Tax Info', icon: <AttachMoneyIcon />, panel: <Table title="Tax Info" columns={taxInfoColumns} data={taxInfoData} isFreeAction = {false} />, },
    { id: '5', label: 'Bank Info', icon: <AccountBalanceIcon />, panel: <Table title="Bank Info" columns={bankInfoColumns} data={bankInfoData} isFreeAction = {false} />, },
]

export default function Employee(props) {
    return (
        <div>
            <TabsHorizontal pageTitle="Sajeel" tabs={tabs} />
        </div>
    )
}