
function setFilter(params) {
    if (params) {listFilterParams.filter = params} else {
        listFilterParams.filter = {
            columnName: '',
            operator: '',
            filterValue: ''
        }
    };
}

function setSort(params) {
    if (params) {
        listFilterParams.sort.columnName = params
        if (listFilterParams.sort.direction === 'ASC') {
            listFilterParams.sort.direction = 'DESC'
        } else {
            listFilterParams.sort.direction = 'ASC'
        };
    } else {
        listFilterParams.sort = {
            columnName: 'date',
            direction: 'ASC'
        }
    };
}




export {getCompaniesList, listFilterParams};