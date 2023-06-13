// let prompt = require('syncprompt');

const words = {
    "show": "print",
    "read": "read",
    "while": "while",
    "if": "if",
    "end": "end",
    "else": "else",
    "Int": "type",
    "String": "type",
    "ret": "return",
    "func": "function",
    "do": "do",
    "not": "not",
    "then": "then"
}

class FunctionTable {
    constructor() {
        this.functions = {};
    }

    declare(identifier, value) {
        this.functions[identifier] = value
    }

    get(identifier) {
        if (!Object.keys(this.functions).includes(identifier)) {
            throw new Error()
        } else {
            return this.functions[identifier]
        }
    }
}

class SymbolTable {
    constructor() {
        this.symbols = {};
    }

    set(identifier, value) {
        this.symbols[identifier] = { type: typeof (value) == "string" ? "String" : "Int", value }
    }

    get(identifier) {
        if (!Object.keys(this.symbols).includes(identifier)) {
            throw new Error()
        } else {
            return this.symbols[identifier]
        }
    }
}

let _symbolTable = new SymbolTable();
let funcTable = new FunctionTable();

class Nop {
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }

    evaluate(symbolTable) {
        return
    }
}

class UnaryOperator {
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }

    evaluate(symbolTable) {
        let child = this.children[0].evaluate(symbolTable)
        if (this.value == "-") {
            if (child['type'] != "Int") throw new Error()
            return { type: "Int", value: -child['value'] }
        }
        if (this.value == "not") {
            return !child["value"] ? { type: "Int", value: 1 } : { type: "Int", value: 0 }
        }
        return child
    }
}

class BinaryOperator {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        let first_child = this.children[0].evaluate(symbolTable)
        let second_child = this.children[1].evaluate(symbolTable)
        if (this.value == "-") {
            if (first_child['type'] != "Int" || second_child["type"] != "Int") throw new Error()
            return { type: "Int", value: first_child['value'] - second_child['value'] }
        }
        if (this.value == "+") {
            if (first_child['type'] == "Int" && second_child['type'] == "String") throw new Error()
            return { type: first_child['type'], value: first_child['value'] + second_child['value'] }
        }
        if (this.value == "*") {
            if (first_child['type'] != "Int" || second_child["type"] != "Int") throw new Error()
            return { type: "Int", value: first_child['value'] * second_child['value'] }
        }
        if (this.value == "/") {
            if (first_child['type'] != "Int" || second_child["type"] != "Int") throw new Error()
            return { type: "Int", value: ~~(first_child['value'] / second_child['value']) }
        }
        if (this.value == "&&") {
            return first_child['value'] && second_child['value'] ? { type: "Int", value: 1 } : { type: "Int", value: 0 }
        }
        if (this.value == "||") {
            return first_child['value'] || second_child['value'] ? { type: "Int", value: 1 } : { type: "Int", value: 0 }
        }
        if (this.value == "==") {
            return first_child['value'] == second_child['value'] ? { type: "Int", value: 1 } : { type: "Int", value: 0 }
        }
        if (this.value == ">") {
            return first_child['value'] > second_child['value'] ? { type: "Int", value: 1 } : { type: "Int", value: 0 }
        }
        if (this.value == "<") {
            return first_child['value'] < second_child['value'] ? { type: "Int", value: 1 } : { type: "Int", value: 0 }
        }
        if (this.value == ".") {
            return { type: "String", value: "" + first_child['value'] + second_child['value'] }
        }
    }
}

class If {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        if (this.children[0].evaluate(symbolTable).value) {
            this.children[1].evaluate(symbolTable)
        }
        else {
            if (this.children[2]) {
                this.children[2].evaluate(symbolTable)
            }
        }
    }
}

class While {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        while (this.children[0].evaluate(symbolTable).value) {
            this.children[1].evaluate(symbolTable)
        }
    }
}

class Read {
    constructor(value, children) {
        this.value = value;
    }

    evaluate(symbolTable) {
        // let res = prompt('');
        let res = 10;
        if (isNaN(res)) return { type: "String", value: res }
        return { type: "Int", value: parseInt(res) }
    }
}

