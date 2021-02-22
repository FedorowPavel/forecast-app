export default function debounce(func, ms) {

    let isRady = true;

    return function (...rest) {
        if (!isRady) {
            return
        }

        isRady = false;

        func(...rest);

        setTimeout(() => isRady = true, ms);
    }
}