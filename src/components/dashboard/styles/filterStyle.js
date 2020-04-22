import styled from 'styled-components';

const FilterContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-top: 32px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column-reverse;

    .filters {
        display: flex;
        align-items: center;

        label {
            margin-right: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            color: #ffffff;
        }
    
        select {
            margin-right: 16px;
            background-color: #23272a;
            border: none;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;
        }
    }

    button {
        padding: 10px 24px;
        margin-bottom: 16px;
        background-color: #2c2f33;
        border: none;
        border-radius: 3px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        font-family: 'Nunito', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        transition: 0.25s;
        cursor: pointer;

        i {
            margin-right: 4px;
            font-size: 0.625rem;
        }

        :hover {
            opacity: 0.5;
        }
    }

    @media (min-width: 768px) {
        width: 95%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .post-a-question {
            margin-bottom: 0;
        }
    }

    @media (min-width: 1024px) {
        width: 972.8px;
    }
`;

export default FilterContainer;