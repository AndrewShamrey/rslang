import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = styled(NavLink)`
  padding: 16px 0;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 15px;
  line-height: 24px;
  color: #fff;
  text-decoration: none;
  transition: color 0.1s ease-in-out;
  cursor: pointer;

  & span {
    margin-left: -12px;
    padding-left: 17px;
    padding-right: 5px;
    border-radius: 0 12px 12px 0;
    background-color: rgba(0,0,0,0.2);
    transition: all 0.1s ease-in-out;
  }

  & span:hover {
    background-color: rgba(0,0,0,0.25);
  }

  & svg {
    fill: #000;
    vertical-align: bottom;
    transform-origin: center;
    transform: rotate(180deg);
    border-radius: 50%;
    background-color: #ccc;
  }

  &:hover {
    color: rgba(255,255,255,0.8);
  }
`;

export default BackButton;
