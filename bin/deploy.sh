#!/bin/bash

aws s3 sync ui/resources/public s3://tcias.co.uk/ --acl public-read  \
--cache-control 'max-age=86400'  \
--region eu-west-1 \
--include="*"  \
