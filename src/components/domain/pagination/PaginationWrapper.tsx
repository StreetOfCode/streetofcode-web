import React from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import {device} from '../../../theme/device'

type Props = {
  className?: string
  initialPage?: number
  forcePage?: number
  handlePageClick: (pageNumber: number) => void
  totalPages: number
}

const PaginationWrapper = ({
  className,
  initialPage,
  forcePage,
  handlePageClick,
  totalPages,
}: Props) => {
  return (
    <StyledReactPaginage
      className={className}
      breakLabel="..."
      nextLabel="Nasledujúce"
      previousLabel="Prechádzajúce"
      initialPage={initialPage}
      forcePage={forcePage}
      onPageChange={(selectedItem: {selected: number}) =>
        handlePageClick(selectedItem.selected)
      }
      pageCount={totalPages}
    />
  )
}

const StyledReactPaginage = styled(ReactPaginate).attrs({
  activeClassName: 'active',
  previousClassName: 'previousLabel',
  nextClassName: 'nextLabel',
})`
  margin: 72px auto;
  margin-bottom: 0;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  gap: 16px;
  padding: 0;

  li a {
    border-radius: 18px;
    text-align: center;
    padding: 4px 12px;
    border: var(--color-secondary) 1px solid;
    cursor: pointer;
  }
  li:hover a {
    opacity: 0.7;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: var(--color-accent);
    border-color: transparent;
    color: var(--color-primary);
    min-width: 32px;
  }
  li.disabled a {
    opacity: 0.4;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }

  @media ${device.S} {
    .previousLabel,
    .nextLabel {
      display: none;
    }

    gap: 8px;
    max-width: 320px;
  }
`

export default PaginationWrapper
