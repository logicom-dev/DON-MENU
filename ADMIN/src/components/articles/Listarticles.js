import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArticles } from "../../features/articleSlice";
import AfficheArticles from "./AfficheArticles";
import Menu from "../Navbarre";
const Listarticles = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);
    return (
        <div>
            <Menu />
            <AfficheArticles />
        </div>
    )
}
export default Listarticles