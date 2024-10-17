'use client';

import {
  Box,
  Button,
  CircularProgress,
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

import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/lib/constants';
import { toastError } from '@/lib/toastUtils';
import { getStories } from '@/server-actions/stories';
import { IStory } from '@/types/stories';

const Page = () => {
  const router = useRouter();
  const [stories, setStories] = useState<IStory[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStories = async (page: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await getStories(page, DEFAULT_PER_PAGE);

      if (!data) {
        return toastError(error);
      }

      setStories(data.stories);
      setTotalPages(data.total);
    } catch (error) {
      toastError(`An unexpected error occured: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(currentPage);
  }, [currentPage]);

  const handleChange: TablePaginationProps['onPageChange'] = (event, page) => {
    setCurrentPage(page);
  };

  const handleView = (id: string) => {
    router.push(`stories/${id}`);
  };

  return (
    <Box className='space-y-4'>
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
                  <CircularProgress color='secondary' />
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
