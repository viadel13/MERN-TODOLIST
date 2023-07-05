import { AiFillCheckSquare } from "react-icons/ai";

const Header = () => {
  return (
    <>
      <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
        <AiFillCheckSquare className="me-2" />
        <u>My Todo-s</u>
      </p>
    </>
  );
};

export default Header;
