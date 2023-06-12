/* A Bison parser, made by GNU Bison 2.3.  */

/* Skeleton interface for Bison's Yacc-like parsers in C

   Copyright (C) 1984, 1989, 1990, 2000, 2001, 2002, 2003, 2004, 2005, 2006
   Free Software Foundation, Inc.

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2, or (at your option)
   any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor,
   Boston, MA 02110-1301, USA.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* Tokens.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
   /* Put the tokens into the symbol table, so that GDB and other debuggers
      know about them.  */
   enum yytokentype {
     NUMBER = 258,
     IDENTIFIER = 259,
     ARROW = 260,
     PLUS = 261,
     MINUS = 262,
     MULT = 263,
     DIV = 264,
     LPAREN = 265,
     RPAREN = 266,
     OR = 267,
     AND = 268,
     EQUALS = 269,
     GREATER = 270,
     LESSER = 271,
     IF = 272,
     THEN = 273,
     ELSE = 274,
     END = 275,
     WHILE = 276,
     FOR = 277,
     FUNC = 278,
     COMMA = 279,
     ASSIGN = 280,
     PRINT = 281,
     COLON = 282,
     DOT = 283,
     NOT = 284,
     RETURN = 285,
     UNARY = 286
   };
#endif
/* Tokens.  */
#define NUMBER 258
#define IDENTIFIER 259
#define ARROW 260
#define PLUS 261
#define MINUS 262
#define MULT 263
#define DIV 264
#define LPAREN 265
#define RPAREN 266
#define OR 267
#define AND 268
#define EQUALS 269
#define GREATER 270
#define LESSER 271
#define IF 272
#define THEN 273
#define ELSE 274
#define END 275
#define WHILE 276
#define FOR 277
#define FUNC 278
#define COMMA 279
#define ASSIGN 280
#define PRINT 281
#define COLON 282
#define DOT 283
#define NOT 284
#define RETURN 285
#define UNARY 286




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef int YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

