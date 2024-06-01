import { alphabets } from "./constants";

export const getNameFirstLetter=(letter:string)=>{
    return alphabets.filter((item: {letter: string, bgColor: string}) => (item.letter)?.toLowerCase() === letter?.toLowerCase())[0];
}