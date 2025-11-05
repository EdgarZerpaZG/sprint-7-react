import { Pagination, Stack } from '@mui/material'

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={5} variant="outlined" shape="rounded" color="primary" />
    </Stack>
  );
}