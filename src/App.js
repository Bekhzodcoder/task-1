import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main, SignIn, SignUp } from "./pages";
import { useSelector } from "react-redux";
function App() {
    const { user } = useSelector((state) => state.auth);
    return (_jsx(_Fragment, { children: _jsx(Routes, { children: user ? (_jsx(_Fragment, { children: _jsx(Route, { path: "/", element: _jsx(Main, {}) }) })) : (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/sign-in", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/sign-up", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/sign-in", replace: true }) })] })) }) }));
}
export default App;
