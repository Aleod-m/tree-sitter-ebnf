# tree-sitter-ebnf

EBNF grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter)

## EBNF grammar of the grammar

```ebnf
rules = rule+ ;
rule = symbol '=' expression ;
symbol = [a-zA-Z] [a-zA-Z0-9_]* ; 
expression = (atom quantifier)+ | binary_expression ;
atom = group | symbol | terminal | codepoint | class ;
binary_expression = expression '|' expression | expression '-' expression
group = '(' expression ')'
terminal = "'" [^']* "'" | '"' [^"]* '"'
codepoint = '#x' [0-9a-fA-F]
class = '[' '^'? class_inner ']'
class_inner =  class_range* class_atom+ | class_range+ class_atom*
class_range = class_atom '-' class_atom
class_atom = codepoint | [^\-\]]
```

## Reference

This parser implements a syntax close to the EBNF syntax found in the [xml 1.1 specification](https://www.w3.org/TR/xml11/#sec-notation).

## Usage in Neovim

### Parser Installation

The [nvim-treesitter plugin](https://github.com/nvim-treesitter/nvim-treesitter)
does not include this parser
[currently](https://github.com/nvim-treesitter/nvim-treesitter/pull/3574). To
use it you must instead manually add it to your tree-sitter config and then
install it with `:TSInstall ebnf` or by adding it to your `ensure_installed`
list:

```lua
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()
parser_config.ebnf = {
    install_info = {
        url = 'https://github.com/Aleod-m/tree-sitter-ebnf.git',
        files = { 'src/parser.c' },
        branch = 'main',
        generate_requires_npm = false,
        requires_generate_from_grammar = false,
    },
}
vim.treesitter.language.register("ebnf", "ebnf")
```
