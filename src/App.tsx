import { Navigate, Route, Routes } from "react-router-dom";
import { Main, SignIn, SignUp } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Main />} />
          </>
        ) : (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to={"/sign-in"} replace/>}/>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
