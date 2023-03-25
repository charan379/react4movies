import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../../utils/Config";
import useTheme from "../../utils/hooks/useTheme";
import Loader from "../utils/Loader";
import ShowLessText from "../utils/ShowLessText";

const TorrentList = ({ query, provider, pageNo }) => {
  const { theme } = useTheme();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setResults([]);
    setError("");
    setLoading(true);
    axios
      .get(`${Config.TORRENT_API}/${provider}/search/${query}/${pageNo}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setResults(result?.data ?? []);
        setLoading(false);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.log(error);
          setError(error?.response?.data?.errorMessage ?? error?.message);
          setLoading(false);
        }
      });
    return () => {
      source.cancel();
    };
  }, [query, provider, pageNo]);

  return (
    <>
      <div className={`torrent-list ${theme}`}>
        {loading === true && (
          <div style={{ width: "100vw" }}> {<Loader />} </div>
        )}
        {results.length > 0 && loading === false ? (
          <>
            {results.map((torrent, index) => {
              return (
                <div className="torrent-box" key={index}>
                  <table>
                    <tr>
                      <th>Name:</th>
                      <td>
                        <span className="info-data">
                          <ShowLessText
                            text={torrent?.Name}
                            limit={20}
                          ></ShowLessText>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Category:</th>
                      <td>{torrent?.Category}</td>
                    </tr>
                    <tr>
                      <th>Type:</th>
                      <td>{torrent?.Type}</td>
                    </tr>
                    <tr>
                      <th>Language:</th>
                      <td>{torrent.Language}</td>
                    </tr>
                    <tr>
                      <th>Downloads:</th>
                      <td>{torrent?.Downloads}</td>
                    </tr>
                    <tr>
                      <th>LastChecked:</th>
                      <td>{torrent?.LastChecked}</td>
                    </tr>
                    <tr>
                      <th>DateUploaded:</th>
                      <td>{torrent?.DateUploaded}</td>
                    </tr>
                    <tr>
                      <th>Seeders:</th>
                      <td>{torrent?.Seeders}</td>
                    </tr>

                    <tr>
                      <th>Leechers:</th>
                      <td>{torrent?.Leechers}</td>
                    </tr>

                    <tr>
                      <th>Size:</th>
                      <td>{torrent?.Size}</td>
                    </tr>
                    
                    <tr>
                      <th>Magnet:</th>
                      <td>
                        <a
                          className="magnet-link"
                          href={torrent?.Magnet}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i class="fas fa-magnet"></i> Download
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
          </>
        ) : (
          <div className="error-message">{error}</div>
        )}
      </div>
    </>
  );
};

export default TorrentList;
