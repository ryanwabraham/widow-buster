# Widow Buster

## Intro
In the world of typography, a widow is a word that awkwardly falls onto its own line.

This lightweight JS library widow-proofs your content on page load, so designers on your team can relax.

## Usage
Download the library and include it before the closing body tag.

    ```html
    <script src="./path/to/widow-buster.js"></script>
    ```

Next, instantiate the library. It takes an array of selectors as an argument

    ```html
    <script>
        widowBuster([".widow-proof-class", "#widow-proof-id", "h2"]);
    </script>
    ```

Any [valid selector](https://dev.w3.org/2006/webapi/selectors-api2/#dom-parentnode-queryselectorall) can be passed into the array for widow-proofing.

## What Elements Should I Widow-Proof?
It's important to note that this library not only widow-proofs every element matching the selectors you pass, but all of their child nodes as well. Knowing this, you may be tempted to call widowBust with "body" as your only selector, which would widow-proof every element on the page. I would advise against this for performance reasons and because it will most likely produce undesirable results.

Instead, I would suggest widow-proofing a few, specific selectors. For instance, suppose you have a big headline, several secondary headlines, and a testimonial pull quote on a landing page. You could widow-proof all of these elements like so:

    ```javascript
    widowBuster(["#big-headline", "h2.secondary-headline", ".pull-quote"]);
    ```

## How Does It Work?
Widow Buster works by finding text nodes inside of the elements you passed to it, and inserting a non-breaking space character before the last word.

    ```html
    <p class="widow-busted">I feel like I died and went to&nbsp;Flavortown.</p>
    <p>- Guy Fieri</p>
    ```

## Examples
To see this library in action, I suggest cloning this repo and opening the example html file.

## Experiencing issues? Have a suggestion?
Click the "Issues" tab above to report a problem or suggest a feature. Thanks for your support!
