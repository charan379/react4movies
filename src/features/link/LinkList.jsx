import { LinkCard } from "components/link";
import "./styles/link-list.style.css";
import React, { useEffect, useState } from "react";
import {
  useMoviebunkersAPI,
  useProgressBar,
  useTheme,
  useToastify,
} from "hooks";
import { debounce } from "lodash";

import axios from "axios";
import { LinkForm } from "./LinkForm";

const LinkList = ({ parentId, limit }) => {
  const { theme } = useTheme();

  const { increaseProgress20, completeProgressBar } = useProgressBar(); // A hook for displaying a progress bar

  const [links, setLinks] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const [linkToBeUpdated, setLinkToBeUpdated] = useState(null);

  const [linkToBeFocused, setLinkTobeFocused] = useState(`link-card-1`);

  const [cardLimt] = useState(limit);

  const { movieBunkersAPI } = useMoviebunkersAPI();

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded

  const handleDeleteLink = async ({ id }) => {
    try {
      increaseProgress20();

      await movieBunkersAPI.delete(`links/delete/${id}`, {});

      increaseProgress20();

      const linksAfterDelete = links?.map((link) => {
        if (link?._id !== id) {
          return link;
        } else {
          return null;
        }
      });

      setLinks(linksAfterDelete?.filter((link) => link?._id));

      toast.success(`Link Successfully Deleted`, {
        // Show success toast message
        autoClose: 3000,
        position: "top-right",
      });
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

  const handleAddLink = async ({ parentId, link }) => {
    try {
      increaseProgress20();

      const response = await movieBunkersAPI.post(`links/new`, {
        ...link,
        parentId,
      });

      increaseProgress20();

      setLinks([response?.data, ...links]);
      toast.success(`Link Successfully Added`, {
        // Show success toast message
        autoClose: 3000,
        position: "top-right",
      });
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

  const handleUpdateLink = async ({ id, link }) => {
    try {
      increaseProgress20();

      delete link?._id;

      const response = await movieBunkersAPI.put(`links/update/${id}`, {
        ...link,
      });

      increaseProgress20();

      toast.success(`Link Successfully Updated`, {
        // Show success toast message
        autoClose: 3000,
        position: "top-right",
      });

      setLinks(
        links?.map((link) => {
          if (link?._id === id) {
            return response?.data;
          } else {
            return link;
          }
        })
      );
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

  const fetchLinks = async ({
    parentId,
    limit,
    sortBy = "createdAt.desc",
    cancelToken,
  }) => {
    setIsLoading(true); // Set the loading state to true

    try {
      const response = await movieBunkersAPI.get(`links/parent/${parentId}`, {
        params: { limit, sort_by: sortBy },
        cancelToken,
      });

      setLinks([...response?.data]);
    } catch (error) {
      const errorResponse = error?.response?.data; // Get the error response data, if any
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(errorResponse?.error?.message ?? error?.message, {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchLinks = debounce(fetchLinks, 500);

  useEffect(() => {
    const source = axios.CancelToken.source();

    debouncedFetchLinks({
      parentId,
      limit: cardLimt ?? 0,
      cancelToken: source.token,
    });
    return () => {
      source.cancel();
    };
  }, [parentId, cardLimt]);

  return (
    <div className={`links ${theme}`}>
      <div className="buttons">
        <button data-type="add" onClick={() => setOpenForm(true)}>
          Add New
          <span>
            <i class="fas fa-plus-circle"></i>
          </span>
        </button>
      </div>
      <div className="link-list">
        {links.map((link, index) => {
          return (
            <LinkCard
              key={index}
              link={link}
              id={`link-card-${index}`}
              openForm={() => setOpenForm(true)}
              setLinkToBeUpdate={(link) => setLinkToBeUpdated(link)}
              setLinkToBeFocusedAfterUpdate={(id) => setLinkTobeFocused(id)}
              deleteLink={({ id }) => handleDeleteLink({ id })}
            />
          );
        })}
        {links?.length <= 0 && (
          <>
            <div className="error-message">No Links</div>
          </>
        )}

        {openForm && (
          <>
            <LinkForm
              linkToBeUpdated={linkToBeUpdated}
              openForm={openForm}
              closeForm={() => {
                setOpenForm(false);
                setLinkToBeUpdated(null);
              }}
              linkToFocusedAfterClose={linkToBeFocused}
              parentId={parentId}
              updateLink={({ id, link }) => handleUpdateLink({ id, link })}
              addLink={({ parentId, link }) =>
                handleAddLink({ parentId, link })
              }
            />
          </>
        )}

        <ToastContainer {...toastContainerOptions} key={5} />
      </div>
    </div>
  );
};

export { LinkList };
