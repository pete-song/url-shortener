"use client"
import styled from '@emotion/styled';
import Image from 'next/image';

const NotFoundPage = () => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  `;

  const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  margin-top: 40px;
`;

  const Message = styled.p`
    font-size: 1.1rem;
    margin-bottom: 30px;
  `;

  const BackLink = styled.a`
    font-size: 1rem;
    text-decoration: none;
    color: lightblue;
  `;

  return (
    <Container>
      <Image src="/logoipsum-280.svg" alt="Logo" width={150} height={150} />
      <Title>404 - Page Not Found</Title>
      <Message>Sorry, the page you are looking for does not exist.</Message>
      <BackLink href="/">Go back to the homepage</BackLink>
    </Container>
  );
}

export default NotFoundPage