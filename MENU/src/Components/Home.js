import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { getArticles } from "../../features/articleSlice";
import { useEffect } from 'react'
const Home = () => {
    const { articles } = useSelector((state) => state.articles);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        dispatch(getArticles());
    }, dispatch);
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
    };
    return (
        <div className="home-container">
            <h2>New Arrivals</h2>
            <div className="products">
                {articles &&
                    articles?.map((product) => (
                        <div key={product._id} className="product">
                            <h3 style={{ height: 40 }}>{product.designation}</h3>
                            <img
                                src={`data:image/image/png;base64,${product.imageartpetitf}`}
                                alt={product.designation} height="200" />
                            <div className="details">
                                <span>{product.marque}</span>
                                <span className="price"> {product.prixVente} TND</span>
                            </div>
                            <button onClick={() => handleAddToCart(product)}
                                style={{ height: 40 }}>
                                Add To Cart
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Home;