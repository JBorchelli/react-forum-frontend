import conanIcon from './conanIcon.jpg';
import dndPicture from './dnd.png';
import rhino from './rhino.jpg';
import thugra from './thugra.jpg';
import necroids from './necroids.jpg';
import flip from './flip.gif';

    //need to change these dates to something serializable: string or milliseconds
    const dates = {
        d1: new Date(2021, 1, 16, 3, 44, 30),
        d2: new Date(2021, 4, 9, 2, 10, 30),
        d3: new Date(2021, 4, 9, 3, 44, 30),
        d4: new Date(2021, 3, 12, 10, 0, 0),
        d5: new Date(2021, 4, 9, 8, 25, 30),
        d6: new Date(2020, 4, 16, 3, 44, 30),
        d7: new Date(2021, 4, 1, 9, 20, 0),
        d8: new Date(2021, 4, 10, 6, 44, 30),
        d9: new Date(2021, 4, 10, 6, 45, 59),
        p1: new Date(2021, 1, 16, 3, 44, 30),
        p2: new Date(2021, 4, 9, 2, 10, 30),
        p3: new Date(2021, 4, 9, 3, 44, 30),
        p4: new Date(2021, 3, 12, 10, 0, 0),
        p5: new Date(2021, 4, 9, 8, 25, 30),
        p6: new Date(2020, 4, 16, 3, 44, 30),
        p7: new Date(2021, 4, 1, 9, 20, 0),
        p8: new Date(2021, 4, 10, 6, 44, 30),
        p9: new Date(2021, 4, 10, 6, 45, 59),
        p10: new Date(2021, 1, 16, 3, 44, 30),
        p12: new Date(2021, 4, 9, 2, 10, 30),
        p13: new Date(2021, 4, 9, 3, 44, 30),
        p14: new Date(2021, 3, 12, 10, 0, 0),
        p15: new Date(2021, 4, 9, 8, 25, 30),
        p16: new Date(2020, 4, 16, 3, 44, 30),
        p17: new Date(2021, 4, 1, 9, 20, 0),
        p18: new Date(2021, 4, 10, 6, 44, 30),
    }

const categories = [
    {id: "001", name: "D&D", discussions: ["011", "012", "013"]},
    {id: "002", name: "Conan Exiles", img: conanIcon, discussions: ["021", "022", "023"]},
    {id: "003", name: "Stellaris", discussions: ["031", "032", "033"]},
    /*{id: "004", name: "D&D", discussions: ["011", "012", "013"]},
    {id: "005", name: "Conan Exiles", img: conanIcon, discussions: ["021", "022", "023"]},
    {id: "006", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "007", name: "D&Dsssssssssssssssssss", discussions: ["011", "012", "013"]},
    {id: "008", name: "Conan Exiles", img: conanIcon, discussions: ["021", "022", "023"]},
    {id: "009", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "010", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "191829", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "191812", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "1918234", name: "Stellar isdsfdsl kl ks jjjjkj kj kl l kj lk s; ;;;;", discussions: ["031", "032", "033"]},
    {id: "191845", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "1918256", name: "Stellaris", discussions: ["031", "032", "033"]},
    {id: "1918256", name: "Stellarisskjdfhkjsdhf", discussions: ["031", "032", "033"]}*/
];

const discussions = [
    {id: "011", category: "001", user: '1002', name: "D&D is sooo good", img: dndPicture, timestamp: dates.d1, posts: ["111", "211"], },
    {id: "012", category: "001", user: '1001', name: "1e is overrated", img: "", timestamp: dates.d2, posts: ["112", "212"]},
    {id: "013", category: "001", user: '1003', name: "exploding dice ain't for every campaign", img: "", timestamp: dates.d3, posts: ["113", "213"]},
    {id: "021", category: "002", user: '1005', name: "Use Rhino Mount For Carrying Rocks", img: rhino, timestamp: dates.d4, posts: ["121", "221"]},
    {id: "022", category: "002", user: '1004', name: "Purge meter is getting up therr....", timestamp: dates.d5, posts: ["122", "222"]},
    {id: "023", category: "002", user: '1004', name: "Found an NPC named Thorga Killgore no joke", img: thugra, timestamp: dates.d6, posts: ["123", "223"]},
    {id: "031", category: "003", user: '1001', name: "Ship design questions", timestamp: dates.d7, posts: ["131", "231"]},
    {id: "032", category: "003", user: '1002', name: "My necroids ate everybody", img: necroids, timestamp: dates.d8, posts: ["132", "232"]},
    {id: "033", category: "003", user: '1003', name: "How the hell do megacorps work?", timestamp: dates.d9, posts: ["133", "233"]},
];

