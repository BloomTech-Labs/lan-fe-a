import React from 'react';
import { Button } from 'antd';
import { FlagFilled, MessageFilled } from '@ant-design/icons';

export const FlagChip = ({ flags, commentsFlagged }) => {
  return (
    <Button
      className="flag-chip"
      type="ghost"
      shape="round"
      style={{ color: '#F8285A', border: '2px solid #F8285A' }}
    >
      {flags > 0 && <FlagFilled style={{ color: '#F8285A' }} />}
      {flags > 0 && flags}
      {commentsFlagged > 0 && <MessageFilled style={{ color: '#F8285A' }} />}
      {commentsFlagged > 0 && commentsFlagged}
    </Button>
  );
};
