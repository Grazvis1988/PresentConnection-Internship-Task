import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from "react-router-dom";
import Input from '@mui/material/Input'
import Grid from '@mui/material/Grid';
import listService from '../services/list'
import Modal from './Modal'
import { useDebounce } from 'use-debounce';

var headCells = [
    {
        id: 'userId',
        numeric: true,
        disablePadding: true,
        label: 'User ID'
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title'
    },
    {
        id: 'body',
        numeric: false,
        disablePadding: false,
        label: 'Body'
    }
];


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTable = ({ page, setPage }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  // const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ rows, setRows ] = React.useState([]);
  const [ filter, setFilter ] = React.useState('')
  const [ openModal, setOpenModal ] = React.useState(false)
  const [ rowsArraySize, setRowsArraySize ] = React.useState(null)
  const [ newItemAddedBoolean, setNewItemAddedBoolean ] = React.useState(false)

  const navigate = useNavigate();
  const [ value ] = useDebounce(filter, 500)

  React.useEffect(() => {
    (async() => {
      try {
        const data = await listService.getAll({
          filter,
          page,
          rowsPerPage,
          orderBy,
          order
        })
        setRows(data.rows)
        setRowsArraySize(data.size)
      } catch(e) {
        console.log(e.message)
      }
    })()
  }, [page, rowsPerPage, order, orderBy, value, newItemAddedBoolean])

  React.useEffect(() => {
    setPage(0)
  }, [filter])

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
  }

  const handleRequestSort = (
    event,
    property,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    navigate(`/item/${id}`)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  /*
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    */

  return (
    <Grid container justifyContent="center" sx={{ my: 2 }}>
    <Box sx={{ width: '83%' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Modal open={openModal} handleOpen={handleModalOpen} 
          handleClose={handleModalClose} itemAdded={newItemAddedBoolean}
          setItemAdded={setNewItemAddedBoolean}
        />
        <Input 
          placeholder="Filter" 
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </Box>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map(row => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell align="right" sx={{ width: '8%' }}>{row.userId}</TableCell>
                      <TableCell align="left" sx={{ width: '20%' }}>{row.title}</TableCell>
                      <TableCell align="left">{row.body}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsArraySize}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  </Grid>
  );
}

export default EnhancedTable 
