## Replace syedimran1 with your own docker username

### Step1

```js
docker build -t syedimran1/pup-1:latest .
```

### Step 2

```js
docker push syedimran1/pup-1:latest
```

### Step3 :

```js
cf push pup-1 --docker-image syedimran1/pup-1:latest
```
