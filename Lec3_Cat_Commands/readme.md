How to make a file global file so that it can run globally?

steps:
1. Add shebang syntax '#!/usr/bin/env node' on the top of the file which you want to make global.

2. then go to console and go to the folder Lec3_Cat_Commands.

3. then write 'npm init -y' (this command will generate package.json file)

4. open package.json file first change "main":"wcat.js".

5. then make "bin":{
    "wcat":"wcat.js"
},

6. then in console write copmmand npm link(this will make a package-lock.json file).

7. now your file is global run it anywhere.


8. don't run it in bash or wscript. only run it in cmd
