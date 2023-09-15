export const isGt24Hours = ({ date }) => {
    try {
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const lastUpdatedAt = new Date(date);
        const currentDateTime = new Date();

        if (!date) {
            return false;
        }

        const difference = (currentDateTime - lastUpdatedAt) / twentyFourHours;

        console.log('diff ' + Math.floor(difference) + ' days')

        if (typeof difference === 'number' && difference >= 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error?.message);
        return false;
    }
}