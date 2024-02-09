import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types.ts";

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "алфавиту",
    sortProperty: SortPropertyEnum.TITLE_ASC,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
