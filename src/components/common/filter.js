import React, { useState } from 'react';
import FilterContainer from './styles/filterStyle';
import Select from 'react-select';

const Filter = props => {
    const [tracks, setTracks] = useState([
        { track: 'All', value: false},
        { track: 'WEB', value: false },
        { track: 'DS', value: false },
        { track: 'iOS', value: false },
        { track: 'UX', value: false },
        { track: 'AND', value: false }
    ]);

    return (
        <FilterContainer tracks={tracks}>
            <div className='filters'>
                <p className='filter'>SORT</p>
                <select>
                    <option>Recent</option>
                    <option>Popular</option>
                </select>

                <p className='filter'>FILTER</p>
                <div className='tracks'>
                    <button className='track'>All</button>
                    <button className='track'>WEB</button>
                    <button className='track'>DS</button>
                    <button className='track'>iOS</button>
                    <button className='track'>UX</button>
                    <button className='track'>AND</button>
                </div>
            </div>

            <button className='post-a-question' onClick={() => props.history.push('/post')}><i className='fas fa-plus'></i>Post a question</button>
        </FilterContainer>
    );
};

export default Filter;