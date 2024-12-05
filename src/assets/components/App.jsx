import { useState, useEffect } from "react";
import Label from "./Label";
const defaultFormData = {
  title: "",
  content: "",
  img: "",
  author: "",
  category: "",
  published: false,
};

function App() {
  const categories = ["HTML", "CSS", "JS"];

  const [articles, setArticles] = useState([]);

  // ^ BLUEPRINT ARTICOLO
  // {
  //   title: "Articolo 1",
  //   content: "Lorem ipsum dolor sit amet",
  //   img: "https://placehold.co/600x400",
  //   author: "Alessandro Fiora",
  //   category: "HTML",
  //   published: true,
  // },

  // ^ INDEX
  const fetchArticles = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.filteredPosts);
        setArticles(data.filteredPosts);
      });
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleFormData = (e) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newArticles = [...articles, { ...formData }];
    setArticles(newArticles);
    setFormData(defaultFormData);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteButtonClick = (index) => {
    const newArticles = [...articles];
    newArticles.splice(index, 1);
    setArticles(newArticles);
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="mb-4">Aggiungi articoli</h1>

        {/* FORM PER INSERIMENTO ARTICOLO */}
        <form onSubmit={handleFormSubmit} className="row row-cols-3 my-3">
          {/* INSERIMENTO TITOLO */}
          <div className="col">
            <label htmlFor="title-input" className="form-label">
              Inserisci il titolo dell'articolo:
            </label>
            <input
              id="title-input"
              onChange={handleFormData}
              value={formData.title}
              className="form-control my-3"
              type="text"
              name="title"
            />
          </div>

          {/* INSERIMENTO AUTORE */}
          <div className="col">
            <label htmlFor="author-input" className="form-label">
              Inserisci l'autore dell'articolo:
            </label>
            <input
              id="author-input"
              onChange={handleFormData}
              value={formData.author}
              className="form-control my-3"
              type="text"
              name="author"
            />
          </div>

          {/* INSERIMENTO CONTENUTO */}
          <div className="col">
            <label htmlFor="content-input" className="form-label">
              Inserisci il contenuto dell'articolo:
            </label>
            <input
              id="content-input"
              onChange={handleFormData}
              value={formData.content}
              className="form-control my-3"
              type="text"
              name="content"
            />
          </div>

          {/* INSERIMENTO IMMAGINE */}
          <div className="col">
            <label htmlFor="img-input" className="form-label">
              Inserisci l'immagine dell'articolo:
            </label>
            <input
              id="img-input"
              onChange={handleFormData}
              value={formData.img}
              className="form-control my-3"
              type="text"
              name="img"
            />
          </div>

          {/* INSERIMENTO CATEGORIA */}
          <div className="col">
            <label htmlFor="category-select" className="form-label">
              Scegli la categoria dell'articolo:
            </label>
            <select
              value={formData.category}
              onChange={handleFormData}
              id="category-select"
              className="form-select my-3"
              name="category"
            >
              <option value="">Seleziona una categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* CHECKBOX PUBBLICARE? */}
          <div className="col">
            <div className="p-5">
              <label htmlFor="published-input" className="form-label">
                Vuoi pubblicare l'articolo?
              </label>
              <input
                id="published-input"
                onChange={handleFormData}
                checked={formData.published}
                className="mx-3"
                type="checkbox"
                name="published"
              />
            </div>
          </div>

          {/* BOTTONE INVIO FORM */}
          <div className="col-12">
            <button className="d-block btn btn-primary my-3">
              Aggiungi articolo
            </button>
          </div>
        </form>

        <div className="article-list-container border-top">
          <h2 className="my-4">Lista articoli:</h2>
          <div className="row row-cols-3 g-3">
            {articles.map(
              (article, index) =>
                article.title && (
                  <div className="col" key={index}>
                    <div className="card h-100 p-3">
                      <div className="article-info flex-grow-1">
                        <h3 className="h5">{article.title}</h3>
                        <div className="img-container mb-2">
                          <img src={article.img} alt="" className="img-fluid" />
                        </div>
                        <h4 className="h6 fw-normal">
                          {article.author ? "Autore: " + article.author : ""}
                        </h4>
                        <h4 className="h6 fw-light mb-3">
                          {article.content ? article.content : ""}
                        </h4>

                        {article.category && <Label>{article.category}</Label>}

                        <h4 className="h6 fw-light mt-2">
                          {article.published
                            ? "Stato di pubblicazione: Pubblicato"
                            : "Stato di pubblicazione: Bozza"}
                        </h4>
                      </div>
                      <div className="article-buttons">
                        <button
                          onClick={() => {
                            handleDeleteButtonClick(index);
                          }}
                          className="btn p-0"
                        >
                          <i className=" fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
