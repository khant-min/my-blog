import Brand from "./Brand";
import Nav from "./Nav";

const Header = () => {
  return (
    <div className="bg-blue-400 flex justify-between items-center p-4 rounded-sm">
      <Brand />
      <Nav />
    </div>
  );
};

export default Header;
