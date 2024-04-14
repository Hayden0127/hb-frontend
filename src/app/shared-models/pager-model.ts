export class PaginationQueryStringParameters {
    public pageNumber: number = 1;
    public pageSize: number = 10;
    public orderColumn: string | null = null;
    public orderBy: string | null = null;
}

export class PagerModel {
    public currentPage: number | null = null;
    public totalPages: number | null = null; 
    public pageSize: number | null = null; 
    public totalCount: number | null = null;
    public hasPrevious: boolean | null = null; 
    public hasNext: boolean | null = null; 
}