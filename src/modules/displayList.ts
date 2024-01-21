import {getAllUsers} from '../api/index.ts'
import addNewRow from './addNewRow.ts'
//Функция для данных(строк) в таблицу
export default async function displayList(rowPerPage: number, page: number) {
  try {
    //Получение таблицы
    const TBODY: HTMLTableElement = document.querySelector('.tableBody')!
    // Декремент страницы. Он нужен для того что бы при слайсе мы получили правильный диапазон. Если придет переменная page и получит значение 1, значит мы находимся на первой странице и нам нужно получить данные с 1 по 10 строку. Но из-за того формулы start(смотрите ниже) мы получили бы не первые 10, а вторые 10 строк.
    page--
    //Формула start которая считает начало диапазона вывода строк в таблицу
    const start = rowPerPage * page
    //Формула start которая считает конец диапазона вывода строк в таблицу
    const end = start + rowPerPage
    //Получение всех данных из бд
    const data = await getAllUsers()
    //Режем массив данных по найденому диапазону.
    const paginatedData = data.slice(start, end)

    //Чистим всю таблицу для того что бы был эффект обнавления таблицы. Если убрать эту строчку при пагинации последующие десять строк будут добавляться в конец прошлых десяти строк, а нам нужно что бы следующие десять строк добавились на место прошлых.
    TBODY.innerHTML = ''
    //Пробегаемся по массиву
    paginatedData.forEach((user, index) => {
      //Здесь мы создаем переменную rowNumber, которая представляет собой номер строки в таблице.
      const rowNumber = start + index + 1
      //Добавляем строку в таблицу
      addNewRow(user, rowNumber)
    })
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
}
