import React from 'react'
import useTheme from '../../../utils/hooks/useTheme';
import useTmdbSearch from '../../../utils/hooks/useTmdbSearch'

const TmdbSidebar = () => {

  const { theme } = useTheme();

  const { tmdbSearch, setTmdbSearch } = useTmdbSearch();

  const handleChange = (event) => {
    
    setTmdbSearch({ ...tmdbSearch, [event.target.dataset.id]: event.target.value, pageNo: 1 })
  }

  return (
    <form className='sidebar-form'>
      
      {/* title */}
      <li className={`menu-item ${theme}`}>
        <i className="fa fa-search icon"></i>
        <input
          data-form="tmdbSearchForm"
          data-id="query"
          name="query"
          type="text"
          value={tmdbSearch.query}
          placeholder="Search..."
          onChange={handleChange}
        />
      </li>

      {/* Movie or TV */}
      <li className={`menu-item ${theme}`}>
        <i className={`${tmdbSearch.type === "tv" ? "fas fa-tv" : "fas fa-film"} icon`} />
        <label className={`sidebar-select ${theme}`} htmlFor="slct">
          <select
            data-form="tmdbSearchForm"
            data-id="type"
            name="type"
            required="required"
            onChange={handleChange}
            value={tmdbSearch.type}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Series</option>
          </select>
        </label>

      </li>

      {/* year */}
      <li className={`menu-item ${theme}`}>
        <i className="fa fa-calendar icon"></i>
        <input
          data-form="tmdbSearchForm"
          data-id="year"
          name="year"
          type="number"
          value={tmdbSearch.year}
          placeholder="Release Year"
          onChange={handleChange}
        ></input>
      </li>

    </form>
  );

}

export default TmdbSidebar