class Print {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        return console.log(this.children[0].evaluate(symbolTable)["value"])
    }
}

class Assignment {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        symbolTable.set(this.children[0].value, this.children[1].evaluate(symbolTable)["value"])
    }
}

class FunctionDeclaration {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        funcTable.declare(this.children[0].value, this)
    }
}

class FunctionCall {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        let funcDec = funcTable.get(this.value);
        if (funcDec.children.length - 2 != this.children.length) throw new Error()
        let st = new SymbolTable();
        for (let i = 0; i < this.children.length; i++) {
            funcDec.children[i + 1].evaluate(st);
            st.set(funcDec.children[i + 1].children[0].value, this.children[i].evaluate(symbolTable).value)
        }
        return funcDec.children[funcDec.children.length - 1].evaluate(st);
    }
}

class Return {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        return this.children[0].evaluate(symbolTable);
    }
}

class Identifier {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate(symbolTable) {
        return symbolTable.get(this.value)
    }
}

class Block {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    addChild(child) {
        this.children.push(child)
    }

    evaluate(symbolTable) {
        for (let child of this.children) {
            if (child instanceof Return) {
                return child.evaluate(symbolTable)
            }
            child.evaluate(symbolTable)
        }
    }
}

class IntegerValue {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate() {
        return { type: "Int", value: this.value }
    }
}

class StringValue {
    constructor(value, children) {
        this.value = value;
        this.children = children
    }

    evaluate() {
        return { type: "String", value: this.value }
    }
}

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Tokenizer {
    constructor(source) {
        this.source = source
        this.position = 0
        this.next;
    }

    isNumeric(c) {
        return c >= '0' && c <= '9'
    }

    isLetter(c) {
        return c && c.match(/[a-z]/i);
    }

    isAlphanumeric(c) {
        return this.isLetter(c) || this.isNumeric(c) || c == '_'
    }

    isWhiteSpace(c) {
        return ((c == ' ') || (c == '\t'))
    }

    selectNext() {
        if (this.source[this.position] == "+") {
            this.next = new Token("plus", "+");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source.substring(this.position, this.position + 2) == "||") {
            this.next = new Token("or", "||");
            this.position += 2
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source.substring(this.position, this.position + 2) == "::") {
            this.next = new Token("declarator", "::");
            this.position += 2
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source.substring(this.position, this.position + 2) == "&&") {
            this.next = new Token("and", "&&");
            this.position += 2
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source.substring(this.position, this.position + 2) == "=>") {
            this.next = new Token("fat_arrow", "=>");
            this.position += 2
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source.substring(this.position, this.position + 2) == "<=") {
            this.next = new Token("assignment", "<=");
            this.position += 2
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.isLetter(this.source[this.position])) {
            let name = ""
            while (this.isAlphanumeric(this.source[this.position])) {
                name += this.source[this.position++];
            }
            this.next = Object.keys(words).includes(name) ? new Token(words[name], name) : new Token("identifier", name);
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return;
        }

        if (this.source[this.position] == `"`) {
            let str = ""
            this.position++
            while (this.source[this.position] != `"`) {
                str += this.source[this.position++];
                if (!this.source[this.position]) throw new Error()
            }
            this.position++
            this.next = new Token("string", str);
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return;
        }

        if (this.isNumeric(this.source[this.position])) {
            let number = ""
            while (this.isNumeric(this.source[this.position])) {
                number += this.source[this.position++];
            }
            this.next = new Token("number", parseInt(number));
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return;
        }

        if (this.source[this.position] == "-") {
            this.next = new Token("minus", "-");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == ",") {
            this.next = new Token("comma", ",");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == "*") {
            this.next = new Token("asterisk", "*");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == "/") {
            this.next = new Token("bar", "/");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == "(") {
            this.next = new Token("open_par", "(");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == ")") {
            this.next = new Token("close_par", ")");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source.substring(this.position, this.position + 2) == "==") {
            this.next = new Token("equals", "==");
            this.position += 2
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == "\n") {
            this.next = new Token("new_line", "\n");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == ">") {
            this.next = new Token("greater", ">");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == "<") {
            this.next = new Token("lesser", "<");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.source[this.position] == ".") {
            this.next = new Token("dot", ".");
            this.position++;
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return
        }

        if (this.isWhiteSpace(this.source[this.position])) {
            while (this.isWhiteSpace(this.source[this.position])) {
                this.position++
            }
            return this.selectNext()
        }

        if (!this.source[this.position]) {
            this.next = new Token("EOF", null);
            return
        }

        throw new Error("encountered a token that is not in the language vocabulary.")
    }
}

