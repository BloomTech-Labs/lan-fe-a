import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Filter from './filter';
import Questions from './questions';
import DashboardContainer from './styles/dashboardStyle';
import loadingicon from '../../img/loading-icon.png';
 
const Dashboard = props => {
    return (
        <DashboardContainer>
            {props.fetchingUser || props.fetchingPosts ? (
                <div className='loading'>
                    <img src={loadingicon} alt='loading-icon' />
                    <p>Wakey wakey server!</p>
                </div>
            ) : (
                <>
                    <Header history={props.history} />
                    <Filter history={props.history} />
                    <Questions />
                </>
            )}
        </DashboardContainer>
    );
};

const mapStateToProps = state => {
    return {
        fetchingUser: state.fetchingUser,
        fetchingPosts: state.fetchingPosts
    };
};

export default connect(mapStateToProps)(Dashboard);