const readline=require('readline')
const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function askfornumber(userName){
    rl.question("Hi " + userName + " How many favorite programming languages do you have? ", function(numLanguages) {
    if (isNaN(numLanguages) || numLanguages<=0){
        console.log("please enter a valid number of languages");
        askfornumber(userName)
    }
    else{
        numLanguages = parseInt(numLanguages);

        let languages = [];
        let totalCount=0
        function promptLanguages(count) {
            if (count > numLanguages) {
            // When all languages are entered, display the list
            displayLanguages();
                console.log("The total count of the languages string is")
                console.log("Totalcount: " + totalCount)
            rl.close();
            return;
            }
        rl.question("Enter favourite progrmming Language " + count + " : ",function(language){
            if (!language.trim() || !isValidName(language)){
                console.log("please enter a valid language name")
            }
            else{
                languages.push(language);
                promptLanguages(count+1)

            }
        });
    }
            promptLanguages(1);
            


            function displayLanguages(){
                console.log("Hi " + userName +" your favourite language list is ready to show");
                for (let i=0; i<languages.length;i++){
                    totalCount+=languages[i].length
                    console.log(" your number "+ (i+1)+ " favourit language is " +languages[i])
                }
            }
        }
        });
}

function askforlang(languages,count,promptLanguages){
    rl.question("Enter favourite progrmming Language " + count + " : ",function(language){
        if (!language.trim() || !isValidName(language)){
            console.log("please enter a valid language name")
            askforlang(languages,count,promptLanguages)
        }
        else{
            languages.push(language);
            promptLanguages(count+1)

        }
    });

}

function isValidName(name) {
    return /^[a-zA-Z\s+#.-]+$/.test(name);
}
function askforname(){
    rl.question("Enter you name: ",function(userName){
        if (!userName.trim() || !isValidName(userName)){
            console.log("you didn't enter a valid name");
            askforname()
        }
        else{
            rl.question("Hi " + userName + " How many favorite programming languages do you have? ", function(numLanguages) {
                numLanguages = (numLanguages);
            if (isNaN(numLanguages) || numLanguages<=0){
                console.log("please enter a valid number of languages");
                askfornumber(userName)
            }
            else{
                numLanguages = parseInt(numLanguages);
                let languages = [];
                let totalCount=0
                function promptLanguages(count) {
                    if (count > numLanguages) {
                    // When all languages are entered, display the list
                    displayLanguages();
                        console.log("The total count of the languages string is")
                        console.log("Totalcount: " + totalCount)
                    rl.close();
                    return;
                    }
                rl.question("Enter favourite progrmming Language " + count + " : ",function(language){
                    if (!language.trim() || !isValidName(language)){
                        console.log("please enter a valid language name")
                        askforlang(languages,count,promptLanguages)
                    }
                    else{
                        languages.push(language);
                        promptLanguages(count+1)

                    }
                });
            }
                    promptLanguages(1);
                    


                    function displayLanguages(){
                        console.log("Hi " + userName +" your favourite language list is ready to show");
                        for (let i=0; i<languages.length;i++){
                            totalCount+=languages[i].length
                            console.log(" your number "+ (i+1)+ " favourit language is " +languages[i])
                        }
                    }
                }
                });
            }
            });
    }
    askforname();
  

rl.on("close",function(){
    process.exit(0);
});






