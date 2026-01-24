/**
 * Calculates the dynamic status of an event based on its start and end dates.
 * @param {Date|string} startDate - The start date/time of the event.
 * @param {Date|string} endDate - The end date/time of the event.
 * @returns {string} - 'upcoming', 'ongoing', or 'completed'.
 */
export const calculateEventStatus = (startDate, endDate) => {
    if (!startDate) return 'upcoming';

    const now = new Date().getTime();
    const start = new Date(startDate).getTime();

    // If no end date is provided, use start date + 24 hours as a fallback
    // to prevent events from staying 'ongoing' forever.
    const end = endDate ? new Date(endDate).getTime() : (start + 24 * 60 * 60 * 1000);

    if (now < start) {
        return 'upcoming';
    } else if (now > end) {
        return 'completed';
    } else {
        // This covers the case where start <= now <= end
        return 'ongoing';
    }
};

/**
 * Returns the human-readable label for the event status.
 * @param {string} status - The status slug ('upcoming', 'ongoing', 'completed').
 * @returns {string} - The capitalized label.
 */
export const getStatusLabel = (status) => {
    switch (status) {
        case 'upcoming':
            return 'Upcoming';
        case 'ongoing':
            return 'Ongoing';
        case 'completed':
            return 'Completed';
        default:
            return 'Upcoming';
    }
};
