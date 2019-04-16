import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';

import {getUserList, filterList, goToDetailsPage} from "../../redux/actions";

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
  },
  tableHead: {
    fontSize: 20,
    fontWeight: 600
  }
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class UserTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'first_name',
      page: 0,
      rowsPerPage: 5,
      tableHeaders: [
        { id: 'first_name', numeric: false, disablePadding: true, label: 'First Name' },
        { id: 'last_name', numeric: true, disablePadding: false, label: 'Last Name' },
        { id: 'company_name', numeric: true, disablePadding: false, label: 'Company Name' },
        { id: 'city', numeric: true, disablePadding: false, label: 'City' },
        { id: 'state', numeric: true, disablePadding: false, label: 'State' },
        { id: 'zip', numeric: true, disablePadding: false, label: 'Zip' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'web', numeric: true, disablePadding: false, label: 'Web' },
        { id: 'age', numeric: true, disablePadding: false, label: 'Age' }
      ],
      searchVal: ''
    }
  }

  componentDidMount() {
    this.props.getUserList();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  searchData = () => {
    this.props.filterList(this.state.searchVal)
  }

  handleClick = (event, id) => {
    this.props.goToDetailsPage(id)
  }

  render() {
    const { classes, data } = this.props;
    const { order, orderBy, page, rowsPerPage, tableHeaders, searchVal } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            User List
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.searchRoot} elevation={1}>
            <InputBase className={classes.input} placeholder="Search by first name" value={searchVal} onChange={(e) => {
              this.setState({searchVal: e.target.value})
            }} />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={this.searchData}>
              <SearchIcon />
            </IconButton>
        </Paper>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {tableHeaders.map(
                  row => (
                    <TableCell
                      key={row.id}
                      align={row.numeric ? 'right' : 'left'}
                      padding={row.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === row.id ? order : false}
                      className={classes.tableHead}
                    >
                      <Tooltip
                        title="Sort"
                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          onClick={this.createSortHandler(row.id)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  ),
                  this,
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        {n.first_name}
                      </TableCell>
                      <TableCell align="right">{n.last_name}</TableCell>
                      <TableCell align="right">{n.company_name}</TableCell>
                      <TableCell align="right">{n.city}</TableCell>
                      <TableCell align="right">{n.state}</TableCell>
                      <TableCell align="right">{n.zip}</TableCell>
                      <TableCell align="right">{n.email}</TableCell>
                      <TableCell align="right">{n.web}</TableCell>
                      <TableCell align="right">{n.age}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
    data: state.reducer.filteredResult
});
  
const mapDispatchToProps = dispatch => ({
    getUserList: () => dispatch(getUserList()),
    filterList: (data) => dispatch(filterList(data)),
    goToDetailsPage: (data) => dispatch(goToDetailsPage(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(UserTable));
