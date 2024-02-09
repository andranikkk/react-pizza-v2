/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QueryString from "qs";

import { SearchContext } from "../App.tsx";

import Categories from "../Components/Categories.tsx";
import Sort, { sortList } from "../Components/Sort.tsx";
import Skeleton from "../Components/PizzaBlock/Skeleton.tsx";
import Pagination from "../Components/Pagination/Pagination.tsx";
import PizzaBlock from "../Components/PizzaBlock/PizzaBlock.tsx";

import { setCategoryId, setCurrentPage } from "../redux/Slices/filter/slice.ts";
import { selectPizzaData } from "../redux/Slices/pizza/selectors.ts";
import { selectFilter } from "../redux/Slices/filter/selectors.ts";
import { fetchPizzas } from "../redux/Slices/pizza/slice.ts";
import { useAppDispatch } from "../redux/store.ts";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectPizzaData);
  const { sort, categoryId, currentPage } = useSelector(selectFilter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // const search = searchValue ? `&search=${searchValue}` : "";  //${search}

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        currentPage: String(currentPage),
      })
    );
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = QueryString.parse(
  //       window.location.search.substring(1)
  //     ) as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort ? sort : sortList[1],
  //       })
  //     );

  //     // dispatch(
  //     //   setFilters({
  //     //     ...params,
  //     //     sort,
  //     //   })
  //     // );
  //     isSearch.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = QueryString.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = () => {
    const filteredItems = items.filter((item: any) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return status === "loading"
      ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
      : filteredItems.map((pizza) => (
          <PizzaBlock types={[]} sizes={[]} key={pizza.id} {...pizza} />
        ));
  };

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {/* {isLoading ? skeletons : pizzas} */}
          {pizzas()}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
