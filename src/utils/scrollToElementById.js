import { waitForElementById } from "./waitForElemnetById";

function scrollToElementByid(id) {
    try {
        // Scroll to and focus the given element having id
        setTimeout(() => {
            waitForElementById(id, 5000).then(
                (element) => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    element.focus();
                }
            );
        }, 10);
    } catch (error) {
        console.log('scroll to view, invalid id : ', id)
    }
}

export { scrollToElementByid }