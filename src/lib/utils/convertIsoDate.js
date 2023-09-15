function convertIsoDate(isoDate) {
    try {
        const date = new Date(isoDate)
            .toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Kolkata",
            })
            .replace(/[^a-zA-Z0-9]/g, "-");

        return date;
    } catch (error) {
        return "00-000-0000";
    }
}

export default convertIsoDate;
