import { ReactSelector } from "components/common";
import "./styles/link-form.style.css";
import React, { useEffect, useMemo, useState } from "react";
import languages from "constants/iso369-1.json";
import { useDisableBodyScrollOnModalOpen, useTheme } from "hooks";
import { scrollToElementByid } from "utils";

const LinkForm = ({
  linkToBeUpdated,
  openForm,
  closeForm,
  parentId,
  linkToFocusedAfterClose,
  updateLink,
  addLink,
}) => {
  const { theme } = useTheme();

  const [link, setLink] = useState({
    _id: linkToBeUpdated?._id ?? "",
    parentId: linkToBeUpdated?.parentId ?? "",
    contentType: linkToBeUpdated?.contentType ?? "",
    languages: linkToBeUpdated?.languages ?? [],
    linkType: linkToBeUpdated?.linkType ?? "",
    quality: linkToBeUpdated?.quality ?? [],
    link: linkToBeUpdated?.link ?? "",
    title: linkToBeUpdated?.title ?? "",
    remarks: linkToBeUpdated?.remarks ?? "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (linkToBeUpdated) {
      await updateLink({ id: linkToBeUpdated?._id, link: link });
    } else {
      await addLink({ parentId, link });
    }
    closeForm();
  };
  // handle onChange event
  const handleOnChange = (event) => {
    event.preventDefault();
    setLink({
      ...link,
      [event.target.name]: event.target.value,
    });
  };

  // Updates the link when a select option is chosen
  const handleSelectChange = (selectedOption, event) => {
    // multi select
    if (event.name === "quality" || event.name === "languages") {
      const selectedOptions = [];
      for (const option of selectedOption) {
        selectedOptions.push(option?.value);
      }
      setLink({
        ...link,
        [event.name]: selectedOptions, // Update the link parameter with the selected qualities
      });

      return;
    }

    // single select
    setLink({
      ...link,
      [event.name]: selectedOption.value, // Update the link parameter with the selected option value
    });
  };

  const getLanguageOptions = () => {
    const languageOptions = [];
    for (const language of languages) {
      languageOptions.push({
        value: language,
        label: language?.english_name,
      });
    }
    return languageOptions;
  };

  const memoizedLanguageOptions = useMemo(
    () => getLanguageOptions(),
    [link?._id]
  );

  const linkTypeOptions = [
    { value: "Direct File", label: "Direct File" },
    { value: "Torrent Magnet", label: "Torrent Magnet" },
    { value: "Youtube", label: "Youtube" },
    { value: "Online Stream", label: "Online Stream" },
  ];

  const contentTypeOptions = [
    { value: "Video", label: "Video" },
    { value: "Image", label: "Image" },
    { value: "Zip", label: "Zip" },
    { value: "Folder", label: "Folder" },
  ];

  const contentQualityOptions = [
    { value: "320P", label: "320P" },
    { value: "480P", label: "480P" },
    { value: "720P", label: "720P" },
    { value: "1080P", label: "1080P" },
    { value: "HD", label: "HD" },
    { value: "Ultra HD", label: "Ultra HD" },
    { value: "2K", label: "2K" },
    { value: "4K", label: "4K" },
  ];

  useDisableBodyScrollOnModalOpen(openForm);

  useEffect(() => {
    return () => {
      scrollToElementByid(linkToFocusedAfterClose);
    };
  }, [closeForm]);

  return (
    <>
      <div className="modal-container">
        <div className={`link-modal ${theme}`}>
          {/* Close button */}
          <button
            data-tooltip={`Close`}
            data-flow="left"
            onClick={closeForm}
            className="closeBtn"
            tabIndex="0"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>
          <div className={`link-form ${theme}`}>
            <form onSubmit={handleFormSubmit}>
              {/* link title */}
              <label htmlFor="title">Link Title : </label>
              <input
                onChange={handleOnChange}
                name="title"
                data-role="text-input"
                type="text"
                value={link.title}
                placeholder="Enter link title"
              />

              {/* content type */}
              <label htmlFor="contentType"> Content Type : </label>
              <span>
                <ReactSelector
                  name={`contentType`}
                  options={contentTypeOptions}
                  handleSelectChange={handleSelectChange}
                  selectedOption={{
                    value: link?.contentType,
                    label: link?.contentType,
                  }}
                />
              </span>

              {/* link type */}
              <label htmlFor="linkType"> Type : </label>
              <span>
                <ReactSelector
                  name={`linkType`}
                  options={linkTypeOptions}
                  handleSelectChange={handleSelectChange}
                  selectedOption={{
                    value: link?.linkType,
                    label: link?.linkType,
                  }}
                />
              </span>

              {/* languages */}
              <label htmlFor="languages"> Languages : </label>
              <span>
                <ReactSelector
                  name={`languages`}
                  isMultiSelect={true}
                  handleSelectChange={handleSelectChange}
                  options={memoizedLanguageOptions}
                  selectedOption={link?.languages?.map((language) => {
                    return {
                      value: language,
                      label: language?.english_name,
                    };
                  })}
                />
              </span>

              {/* quality */}
              <label htmlFor="quality"> Quality : </label>
              <span>
                <ReactSelector
                  name={`quality`}
                  handleSelectChange={handleSelectChange}
                  isMultiSelect={true}
                  options={contentQualityOptions}
                  selectedOption={link?.quality?.map((quality) => {
                    return {
                      value: quality,
                      label: quality,
                    };
                  })}
                />
              </span>

              {/* link url */}
              <label htmlFor="link">URL : </label>
              <input
                onChange={handleOnChange}
                name="link"
                data-role="text-input"
                type="text"
                value={link.link}
                placeholder="Paste link url here"
              />

              {/* link remarks */}
              <label htmlFor="remarks"> Remarks : </label>
              <input
                onChange={handleOnChange}
                data-role="text-input"
                type="text"
                name="remarks"
                value={link.remarks}
                placeholder="Remarks"
              />

              <div className="form-buttons">
                <button onClick={closeForm} data-type="cancel">
                  Cancel
                </button>
                <button type="submit" data-type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { LinkForm };
