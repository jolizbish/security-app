import { 
    TableHead, 
    TableRow, 
    TableCell, 
    Box, 
    TableSortLabel 
} from '@mui/material'; 

const columnHeaders = [
    {
        id: 'Domain',
        numeric: false,
        label: 'Domain'
    }, {
        id: 'BreachDate',
        numeric: false,
        label: 'Breach Date'
    },
    {
        id: 'DataClasses',
        numeric: false,
        label: 'Data Classes'
    }, {
        id: 'PwnCount',
        numeric: true,
        label: 'Pwn Count'
    },
    {
        id: 'Description',
        numeric: false,
        label: 'Description'
    },
    {
        id: 'IsVerified',
        numeric: false,
        label: 'Verified'
    }
];

const AugmentedHeader = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return <TableHead>
        <TableRow>
            <TableCell></TableCell>
            {columnHeaders.map((col) => (
                <TableCell
                    key={col.id}
                    sortDirection={orderBy === col.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === col.id}
                        direction={orderBy === col.id ? order : 'asc'}
                        onClick={createSortHandler(col.id)}
                    >
                        <span className="column-label">{col.label}</span>
                        {orderBy === col.id ? (
                            <Box component="span"></Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
}

export default AugmentedHeader;