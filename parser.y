%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int yylex();
int yyerror(char* s);
%}

%token NUMBER IDENTIFIER
%token PLUS MINUS TIMES DIVIDE LPAREN RPAREN
%token IF THEN ELSE END
%token FOR IN TO DO FUNC COMMA ASSIGN PRINT
%token LBRACE RBRACE LSQUARE RSQUARE
%token COLON DOT MULT DIV NOT
%left PLUS MINUS
%left TIMES DIVIDE
%nonassoc UNARY

%%
program : statement
        | program statement
        ;

statement : assignment
          | if_statement
          | for_loop
          | function_definition
          | print_statement
          ;

assignment : IDENTIFIER ASSIGN expression
           ;

if_statement : IF expression THEN statement ELSE statement END
             ;

for_loop : FOR IDENTIFIER IN expression TO expression DO statement END
         ;

function_definition : FUNC IDENTIFIER LPAREN param_list RPAREN statement END
                    ;

param_list : /* empty */
           | IDENTIFIER
           | param_list COMMA IDENTIFIER
           ;

print_statement : PRINT LPAREN expression RPAREN
                ;

expression : term
           | expression PLUS term
           | expression MINUS term
           ;

term : factor
     | term TIMES factor
     | term DIVIDE factor
     ;

factor : NUMBER
       | IDENTIFIER
       | LPAREN expression RPAREN
       | MINUS factor %prec UNARY
       | function_call
       ;

function_call : IDENTIFIER LPAREN arg_list RPAREN
              ;

arg_list : /* empty */
         | expression
         | arg_list COMMA expression
         ;

%%
main(int argc, char **argv)
{
 yyparse();
}
yyerror(char *s)
{
 fprintf(stderr, "error: %s\n", s);
}