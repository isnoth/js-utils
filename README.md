# js-utils

a simeple rollup project to pack and publish 

- [x] rollup to UMD package
- [x] publish to NPM
- [] document use jsDoc
- [] rollup config file, dependency handling

usage:
```
<html>
    <!--script src="index.umd.js"></script-->
    <script src="https://cdn.jsdelivr.net/npm/js-utils-new/dist/index.umd.js"></script>
    <!--script src="https://unpkg.com/js-utils-new/dist/index.umd.js"></script-->
    <script>
        function start() {
            console.log(window.jsUtils)
            window.jsUtils.downFile('xxxxx', 'a.log')
        }
        //window.requestIdleCallback(start)
        document.addEventListener("DOMContentLoaded", start);
    </script>
</html>
```
