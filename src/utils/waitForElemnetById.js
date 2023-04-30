async function waitForElementById(
  id,
  timeout = null,
  location = document.body
) {
  return new Promise((resolve) => {
    let element = document.getElementById(id);
    if (element) {
      return resolve(element);
    }

    const observer = new MutationObserver(async () => {
      let element = document.getElementById(id);
      if (element) {
        resolve(element);
        observer.disconnect();
      } else {
        if (timeout) {
          async function timeOver() {
            return new Promise((resolve) => {
              setTimeout(() => {
                observer.disconnect();
                resolve(false);
              }, timeout);
            });
          }
          resolve(await timeOver());
        }
      }
    });

    observer.observe(location, {
      childList: true,
      subtree: true,
    });
  });
}

export { waitForElementById };
