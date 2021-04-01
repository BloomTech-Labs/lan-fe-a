import React from 'react';
import { connect } from 'react-redux';
import { setFlaggingModalVisibility } from '../store/actions/index';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';
import { FlagOutlined, PushpinOutlined } from '@ant-design/icons';
import UserFlaggingModal from './UserFlaggingModal';

const PopoverContent = (props) => {
  return (
    <List>
      <List.Item>
        <Link>
          <Button
            style={{ background: 'red' }} // connect these colours with global stylesheets
            icon={<PushpinOutlined />}
            type="text"
          >
            Pin
          </Button>
          <UserFlaggingModal />
        </Link>
      </List.Item>
      <List.Item>
        <Link>
          <Button
            style={{ background: 'yellow' }} // connect these colours with global stylesheets
            onClick={() => props.setFlaggingModalVisibility(true)}
            icon={<FlagOutlined />}
            type="text"
          >
            Flag
          </Button>
        </Link>
      </List.Item>
    </List>
  );
};

export default connect(null, { setFlaggingModalVisibility })(PopoverContent);
