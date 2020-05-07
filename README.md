# js-utils


usage:
```
<html>
    <script src="index.umd.js"></script>
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
