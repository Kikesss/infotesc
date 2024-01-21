import {showPopup} from './popup.ts'
import {User} from '../types/index.ts'
//Функция для добавления одной строки в таблицу
export default function addNewRow(user: User, numberPerson: number) {
  //Получение таблицы(без хедера)
  const TBODY: HTMLTableElement = document.querySelector('.tableBody')!

  //Создание значений которые пойдут в новую строку
  const newTds = `
    <td>${numberPerson}</td>
    <td>${user.name.firstName}</td>
    <td>${user.name.lastName}</td>
    <td>
      <p class="textAbout">${user.about}</p>
    </td>
    <td class="tdEyeColor">${user.eyeColor}</td>
  `
  //Создание строки
  const newTr = document.createElement('tr')
  //Присвоение строке id
  newTr.id = user.id
  //Добавление в строку всех значений
  newTr.innerHTML = newTds
  //Засовываем новую строчку в таблицу
  TBODY.append(newTr)

  newTr.addEventListener('click', () => {
    //Создание копии элементов в таблице, нужно для удаления выделения
    const children = [...TBODY.children]
    //Пробегаемся по массиву и удаляем класс "tr-active"
    children.forEach(child => child.classList.remove('tr-active'))
    //Добавляем класс "tr-active"
    newTr.classList.add('tr-active')
    //Открываем попап окно
    showPopup(numberPerson, user.id)
  })
}
