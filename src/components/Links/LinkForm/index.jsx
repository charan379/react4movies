import styles from "./LinkForm.module.css";
import React, { useEffect, useMemo, useState } from "react";
import languages from "@/constants/iso369-1.json";
import { useDisableBodyScrollOnModalOpen } from "@/lib/hooks/useDisableBodyScrollOnModalOpen";
import scrollToElementByid from "@/lib/utils/scrollToElementByid";
import ReactSelector from "@/components/ReactSelector";

// font awesome library
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  contentQualityOptions,
  contentTypeOptions,
  linkTypeOptions,
} from "@/constants/linkOptions";
import linkValidations from "@/lib/utils/validations/link";

export default function LinkForm({
  linkToBeUpdated,
  openForm,
  closeForm,
  parentId,
  linkToFocusedAfterClose,
  updateLink,
  addLink,
}) {
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

  const [validForm, setValidForm] = useState(true);
  const [requiredOk, setRequiredOk] = useState(true);

  const [formErrors, setFormErrors] = useState({
    contentType: false,
    languages: false,
    linkType: false,
    quality: false,
    link: false,
    title: false,
    remarks: false,
  });

  const messages = {
    inValidContentType: "Please select a valid content type",
    inValidLanguage: "Please select atleast one language",
    inValidQuality: "Please select atleast one quality type",
    inValidLinkType: "Please select a valid link type",
    inValidLink: "Please enter valid url",
    inValidTitle: "Please enter valid title",
    inValidRemarks: "Please enter valid remarks",
    inValidForm: "Please provide all required/valid details",
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !link.contentType ||
      link.languages?.length <= 0 ||
      link.quality?.length <= 0 ||
      !link.linkType ||
      !link.link ||
      !link.title ||
      !link.remarks
    ) {
      setRequiredOk(false);
      return;
    }

    if (linkToBeUpdated?._id) {
      await updateLink({ id: linkToBeUpdated?._id, link: link });
    } else {
      await addLink({ parentId, link });
    }
    closeForm();
  };
  // handle onChange event
  const handleOnChange = (event) => {
    event.preventDefault();

    validateForm(event.target.name, event.target.value);

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

  const validateForm = (name, value) => {
    setRequiredOk(true);
    let errors;

    switch (name) {
      case "link":
        if (!linkValidations.validateUrl(value)) {
          errors = { ...errors, link: true, validForm: false };
          setValidForm(false);
        } else {
          errors = { ...errors, link: false };
        }
        break;

      case "title":
        if (!linkValidations.validStringInput(value, 150)) {
          errors = { ...errors, title: true };
          setValidForm(false);
        } else {
          errors = { ...errors, title: false };
        }
        break;

      case "remarks":
        if (!linkValidations.validStringInput(value, 150)) {
          errors = { ...errors, remarks: true };
          setValidForm(false);
        } else {
          errors = { ...errors, remarks: false };
        }
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, ...errors });

    if (
      Object.values({ ...formErrors, ...errors }).every(
        (error) => error === false
      )
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  };

  const getLanguageOptions = () => {
    const languageOptions = [];
    const alreadySelectedLanguages = link?.languages?.map(
      (lang) => lang?.ISO_639_1_code
    );

    for (const language of languages) {
      if (!alreadySelectedLanguages.includes(language?.ISO_639_1_code)) {
        languageOptions.push({
          value: language,
          label: language?.english_name,
        });
      } else {
        continue;
      }
    }
    return languageOptions;
  };

  const memoizedLanguageOptions = useMemo(
    () => getLanguageOptions(),
    [link?._id, link?.languages]
  );

  useDisableBodyScrollOnModalOpen(openForm);

  useEffect(() => {
    return () => {
      if (linkToBeUpdated?._id) {
        scrollToElementByid(linkToFocusedAfterClose);
      } else {
        scrollToElementByid(`link-card-1`);
      }
    };
  }, [closeForm]);

  return (
    <>
      <div className="modal-container">
        <div className={styles.linkModal}>
          {/* Close button */}
          <button
            data-tooltip={`Close`}
            data-flow="left"
            onClick={closeForm}
            className={styles.closeBtn}
            tabIndex="0"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <div className={styles.linkForm}>
            <form onSubmit={handleFormSubmit}>
              {/* link title */}
              <label htmlFor="title">Link Title : </label>
              {formErrors.title && (
                <span className="error-message" data-error={true}>
                  {messages.inValidTitle}
                </span>
              )}
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
              {formErrors.contentType && (
                <span className="error-message" data-error={true}>
                  {messages.inValidContentType}
                </span>
              )}
              <span>
                <ReactSelector
                  name={`contentType`}
                  // inputWhite={true}
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
              {formErrors.linkType && (
                <span className="error-message" data-error={true}>
                  {messages.inValidLinkType}
                </span>
              )}
              <span>
                <ReactSelector
                  name={`linkType`}
                  // inputWhite={true}
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
              {formErrors.languages && (
                <span className="error-message" data-error={true}>
                  {messages.inValidLanguage}
                </span>
              )}
              <span>
                <ReactSelector
                  name={`languages`}
                  // inputWhite={true}
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
              {formErrors.quality && (
                <span className="error-message" data-error={true}>
                  {messages.inValidQuality}
                </span>
              )}
              <span>
                <ReactSelector
                  // inputWhite={true}
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
              {formErrors.link && (
                <span className="error-message" data-error={true}>
                  {messages.inValidLink}
                </span>
              )}
              <input
                onChange={handleOnChange}
                name="link"
                data-role="text-input"
                type="text"
                value={link.link}
                placeholder="Paste link url here"
              />

              {/* link remarks */}
              <label htmlFor="remarks">Remarks :</label>
              {formErrors.remarks && (
                <span className="error-message" data-error={true}>
                  {messages.inValidRemarks}
                </span>
              )}
              <input
                onChange={handleOnChange}
                data-role="text-input"
                type="text"
                name="remarks"
                value={link.remarks}
                placeholder="Remarks"
              />
              {!requiredOk && (
                <span className="error-message" data-error={true}>
                  {messages.inValidForm}
                </span>
              )}
              <div className={styles.formButtons}>
                <button onClick={closeForm} data-type="cancel">
                  Cancel
                </button>

                <button type="submit" data-type="submit" disabled={!validForm}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
