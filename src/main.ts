import displayList from './modules/displayList.js'
import sortTable from './modules/sortTable.js'
import pagination from './modules/pagination.js'
//Переменная которая отображает текущую страницу
const CURRENT_PAGE = 1
//Кол-во строк в таблице
const ROWS = 10
//Получение всех юзеров
//Вывод таблицы по диапазону
displayList(ROWS, CURRENT_PAGE)
//Добавление пагинации
pagination(CURRENT_PAGE, ROWS)
//Добавление сортировки
sortTable()
