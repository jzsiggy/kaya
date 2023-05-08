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
     PLUS = 260,
     MINUS = 261,
     TIMES = 262,
     DIVIDE = 263,
     LPAREN = 264,
     RPAREN = 265,
     IF = 266,
     THEN = 267,
     ELSE = 268,
     END = 269,
     FOR = 270,
     IN = 271,
     TO = 272,
     DO = 273,
     FUNC = 274,
     COMMA = 275,
     ASSIGN = 276,
     PRINT = 277,
     UNARY = 278
   };
#endif
/* Tokens.  */
#define NUMBER 258
#define IDENTIFIER 259
#define PLUS 260
#define MINUS 261
#define TIMES 262
#define DIVIDE 263
#define LPAREN 264
#define RPAREN 265
#define IF 266
#define THEN 267
#define ELSE 268
#define END 269
#define FOR 270
#define IN 271
#define TO 272
#define DO 273
#define FUNC 274
#define COMMA 275
#define ASSIGN 276
#define PRINT 277
#define UNARY 278




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef int YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

