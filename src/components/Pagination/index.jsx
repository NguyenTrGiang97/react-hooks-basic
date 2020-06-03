import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
}

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _page, _limit, _totalRows } = pagination;

    const totalPages = Math.ceil(_totalRows/ _limit);
    // tổng item / số item từng page
    // 51/10 = 5.1 ---> Math.ceil > lấy 6 page
    
    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage)
        }
    }
    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1 )}
            >
                Prev
            </button>
            <button
                disabled={_page >= totalPages}
                onClick={() => handlePageChange(_page + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;