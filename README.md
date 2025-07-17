# How to Use

**require**<br>
・git<br>
・node.js<br>
・discord.js(npm module)<br>
・fs-extra(npm module)<br>
・simple-git(npm module)<br>
・read-last-lines(npm module)<br>

**1. clone a repo & change dir**<br>

type to console<br>
"git clone https://github.com/cooked-raw-meat/Discord-Message-Logger.git"<br>
"cd Discord-Message-Logger"

**2. edit to config.json**<br>

・token    : your bot token<br>
・datapath : log folder

**3. create the shell script for run**<br>

・cmd
```
@echo off
node index.js
pause
```
・bash
```
#!/bin/bash
node index.js
read -p "press enter to exit"
```

**4. run shell script**<br>

all steps complete<br>

# Other
・Update : node update.js
