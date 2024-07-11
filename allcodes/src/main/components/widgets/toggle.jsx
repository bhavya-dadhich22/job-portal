/* eslint-disable react/prop-types */
const Toggle = ({ setIsUser, isUser }) => {
  return (
    <div className=" my-8">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isUser}
          onChange={() => setIsUser(!isUser)}
        />
        <div className="relative w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-black ">
          Login as {isUser ? "User" : "Company"}
        </span>
      </label>
    </div>
  );
};

export default Toggle;
