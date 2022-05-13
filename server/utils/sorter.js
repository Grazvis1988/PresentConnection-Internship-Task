
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? function (a, b) { return descendingComparator(a, b, orderBy); }
        : function (a, b) { return -descendingComparator(a, b, orderBy); };
}

function stableSort(array, comparator) {
    var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) { return el[0]; });
}

function sortOut(rows, order, orderBy, page, rowsPerPage){
  return (
    stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  )
}

function sorter( rows, order, orderBy, page, rowsPerPage, filter ) {
  if (!filter){
    return {
      rows: sortOut(rows, order, orderBy, page, rowsPerPage),
      size: rows.length
    }
  } else {
    const filtered = rows.filter(row => String(row.userId).includes(filter) ||
      row.title.toLowerCase().includes(filter.toLowerCase()) || row.body.toLowerCase().includes(filter.toLowerCase()))
    return { 
      rows: sortOut(filtered, order, orderBy, page, rowsPerPage),
      size: filtered.length
    }
  }
}

module.exports = sorter


