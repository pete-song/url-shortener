"use client";
import { addUrl, findExistingUrl } from '@/actions/urlActions';
import { generateShortId } from '@/app/utils/generateShortId';
import React, { useState } from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  margin-bottom: 1rem;
  width: 350px;

  @media (max-width: 768px) {
    width: 320px;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const Input = styled.input`
  height: 3rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: #393937;

  @media (max-width: 768px) {
    width: 100%; 
  }

  &:focus {
    ring-width: 2px;
    ring-color: #9ec5fe;
    border-color: #60a5fa;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.6rem; 
  border: none;
  cursor: pointer;
  background-color: #ffffff;
  color: black;
  border: none;
  outline: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem; 

  &:hover {
    background-color: #FFFFFFB2;
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  margin-top: 0.5rem;
  text-align: center;
`;

const ShortenedLinkContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShortenedLinkText = styled.p`
  margin-bottom: 0.25rem;
  color: white;
  font-size: 20px;
  font-weight: 900;
  margin-top: 20px;
  text-align: center;
`;

const ShortenedLink = styled.a`
  color: lightblue;
  text-decoration: underline;
  text-align: center; 
`;

function ShortenForm() {
  const [url, setUrl] = useState<string>('');
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortenedLink(null);
    setError(null);

    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const existingUrlData = await findExistingUrl(url);

      if (existingUrlData) {
        setShortenedLink(existingUrlData.shortenedUrl);
      } else {
        const shortId = generateShortId(6);
        await addUrl(url, shortId);
        setShortenedLink(shortId);
      }
    } catch (error: any) {
      console.error("Error shortening URL:", error);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setUrl('');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type='url'
          placeholder='Enter URL to shorten'
          required
        />
        <Button type='submit'>
          Shorten URL
        </Button>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {shortenedLink && (
        <ShortenedLinkContainer>
          <ShortenedLinkText>Shortened URL:</ShortenedLinkText>
          <ShortenedLink href={`/${shortenedLink}`} target="_blank" rel="noopener noreferrer">
            {`${window.location.origin}/${shortenedLink}`}
          </ShortenedLink>
        </ShortenedLinkContainer>
      )}
    </Form>
  );
}

export default ShortenForm;