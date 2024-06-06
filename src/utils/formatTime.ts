export function timeAgo(timestampInSeconds: number): string {
    // Get the current time in seconds
    const nowInSeconds = Math.floor(Date.now() / 1000);
    
    // Calculate the time difference in seconds
    const diffInSeconds = nowInSeconds - timestampInSeconds;
    
    // Define time intervals in seconds
    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };
    
    // Calculate and return the time passed in human-readable format
    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(diffInSeconds / value);
        if (count > 0) {
            return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'just now';
}

