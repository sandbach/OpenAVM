# OpenAVM
[OpenAVM](https://sandbach.github.io/OpenAVM/) is a web app designed to aid in the typesetting of attribute-value matrices (AVMs), specifically those used in the framework of Lexical Functional Grammar ([LFG](https://ling.sprachwiss.uni-konstanz.de/pages/home/lfg/)).

The app allows users to create a structure of embedded square and curly brackets. The structure of the brackets and the text input by the user are used to produce a TeX file, which is then sent to latexonline.cc (thanks to [@aslushnikov](https://github.com/aslushnikov/latex-online)) to be compiled into a PDF.

Below is an example LFG f-structure generated with OpenAVM.

<p align="center">'Gramps planted a turnip'</p>
![compile](https://user-images.githubusercontent.com/80465432/112725923-995b1a80-8f12-11eb-9550-a2dfcc591d2f.png)

## Tips
* The app automatically converts greater-than and less-than signs '< >' to true angle brackets '⟨ ⟩'.
* By default, the app automatically sets LFG terms such as PRED and SUBJ in small caps. You can type them in lowercase.
* Since OpenAVM uses [LaTeX](https://www.overleaf.com/latex/templates/a-quick-guide-to-latex/fghqpfgnxggz), you can use standard LaTeX expressions in the app, e.g.:
  * `\textit{i}` &rarr; '_i_'
  * `$\alpha$` &rarr; '_α_'
  * `$\uparrow$` &rarr; '&uarr;'
