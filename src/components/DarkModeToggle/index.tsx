import { CiLight } from "react-icons/ci";

export const DarkModeToggle = () => {
  const currentMode = localStorage.getItem("theme");
  const lightMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = "light";
  };
  const darkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = "dark";
  };
  return (
    <div>
      {currentMode === "light" && (
        <>
          <div onClick={lightMode} className="cursor-pointer">
            <CiLight />
          </div>
        </>
      )}
      {currentMode === "dark" && (
        <>
          <div onClick={darkMode} className="cursor-pointer">
            <CiLight />
          </div>
        </>
      )}
    </div>
  );
};
