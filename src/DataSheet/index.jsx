import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/Pagination';
import SnackBar from '../../components/SnackBar';
import TopSection from '../TopSection';
import Table from '../Table';
import style from './data_sheet.module.css'
import debounce from 'lodash.debounce';
import Loading from '../../components/Loading';
import Spinner from '../../components/Spinner';
import AddTodo from '../AddTodo';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, loadTodos, deleteTodo } from './../redux/actions/items';
import { I18n } from 'react-redux-i18n';

function index ) {
	const dispatch = useDispatch();
	const todoState = useSelector((state) => state.todoState);
	const [search, setSearch] = useState('')
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('id');
	const [page, setPage] = useState(0);
	const [rowsPerPage] = useState(6/* 10 */);
	const [editingRow, setEditingRow] = useState(null)

	const [filteredData, setFilteredData] = useState(null);
	const [editingField, setEditingField] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', bgC: "" })

	const initialErr = {
		id: "",
		name: "",
		deadline: "",
	}

	const [hasErr, setHasErr] = useState(initialErr);

	const tableHead = [
		{ id: "action", label: I18n.t('Actions'), width: 200, sorting: false },
		// { id: "id", label: "No", sorting: true },
		{ id: "name", label: I18n.t('Name'), sorting: true },
		{ id: "deadline", label: I18n.t('Deadline'), width: 200, sorting: true },
	]

	useEffect(() => {
		dispatch(loadTodos())
	}, [])

	useEffect(() => {
		console.log(todoState)
		setFilteredData(todoState.todos)
	}, [todoState.todos])

	const runAfterFinishTyping = useCallback(
		debounce(searchVal => {
			// console.log(searchVal);
			const clonedData = [...todoState.todos]
			const matches = clonedData.filter((element) =>
				element.name.toLowerCase().includes(searchVal.trim())
				|| element.deadline.toLowerCase().includes(searchVal.trim())
			)

			setFilteredData(matches)
			setPage(0)
		}, 500),
		[filteredData],
	);

	const handleSearch = (e) => {
		let value = e.target.value && e.target.value.toLowerCase()
		setSearch(value)

		runAfterFinishTyping(value);
	}

	const handleChangeSwitch = (ckd) => {
		setFilteredData(ckd ? filteredData.filter(el => el['is-completed']) : todoState.todos)
		if (!ckd) setSearch('')
		setPage(0)
	}

	const handleChangePage = (newPage) => {
		setPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" })
	};

	const handleSortRequest = (_, property) => {
		const isAsc = orderBy === property && order === 'asc';

		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleBack = () => {
		setEditingRow(null)
		setHasErr(initialErr)
		setEditingField(null)
	};

	const handleEdit = (id) => {
		setEditingRow(id)

		const clonedData = [...filteredData]
		let selectedField = clonedData.find(row => row.id === id)

		if (Object.keys(selectedField).length !== 0) {
			setEditingField(selectedField)
		}
	};

	const handleSave = (id) => {
		const clonedData = [...todoState.todos]
		const index = clonedData.findIndex(row => row.id === id)

		if (JSON.stringify(clonedData[index]) === JSON.stringify(editingField)) {
			// console.log('the same');
			handleBack()

			setAlert({
				bgC: 'rgb(255 129 0)',
				open: true,
				message: I18n.t('Values are the same')
			})
		} else {
			// console.log('different');
			dispatch(changeField(editingField))

			setSearch('')
			handleBack()
			setAlert({
				bgC: '#04ff00',
				open: true,
				message: I18n.t('Todo was updated')
			})
		}
	}

	const validation = (id, name, value) => {
		switch (name) {
			case 'name':
				if (value.trim().length === 0) {
					setHasErr({ ...hasErr, ['id']: id, [name]: I18n.t('This field is required') })
				} else {
					setHasErr({ ...hasErr, [name]: '' })
				}
				break;

			case 'deadline':
				break;

			default:
				break;
		}
	}

	const handleChange = (e, id) => {
		const nameOfField = e.target.name;
		const valueOfField = e.target.value;

		if (editingField) {
			const newEditingData = { ...editingField, [nameOfField]: valueOfField }
			setEditingField(newEditingData)
		}

		validation(id, nameOfField, valueOfField)
		// console.log(editingField);
	};

	const selectClick = (ckd, id) => {
		const clonedData = [...filteredData]
		let selectedField = clonedData.find(row => row.id === id)
		selectedField['is-completed'] = ckd

		dispatch(changeField(selectedField))
		setSearch('')
	}

	const handleDelete = (id) => {
		dispatch(deleteTodo(id))

		setSearch('')
		handleBack()
		setAlert({
			bgC: '#ff1100',
			open: true,
			message: I18n.t('Todo was deleted')
		})
	}

	return (
		<Loading isLoading={todoState.loading}>
			<div className={style.DataSheet}>
				<Spinner isLoading={todoState.field_loading}>{/* static  */}
					<TopSection text={I18n.t('Table of Todo items')} search={search} handleSearch={handleSearch} filteredData={filteredData} editingRow={editingRow} handleChangeSwitch={handleChangeSwitch} />
					<AddTodo setAlert={setAlert} editingRow={editingRow} setSearch={setSearch} />
					<Table
						tableHead={tableHead}
						handleSortRequest={handleSortRequest}
						orderBy={orderBy}
						order={order}
						page={page}
						rowsPerPage={rowsPerPage}
						editingRow={editingRow}
						filteredData={filteredData}
						handleBack={handleBack}
						handleSave={handleSave}
						handleEdit={handleEdit}
						handleChange={handleChange}
						editingField={editingField}
						errObj={hasErr}
						handleDelete={handleDelete}
						selectClick={selectClick}
					/>

					{filteredData && filteredData.length && filteredData.length > rowsPerPage ?
						<div className={style.PaginationContainer}>
							<Pagination activePage={page} handleChangePage={handleChangePage} total={filteredData.length} perPage={rowsPerPage} />
						</div>
						: null
					}
				</Spinner>

				<SnackBar alert={alert} setAlert={setAlert} />
			</div>
		</Loading>
	)
}

export default index
