import React from 'react';
import styled from 'styled-components';

const RegisterContainer = styled.div`
    height: 90vh;

    .container {
        height: 85vh;
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            margin-bottom: 16px;
            font-size: 1.75rem;
            font-weight: 700;
            color: whitesmoke;
        }

        form {

        }
    }
`

const Register = () => {
    return (
        <RegisterContainer>
            <div className='container'>
                <h2>Register</h2>
                <form>
                    <input/>
                    <input/>
                </form>
            </div>
        </RegisterContainer>
    );
};

export default Register;