import { FilterDto } from "../dtos/filter.dto";
import { PaginateModel } from "../models/paginate.model";
import { environment } from "../../environment/environment";

export function extractPagination<FILTER extends FilterDto = FilterDto>(filters: FILTER): PaginateModel & FILTER {
  const pageNo: number = filters?.pageNo || 1;
  const pageSize: number = filters?.pageSize || environment.pageSize;

  const skip: number = (pageNo - 1) * pageSize;
  const take: number = pageSize;

  return { ...filters, skip, take, pageNo, pageSize };
}
