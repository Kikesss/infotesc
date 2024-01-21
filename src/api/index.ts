import { User } from "../types";
//Объявляем асинхронную функцию
async function getAllUsers(): Promise<User[]> {
  //Выполняем запрос на сервер и получаем объект response
  const response = await fetch("http://localhost:3000/users");
  //Извлекаем данные, предполагая что сервер вернул json. Здесь тоже нужен await потому что метод json() возвращает промис и нам его дождаться
  const data = await response.json();
  //Возвращаем данные
  return data;
}
//Объявляем асинхронную функцию
async function getUser(id: string): Promise<User> {
  //Выполняем запрос на сервер и получаем объект response. Только уже мы получаем конкретного человека по его уникальному id
  const response = await fetch(`http://localhost:3000/users/${id}`);
  //Извлекаем данные, предполагая что сервер вернул json. Здесь тоже нужен await потому что метод json() возвращает промис и нам его дождаться
  const data = await response.json();
  //Возвращаем данные
  return data;
}
export { getAllUsers, getUser };
