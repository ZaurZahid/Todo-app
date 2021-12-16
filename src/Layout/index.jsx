import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { I18n, setLocale } from 'react-redux-i18n';
import { setLanguage } from '../../components/utils';
import DataSheet from '../DataSheet'
import style from './layout.module.css'

function index() {
	const dispatch = useDispatch();
	const language = useSelector((state) => state.i18n.locale);
	const [lng, setLng] = React.useState()

	const toogleLanguage = lng => {
		setLanguage(lng)
		dispatch(setLocale(lng));
	};

	React.useEffect(() => {
		setLng(language)
	}, [language])

	return (
		<div className={style.Container}>
			<div className={style.LanguageContainer}>
				<button
					className={`${lng === "az" ? style.Active : ""}`}
					onClick={() => toogleLanguage("az")}
				>
					Az
				</button>
				<button
					className={`${lng === "en" ? style.Active : ""}`}
					onClick={() => toogleLanguage("en")}
				>
					En
				</button>
				<button
					className={`${lng === "ua" ? style.Active : ""}`}
					onClick={() => toogleLanguage("ua")}
				>
					Ua
				</button>
			</div>
			<DataSheet />
		</div>
	)
}

export default index
