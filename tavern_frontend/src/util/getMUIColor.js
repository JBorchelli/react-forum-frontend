
const colorMap = {
    "red": {main: '#f44336', contrast: '#ffffff'},
    "pink": {main: '#e91e63', contrast: '#ffffff'},
    "purple": {main: '#9c27b0', contrast: '#ffffff'},
    "indigo": {main: '#3949ab', contrast: '#ffffff'},
    "blue": {main: '#2196f3', contrast: '#ffffff'},
    "lightblue": {main: '#4fc3f7', contrast: '#000000'},
    "cyan": {main: '#0097a7', contrast: '#ffffff'},
    "teal": {main: '#26a69a', contrast: '#ffffff'},
    "green": {main: '#f44336', contrast: '#ffffff'},
    "deeppurple": {main: '#673ab7', contrast: '#ffffff'},
    "green": {main: '#388e3c', contrast: '#ffffff'},
    "lightgreen": {main: '#9ccc65', contrast: '#000000'},
    "lime": {main: '#cddc39', contrast: '#000000'},
    "yellow": {main: '#ffeb3b', contrast: '#000000'},
    "deeporange": {main: '#ff5722', contrast: '#ffffff'},
    "brown": {main: '#795548', contrast: '#ffffff'},
    "bluegrey": {main: '#607d8bs', contrast: '#ffffff'},
    "amber": {main: '#ffb300', contrast: '#000000'},
    "orange": {main: '#fb8c00', contrast: '#000000'},
    "grey": {main: '#424242', contrast: '#ffffff'},
}

export default function getMUIColor(colorString) {
    try {
        const colorPrepared = colorString.trim().toLowerCase();
        return colorMap[colorPrepared];
    }
    catch(err) {
        console.error("getMUIColor threw error: " + err.name);
        return colorMap["grey"];
    }
}