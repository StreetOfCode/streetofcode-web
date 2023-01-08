export const getTotalNumberOfPages = (
  itemsCount: number,
  itemsPerPage: number,
) => Math.ceil(itemsCount / itemsPerPage)

export const getCurrentPageItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number,
) => {
  const totalPages = getTotalNumberOfPages(items.length, itemsPerPage)

  const currentPageindexStart = (currentPage - 1) * itemsPerPage
  const pageItems = items.slice(
    currentPageindexStart,
    currentPageindexStart + itemsPerPage,
  )

  return {
    pageItems,
    totalPages,
  }
}

export const getPagePaths = (itemsCount: number, itemsPerPage: number) => {
  const totalPages = getTotalNumberOfPages(itemsCount, itemsPerPage)

  const possiblePaths = []
  for (let i = 1; i < totalPages; i++) {
    // start from the second page
    possiblePaths.push(i + 1)
  }

  return possiblePaths.map((pageNumber) => ({
    params: {pageNumber: pageNumber.toString()},
  }))
}
