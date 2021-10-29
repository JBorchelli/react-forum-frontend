import getMUIColor from "./getMUIColor";

const colorList = ["red", 
                   "pink", 
                   "purple", 
                   "indigo", 
                   "blue", 
                   "lightblue", 
                   "cyan", 
                   "teal", 
                   "green", 
                   "deeppurple", 
                   "green", 
                   "lightgreen", 
                   "lime", 
                   "yellow", 
                   "deeporange", 
                   "brown", 
                   "bluegrey", 
                   "amber", 
                   "orange"
                   ];


export default function getRandomColor() {
   const index = Math.floor(Math.random() * colorList.length);
   return getMUIColor(colorList[index]);
}