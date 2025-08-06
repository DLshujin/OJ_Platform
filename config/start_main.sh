#!/bin/bash
cd /root/Hydro
export HOST=0.0.0.0
export PORT=8888
exec node packages/hydrooj/bin/hydrooj.js