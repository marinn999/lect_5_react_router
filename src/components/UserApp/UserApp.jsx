import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import FilterBar from "../FilterBar/FilterBar";
import useHttp from "../../hooks/useHttp";

const UserApp = () => {
  //–––––––––––––––––––––––––––––––––––––––––––
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const data = await fetchUsers();
  //     setUsers(data);
  //   };
  //   getAllUsers();
  // }, []);
  const [users] = useHttp(fetchUsers);
  //–––––––––––––––––––––––––––––––––––––––––––

  //Формую локацію хуком const location =useLocation(). Якомусь компоненту Link треба передати цю локацію стейтом state={location}
  const location = useLocation();
  console.log(location);
  //Працює як збереження між рендарами
  const [searchParams, setSearchParams] = useSearchParams();
  //Витягаємо значення queryз  searchParams. Оскільки спочатку в поле інпуту нічого не введено,
  //то значення null, тому щоб сторінка не падала, пишу логічний оператор ?? і пусте поле «»
  const query = searchParams.get("query") ?? "";

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      setSearchParams({});
    }

    searchParams.set("query", newQuery);
    //searchParams записує дані в себе, а setSearchParams в url.
    //Тепер при пошуку за будь-яким словом буде в url /users?test=123
    // searchParams.set("test", "123");
    //Може будити скільки завгодно searchParams, наприклад додам searchParams.set(“mur”, “lemur”), тоді в url буде /users?test=123&mur=lemur
    // setSearchParams(searchParams);
    setSearchParams(searchParams);
  };

  //Відфільтровуюємо юзерів по тому, що пишу в query
  const filteredData = users?.filter(
    (user) =>
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.firstName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Users</h2>
      <FilterBar handleChangeQuery={handleChangeQuery} />
      <ul>
        {filteredData?.map((user) => (
          <li key={user.id}>
            {/* state={location} це типу стрілка до вказаної локації const location */}
            {/* Типу поверни мене в це місце */}
            <Link to={user.id.toString()} state={location}>
              <p>
                {user.lastName} {user.firstName}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserApp;
