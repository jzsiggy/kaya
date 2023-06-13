# Building with Flex and Bison

`bison -d parser.y`

`flex lexer.l`

`gcc parser.tab.c lex.yy.c -ll`

`cat source_code.ky | ./a.out`

# Running the compiler

`node kaya.js source_code.ky`