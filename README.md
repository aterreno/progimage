# Progimage

Install node with nvm:

```
nvm i
```

Install libraries:

```
npm i
```

Deploy to AWS

```
sls deploy
```

Invoke a function

```
sls invoke -f ping
```

Before sls deploy:

```
rm -rf node_modules/sharp && npm install --arch=x64 --platform=linux --target=8.10.0 sharp
```

```
curl -X POST https://js0zcbth7g.execute-api.eu-west-2.amazonaws.com/dev/upload -d @tests/curl.json  --header "Content-Type: application/json"
```
