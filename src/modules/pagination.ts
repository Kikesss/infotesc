import {getAllUsers} from '../api'
import displayList from './displayList'
//Функция для добавления пагинации
export default async function pagination(currentPage: number, rows: number) {
  try {
    //Получение div элемента пагинации
    const PAGINATION_EL: HTMLDivElement = document.querySelector('.pagination')!
    //Берем данные из
    const arrUsers = await getAllUsers()

    //Получение кол-во страниц и округление их в большую сторону
    const pagesCount = Math.ceil(arrUsers.length / 10)
    //Создание элемента ul, куда пойдут элементы li с нашей нумерацией
    const ulElement = document.createElement('ul')
    //Присвоение класса "pagination__list"
    ulElement.classList.add('pagination__list')
    //Добавление нумерации на страницу
    for (let i = 1; i <= pagesCount; i++) {
      //Создание переменной li для присвоение её в ul и получение нумерации
      const liElement = displayPaginationBtn(i)
      //Кладем li в созданную ul
      ulElement.appendChild(liElement)
    }
    //Кладем ul в пагинацию
    PAGINATION_EL.appendChild(ulElement)
    //Функция для вывода нумерации
    function displayPaginationBtn(page: number) {
      //Создание li элемента
      const liElement = document.createElement('li')!
      //Присвоение ей класса
      liElement.classList.add('pagination__item')
      //Добавляем текст а именно число страницы в элемент li
      liElement.textContent = page.toString()
      //Проверка на какой странице находится пользователь и добавляем класс для изменения цвета на номере страницы
      if (currentPage === page)
        liElement.classList.add('pagination__item--active')
      //Обработчик события на нумерацию
      liElement.addEventListener('click', () => {
        //Изменение диапазона, тоесть когда мы нажимаем на число, у нас меняется переменная currentPage тем самым меняем диапазон
        currentPage = page
        //Вывод строк в таблицу по диапазону
        displayList(rows, currentPage)
        //Получаем элемент который активен в данный момент
        let CURRENT_ITEM_LI = document.querySelector(
          'li.pagination__item--active'
        )!
        //Удаляем из прошлого элемента класс который меняет цвет выбранного номера
        CURRENT_ITEM_LI.classList.remove('pagination__item--active')
        //Добавляем цвет на выбранный номер
        liElement.classList.add('pagination__item--active')
      })
      //Возвращаем элемент li
      return liElement
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
}
