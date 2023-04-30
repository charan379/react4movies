function scrollToTop() {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 1200);
}

export { scrollToTop };
