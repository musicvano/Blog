---
title: "Summary"
description: "Topic 6. Strings and regular expressions: conclusions and review questions"
sourceHash: "c9ff2db2ad835c1b991bba900fc9cd701dbcefec555325397993cfdebc2bb44f"
---

# Summary

## Conclusions

A `str` is an immutable sequence of code points, while `bytes` represents encoded bytes. String methods are sufficient for simple cleaning and splitting; Unicode normalization is needed to compare canonically equivalent forms. F-strings produce text immediately, while t-strings preserve static parts and values for a custom processor. A regular expression checks structure, but semantic constraints on dates, amounts, and other data are checked separately.

## Self-check questions

1. What exactly does `len` count for `str` and for `bytes`?
2. Why does `replace` not change the original string?
3. How do `split()` and `split(" ")` differ?
4. Why is `strip(".txt")` not a way to remove an extension?
5. Why is NFC normalization needed?
6. How do the purposes of `casefold` and `lower` differ?
7. What do width, precision, and type mean in a format specification?
8. When is `!r` useful, and when is it incompatible with a numeric format?
9. What type does a t-string create, and when are its expressions evaluated?
10. Why does the `t` prefix alone not guarantee HTML safety?
11. How do the two classes named `Template` differ?
12. When do you use `search`, `match`, and `fullmatch`?
13. How do capturing groups affect the `findall` result?
14. Why pass a function to `re.sub`?
15. Why does matching a regex not yet prove that a date is valid?

## Useful links

- <https://docs.python.org/3.14/library/stdtypes.html#text-sequence-type-str>.
- <https://docs.python.org/3.14/howto/unicode.html>.
- <https://docs.python.org/3.14/library/string.html>.
- <https://docs.python.org/3.14/library/string.templatelib.html>.
- <https://peps.python.org/pep-0750/>.
- <https://docs.python.org/3.14/howto/regex.html>.
