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
"for"                   { return FOR; }
"to"                    { return TO; }
"do"                    { return DO; }
"func"                  { return FUNC; }
"print"                 { return PRINT; }
"["                     { return LSQUARE; }
"]"                     { return RSQUARE; }
"{"                     { return LBRACE; }
"}"                     { return RBRACE; }
":"                     { return COLON; }
"="                     { return ASSIGN; }
"."                     { return DOT; }
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

%%