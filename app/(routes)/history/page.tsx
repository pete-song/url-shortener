"use client";
import { getUrls, deleteUrl as deleteUrlAction } from '@/actions/urlActions';
import { EyeIcon, TrashIcon } from 'lucide-react';
import NextLink from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import CopyClipboard from '@/components/CopyClipboard';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

interface Url {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: Date;
  visits: number;
}

const HistoryContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border: none;
  background-color: #393937;
  font-weight: 900;
  color: white;
  padding: 8px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #1f1f1f;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border: none;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 10px;
  border: none;
  white-space: nowrap;
`;

const OriginalUrlCell = styled(NextLink)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
  display: inline-block;
`;

const ShortenedUrlCell = styled(NextLink)`
  color: lightblue;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  white-space: nowrap;
  display: inline-block;
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
`;

const Views = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 3px;
`;

const Icon = styled(EyeIcon)`
  width: 1rem;
  height: 1rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #FF6C6F;
  cursor: pointer;
  padding: 0;
  outline: none;

  &:hover {
    color: #b91c1c;
  }
`;

const Trash = styled(TrashIcon)`
  width: 1rem;
  height: 1rem;
`;

const LoadingContainer = styled.div`
  margin-top: 20px;
  font-style: italic;
  color: #777;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  color: #dc2626;
  font-weight: bold;
`;

export default function HistoryPage() {
  const [urlsData, setUrlsData] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUrls = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUrls();
      setUrlsData(data.map(url => ({
        ...url,
        visits: url.visits === null ? 0 : url.visits,
      })) as Url[]);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching URLs:", err);
      setError("Failed to load URL history.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleDeleteUrl = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      try {
        await deleteUrlAction(id);
        await fetchUrls(); 
      } catch (err: any) {
        console.error("Error deleting URL:", err);
        setError("Failed to delete URL.");
      }
    }
  };

  const handleLinkError = useCallback(() => {
    router.push('/not-found');
  }, [router]);

  if (loading) {
    return (
      <HistoryContainer>
        <Title>URL History</Title>
        <LoadingContainer>Loading URL history...</LoadingContainer>
      </HistoryContainer>
    );
  }

  if (error) {
    return (
      <HistoryContainer>
        <Title>URL History</Title>
        <ErrorContainer>{error}</ErrorContainer>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <Title>URL History</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Original URL</TableHeader>
              <TableHeader>Shortened URL</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {urlsData.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <OriginalUrlCell
                    href={`/${url.shortenedUrl}`}
                    target='_blank'
                    onError={handleLinkError} 
                  >
                    {url.originalUrl}
                  </OriginalUrlCell>
                </TableCell>
                <TableCell>
                  <ShortenedUrlCell
                    href={`/${url.shortenedUrl}`}
                    target='_blank'
                    onError={handleLinkError}
                  >
                    {`${window.location.origin}/${url.shortenedUrl}`}
                  </ShortenedUrlCell>
                </TableCell>
                <TableCell>
                  <ActionsCell>
                    <CopyClipboard shortenedUrl={url.shortenedUrl} />
                    <DeleteButton onClick={() => handleDeleteUrl(url.id)}>
                      <Trash />
                    </DeleteButton>
                    <Views>
                      <Icon />
                      {url.visits} view(s)
                    </Views>
                  </ActionsCell>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </HistoryContainer>
  );
}