import { ShowLessNames, ShowLessText } from "components/common";
import "./link-card.style.css";
import React, { useState } from "react";
import { useTheme } from "hooks";

function LinkCard({
  link,
  id,
  openForm,
  setLinkToBeUpdate,
  setLinkToBeFocusedAfterUpdate,
  deleteLink,
}) {
  const { theme } = useTheme();

  const handleUpdateLink = async (event) => {
    event.preventDefault();
    openForm();
    setLinkToBeUpdate(link);
    setLinkToBeFocusedAfterUpdate(id);
  };

  const handleDeleteLink = async (event) => {
    event.preventDefault();
    await deleteLink({ id: link?._id });
  };

  return (
    <>
      <div className={`link-card ${theme}`} id={id}>
        <ul>
          <li className="link-item">
            <h6>
              <ShowLessText text={link?.title} limit={40} />
            </h6>
          </li>
          <li className="link-item">
            <span className="content-quality">
              {link?.quality?.map((quality, index) => {
                return (
                  <span className="quality" key={index} data-quality={quality}>
                    {quality}
                  </span>
                );
              })}
            </span>
          </li>
          <li className="link-item">
            <b>Link Type : </b>
            <span className="item-box">{link?.linkType}</span>
          </li>
          <li className="link-item">
            <b>Content Type : </b>
            <span>{link?.contentType}</span>
          </li>
          <li className="link-item">
            <b>Languages : </b>
            <span>
              <ShowLessNames
                commaSepratedText={link?.languages
                  ?.map((language) => language?.english_name)
                  .join(",")}
                limit={3}
              />
            </span>
          </li>
          <li className="link-item">
            <b>Remarks : </b>
            <span>
              <ShowLessText text={link?.remarks} limit={100} />
            </span>
          </li>
        </ul>
        <div className="action-buttons">
          <button data-type="get">Get</button>
          <button data-type="edit" onClick={handleUpdateLink}>
            Edit
          </button>
          <button data-type="delete" onClick={handleDeleteLink}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export { LinkCard };
