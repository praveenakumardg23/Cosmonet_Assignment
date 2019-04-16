import React, { Component } from 'react';
import { connect } from "react-redux";
import { goBack } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {getSelectedUser} from "../../redux/actions";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  }
});

class DetailUser extends Component {

  componentDidMount() {
    this.props.getSelectedUser(parseInt(this.props.match.params.id))
  }

  render() {
    const { classes, user } = this.props;
    return (
      <Paper className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.props.goBack}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                User Details
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar
            className={classes.root}
          >
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                {user && user.first_name + ' ' + user.last_name}
              </Typography>
            </div>
          </Toolbar>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableBody>
                  <TableRow
                    tabIndex={-1}
                    key={1}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      Company
                    </TableCell>
                    <TableCell align="right">{user && user.company_name}</TableCell>
                  </TableRow>
                  <TableRow
                    tabIndex={-1}
                    key={2}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      City
                    </TableCell>
                    <TableCell align="right">{user && user.city}</TableCell>
                  </TableRow>
                  <TableRow
                    tabIndex={-1}
                    key={3}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      State
                    </TableCell>
                    <TableCell align="right">{user && user.state}</TableCell>
                  </TableRow>
                  <TableRow
                    tabIndex={-1}
                    key={4}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      ZIP
                    </TableCell>
                    <TableCell align="right">{user && user.zip}</TableCell>
                  </TableRow>
                  <TableRow
                    tabIndex={-1}
                    key={5}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      Email
                    </TableCell>
                    <TableCell align="right">{user && user.email}</TableCell>
                  </TableRow>
                  <TableRow
                    tabIndex={-1}
                    key={6}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      Web
                    </TableCell>
                    <TableCell align="right">{user && user.web}</TableCell>
                  </TableRow>
                  <TableRow
                    tabIndex={-1}
                    key={7}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      Age
                    </TableCell>
                    <TableCell align="right">{user && user.age}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
    user: state.reducer.selectedUser
});
  
const mapDispatchToProps = dispatch => ({
  getSelectedUser: (data) => dispatch(getSelectedUser(data)),
  goBack: () => dispatch(goBack())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DetailUser));
