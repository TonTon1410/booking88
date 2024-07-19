import { useEffect, useState } from "react";
import "./News.scss";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=badminton&apiKey=cf6398c529664dff8b76be5e5e895293"
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  return (
    <div className="news-container">
      {currentArticles.map((article, index) => (
        <div key={index} className="news-item">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="news-image"
            />
          )}
          <div className="news-content">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Đọc thêm
            </a>
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(articles.length / articlesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default News;
