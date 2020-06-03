import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null
}



function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');

    // useRef sẽ tạo 1 object giữ nguyên giá trị k bị thay đổi sau mỗi lần render
    const typingTimeoutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(e.target.value);
        if (!onSubmit) return;

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            }
            onSubmit(formValues);
        }, 300);
    }

    return (
        <form>
            <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
        </form>
    );
}

export default PostFiltersForm;