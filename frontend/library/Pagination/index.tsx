import React, { useReducer, Reducer } from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';

interface Props {
	currentPage?: number;
	totalRecords: number;
	recordsPerPage?: number;
	onPageChange: (page: number) => void;
}

interface initialState {
	currentPage: number;
	recordsPerPage: number;
	totalRecords: number;
}

interface State extends initialState {
	pages: number[];
	totalPages: number;
}

type Actions = { type: 'PAGE_CHANGE'; page: number };

const getState = ({ currentPage, recordsPerPage, totalRecords }: initialState): State => {
	const totalPages = Math.ceil(totalRecords / recordsPerPage);

	// create an array of pages to ng-repeat in the pager control
	let startPage = 0;
	let endPage = 0;

	if (totalPages <= 9) {
		// less than 9 total pages so show all
		startPage = 1;
		endPage = totalPages;
	} else {
		// more than 9 total pages so calculate start and end pages
		if (currentPage <= 6) {
			startPage = 1;
			endPage = 9;
		} else if (currentPage + 4 >= totalPages) {
			startPage = totalPages - 9;
			endPage = totalPages;
		} else {
			startPage = currentPage - 4;
			endPage = currentPage + 4;
		}
	}

	const pages = Array.from({ length: endPage + 1 - startPage }, (_, i) => startPage + i);

	// Too large or small currentPage
	let correctCurrentpage = currentPage;
	if (currentPage > totalPages) correctCurrentpage = totalPages;
	if (currentPage <= 0) correctCurrentpage = 1;

	return {
		currentPage: correctCurrentpage,
		recordsPerPage,
		totalRecords,
		pages,
		totalPages,
	};
};

const reducer: Reducer<State, Actions> = (state, action) => {
	switch (action.type) {
		case 'PAGE_CHANGE':
			return getState({
				...state,
				currentPage: action.page,
			});

		default:
			throw new Error();
	}
};

const Pagination = React.memo<Props>(
	({ currentPage = 1, totalRecords, recordsPerPage = 10, onPageChange }) => {
		const [state, dispatch] = useReducer(
			reducer,
			{ currentPage, totalRecords, recordsPerPage, totalPages: 0 },
			getState
		);

		const changePage = (page: number) => {
			dispatch({ type: 'PAGE_CHANGE', page });
			onPageChange(page);
		};

		// if (state.totalPages === 1) return null;
		const handlePrev = () => changePage(state.currentPage - 1);
		const handleNext = () => changePage(state.currentPage + 1);

		return (
			<ButtonGroup>
				<Button disabled={state.currentPage === 1} onClick={() => changePage(1)}>
					First
				</Button>
				<Button
					icon="chevron-left"
					disabled={state.currentPage === 1}
					onClick={handlePrev}
				/>
				{state.pages.map((page) => (
					<Button
						key={page}
						intent={state.currentPage === page ? 'primary' : 'none'}
						onClick={() => changePage(page)}
					>
						{page}
					</Button>
				))}
				<Button
					icon="chevron-right"
					disabled={state.currentPage === state.totalPages}
					onClick={handleNext}
				/>
				<Button
					disabled={state.currentPage === state.totalPages}
					onClick={() => changePage(state.totalPages)}
				>
					Last
				</Button>
			</ButtonGroup>
		);
	}
);

export default Pagination;
