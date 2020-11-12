import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// -------------------------------------------------------------------
import consts from '../../consts.json';
import { window } from 'global';
import DrawerContents from './drawer.jsx';
// -------------------------------------------------------------------

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
});

class ResponsiveBase extends React.Component {
    state = {
        open: false
    };

    static async getInitialProps(ctx) {
        //console.log(ctx)
        return { arg: null };
    }

    handleDrawerToggle() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { classes } = this.props;
        let isWindowDefined;
        if (process.browser) {
            isWindowDefined = window !== undefined;
        } else {
            isWindowDefined = false;
        }
        const container = isWindowDefined
            ? () => window.document.body
            : undefined;
        //const container = undefined;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle.bind(this)}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {consts.name} v{consts.version}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={'left'}
                            open={this.state.open}
                            onClose={this.handleDrawerToggle.bind(this)}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            <DrawerContents />
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            <DrawerContents />
                        </Drawer>
                    </Hidden>
                </nav>
                <div align="center" style={{ width: '100%' }}>
                    {/** className={classes.content} */}
                    <div className={classes.toolbar} />
                    <div style={{ maxWidth: '800px', padding: '20px' }}>
                        {this.props.body}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ResponsiveBase);
