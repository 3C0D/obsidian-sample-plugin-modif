# Obsidian Sample Plugin modif

I tried github cli but my release script is better

- using another folder that .osbidian/plugins, so not really depending on a vault. so when doing run dev it's using the env var LINKED_VAULT.   
todo: I will maybe add more option to choose this path.  
a script npm run cms copy manifest and styles.css to same destination  

- cms: copy manifest script to LINKED_VAULT
- start: npm i + npm run dev
- acp: add commit push
- bacp: build + acp
- test: test in another path (to see...)
- release: make a tag and release
- version better than default one with prompts
  
- todo: tester test