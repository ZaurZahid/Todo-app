export const maxAfterAMonth = () => {
	var dtToday = new Date();

	var month = dtToday.getMonth() + 1 + 1; // jan=0; feb=1 .......
	var day = dtToday.getDate();
	var year = dtToday.getFullYear();

	if (month < 10)
		month = '0' + month.toString();
	if (day < 10)
		day = '0' + day.toString();

	const maxDate = year + '-' + month + '-' + day;
	return maxDate
}

export const minToday = () => {
	var dtToday = new Date();

	var month = dtToday.getMonth() + 1; // jan=0; feb=1 .......
	var day = dtToday.getDate();
	var year = dtToday.getFullYear();

	if (month < 10)
		month = '0' + month.toString();
	if (day < 10)
		day = '0' + day.toString();

	const minDate = year + '-' + month + '-' + day;
	return minDate
}

export function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

//sorting array
export function tableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export const trimText = (text, num) => {
	let newText = ''
	if (text) {
		if (text.length > num) {
			newText = text.substr(0, num) + '...'
		} else {
			newText = text
		}
	}

	return newText
}

export function getLanguage() {
	return typeof window !== 'undefined' ? (localStorage.getItem('todo-language') || 'en') : 'en'
}

export const setLanguage = (lang) => localStorage.setItem('todo-language', lang)