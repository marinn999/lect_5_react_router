import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchPostsByUserId } from "../../services/api";
import s from "./PostsByUser.module.css";

const PostsByUser = () => {
  const { someonesId } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchPostsByUserId(someonesId);
      setPosts(data);
    };
    getData();
  }, [someonesId]);

  if (!posts.length) {
    return <h2>This user has no posts yet.</h2>;
  }
  return (
    <div className={s.wrapperPosts}>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`${post.id}/details`}>{post.title} </Link>
          </li>
        ))}
      </ul>
      <div className={s.outlet}>
        <Suspense fallback={<h2>Second loading</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default PostsByUser;
