%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "parser.tab.h"
%}

%%

"if"              { return IF; }
"then"            { return THEN; }
"else"            { return ELSE; }
"end"             { return END; }
"for"             { return FOR; }
"to"              { return TO; }
"do"              { return DO; }
"func"            { return FUNC; }
"print"           { return PRINT; }
"="               { return ASSIGN; }
","               { return COMMA; }
"+"               { return PLUS; }
"-"               { return MINUS; }
"("               { return LPAREN; }
")"               { return RPAREN; }
[0-9]+            { yylval = atoi(yytext); return NUMBER; }
[ \t\n]           /* ignore whitespace */

%%

int yywrap() {
    return 1;
}

int main(int argc, char **argv) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s filename\n", argv[0]);
        return 1;
    }

    FILE *input = fopen(argv[1], "r");
    if (input == NULL) {
        fprintf(stderr, "Error opening file %s\n", argv[1]);
        return 1;
    }

    yyin = input;
    int token;

    fclose(input);
    return 0;
}
