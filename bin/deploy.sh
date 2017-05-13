#!/bin/bash

aws s3 sync ui/resources/public s3://tcias.co.uk/ --acl public-read  \
--cache-control 'max-age=604800'  \
--region eu-west-1 \
--include="*"  \
