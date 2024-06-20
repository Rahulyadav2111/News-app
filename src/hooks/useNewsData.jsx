import { useState, useEffect } from "react";
const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);
        const apikey = "d2cba997b8e618ad2873564555b789fc";
        const apiUrl = `https://gnews.io/api/v4/top-headlines?token=${apikey}`;
        const categoryParam = category ? `&topic=${category}` : "";
        const searchParam = searchTerm ? `&q=${searchTerm}` : "";
        const url = apiUrl + categoryParam + searchParam;

        const response = await fetch(url);
        const data = await response.json();
        setNewsData(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchNewsData();
  }, [category, searchTerm]);
  return { newsData, loading, error };
};

export default useNewsData;
