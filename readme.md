# Presentation

[https://slides.com/joaozsigmond/palette](https://slides.com/joaozsigmond/palette)

# Building with Flex and Bison

`bison -d parser.y`

`flex lexer.l`

`gcc parser.tab.c lex.yy.c -ll`

`cat source_code.ky | ./a.out`

# Running the compiler

`node kaya.js source_code.ky`

# Basics

```python
# this is a comment

# variable definition (no types)
x <= 5 # x receives 5

# printing to stdout
show(x)

# conditional statements
if x > 0 then
    show(x)
else
    show("x is smaller than 0")
end

# loops
while x < 0 =>
    x <= x + 1
end

# function definition (scoped variables)
func sum(a, b, c)
    ret a+b+c
end

func deny(x)
    ret not x
end

show(deny(sum(1,2,3))); # will print 0

# optional semicolon at the end of the line.

```

# EBNF

```
program = { statement } ;

statement = assignment | if_statement | while_loop | function_definition | print_statement ;

assignment = variable "<=" expression ;

if_statement = "if" expression "then" statement { "else" statement } "end" ;

while_loop = "while" expression "=>" statement "end" ;

function_definition = "func" identifier "(" [ parameter { "," parameter } ] ")" statement "end" ;

print_statement = "show" "(" expression ")" ;

parameter = identifier ;

rel_expression = expression { rel_op expression } ;

expression = term { add_op term } ;

term = factor { mul_op factor } ;

factor = number | variable | "(" expression ")" | unary_op factor | function_call ;

variable = identifier ;

function_call = identifier "(" [ expression { "," expression } ] ")" ;

rel_op = "==" | ">" | "<" ;

add_op = "+" | "-" | "||" ;

mul_op = "*" | "/" | "&&" ;

unary_op = "-" | "not" ;

number = integer ;

integer = digit { digit } ;

identifier = letter { letter | digit } ;

return = "ret" rel_expression ;

digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;

letter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" ;
```