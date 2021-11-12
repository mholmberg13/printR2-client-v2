import React from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home"
import ActivationEmail from "./activationEmail";
import { Routes, Route } from 'react-router-dom';

function Body() {
    return (
        <section>
            <Routes>
                <Route path='/login' element={<Login/>} exact />
                <Route path='/register' element={<Register/>} exact />

                <Route path="/user/activate/:activation_token" element={<ActivationEmail/>} />
            </Routes>
        </section>
    )
}

export default Body