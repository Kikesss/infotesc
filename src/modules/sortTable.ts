export default function sortTable() {
  //Получение ссылки на элемент таблицы с классом "table" из DOM.
  const TABLE: HTMLTableElement = document.querySelector('.table')!
  //Получение ссылки на элемент таблицы с классом "tableBody" из DOM.
  const TABLE_BODY: HTMLTableSectionElement =
    document.querySelector('.tableBody')!
  //Инициализация переменной isSortedAscending для отслеживания направления сортировки (по умолчанию сортировка начинается снизу вверх).
  let isSortedAscending = false
  //Объявление функции sortTable, которая принимает индекс столбца и выполняет сортировку таблицы по указанному столбцу.
  function sortTable(columnIndex: number): void {
    //rows становится массивом объектов, который представляет строки таблицы. Этот массив затем используется для сортировки строк в функции sortTable.
    const rows: HTMLTableRowElement[] = Array.from(TABLE_BODY.rows)
    //Сортировка массива строк на основе содержимого ячеек в указанном столбце. Если столбец - числовой, то сравнение происходит как числа, в противном случае - с использованием localeCompare для строк.
    rows.sort((a: HTMLTableRowElement, b: HTMLTableRowElement) => {
      const cellA: string = a.cells[columnIndex].textContent?.trim() || ''
      const cellB: string = b.cells[columnIndex].textContent?.trim() || ''

      if (columnIndex === 0) {
        return parseInt(cellA, 10) - parseInt(cellB, 10)
      } else {
        return cellA.localeCompare(cellB)
      }
    })
    //Очистка содержимого тела таблицы.
    TABLE_BODY.innerHTML = ''
    //Объявление отсортированных строк обратно в тело таблицы.
    rows.forEach((row: HTMLTableRowElement) => {
      TABLE_BODY.appendChild(row)
    })
  }

  TABLE.addEventListener('click', (event: Event) => {
    //Получение элемента, на который был совершен клик.
    const target = event.target as HTMLElement
    //Проверка, что клик был совершен по элементу <button>.
    if (target.tagName === 'BUTTON') {
      //Определение индекса столбца, по которому был совершен клик.
      const columnIndex = Array.from(
        (target.parentNode as HTMLElement)?.parentNode?.children || []
      ).indexOf(target.parentNode as HTMLElement)
      //Инвертирование направления сортировки.
      isSortedAscending = !isSortedAscending
      //Вызов функции сортировки с передачей индекса столбца.
      sortTable(columnIndex)
      //Обновление текста кнопки с учетом направления сортировки.
      updateButtonText(target as HTMLButtonElement, isSortedAscending)
    }
  })
  //Объявление функции, которая обновляет текст кнопки, добавляя стрелку вверх или вниз в зависимости от направления сортировки.
  function updateButtonText(
    button: HTMLButtonElement,
    isAscending: boolean
  ): void {
    const arrow = isAscending ? '▲' : '▼'
    button.innerHTML = button.innerHTML.replace(/▼|▲/, '') + arrow
  }
}
