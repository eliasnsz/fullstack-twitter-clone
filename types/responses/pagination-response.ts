export interface PaginationResponse<T> {
  data: T
  page: number
  perPage: number
  total_results: number
  total_pages: number
}
