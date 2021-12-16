import React from 'react'
import style from './top_section.module.css'
import { useSelector } from 'react-redux';
import { I18n } from 'react-redux-i18n';

function index({ text, search, handleSearch, filteredData, handleChangeSwitch, editingRow }) {
	const todo_items = useSelector((state) => state.todoState).todos;

	return (
		<>
			<div className={style.TopSection}>
				<div className={style.LeftSide}>
					<h6>{text}</h6>
					{todo_items && todo_items.length > 0 &&
						<div className={style.SwitchContainer}>
							<label className={style.Switch}>
								<input type="checkbox" disabled={editingRow} onChange={e => handleChangeSwitch(e.target.checked)} />
								<span className={style.Slider}></span>
							</label>
							<p>{I18n.t('Show completed only')}</p>
						</div>
					}
				</div>
				{todo_items && todo_items.length > 0 &&
					<div className={style.SearchContainer}>
						<label htmlFor="search">{search && search.length > 0 ? `${filteredData.length} ${filteredData.length === 1 ? I18n.t('result') : I18n.t('results')}  ${I18n.t('found')}` : ""}</label>
						<input type="text" id="search" placeholder={I18n.t('Search for todo')} value={search} onChange={handleSearch} />
					</div>
				}
			</div>
		</>
	)
}

export default index