class Parser {
    constructor() {
        this.tokenizer;
    }

    parseBlock() {
        let block = new Block("block", []);
        while (this.tokenizer.next.type != "EOF") {
            block.addChild(this.parseStatement());
        }
        return block;
    }

    parseStatement() {
        if (["return", "print", "identifier", "new_line", "if", "while", "function"].includes(this.tokenizer.next.type)) {
            if (this.tokenizer.next.type == "new_line") {
                this.tokenizer.selectNext();
                return new Nop();
            } else

                if (this.tokenizer.next.type == "return") {
                    this.tokenizer.selectNext();
                    return new Return("return", [this.parseRelExpression()])
                } else

                    if (this.tokenizer.next.type == "print") {
                        this.tokenizer.selectNext();
                        if (this.tokenizer.next.type != "open_par") throw new Error()
                        this.tokenizer.selectNext();
                        let expr = this.parseRelExpression();
                        if (this.tokenizer.next.type != "close_par") throw new Error()
                        this.tokenizer.selectNext();
                        if (this.tokenizer.next.type != "new_line") throw new Error()
                        this.tokenizer.selectNext();
                        return new Print("print", [expr]);
                    } else

                        if (this.tokenizer.next.type == "identifier") {
                            let identifier = new Identifier(this.tokenizer.next.value, [])
                            this.tokenizer.selectNext();
                            if (this.tokenizer.next.type == "assignment") {
                                this.tokenizer.selectNext();
                                let expr = this.parseRelExpression();
                                if (this.tokenizer.next.type != "new_line") throw new Error()
                                this.tokenizer.selectNext();
                                return new Assignment("<=", [identifier, expr]);
                            } else
                            if (this.tokenizer.next.type == "open_par") {
                                let args = [];
                                this.tokenizer.selectNext();
                                while (this.tokenizer.next.type != "close_par") {
                                    args.push(this.parseRelExpression())
                                    if (this.tokenizer.next.type == "close_par") break
                                    if (this.tokenizer.next.type != "comma") throw new Error()
                                    this.tokenizer.selectNext()
                                }
                                if (this.tokenizer.next.type != "close_par") throw new Error()
                                this.tokenizer.selectNext()
                                return new FunctionCall(identifier.value, args);
                            } else throw new Error()
                        } else

                            if (this.tokenizer.next.type == "while") {
                                this.tokenizer.selectNext();
                                let relExpr = this.parseRelExpression();
                                if (this.tokenizer.next.type != "fat_arrow") throw new Error()
                                this.tokenizer.selectNext();
                                if (this.tokenizer.next.type != "new_line") throw new Error()
                                this.tokenizer.selectNext();
                                let block = new Block("block", []);
                                while (this.tokenizer.next.type != "end") {
                                    block.addChild(this.parseStatement());
                                }
                                if (this.tokenizer.next.type != "end") throw new Error()
                                this.tokenizer.selectNext();
                                if (this.tokenizer.next.type != "new_line") throw new Error()
                                this.tokenizer.selectNext();
                                return new While("while", [relExpr, block]);
                            } else

                                if (this.tokenizer.next.type == "if") {
                                    let elseBlock = false
                                    this.tokenizer.selectNext();
                                    let relExpr = this.parseRelExpression();
                                    if (this.tokenizer.next.type != "then") throw new Error()
                                    this.tokenizer.selectNext();
                                    if (this.tokenizer.next.type != "new_line") throw new Error()
                                    this.tokenizer.selectNext();
                                    let ifBlock = new Block("block", []);
                                    while (!["else", "end"].includes(this.tokenizer.next.type)) {
                                        ifBlock.addChild(this.parseStatement());
                                    }
                                    if (this.tokenizer.next.type == "else") {
                                        this.tokenizer.selectNext();
                                        if (this.tokenizer.next.type != "new_line") throw new Error()
                                        this.tokenizer.selectNext();
                                        elseBlock = new Block("block", []);
                                        while (this.tokenizer.next.type != "end") {
                                            elseBlock.addChild(this.parseStatement());
                                        }
                                    }
                                    if (this.tokenizer.next.type != "end") throw new Error()
                                    this.tokenizer.selectNext();
                                    if (this.tokenizer.next.type != "new_line") throw new Error()
                                    this.tokenizer.selectNext();
                                    return new If("if", [relExpr, ifBlock, elseBlock && elseBlock]);
                                } else

                                    if (this.tokenizer.next.type == "function") {
                                        this.tokenizer.selectNext()
                                        if (this.tokenizer.next.type != "identifier") throw new Error()
                                        let identifier = new Identifier(this.tokenizer.next.value, [])
                                        this.tokenizer.selectNext()
                                        if (this.tokenizer.next.type != "open_par") throw new Error()
                                        this.tokenizer.selectNext()
                                        let args = [];
                                        while (this.tokenizer.next.type != "close_par") {
                                            if (this.tokenizer.next.type != "identifier") throw new Error()
                                            let argIdentifier = this.tokenizer.next.value
                                            this.tokenizer.selectNext()
                                            args.push(new Assignment("<=", [new Identifier(argIdentifier, []), new IntegerValue(0, [])]))
                                            if (this.tokenizer.next.type == "close_par") break
                                            if (this.tokenizer.next.type != "comma") throw new Error()
                                            this.tokenizer.selectNext()
                                        }
                                        if (this.tokenizer.next.type != "close_par") throw new Error()
                                        this.tokenizer.selectNext()
                                        if (this.tokenizer.next.type != "new_line") throw new Error()
                                        this.tokenizer.selectNext();
                                        let funcBlock = new Block("block", []);
                                        while (this.tokenizer.next.type != "end") {
                                            funcBlock.addChild(this.parseStatement());
                                        }
                                        if (this.tokenizer.next.type != "end") throw new Error()
                                        this.tokenizer.selectNext();
                                        if (this.tokenizer.next.type != "new_line") throw new Error()
                                        this.tokenizer.selectNext();
                                        return new FunctionDeclaration('func', [identifier, ...args, funcBlock])
                                    }
        } else throw new Error()
    }

