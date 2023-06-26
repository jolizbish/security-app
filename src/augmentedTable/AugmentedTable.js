import './AugmentedTable.css';
import { 
    TableContainer, 
    Table, 
    TableBody, 
    TableRow, 
    TableCell, 
    Paper, 
    Tooltip, 
} from '@mui/material'; 
import { useState } from 'react';
import AugmentedHeader from '../augmentedHeader/AugmentedHeader';
import SearchBar from '../searchBar/SearchBar';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data.filter((row) => {
            for (let key in row) {
                if (row[key].toString().toLowerCase().includes(query.toLowerCase())) {
                    return true
                }
            }
            return false;
        });
    }
};

const AugmentedTable = ({ data }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, data);
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div>
            <div className="search-bar">
                <SearchBar setSearchQuery={setSearchQuery} />
            </div>
            <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
                <div  className="response-table">
                    <Table stickyHeader>
                        <AugmentedHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {
                                stableSort(dataFiltered, getComparator(order, orderBy)).map((row, index) => {
                                    return (
                                        <TableRow 
                                            key={index} 
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >   
                                            <TableCell>
                                                <img src={row.LogoPath} width="40px" alt={`${row.Title} logo`} />
                                            </TableCell>
                                            <TableCell>{row.Domain}</TableCell>
                                            <TableCell>
                                                <div className="date-cell">
                                                    {row.BreachDate}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="data-classes-cell">
                                                    {row.DataClasses.join(', ')}
                                                </div>
                                            </TableCell>
                                            <TableCell>{row.PwnCount}</TableCell>
                                            <TableCell>
                                                <Tooltip title={row.Description}>
                                                    {/* I'm trusting the API to send me sanitized information, otw I wouldn't use this approach to render the links */}
                                                    <div className="description-cell" dangerouslySetInnerHTML={{__html: row.Description}}>
                                                    </div>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{row.IsVerified.toString()}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </div>
    );
}

export default AugmentedTable;