import waitForElementById from "./waitForElementById";

async function scrollToElementByid(id) {
    try {
        // Scroll to and focus the given element having id
        setTimeout(async () => {
            const element = await waitForElementById(id, 5000);

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                element.focus();
            }
        }, 2500);
    } catch (error) {
        console.log('scroll to view, invalid id : ', id)
    }
}

export default scrollToElementByid;