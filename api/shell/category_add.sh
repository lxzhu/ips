#!/bin/sh
curl -i -H "Content-Type:application/json" -X POST -d '{"name":"针织衫","has_children":"true"}' http://localhost:12000/product/category/add
