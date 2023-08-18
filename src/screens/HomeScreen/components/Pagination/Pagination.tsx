import React, { FC } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type PaginationProps = {
    usersPerPage: number;
    totalUsers: number;
    paginate: (page: number) => void;
    currentPage: number;
};

const Pagination: FC<PaginationProps> = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleLeftArrow = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleRightArrow = () => {
        if (currentPage < pageNumbers.length) {
            paginate(currentPage + 1);
        }
    };

    return (
        <ButtonGroup variant="contained" color="primary">
            <Button onClick={handleLeftArrow} disabled={currentPage === 1}>
                <ArrowBackIosIcon />
            </Button>
            {pageNumbers.map(number => (
                <Button 
                    key={number} 
                    onClick={() => paginate(number)}
                    variant={number === currentPage ? "contained" : "outlined"}  // Highlight current page
                >
                    {number}
                </Button>
            ))}
            <Button onClick={handleRightArrow} disabled={currentPage === pageNumbers.length}>
                <ArrowForwardIosIcon />
            </Button>
        </ButtonGroup>
    );
}

export default Pagination;
