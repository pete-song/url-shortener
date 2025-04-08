"use client";
import React, { useState } from 'react';
import { Check, CopyIcon } from 'lucide-react';
import styled from '@emotion/styled';

interface CopyClipboardProps {
  shortenedUrl: string;
}

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #6b7280; 
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  outline: none;

  &:hover {
    background-color: #e5e7eb; 
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  svg.copied {
    color: green; 
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const CopyClipboard= ({ shortenedUrl } : CopyClipboardProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${shortenedUrl}`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy URL.');
    }
  };

  return (
    <CopyButton onClick={handleCopyToClipboard}>
      {copied ? <Check className='w-4 h-4 copied' /> : <CopyIcon className='w-4 h-4' />}
      <span className='sr-only'>Copy {`${window.location.origin}/${shortenedUrl}`}</span>
    </CopyButton>
  );
};

export default CopyClipboard;