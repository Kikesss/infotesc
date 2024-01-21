import {getUser} from '../api'

//Получение ипутов для заполнения их текстом при открытии
const INPUT_FIRST_NAME: HTMLInputElement =
  document.querySelector('.input-firstName')!
const INPUT_SECOND_NAME: HTMLInputElement =
  document.querySelector('.input-lastName')!
const INPUT_ABOUT: HTMLInputElement = document.querySelector('.input-about')!
const INPUT_EYE_COLOR: HTMLInputElement =
  document.querySelector('.input-eye_color')!

//Получение попап окно
const UI_DIALOG: HTMLDialogElement = document.querySelector('.dialog')!

//Кнопка "Отмена" для выхода из попапа
const CANCEL_BTN: HTMLButtonElement =
  document.querySelector('.editing-btn-close')!
const DIALOG_FORM: HTMLFormElement = document.querySelector('.form')!
//Получение номер строки в попапе
const COUNT_STRING: HTMLSpanElement = document.querySelector('.count-string')!
//Функция для открытия попап окна
export async function showPopup(id: number, userId: string) {
  UI_DIALOG.show()
  //Поиск юзера по его id
  const user = await getUser(userId)
  //Заполнение инпутов значениями перед открытием
  INPUT_FIRST_NAME.value = user.name.firstName
  INPUT_SECOND_NAME.value = user.name.lastName
  INPUT_ABOUT.value = user.about
  INPUT_EYE_COLOR.value = user.eyeColor
  //Присвоение номера строки в попап окно
  COUNT_STRING.textContent = id.toString()

  //Поиск элемента по айди для удаления класса tr-active
  const liEl = document.getElementById(userId)!
  //Создание обработчика события на кнопку "Отмена"
  CANCEL_BTN.addEventListener('click', () => {
    //закрытие модального окна
    UI_DIALOG.close
    //Удаление tr-active
    liEl.classList.remove('tr-active')
  })

  DIALOG_FORM.addEventListener('submit', () => {
    //закрытие модального окна
    UI_DIALOG.close
    //Удаление tr-active
    liEl.classList.remove('tr-active')
  })
}
