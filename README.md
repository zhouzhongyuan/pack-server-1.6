# Cordova-pack

[online demo](https://dev.bokesoft.com/yigomobile/main)

## Build

```
npm run build

```
generate dist files, es6=>es5

## Run
```bash
npm run start
```
Open [http://127.0.0.1:3000](http://127.0.0.1:3000)

## pack

其中的依赖Cordova-lib需要修改文件才能正确使用打包功能


## version
cordova-lib 6.0.0

## Change

svn-spawn:
为了在checkout的时候，不显示file list
```
params = [params, '.'];

```
to
```
params = [params, '.', '-q'];

```