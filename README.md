# TCIAS rebuild

* Front end will be built using CLojureScript and Reagent
* Data will be sourced using Node/JS modules
* A Lambda function will run once every 24 hours and assemble the page and push the contents to the current S3 bucket.

## data: [![CircleCI](https://circleci.com/gh/gregstewart/Teacup-In-A-Storm/tree/lambda-clojurescript-node.svg?style=svg)](https://circleci.com/gh/gregstewart/Teacup-In-A-Storm/tree/lambda-clojurescript-node)

Currently uses:
* ESLint Airbnb base settings
* Babel [env presets]
* Babel plugin istanbul

## ui

* run with `rlwrap lein figwheel`
