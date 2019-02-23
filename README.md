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

```
curl -X POST https://js0zcbth7g.execute-api.eu-west-2.amazonaws.com/dev/upload -d @tests/curl.json  --header "Content-Type: application/json"
```
