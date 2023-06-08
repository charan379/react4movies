import ShowLessText from "@/components/ShowLessText";
import ShowLessNames from "../../ShowLessNames";
import styles from "./LinkCard.module.css";
import React from "react";

export default function LinkCard({
  link,
  id,
  openForm,
  setLinkToBeUpdate,
  setLinkToBeFocusedAfterUpdate,
  deleteLink,
}) {
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
      <div className={styles.linkCard} id={id}>
        <ul>
          <li className={styles.linkItem}>
            <h6>
              <ShowLessText text={link?.title} limit={40} />
            </h6>
          </li>
          <li className={styles.linkItem}>
            <span className={styles.contentQuality}>
              {link?.quality?.map((quality, index) => {
                return (
                  <span
                    className={styles.quality}
                    key={index}
                    data-quality={quality}
                  >
                    {quality}
                  </span>
                );
              })}
            </span>
          </li>
          <li className={styles.linkItem}>
            <b>Link Type : </b>
            <span className={styles.itemBox}>{link?.linkType}</span>
          </li>
          <li className={styles.linkItem}>
            <b>Content Type : </b>
            <span>{link?.contentType}</span>
          </li>
          <li className={styles.linkItem}>
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
          <li className={styles.linkItem}>
            <b>Remarks : </b>
            <span>
              <ShowLessText text={link?.remarks} limit={100} />
            </span>
          </li>
        </ul>
        <div className={styles.actionButtons}>
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