const posts = [
    {id: "111", text: "YEah I know right", user: "1001", timestamp: dates.p1, discussion: "011"},
    {id: "211", text: "Sure but is it morally okSure but is it morally okSure but is it morally okSure but is it morally okSure but is it morally okSure but is it morally okSure but is it morally okSure but is it morally ok", user: "1003", timestamp: dates.p2, discussion: "011"},
    {id: "112", text: "Definitely", user: "1005", timestamp: dates.p3, discussion: "012"},
    {id: "212", text: "No way. You kids don't know anything. REEEEEEEEEEEE", img: flip, user: "1003", timestamp: dates.p4, discussion: "012"},
    {id: "113", text: "But so fun", user: "1004", timestamp: dates.p5, discussion: "013"},
    {id: "213", text: "But so unpredictable. My charracterr.", user: "1002", timestamp: dates.p6, discussion: "013"},
    {id: "121", text: "Finally a carry mount.", user: "1003", timestamp: dates.p7, discussion: "021"},
    {id: "221", text: "They get stuck on everything. A horse is better.", user: "1002", timestamp: dates.p8, discussion: "021"},
    {id: "122", text: "I'll be on after work.", user: "1002", timestamp: dates.p9, discussion: "022"},
    {id: "222", text: "Probably because of all those bridges.", user: "1001", timestamp: dates.p10, discussion: "022"},
    {id: "123", text: "Actually just Thugra.", user: "1002", timestamp: dates.p11, discussion: "023"},
    {id: "223", text: "Did he find some clothes.", user: "1005", timestamp: dates.p12, discussion: "023"},
    {id: "131", text: "Rockets good?", user: "1003", timestamp: dates.p13, discussion: "031"},
    {id: "231", text: "I just go pure laser and watch the light show.", user: "1002", timestamp: dates.p14, discussion: "031"},
    {id: "132", text: "Are necroids broken? I hear they suck?", user: "1003", timestamp: dates.p15, discussion: "032"},
    {id: "232", text: "ZOMBIESSSSSS", user: "1001", timestamp: dates.p16, discussion: "032"},
    {id: "133", text: "I dunno", user: "1001", timestamp: dates.p17, discussion: "033"},
    {id: "233", text: "I just maximize trade value and get an ecumenopolis. No problem.", user: "1005", timestamp: dates.p18, discussion: "033"},
];

const users = [
    {id: "1002", name: "Korf", avatarImg: "", status: "busy"},
    {id: "1001", name: "StroopOfEarl", avatarImg: conanIcon, status: "online"},
    {id: "1003", name: "Norf", avatarImg: "", status: "online"},
    {id: "1004", name: "JorfA", avatarImg: "", status: "idle"},
    {id: "1005", name: "UseThePIAT", avatarImg: "", status: "offline"}
];

export const getAllCategories = () => {
    return {data: categories};
};

export const getAllDiscussions = () => {
    return {data: discussions};
};

export const getDiscussionsByCategory = (categoryID) => {

    const category = categories.filter(cat => cat.id === categoryID);
    
    const data = discussions.filter(discussion => {return category.discussions.includes(discussion.id)});

    return {data: data};
};

export const getAllPosts = () => {
    return {data: posts};
};

export const getPostsByDiscussion = (discussionID) => {

    const discussion = discussions.filter(disc => disc.id === discussionID);
    
    const data = posts.filter(post => {return discussion.posts.includes(post.id)});

    return {data: data};
};

export const getAllUsers = () => {
    return {data: users};
};
