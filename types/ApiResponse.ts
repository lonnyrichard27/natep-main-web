export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationData {
  total_records: number;
  total_pages: number;
  current_page_no: number;
  next_page_no: null | number;
  no_of_current_page_records: number;
  response: any[]; // ensure this is always an array
  fileCode?: string;
}

export interface PaginationData2<T> {
  total_records: number;
  total_pages: number;
  current_page_no: number;
  next_page_no: null | number;
  no_of_current_page_records: number;
  response: any[]; // ensure this is always an array
  fileCode?: string;
}
