import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { success } from '../../actions';
import Loader from '../common/loader';

const Success = props => {
    useEffect(() => props.success(props.history), []);

    return (
        <>
            <Loader message={false} />
        </>
    );
};

export default connect(null, { success })(Success);