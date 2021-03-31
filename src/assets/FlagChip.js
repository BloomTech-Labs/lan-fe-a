import React from 'react';
import { Button } from 'antd';
import { FlagFilled, MessageFilled } from '@ant-design/icons';

export const FlagChip = ({ flagged, comments }) => {
  return (
    <Button
      className="flag-chip"
      type="ghost"
      shape="round"
      style={{ color: '#F8285A', border: '2px solid #F8285A' }}
    >
      {flagged > 0 && <FlagFilled style={{ color: '#F8285A' }} />}
      {flagged > 0 && flagged}
      {comments > 0 && <MessageFilled style={{ color: '#F8285A' }} />}
      {comments > 0 && comments}
    </Button>
  );
};
