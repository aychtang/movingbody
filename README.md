# movingbody

## Aim

Algorithm for determining an optimal point size for a given body text and container width. This will be at the core of an algorithmic typography system as the body text is central to the overall visual effect. It makes sense to first generate a good styling for your body text, and build up from there.

The current implementation is very simple, we first generate and cache any required tables of expected character widths for a given point family and size using the sizetable package. Using the sizetable, we can build a string which we expect to take up the first line of our container based on its width. We can then examine that strings length, a general rule for good measure is 60-75 characters per line. If the string falls within those boundries we accept the size, otherwise we repeat the process, either incrementing or decrementing the size as required.

## Improvements

* Assess not only the first string, but all "full" strings (ignore last string if not over a certain length threshold).
* Currently, as soon as we reach either end of the accepted line length boundry, we do not explore the other options.
* If we did, is it possible to determine what of the given sizes is the best?

## Run this code
There is an ```index.html``` file at the root of this git repository which runs the bundled demo javascript. As you resize the browser window, the text size should adjust to maintain a good type measure at all times.

If you want to build the source code, you can do so by browserifying ```src/index.js```.

## License
MIT
