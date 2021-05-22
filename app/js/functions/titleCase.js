function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export default function titleCase(string) {
    return string.split(" ").map(x => capitalizeFirstLetter(x)).join(" ");
}
