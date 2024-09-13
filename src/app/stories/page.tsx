'use client';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../lib/constants';

interface Story {
  id: number;
  name: string;
  createdAt: string;
}

const Page = () => {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStories = async (page: number) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: DEFAULT_PER_PAGE.toString(),
      });

      const response = await fetch(`/api/stories?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      const data = await response.json();
      setStories(data.stories);
      setTotalPages(data.total);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStories([]);
      setTotalPages(DEFAULT_PAGE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(currentPage);
    fetchStories(currentPage);
  }, [currentPage]);

  const handleChange: TablePaginationProps['onPageChange'] = (event, page) => {
    setCurrentPage(page);
  };

  const handleView = (id: number) => {
    router.push(`stories/${id}`);
  };

  return (
    <Box className='space-y-4 p-4'>
      <Typography variant='h4' align='center'>
        My Stories
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: 'primary.light' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {stories.map((story) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={story.id}>
                <TableCell>{story.name}</TableCell>
                <TableCell>{new Date(story.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align='center'>
                  <Button variant='contained' color='secondary' onClick={() => handleView(story.id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!stories.length && !isLoading && (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  No stories found.
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className='flex justify-center'
        component='div'
        rowsPerPage={DEFAULT_PER_PAGE}
        count={totalPages}
        page={currentPage}
        onPageChange={handleChange}
        color='secondary'
      />
    </Box>
  );
};

export default Page;
