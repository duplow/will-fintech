#!/bin/bash
arg=$1

# Verifica se o argumento está vazio
if [ -z "$arg" ]; then
  # Imprime um erro
  echo "Migration cannot be empty"
  exit 1
fi

yarn typeorm migration:create ./src/migrations/$arg