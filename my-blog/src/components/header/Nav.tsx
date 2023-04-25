import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul className="flex gap-10">
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/feeds">feeds</Link>
        </li>
        <li>
          <Link to="/build">build</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
