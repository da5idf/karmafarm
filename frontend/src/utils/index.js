export const getFormattedNumber = (number) => {
    const numString = number.toString();
    const first = numString.slice(0, 3) + "-";
    const second = numString.slice(3, 6) + "-"
    const formatted = first + second + numString.slice(6);
    return formatted;
}