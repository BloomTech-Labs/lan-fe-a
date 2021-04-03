import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';
import { FlagOutlined, PushpinOutlined } from '@ant-design/icons';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

/* ------------------------------------------------------------- */
/*    OPTIONAL: Use this component to separate                   */
/*           discussion card dropdown menu logic                 */
/* ------------------------------------------------------------- */

const DCardDropwdown = (props) => {
  return <div></div>;
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { setFlaggingModalVisibility })(
  DCardDropwdown
);
