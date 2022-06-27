#!/bin/bash
docker rm -f web_shc_hard
docker build -t web_shc_hard .
docker run --name=web_shc_hard --rm -p1337:1337 -it web_shc_hard
