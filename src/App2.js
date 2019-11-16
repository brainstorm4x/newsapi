import React, {useState, useEffect} from 'react'

function App2() {
  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)

  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error))
  };

  useEffect(() => {
  fetchNews()
  }, [url])

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query={searchQuery}`)
  }

  const showLoading = () => (loading ? <h1>Loading...</h1> : "")

  const SearchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange}></input>
      <button>Submit</button>
    </form>
  )

  const showNews = () => {
    return news.map((n, i) => (<p key={i}>{n.title}</p>))
  }

  return(
    <div>
      <h2>news</h2>
      {showLoading()}
      {SearchForm()}
      {showNews()}
    </div>
  )
}

export default App2;
