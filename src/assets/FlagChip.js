import React from 'react';
import { Button } from 'antd';
import { FlagFilled, MessageFilled } from '@ant-design/icons';

export const FlagChip = ({ flagged, comments }) => {
  return (
    <Button
      className="flag-chip"
      type="ghost"
      shape="round"
      style={{ borderColor: '#D3455B', color: '#D3455B' }}
    >
      <FlagFilled style={{ color: '#D3455B' }} /> {`${flagged}`}
      <MessageFilled style={{ color: '#D3455B' }} /> {`${comments}`}
    </Button>
  );
};
