import { connect } from 'react-redux';

export const CheckIfModOrAdmin = (props) => {
  const { user } = props;
  // Check if user is an admin
  // if not check if moderator
  // return false if none of the above
  if (user.role_id === 3) {
    return true;
  } else if (user.role_id === 2) {
    return true;
  } else {
    return false;
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CheckIfModOrAdmin);
