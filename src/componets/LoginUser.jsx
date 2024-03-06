import { useContext, useState } from "react";
import "../styles/UserLogin.css";
import { ActiveUserContext } from "../contexts/ActiveUser";
import { ErrContext } from "../contexts/ErrContext";
import { useNavigate } from "react-router-dom";
const LoginUser = () => {
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  const [userInput, setUserInput] = useState("");
  const { setErr } = useContext(ErrContext);
  const [userInputLoadingCheck, setUserInputLoadingCheck] = useState(false);

  const getAllUsers = () => {
    return fetch(`https://news-lerning-project.onrender.com/api/users`)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        if (body.msg) {
          setErr(body.msg);
          navigate("/err");
        } else {
          for (let index = 0; index < body.users.length; index++) {
            if (body.users[index].username === userInput) {
              return setActiveUser(body.users[index]);
            }
          }
          return "user not found";
        }
      })
      .then((result) => {
        if (result === "user not found") {
          alert(`${result}`);
        } else {
          setUserInputLoadingCheck(true);
        }
      })
      .catch((err) => {
        setErr(err);
        navigate("/err");
      });
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    getAllUsers();
  };

  return (
    <>
      {!userInputLoadingCheck ? (
        <form onSubmit={handleUserSubmit}>
          <label htmlFor="user-name">Insert your user name</label>
          <input
            type="text"
            id="user-name"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <div className="user-display-block">
            {activeUser.name}
            <div className="avatar">
              <img
                src={activeUser.avatar_url}
                alt={`user ${activeUser.name} avatar image`}
              />
            </div>
            <button
              className="global-button"
              onClick={() => {
                setUserInputLoadingCheck(false);
                setActiveUser(null);
              }}
            >
              Change user
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default LoginUser;
