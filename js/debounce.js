//вызов функции пока не прошло ms времени
export default function debounce(func, ms) {

    let timeout;

    return function (...rest) {
        function later() {
            clearTimeout(timeout);

             func(...rest);
        }

        clearTimeout(timeout);

        timeout = setTimeout(later,  ms);
    }
}