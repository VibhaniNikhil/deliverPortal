import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import DataGridHead from 'components/DataGrid/DataGridHead.js';
import DataGridToolbar from 'components/DataGrid/DataGridToolbar.js';

class DataGrid extends React.Component {
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 5,
        };
    }

    render() {
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

        return (
            <Paper style={{ width: '100%' }}>
                <DataGridToolbar numSelected={selected.length} />
                <div className="flex-auto">
                    <div className="table-responsive-material">
                        <Table className="">
                            <DataGridHead
                                columns={this.props.columns}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={this.props.data ? this.props.data.length : 0}
                            />
                            <TableBody>
                                {this.props.data.map(n => {
                                    return this.renderRow(n);
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={this.props.data ? this.props.data.length : 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </Paper>
        );
    }

    renderRow(item) {
        return (
            <TableRow
                hover
                onClick={event => this.handleClick(event, item.id)}
                onKeyDown={event => this.handleKeyDown(event, item.id)}
                role="checkbox"
                aria-checked={false}
                tabIndex={-1}
                key={item.id}
                selected={false}
            >
                <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={false} />
                </TableCell>

                {this.props.columns.map(x => { return this.renderCell(x, item) })}
            </TableRow>
        );
    }

    renderCell(column, item) {
        var cellValue = null;
        if (column.cellRender) {
            cellValue = column.cellRender(column, item);
        }
        else{
            cellValue = item[column.id];
            if (!cellValue) {
                cellValue = "";
            }
        }

        if (column.numeric) {
            return <TableCell numeric>{cellValue}</TableCell>
        }

        return <TableCell>{cellValue}</TableCell>
    }
}

/**
 * @prop name An arrary containing the data the rows should be bound to.
 * @prop An 
 */
DataGrid.propTypes = {
    data: PropTypes.object,
    columns: PropTypes.array,
    showPageNumbers: PropTypes.bool,
    onChange: PropTypes.func,
}

export default DataGrid;