    parseRelExpression() {
        let relExpr = this.parseExpression()
        while (["equals", "lesser", "greater"].includes(this.tokenizer.next.type)) {
            if (this.tokenizer.next.type == "equals") {
                this.tokenizer.selectNext();
                relExpr = new BinaryOperator("==", [relExpr, this.parseExpression()])
            }
            if (this.tokenizer.next.type == "lesser") {
                this.tokenizer.selectNext();
                relExpr = new BinaryOperator("<", [relExpr, this.parseExpression()])
            }
            if (this.tokenizer.next.type == "greater") {
                this.tokenizer.selectNext();
                relExpr = new BinaryOperator(">", [relExpr, this.parseExpression()])
            }
        }

        return relExpr
    }

    parseExpression() {
        let expr = this.parseTerm()
        while (["plus", "minus", "or", "dot"].includes(this.tokenizer.next.type)) {
            if (this.tokenizer.next.type == "plus") {
                this.tokenizer.selectNext();
                expr = new BinaryOperator("+", [expr, this.parseTerm()])
            }
            if (this.tokenizer.next.type == "minus") {
                this.tokenizer.selectNext();
                expr = new BinaryOperator("-", [expr, this.parseTerm()])
            }
            if (this.tokenizer.next.type == "or") {
                this.tokenizer.selectNext();
                expr = new BinaryOperator("||", [expr, this.parseTerm()])
            }
            if (this.tokenizer.next.type == "dot") {
                this.tokenizer.selectNext();
                expr = new BinaryOperator(".", [expr, this.parseTerm()])
            }
        }

        return expr
    }

