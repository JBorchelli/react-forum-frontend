
export const sortByTimeStamp = (a, b) => {
    return a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0; 
};

export const sortByName = (a, b) => {
    return a.name > b.name ? 1 : a.name < b.name ? -1 : 0; 
};
