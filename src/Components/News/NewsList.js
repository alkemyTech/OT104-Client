import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../CardListStyles.css';
import Card from "../Card/Card";
import { Spinner } from 'react-bootstrap';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNews = async () => {
        await axios.get("http://ongapi.alkemy.org/api/news")
        .then((response)=>{
            setNews(response.data.data)
            setLoading(false)
        }
        )}
    
        
    useEffect(()=>{
        getNews();
    }, [])

    return (
        <>
            <h1 className="p-4 text-center">Novedades</h1>
            {loading && 
            <div className="row d-flex justify-content-center">
            <Spinner animation="grow" />
            <h3 className="p-4 text-center">se están cargando...</h3>
            </div>
            }
            <div className="row d-flex justify-content-center p-3">
            
                {news ? 
                    news.map((element) => {
                      const {id, name, description, image} = element;
                        return (
                            <div className="col-sm-6 col-md-4 p-3">
                            <Card 
                            key={id}
                            name={name}
                            description={description}
                            image={image}
                            />
                            </div>
                        )
                    })
                :
                    <p>No hay novedades</p>
                }
            </div>
        </>
    );
}

export default NewsList;
