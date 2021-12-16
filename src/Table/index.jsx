import React from 'react'
import style from './table.module.css'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { getComparator, maxAfterAMonth, tableSort } from '../../components/utils';
import { trimText } from './../../components/utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { I18n } from 'react-redux-i18n';

function index({
	tableHead,
	handleSortRequest,
	orderBy,
	order,
	page,
	rowsPerPage,
	editingRow,
	handleBack,
	handleSave,
	handleEdit,
	handleChange,
	filteredData,
	editingField,
	errObj,
	selectClick,
	handleDelete
}) {
	const todoState = useSelector((state) => state.todoState);

	return (
		<>
			<table className={style.TableContainer}>
				<thead className={style.TableHead}>
					<tr>

						<th style={{ width: 200 }}> </th>
						{tableHead && tableHead.map(head =>
							<th style={{ width: head.width }} key={head.id} onClick={(e) => head.sorting ? handleSortRequest(e, head.id) : e.preventDefault()}>
								<span>
									{head.label}
									<i>	{orderBy === head.id ? (order === 'asc' ? < AiOutlineArrowDown /> : < AiOutlineArrowUp />) : null}</i>
								</span>
							</th>
						)}
					</tr>
				</thead>
				<tbody className={style.TableBody}>
					{filteredData && filteredData.length > 0 && tableSort((filteredData), getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map(el => {
							const currenlyEditing = editingRow && editingRow === el.id
							const errName = errObj.name && errObj.name.length > 0
							const errDeadline = errObj.deadline && errObj.deadline.length > 0

							const { id, ...rest } = errObj
							const disableBtn = Object.values(rest).some(x => (x !== ''))

							return (
								<tr key={el.id}>
									<td>
										<input
											type="checkbox"
											onChange={(e) => selectClick(e.target.checked, +el.id)}
											checked={el['is-completed']}
											disabled={editingRow}
										/>
									</td>
									<td className={style.EditRow}>
										{currenlyEditing ?
											<>
												<button><GrClose onClick={handleBack} className={style.BackIcon} /></button>
												<button disabled={todoState.field_loading}><AiOutlineDelete onClick={() => todoState.field_loading ? undefined : handleDelete(el.id)} className={todoState.field_loading ? style.Disabled : style.DeleteIcon} /></button>
												<button disabled={disableBtn}><FiCheckSquare onClick={() => disableBtn ? undefined : handleSave(el.id)} className={disableBtn ? style.Disabled : style.CheckIcon} /></button>
											</>
											: editingRow ? null : <FiEdit onClick={() => handleEdit(el.id)} className={style.EditIcon} />}
									</td>
									{/* <td>{el.id}</td> */}
									<td>
										{currenlyEditing ?
											<>
												<textarea cols="30" rows="4" name="name" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.name} placeholder={I18n.t('Type name')} className={errName && errObj.id === el.id ? [style.Input, style.TextArea, style.hasError].join(' ') : [style.Input, style.TextArea].join(' ')} />
												{errName && errObj.id === el.id && <p className={style.errMessage}>*{errObj.name}</p>}
											</>
											: trimText(el.name, 250)
										}
									</td>
									<td>
										{currenlyEditing ?
											<>
												<input type="date" name="deadline" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.deadline} max={maxAfterAMonth()} onKeyDown={(e) => e.preventDefault()} className={errDeadline && errObj.id === el.id ? [style.Input, style.hasError].join(' ') : style.Input} />
												{errDeadline && errObj.id === el.id && <p className={style.errMessage}>*{errObj.deadline}</p>}
											</>
											: el.deadline
										}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>

			{filteredData && filteredData.length === 0 &&
				<div className={style.NoData}>
					{I18n.t('No data')}
				</div>
			}
		</>
	)
}

export default index
