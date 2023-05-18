import Api from "../Axios/Api";

const CATEGORIE_API="/categorie/categories"

const fetchCategorie=async()=> {
return await Api.get(CATEGORIE_API);
}

export const CategorieService = {
    fetchCategorie,
    }
