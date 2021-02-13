
const date = new Date();
export function getTime() {
    const timeString = `${date.getHours()+1}:${date.getMinutes()+1}`
    return timeString
}

export function getDate() {
    const dateSting = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    return dateSting;
}