
const readlineSync = require('readline-sync');
function wordCount(input:String):Map<String,number>{
    const words:String[]=input.toLowerCase().split(/\s+/)
    const wordMap:Map<String,number>=new Map<String,number>();
    for (const word of words){
        const cleanedWord: String = removePunctuation(word);
        if (cleanedWord.trim() === '') {
            continue; // Skip empty words after removing punctuation
        }
        const currentCount:number | undefined=wordMap.get(word);
        if (currentCount!=undefined){
            wordMap.set(word,currentCount+1)
        }
        else{
            wordMap.set(word,1)
        }
    }
    return wordMap

}
function removePunctuation(word: String): String {
    return word.replace(/^[^\w]+|[^\w]+$/g, '');
}
function displayWordCount(wordMap: Map<String, number>): void {
    console.log("Word Count:");
    const entries: [String, number][] = Array.from(wordMap.entries());
    for (const [word, count] of entries) {
        console.log(`${word}: ${count}`);
    }
}

function main():void{
    const input:String=readlineSync.question("Enter a Sentence: ")
    const wordMap:Map<String,number>=wordCount(input)
    displayWordCount(wordMap)
}
main();

