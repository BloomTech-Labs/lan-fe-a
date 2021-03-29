import React from 'react';
import { Button } from 'antd';
import { FlagFilled, MessageFilled } from '@ant-design/icons';

export const FlagChip = ({ flagged, comments }) => {
  return (
    <Button
      className="flag-chip"
      type="ghost"
      shape="round"
      style={{ color: '#D3455B', border: '2px solid #D3455B' }}
    >
      {flagged > 0 && <FlagFilled style={{ color: '#D3455B' }} />}
      {flagged > 0 && flagged}
      {comments > 0 && <MessageFilled style={{ color: '#D3455B' }} />}
      {comments > 0 && comments}
    </Button>
  );
};
