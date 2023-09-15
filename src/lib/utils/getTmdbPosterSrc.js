const getTmdbPosterSrc = (imageSrc, width) => {
    if (imageSrc === "/images/empty.svg") {
        return imageSrc;
    } else {
        const cases = {
            width280: width <= 280,
            width720: width >= 280 && width <= 720,
            widthGT720: width > 720,
        };

        switch (true) {
            case cases.width280:
                return `${imageSrc?.toString()?.replace(/(w\d+|original)/, "w185")}`;
            case cases.width720:
                return `${imageSrc?.toString()?.replace(/(w\d+|original)/, "w342")}`;
            case cases.widthGT720:
                return `${imageSrc?.toString()?.replace(/(w\d+|original)/, "w500")}`;

            default:
                return imageSrc;
        }
    }
};

export default getTmdbPosterSrc;