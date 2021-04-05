import React from 'react';
import { Button } from 'antd';
import { FlagFilled, MessageFilled } from '@ant-design/icons';

export const FlagChip = ({ flags, commentsFlagged }) => {
  return (
    <Button className="flag-chip" type="ghost" shape="round">
      {flags > 0 && <FlagFilled />}
      {flags > 0 && flags}
      {commentsFlagged > 0 && <MessageFilled />}
      {commentsFlagged > 0 && commentsFlagged}
    </Button>
  );
};
