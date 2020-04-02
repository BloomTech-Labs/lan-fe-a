import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchPosts } from '../../actions';
import Header from './header';
import Filter from './filter';
import Questions from './questions';
import DashboardContainer from './styles/dashboardStyle';
import loadingicon from '../../img/loading-icon.png';
 
const Dashboard = props => {
    useEffect(() => {
        props.fetchUser();
        props.fetchPosts();
        // ?
    }, []);
    
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
                    <Questions history={props.history} />
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

export default connect(mapStateToProps, { fetchUser, fetchPosts })(Dashboard);