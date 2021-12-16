import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import azJson from '../../public/locales/az/common.json';
import enJson from '../../public/locales/en/common.json';
import uaJson from '../../public/locales/ua/common.json';
import { getLanguage } from './../../components/utils/index';

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

/* translations */
const translations = {
    az: { ...azJson },
    en: { ...enJson },
    ua: { ...uaJson }
}

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(getLanguage()));