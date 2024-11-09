import { Pagination } from "@mui/material";

const CustomPagination = ({ result, handlePagination, perPageItem }) => {
   return (
      <div className='flex justify-center mt-10'>
         <Pagination count={Math.ceil(result / perPageItem)} sx={{
            '& .MuiPaginationItem-root': {
               color: 'white',
            },
            '& .Mui-selected': {
               backgroundColor: '3F3F46',
               color: 'white',
            },
         }} color="primary"
            onChange={handlePagination}
         />
      </div>
   );
};

export default CustomPagination;