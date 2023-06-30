"use client";

import styles from "./Links.module.css";
import React, { useEffect, useState } from "react";
//
import { debounce } from "lodash";
//
import axios from "axios";
//
import { useProgressBar } from "@/redux/hooks/useProgressBar";
import { useToastify } from "@/lib/hooks/useToastify";
import { deleteLinkById } from "@/lib/api/moviebunkers/methods/deleteLinkById";
import { createLink } from "@/lib/api/moviebunkers/methods/createLink";
import { updateLink } from "@/lib/api/moviebunkers/methods/updateLink";
import { fetchLinks } from "@/lib/api/moviebunkers/methods/fetchLinks";
import LinkForm from "./LinkForm";
import LinkCard from "./LinkCard/Index";

// font awesome library
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarsLoadingAnimation from "../BarsLoadingAnimation";

export default function LinkList({ auth, parentId, limit }) {
  const { completeProgress, incProgress20 } = useProgressBar(); // A hook for displaying a progress bar

  const [links, setLinks] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const [linkToBeUpdated, setLinkToBeUpdated] = useState(null);

  const [linkToBeFocused, setLinkTobeFocused] = useState(`link-card-1`);

  const [cardLimt] = useState(limit);

  const { ToastContainer, toast, toastContainerOptions } = useToastify();

  const [isLoading, setIsLoading] = useState(false); // A flag indicating whether data is being loaded

  const handleDeleteLink = async ({ id }) => {
    try {
      incProgress20();

      await deleteLinkById({ linkId: id, auth });

      incProgress20();

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
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(error?.message ?? "Somthing went wrong", {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      completeProgress();
    }
  };

  const handleAddLink = async ({ parentId, link }) => {
    try {
      incProgress20();

      const newLink = await createLink({
        auth,
        link: { ...link, parentId },
      });

      incProgress20();

      setLinks([...links, newLink]);
      toast.success(`Link Successfully Added`, {
        // Show success toast message
        autoClose: 3000,
        position: "top-right",
      });
    } catch (error) {
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(error?.message ?? "Somthing went wrong", {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      completeProgress();
    }
  };

  const handleUpdateLink = async ({ id, link }) => {
    try {
      incProgress20();

      delete link?._id;

      const data = await updateLink({ auth, linkId: id, update: link });

      incProgress20();

      toast.success(`Link Successfully Updated`, {
        // Show success toast message
        autoClose: 3000,
        position: "top-right",
      });

      setLinks(
        links?.map((link) => {
          if (link?._id === id) {
            return data;
          } else {
            return link;
          }
        })
      );
    } catch (error) {
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(error?.message ?? "Somthing went wrong", {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      completeProgress();
    }
  };

  const fetchData = async ({
    parentId,
    limit,
    sortBy = "createdAt.desc",
    source,
  }) => {
    setIsLoading(true); // Set the loading state to true

    try {
      const data = await fetchLinks({ parentId, limit, sortBy, auth, source });

      setLinks([...data]);
    } catch (error) {
      if (axios.isCancel(error)) return; // If the error is due to a cancelled request, return without updating any state
      toast.error(error?.message ?? "Somthing went wrong", {
        // Show an error toast message with the error message
        autoClose: 3000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchData = debounce(fetchData, 500);

  useEffect(() => {
    const source = axios.CancelToken.source();

    debouncedFetchData({
      parentId,
      limit: cardLimt ?? 0,
      source,
    });
    return () => {
      source.cancel();
    };
  }, [parentId, cardLimt]);

  if (isLoading) {
    return <BarsLoadingAnimation />;
  }

  return (
    <div className={styles.links}>
      <div className={styles.buttons}>
        <button data-type="add" onClick={() => setOpenForm(true)}>
          New Link
          <span>
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </button>
      </div>
      <div className={styles.linkList}>
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
}
