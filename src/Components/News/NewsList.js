import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../CardListStyles.css';

const NewsList = () => {
    const [news, setNews] = useState([]);

    const getNews = async () => {
        await axios.get("http://ongapi.alkemy.org/api/news")
        .then((response)=>setNews(response.data.data)
        )}
    
        
    useEffect(()=>{
        getNews();
    }, [])

    return (
        <div>
            <h1>Novedades</h1>
            <ul className="list-container">
                {news ? 
                    news.map((element) => {
                        return(
                            <li className="card-info" key={element.id}>
                                <h3>{element.name}</h3>
                                <p>{element.description}</p>
                            </li>
                        )
                    })
                :
                    <p>No hay novedades</p>
                }
            </ul>
        </div>
    );
}
 
export default NewsList;