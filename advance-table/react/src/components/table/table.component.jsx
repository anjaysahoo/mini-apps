import {useEffect, useState} from "react";

const TableComponent = () => {
    const [columns] = useState(['cca3','region','subregion','population']);
    const [filters, setFilters] = useState({cca3: '', region: '', subregion: '', population: ''});
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({key: '', direction: 'ascending'});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);


    const fetchData = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log("Data : ", data);
        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        console.log("table Data : ", data)
    }, [data]);

    const sortedData = [...data];

    const filteredData = sortedData.filter((row) => {
        console.log("row :", row);
        return columns.every(column => {
            const filterValue = filters[column];
            console.log("filterValue :", filterValue);
            console.log("row[column] :", row[column]);
            return row[column]?.toString().toLowerCase().includes(filterValue.toLowerCase());
        })
    })

    const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);
    const handleFilterChange = (event, column) => {
        setFilters({...filters, [column]: event.target.value});
    }

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    }

    return (
        <section>
            <table>
                <thead>
                <tr>
                    {
                        columns.map(column => (
                            <th key={column}>
                                <div onClick={() => handleSort(column)}>
                                    {column}{
                                        sortConfig.key === column ? (
                                        sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'): ''
                                    }
                                </div>
                                <input
                                    type="text"
                                    value={filters[column]}
                                    onChange={(e) => handleFilterChange(e, column)}
                                    placeholder={`Search ${column}`}
                                />
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                columns.map(column => (
                                    <td key={column}>
                                        {Array.isArray(row[column]) ? row[column][0] : row[column]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
                <tfoot>
                <div>
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0}
                    >Previous</button>
                    <span>Page {page + 1} of {Math.ceil(filteredData.length / pageSize)} </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= Math.ceil(filteredData.length / pageSize) - 1}
                    >Next</button>
                    <select name="pagination" id="pagination-select"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                    >
                        {
                            [10,20,30,40,50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))
                        }
                    </select>
                </div>

                </tfoot>
            </table>
        </section>
    )
}


export default TableComponent;
