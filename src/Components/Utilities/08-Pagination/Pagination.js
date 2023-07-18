import ReactPaginate from 'react-paginate';
import './Pagination.css'

const Pagination = (props) => {

    const handlePageClick = (pageNum) => {
        props.pageNumHandle(pageNum.selected + 1)
    }

    return (
        <div className={`pagination-item d-flex justify-content-center ${(props.totalPages === 0 || props.totalPages === 1) && (`d-none`) } `}>
        <ReactPaginate
        containerClassName='pagination'
        breakLabel="..."
        breakClassName='page-item'
        breakLinkClassName='page-link'
        nextLabel="التالى >"
        nextClassName='page-item me-1'
        nextLinkClassName='page-link'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={props.totalPages}
        pageClassName='page-item'
        pageLinkClassName='page-link '
        previousLabel="< السابق"
        previousClassName='page-item ms-1'
        previousLinkClassName='page-link'
        activeClassName='active'
        renderOnZeroPageCount={null}
        />
    </div>
    )
}

export default Pagination