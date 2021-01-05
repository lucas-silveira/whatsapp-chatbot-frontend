import styled from 'styled-components';

export const LayoutWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100vh;
`;

export const LayoutMain = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  > header {
    margin-bottom: 40px;

    h2 {
      margin-bottom: 16px;
    }
  }

  > footer {
    p {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const Form = styled.form`
  margin-bottom: 50px;

  > div + div,
  > button {
    margin-top: 20px;
  }
`;