    parseTerm() {
        let term = this.parseFactor();
        while (["asterisk", "bar", "and"].includes(this.tokenizer.next.type)) {
            if (this.tokenizer.next.type == "asterisk") {
                this.tokenizer.selectNext();
                term = new BinaryOperator("*", [term, this.parseFactor()])
            }
            if (this.tokenizer.next.type == "bar") {
                this.tokenizer.selectNext();
                term = new BinaryOperator("/", [term, this.parseFactor()])
            }
            if (this.tokenizer.next.type == "and") {
                this.tokenizer.selectNext();
                term = new BinaryOperator("&&", [term, this.parseFactor()])
            }
        }

        return term
    }

    parseFactor() {
        if (["plus", "minus", "open_par", "number", "string", "identifier", "not", "read"].includes(this.tokenizer.next.type)) {
            if (this.tokenizer.next.type == "number") {
                let factor = new IntegerValue(this.tokenizer.next.value, []);
                this.tokenizer.selectNext();
                return factor;
            } else
                if (this.tokenizer.next.type == "string") {
                    let factor = new StringValue(this.tokenizer.next.value, []);
                    this.tokenizer.selectNext();
                    return factor;
                } else
                    if (this.tokenizer.next.type == "plus") {
                        this.tokenizer.selectNext();
                        return new UnaryOperator("+", [this.parseFactor()])
                    } else
                        if (this.tokenizer.next.type == "minus") {
                            this.tokenizer.selectNext();
                            return new UnaryOperator("-", [this.parseFactor()])
                        } else
                            if (this.tokenizer.next.type == "not") {
                                this.tokenizer.selectNext();
                                return new UnaryOperator("not", [this.parseFactor()])
                            } else
                                if (this.tokenizer.next.type == "identifier") {
                                    let name = this.tokenizer.next.value
                                    let args = []
                                    this.tokenizer.selectNext();
                                    if (this.tokenizer.next.type == "open_par") {
                                        this.tokenizer.selectNext();
                                        while (this.tokenizer.next.type != "close_par") {
                                            args.push(this.parseRelExpression())
                                            if (this.tokenizer.next.type == "close_par") break
                                            if (this.tokenizer.next.type != "comma") throw new Error()
                                            this.tokenizer.selectNext()
                                        }
                                        if (this.tokenizer.next.type != "close_par") throw new Error()
                                        this.tokenizer.selectNext()
                                        return new FunctionCall(name, args)
                                    } else {
                                        let identifier = new Identifier(name, [])
                                        return identifier
                                    }
                                } else
                                    if (this.tokenizer.next.type == "open_par") {
                                        this.tokenizer.selectNext();
                                        let expr = this.parseRelExpression();
                                        if (this.tokenizer.next.type != "close_par") throw new Error()
                                        this.tokenizer.selectNext();
                                        return expr;
                                    } else
                                        if (this.tokenizer.next.type == "read") {
                                            this.tokenizer.selectNext();
                                            if (this.tokenizer.next.type != "open_par") throw new Error()
                                            this.tokenizer.selectNext();
                                            if (this.tokenizer.next.type != "close_par") throw new Error()
                                            this.tokenizer.selectNext();
                                            return new Read("read")
                                        } else {
                                            throw new Error()
                                        }
        } else {
            throw new Error()
        }
    }

    run(code) {
        let prep = new Preprocessor()
        let clean = prep.filter(code)
        this.tokenizer = new Tokenizer(clean);
        this.tokenizer.selectNext();
        let ast = this.parseBlock();
        if (this.tokenizer.next.type != "EOF") throw new Error()
        return ast
    }
}

class Preprocessor {
    filter(code) {
        let source = ''
        code = code.replace(/;/g, "\n")
        let lines = code.split("\n")
        for (let line of lines) {
            source += line.split("#")[0] + ' \n'
        }
        return source
    }
}

let p = new Parser()
const process = require('process');
let file = process.argv[2]
const fs = require("fs");
let ast = p.run(fs.readFileSync(file).toString())
// console.log("\nAST\n");
// console.log(ast);
ast.evaluate(_symbolTable)