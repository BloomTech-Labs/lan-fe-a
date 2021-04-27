import { connect } from 'react-redux';

/* -------------------------------------------------------------------------- */
/*     IMPLEMENT THIS COMPONENT AS PART OF TERNARY/CONDITIONAL STATEMENTS     */
/*   TO DETERMINE WHETHER OR NOT CODE SHOULD RUN BASED ON USER PERMISSIONS    */
/*                                                                            */
/*                                            - Follow me @MarkZuckerberg     */
/* -------------------------------------------------------------------------- */

export const CheckIfModOrAdmin = (user, roomID, permissions) => {
  // ! CURRENT CHECK:
  // Check if user is an admin
  // if not check if moderator
  // return false if none of the above

  // ! FUTURE CHECK:
  // Check if user is an admin
  // If not check if user is a moderator to given room
  // (cont'd) AND they have correct permission to see the given element or complete action
  // else return false
  if (user.role_id === 3) {
    return true;
  } else if (user.role_id === 2) {
    return true;
  } else {
    return false;
  }
};
