module.exports = grammar({

  name: 'ebnf',

  extras: $ => [
    / |\n|\t|\r/,
    $.comment,
  ],

  rules: {
    terminal: $ => /'[^']*'|"[^"]*"/,
    codepoint: $ => /#x[0-0a-fA-F]/,
    identifier: $ => /[a-zA-Z][a-zA-Z0-9_]*/,
    comment: $ => /\/\*[^*]*\*+(?:[^)*][^*]*\*+)*\//,

    rules: $ => repeat1($.rule),

    rule: $ => seq(
      field('symbol', $.identifier),
      '=',
      field('expression',
        optional($.expr)), 
      ';'
    ),

    expr: $ => choice(
      $.binary_expression,
      seq($._atom, optional($.quantifier)),
    ),

    _atom: $ => choice(
      $.group,
      $.identifier,
      $.terminal,
      $.codepoint,
      $.class,
    ),

    group: $ => seq('(', optional($.expr), ')'),

    quantifier: $ => choice('*', '+', '?'),

    binary_expression: $ => choice(
      ...[
        [$.expr, '|', $.expr],
        [$.expr, '-', $.expr],
      ].map(([left, op, right], index) =>
        prec.left(
          index + 1,
          seq(
            field('left', left),
            field('operator', op),
            field('right', right),
          ),
        )
      ),
    ),

    class: $ => seq(
      '[',
      optional('^'),
      $.class_inner,
      ']',
    ),

    class_inner: $ => choice(
      seq(repeat1($.class_range), repeat($.class_atom)),
      seq(repeat($.class_range), repeat1($.class_atom)),
    ),

    class_range: $ => seq(
      $.class_atom,
      '-',
      $.class_atom,
    ),

    class_atom: $ => choice(
      $.codepoint,
      /[^\-\\\]]/,
    ),
  },
})
