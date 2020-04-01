import React from 'react';
import Header from './header';
import styled from 'styled-components';

const DashBoardContainer = styled.div`

`;

const Dashboard = props => {
    return (
        <>
            <Header history={props.history} />
            {/* <DashBoardContainer>
                <button>Post a question</button>
            </DashBoardContainer> */}
        </>
    );
};

export default Dashboard;