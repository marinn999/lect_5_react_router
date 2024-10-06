import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchUserById } from "../../services/api";
import useHttp from "../../hooks/useHttp";

const UserDetails = () => {
  const { someonesId } = useParams();
  const location = useLocation();
  console.log(location);
  //Коли щось роблю на сторінці, то location.state змінюється.
  //Тому треба записати state в goBack = useRef(location.state), тоді повертаю Link to = { goBack.current }
  const goBack = useRef(location.state);

  //–––––––––––––––––––––––––––––––––––––––––––
  //(null) - значить що поки що користувача не існує
  // const [user, setUser] = useState(null);
  //_______________________________________________________

  //Хук що дозволяє переходити по навігації. Далі пишемо он клік на кнопку в розмітці
  //наприклад onClick={() => navigate(-1).
  //Але зазвичай використовують Link замість кнопки і хука

  // const navigate = useNavigate();
  //Навігацію можна використовувати НП для перенаправлення користувача кудись(після входу на ненадійний сайт перекидає
  // на порнуху, або після помилки на головну сторінку)
  //Або з таймером: через 3 сек перекине на дом.сторінку
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 3000);
  // }, [navigate]);
  //---------------------------------------------------------
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetchUserById(someonesId);
  //     setUser(data);
  //   };
  //   getData();
  // }, [someonesId]);

  const [user] = useHttp(fetchUserById, someonesId);
  //–––––––––––––––––––––––––––––––––––––––––––

  if (!user) return <h2>Loading...</h2>;
  //Рядок `if (!user) return <h2>Loading...</h2>;` є необхідним для правильного функціонування компонента, особливо під час перезавантаження сторінки.

  //Ось чому без цього рядка нічого не працює:

  //Коли сторінка перезавантажується, дані про користувача ще не завантажені, а `user` за замовчуванням
  //дорівнює`null`.Без перевірки на `null` компонент одразу намагається відобразити інформацію про користувача,
  //але її ще немає.Це викликає помилку, і нічого не показується.

  //Рядок `if (!user) return <h2>Loading...</h2>;` перевіряє, чи дані вже отримані.
  //Якщо ні, він показує текст "Loading...", поки дані не завантажаться.
  //Це дозволяє уникнути помилки і правильно відобразити сторінку, коли дані будуть готові.
  //< h2 > Loading...</ >; ` дозволяє уникнути цієї помилки, оскільки він повертає просте повідомлення "Loading...",
  //доки дані користувача не будуть отримані і стан `user` не зміниться з `null` на об'єкт із даними.

  //Це стандартний підхід для обробки асинхронного завантаження даних у React. Він забезпечує плавний користувацький досвід і запобігає помилкам під час відображення компонентів, що залежать від отриманих даних.
  return (
    <div>
      {/* <button onClick={() => navigate(-1)}>Go back</button> */}
      {/* 
      
      локація location сформована хуком useLocation() в UserApp */}

      <Link to={goBack.current}>Go back link</Link>
      <img src={user.image} alt="" />
      <h2>
        {user.lastName} {user.firstName}
      </h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <hr />
      <div>
        <NavLink to="info">Info</NavLink>
        <NavLink to="posts">Posts</NavLink>
      </div>
      <Suspense fallback={<h2>Second loading</h2>}>
        <Outlet />
        {/* Щоб в Арр відобразились викладені route */}
      </Suspense>
    </div>
  );
};

export default UserDetails;
