# movingbody

# Aim

Algorithm for determining an optimal point size for a given body text and container width. This will be at the core of an algorithmic typography system as the body text is central to the overall visual effect. It makes sense to first generate a good styling for your body text, and build up from there.

The current implementation is very simple, we first generate and cache any required tables of expected character widths for a given point family and size using the sizetable package. Using the sizetable, we can build a string which we expect to take up the first line of our container based on its width. We can then examine that strings length, a general rule for good measure is 60-75 characters per line. If the string falls within those boundries we accept the size, otherwise we repeat the process, either incrementing or decrementing the size as required.
