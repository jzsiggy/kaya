%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "parser.tab.h"
%}

%%

"if"                    { return IF; }
"then"                  { return THEN; }
"else"                  { return ELSE; }
"end"                   { return END; }
"while"                 { return WHILE; }
"func"                  { return FUNC; }
"show"                  { return PRINT; }
"ret"                   { return RETURN; }
"||"                    { return OR; }
"&&"                    { return AND; }
"=="                    { return EQUALS; }
"<="                    { return ASSIGN; }
"=>"                    { return ARROW; }
"."                     { return DOT; }
">"                     { return GREATER; }
"<"                     { return LESSER; }
","                     { return COMMA; }
"+"                     { return PLUS; }
"-"                     { return MINUS; }
"*"                     { return MULT; }
"/"                     { return DIV; }
"not"                   { return NOT; }
"("                     { return LPAREN; }
")"                     { return RPAREN; }
[0-9]+                  { return NUMBER; }
[a-zA-Z][a-zA-Z0-9]*    { return IDENTIFIER; }
[ \t\n]                 { /* ignore whitespace */ }
";"                     { /* ignore semi-colon */ }

%%