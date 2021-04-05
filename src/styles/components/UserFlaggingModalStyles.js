import styled from 'styled-components';
import { Radio } from 'antd';

export const StyledRadioGroup = styled(Radio.Group)`
  width: auto;
  height: 130px;
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-content: space-around;
  padding-bottom: 30px;
  gap: 15px;
`;
