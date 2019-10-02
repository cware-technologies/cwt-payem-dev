import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '../widgets/Table';
import FullScreenDialog from '../widgets/FullScreenDialog';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonForce(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        modalOpen: false,
    });

    function handleChange(event, newValue) {
        setValue(newValue);
        console.log(newValue)
    }

    const handleModalOpen = () => {
        setState({ ...state, modalOpen: true })
    }

    const handleModalClose = () => {
        setState({ ...state, modalOpen: false })
    }

    console.log(props.data)

    return (
        <div className={classes.root}>
            <div className="mb-3">
                <Typography variant="button">
                    {props.pageTitle}
                </Typography>
            </div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    {
                        props.tabs.map((tab) => {
                            return (
                                <Tab label={tab.label} icon={tab.icon} />
                            )
                        })
                    }
                </Tabs>
            </AppBar>
            <TabPanel>
                {/* {props.tabs[value].panel} */}
                <Table 
                    title={props.tabs[value].label} 
                    columns={props.tabs[value].columns} 
                    data={props.data} 
                    isFreeAction={true}
                    icon='add'
                    tooltip= {"Add " + props.tabs[value].label}
                    handleModalOpen={(event) => handleModalOpen()}
                />
            </TabPanel>
            <FullScreenDialog
                open={state.modalOpen}
                handleClose={handleModalClose}
                component={props.tabs[value].component}
                title= {props.tabs[value].label + " Details"}
            />
        </div>
    );
}