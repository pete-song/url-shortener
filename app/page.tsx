"use client";
import UrlShortenerContainer from "@/components/UrlShortenerContainer";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 30px; 
`;

const Logo = styled(Image)`
  width: 160px; 
  height: 70px; 

  @media (min-width: 768px) {
    width: 160px; 
    height: 80px;
  }
`;

const Heading = styled.h1`
  color: white;
  font-size: 1.2rem; 
  font-weight: 900;
  display: flex;
  flex-direction: row;
  justify-self: flex-start;
  align-self: center;
  margin-bottom: 30px; 

  @media (min-width: 768px) {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 50px;
  }
`;

export default function Home() {
  return (
    <Container>
      <Logo src="/logoipsum-280.svg" alt="Logo" width={150} height={150} />
      <Heading>URL SHORTENER</Heading>
      <UrlShortenerContainer />
    </Container>
  );
}