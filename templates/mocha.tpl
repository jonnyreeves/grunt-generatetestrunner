<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><%= title %></title>

    <!-- Vendor -->
    <%= vendor_tags %>

    <!-- Mocha setup -->
    <script type="text/javascript">
        chai.should();
        mocha.setup('bdd');

        // Fail on global failures
        window.onerror = function (msg, stack) {
            it("exploded!", function () { throw new Error(msg); });
        };

        // Start the suite.
        window.onload = function () {
            mocha.run();
        };
    </script>

    <!-- Main -->
    <%= src_tags %>
</head>
<body>
<div id="mocha"></div>
</body>
</html>