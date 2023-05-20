import {
  useDisableBodyScrollOnModalOpen,
  useEscapeKey,
  useMoviebunkersAPI,
  useProgressBar,
  useTheme,
  useToastify,
} from "hooks";
import { LinkForm } from "./LinkForm";
import "./styles/link-modal.style.css";
import React, { useEffect } from "react";
import { scrollToElementByid } from "utils";
import axios from "axios";

const UpdateLink = ({ link, open, close, toBeFocusedId, setLinkData }) => {
  const { increaseProgress20, completeProgressBar } = useProgressBar(); // A hook for displaying a progress bar

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const { theme } = useTheme();

  useEscapeKey(close);

  useDisableBodyScrollOnModalOpen(open);

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const updateLink = async ({ id, link }) => {
    try {
      increaseProgress20();
      const response = await movieBunkersAPI.put(`links/update/${id}`, {
        ...link,
      });
      increaseProgress20();
      toast.success(`Link Successfully Updated`, {
        // Show success toast message
        autoClose: 3000,
        position: "top-right",
      });

      return response?.data;
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(errorResponse?.error?.message ?? error?.message, {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      completeProgressBar();
    }
  };

  const handleSubmit = async (link) => {
    const id = link?._id;

    delete link?._id;

    const updatedLink = await updateLink({ id, link });

    setLinkData(updatedLink);

    close();
  };

  useEffect(() => {
    return () => {
      // Scroll to if if provided
      scrollToElementByid(toBeFocusedId);
    };
  }, [open]);

  if (!open) {
    return;
  }

  return (
    <>
      <div className="modal-container">
        <div className={`link-modal ${theme}`}>
          {/* Close button */}
          <button
            data-tooltip={`Close`}
            data-flow="left"
            onClick={close}
            className="closeBtn"
            tabIndex="0"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>
          <LinkForm
            linkToBeUpdated={link}
            cancel={close}
            handleSubmit={handleSubmit}
          />
        </div>
        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    </>
  );
};

export { UpdateLink };
