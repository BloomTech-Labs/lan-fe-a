import React, { useState } from 'react';
import FilterContainer from './styles/filterStyle';

const Filter = props => {
    const [input, setInput] = useState({
        sort: 'Recent',
        filter: 'All'
    });

    const onChange = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    return (
        <FilterContainer>
            <div className='filters'>
                <label htmlFor='sort'>SORT</label>
                <select name='sort' value={input.sort} onChange={onChange}>
                    <option value='Recent'>Recent</option>
                    <option value='Popular'>Popular</option>
                </select>

                <label htmlFor='filter'>FILTER</label>
                <select name='filter' value={input.filter} onChange={onChange}>
                    <option value='All'>All</option>
                    <option value='WEB'>WEB</option>
                    <option value='DS'>DS</option>
                    <option value='iOS'>iOS</option>
                    <option value='UX'>UX</option>
                    <option value='AND'>AND</option>
                </select>
            </div>

            <button className='post-a-question' onClick={() => props.history.push('/post')}><i className='fas fa-plus'></i>Post a question</button>
        </FilterContainer>
    );
};

export default Filter;