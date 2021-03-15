import styled from 'styled-components';

export const Button = styled.button`
    font-size: 1em;
    border: none;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    &:hover {
        background: ${props => props.theme.secondary.lightRed}
    }

    background: ${props => props.bg || props.theme.primary.brandRed};
    color: ${props => props.color || props.theme.primary.chalk}
`;