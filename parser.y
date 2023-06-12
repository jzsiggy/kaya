%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int yylex();
int yyerror(char* s);
%}

%token NUMBER IDENTIFIER ARROW
%token PLUS MINUS MULT DIV LPAREN RPAREN
%token OR AND EQUALS GREATER LESSER
%token IF THEN ELSE END WHILE
%token FOR FUNC COMMA ASSIGN PRINT
%token COLON DOT NOT RETURN
%left PLUS MINUS
%left MULT DIV
%nonassoc UNARY

%%
program : statement
        | program statement
        ;

statement : assignment
          | if_statement
          | while_loop
          | function_definition
          | print_statement
          | return
          ;

assignment : IDENTIFIER ASSIGN rel_expression
           ;

if_statement : IF rel_expression THEN statement ELSE statement END
             ;

while_loop : WHILE rel_expression ARROW statement END
         ;

function_definition : FUNC IDENTIFIER LPAREN param_list RPAREN statement END
                    ;

param_list : /* empty */
           | IDENTIFIER
           | param_list COMMA IDENTIFIER
           ;

print_statement : PRINT LPAREN rel_expression RPAREN
                ;

rel_expression : expression
               | expression LESSER expression
               | expression GREATER expression
               | expression EQUALS expression
               ;

expression : term
           | term PLUS term
           | term MINUS term
           | term OR term
           ;

term : factor
     | factor MULT factor
     | factor DIV factor
     | factor AND factor
     ;

factor : NUMBER
       | IDENTIFIER
       | LPAREN expression RPAREN
       | MINUS factor %prec UNARY
       | NOT factor %prec UNARY
       | function_call
       ;

function_call : IDENTIFIER LPAREN arg_list RPAREN
              ;

return : RETURN rel_expression ;

arg_list : /* empty */
         | rel_expression
         | arg_list COMMA rel_expression
         ;

%%
int main(int argc, char **argv)
{
 yyparse();
 return 0;
}
int yyerror(char *s)
{
 fprintf(stderr, "error: %s\n", s);
 return 0;
}