import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../CardListStyles.css';
import Card from "../Card/Card";

const NewsList = () => {
    const [news, setNews] = useState([]);

    const getNews = async () => {
        await axios.get(process.env.REACT_APP_URL_GET_NEWS)
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
                      const {id, name, description, image} = element;
                        return (
                            <Card 
                            key={id}
                            name={name}
                            description={description}
                            image={image}
                            />
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
