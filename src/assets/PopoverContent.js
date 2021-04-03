import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';
import { FlagOutlined, PushpinOutlined } from '@ant-design/icons';
import UserFlaggingModal from './UserFlaggingModal';
import FlagManagerModal from './FlagManagerModal';
import { CheckIfModOrAdmin } from './CheckIfModOrAdmin';

/* -------------------------------------------------------------------------- */
/*      This component can be deleted - deprecated and not in use.            */
/* -------------------------------------------------------------------------- */

const PopoverContent = (props) => {
  // const { popoverVisibility, setPopoverVisibility } = props;
  const [showModal, setShowModal] = useState(false);

  const handleModalVisibleSwap = () => {
    setShowModal(true);
    props.handleVisibleChange();
  };

  return (
    <div>
      <List>
        <List.Item>
          {/* <Link> */}
          <Button
            style={{ background: 'red' }} // connect these colours with global stylesheets
            icon={<PushpinOutlined />}
            type="text"
          >
            Pin
          </Button>
          <UserFlaggingModal />
          {/* </Link> */}
        </List.Item>
        <List.Item>
          {/* <Link> */}
          <Button
            style={{ background: 'yellow' }} // connect these colours with global stylesheets
            onClick={() => props.setFlaggingModalVisibility(false)}
            icon={<FlagOutlined />}
            type="text"
          >
            Flag
          </Button>
          {/* </Link> */}
        </List.Item>
        <List.Item>
          {/* <Link> */}
          <Button
            style={{ background: 'lightblue' }} // connect these colours with global stylesheets
            onClick={handleModalVisibleSwap}
            icon={<FlagOutlined />}
            type="text"
          >
            Mod
          </Button>
          {/* </Link> */}
        </List.Item>
      </List>
      <FlagManagerModal
        visible={showModal}
        setVisible={setShowModal}
        flagsData={props.discussion.flags ? props.discussion.flags : undefined}
        discussionID={props.discussion.id}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { setFlaggingModalVisibility })(
  PopoverContent
);
