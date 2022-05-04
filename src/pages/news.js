/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/news.module.css";

export default function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data } = await axios.get(
          "https://newsdata.io/api/1/news?apikey=pub_42481f0305226c840ef50cea3e433ef1db25&language=en&language=en&q=agriculture&country=in",
        );
        setNewsData(data.results);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchNews();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>News</h2>
      <div className={styles.cardContainer}>
        {newsData?.map((news, index) => (
          <div key={index} className={styles.card}>
            {news.image_url ? (
              <img src={news.image_url} alt={news.title} />
            ) : (
              <img
                src="https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg"
                alt={news.title}
              />
            )}
            <div className={styles.cardContent}>
              <h3>{news.title}</h3>
              <a href={news.link} target="_blank" rel="noreferrer">
                Read full Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
