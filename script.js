var mainArray = [[""]];
var indentArray = [];
var funcArray = [];
var typeface
// a list of terms with subscript thematic roles
var specialArray = [
    "oblloc",
    "oblon",
    "oblgoal",
    "adjtheme",
    "objtheme",
    "objsource",
    "oblben",
    "oblof",
    "objtheta",
    "adjtheta",
    "obltheta",
    "oblag",
    "oblgo",
    "oblagent",
    "oblexp"
];
// a list of terms that should be in small caps
var scArray = [
    'a',
    'abl',
    'abs',
    'acc',
    'active',
    'ade',
    'adj',
    'adjunct',
    'anim',
    'antip',
    'aspect',
    'attr',
    'av',
    'bv',
    'case',
    'comp',
    'compform',
    'concord',
    'cond',
    'conj',
    'dat',
    'decl',
    'def',
    'deixis',
    'dir',
    'dis',
    'distant',
    'dist',
    'du',
    'dual',
    'dv',
    'erg',
    'f',
    'fem',
    'fin',
    'foc',
    'focus',
    'form',
    'fut',
    'gen',
    'gend',
    'gf',
    'human',
    'imp',
    'ind',
    'index',
    'inf',
    'ins',
    'instr',
    'inst',
    'interr',
    'inv',
    'ipfv',
    'iprf',
    'iv',
    'ldd',
    'loc',
    'm',
    'masc',
    'medial',
    'mid',
    'mood',
    'n',
    'neg',
    'neg-form',
    'nom',
    'non-future',
    'non-past',
    'nonfut',
    'nonpast',
    'nonpl',
    'nounclass',
    'num',
    'o',
    'obj',
    'obl',
    'ov',
    'pass',
    'past',
    'pastpart',
    'paucal',
    'pcase',
    'perf',
    'pers',
    'pform',
    'pfv',
    'pivot',
    'pl',
    'poss',
    'preconj',
    'pred',
    'predlink',
    'pres',
    'prespart',
    'prf',
    'prog',
    'pron',
    'prontype',
    'prox',
    'prs',
    'prs.ptcp',
    'pst',
    'pst.ptcp',
    'q',
    'recp',
    'refl',
    'rel',
    's',
    'spec',
    'sg',
    'subj',
    'sbjv',
    'tense',
    'top',
    'topic',
    'type',
    'value',
    'voice',
    'vtype',
    'wh',
    'xadj',
    'xcomp'
];
var allTerms = specialArray.concat(scArray)
// the LaTeX preamble
var outputArray1 = [
    "\\documentclass[12pt]{article}",
    "\\usepackage[T1]{fontenc}",
    "\\usepackage[utf8]{inputenc}",
];
var outputArray2 = [
    "\\usepackage{amsmath}",
    "\\usepackage{mathtools}",
]
var outputArray3 = [
    "\\usepackage[active, tightpage]{preview}",
    "\\setlength\\PreviewBorder{2pt}",
    "\\begin{document}",
    "\\begin{preview}",
    "{$$"
];
var helvet1 = ["{\\fontfamily{phv}\\selectfont"]
var helvet2 = ["}"]
var outputArray4 = [
    "$$}",
    "\\end{preview}",
    "\\end{document}"
];
var content = [];
var contentList = [];
var fixedList = [];

var topDiv = document.createElement("div");
var matrix = document.getElementById("matrix")
matrix.appendChild(topDiv)

var fontBox = document.getElementById("fontBox")
var capsBox = document.getElementById("capsBox")
var snippet = document.getElementById("snippet")
var fileBox = document.getElementById("fileBox")

function clearFunc() {
    mainArray.length = 0;
    mainArray.push([""]);
    indentArray.length = 0;
    funcArray.length = 0;
    content.length = 0;
    contentList.length = 0;
    fixedList.length = 0;
    topDiv.style.display = "none";
    var newTop = document.createElement("div");
    topDiv = newTop
    matrix.appendChild(topDiv);
    activList(0, mainArray, topDiv, 0)
};

// the parser converts the main nested array into LaTeX
function parse(listid, output){

    if (listid[0] == "square"){
        output.push("\\begin{bmatrix*}[l]")
        if (listid.length > 2){output.push("\\vspace{1.5mm}")}
        isEmpty = false;
        for (x in listid){
            if (listid[x][0] == ""){isEmpty = true}
        }
        if (isEmpty){
            for (index in listid){
                var x = listid[index];
                if (typeof x == 'string'){continue}
                if (typeof x[1] == 'object'){
                    if (x[0]){
                        output.push("\\begin{matrix}")
                        if (capsBox.value == "all"){
                            output.push("\\textsc{" + x[0] + "}&")
                        }
                        else {
                            output.push("\\text{" + x[0] + "}&")
                        }
                    }
                    var newlist = []
                    output.push(newlist)
                    parse(x[1], newlist)
                    if (x[0]){
                        output.push("\\end{matrix}\\\\")
                    }
                }
                if (typeof x[1] == 'string'){
                    output.push("\\begin{matrix}");
                    if (capsBox.value == "all"){
                        output.push("\\textsc{" + x[0] + "}&\\phantom{.}\\textsc{" + x[1] + "}\\\\")
                    }
                    else {
                        output.push("\\text{" + x[0] + "}&\\phantom{.}\\text{" + x[1] + "}\\\\")
                    }
                    output.push("\\end{matrix}\\\\")
                    if (x !== listid[listid.length - 1]){
                        output.push("\\vspace{1.5mm}")
                    }
                }
            }
        }
        else {
            for (index in listid){
                var x = listid[index];
                if (typeof x == 'string'){continue}
                if (typeof x[1] == 'object'){
                    if (x !== listid[1]){
                        output.push("\\vspace{1.5mm}")
                    }
                    if (capsBox.value == "all"){
                        output.push("\\textsc{" + x[0] + "}&")
                    }
                    else {
                        output.push("\\text{" + x[0] + "}&")
                    }
                    var newlist = [];
                    output.push(newlist);
                    parse(x[1], newlist)
                }
                if (typeof x[1] == 'string'){
                    if (capsBox.value == "all"){
                        output.push("\\textsc{" + x[0] + "}&\\phantom{.}\\textsc{" + x[1] + "}\\\\")
                    }
                    else {
                        output.push("\\text{" + x[0] + "}&\\phantom{.}\\text{" + x[1] + "}\\\\")
                    }
                    if (x !== listid[listid.length - 1] &&
                        x !== listid[listid.length - 2]){
                        output.push("\\vspace{1.5mm}")
                    }
                }
            }
        }
        if (listid == mainArray){
            output.push("\\end{bmatrix*}")
        }
        else{
            output.push("\\end{bmatrix*}\\\\")
        }
    }
    if (listid[0] == "curly"){
        output.push("\\begin{Bmatrix*}[l]");
        for (index in listid){
            var x = listid[index];
            if (typeof x == 'string'){continue}
            if (typeof x == 'object'){
                var newlist = [];
                if (index < (listid.length - 1)){
                    output.push("\\vspace{1.5mm}");
                }
                // output.push("\\vspace{1.5mm}");
                output.push(newlist);
                parse(x, newlist)
            }
        }
        output.push("\\end{Bmatrix*}\\\\")
    }

};

var url

// finalConcat joins the preamble and the fixed list together into a
// single long string with line breaks, then encodes it and sends it
// to latexonline
function finalConcat(...args){
    args.reverse()
    var final = []
    for (arr in args){
        final = args[arr].concat(final)
    }
    var finalString = final.join("\n")
    // console.log(finalString)
    finalString = encodeURIComponent(finalString)
    url = "https://latexonline.cc/compile?text=" + finalString + "&command=xelatex"
    // console.log(url)
    // window.open(url)

    var texSnippet = fixedList
    texSnippet.unshift("{$$")
    texSnippet.push("$$}")
    texSnippet = texSnippet.join("\n")
    var texOutput = document.createElement('textarea')
    texOutput.value = texSnippet
    if (snippet.checked){
        document.body.appendChild(texOutput) 
        texOutput.select();
        texOutput.setSelectionRange(0, 99999);
        document.execCommand("copy")
        texOutput.style.display = "none"
    }
    if (fileBox.value == "pdf"){
        window.open(url)
    }
    if (fileBox.value == "Image"){
        imageExport()
    }
    content.length = 0;
    contentList.length = 0;
    fixedList.length = 0;
}

function imageExport(){
    var loadBar = document.getElementById("loading")
    loadBar.setAttribute("src", "https://quicklatex.com/images/progressbar.gif")
    loadBar.style.display = "block"
    // document.getElementById("expImg").setAttribute("src", "https://quicklatex.com/images/progressbar.gif")
    var formula = fixedList.join("\n")
    var preamble = outputArray2.concat(typeface)
    preamble = preamble.join("\n")
    $.ajax({
        url: "https://wrapapi.com/use/sandbach/quicklatex-api/submit/0.0.1",
        method: "POST",
        data: {
          "rand": Math.random()*100,
          "preamble": preamble,
          "content": formula,
          "wrapAPIKey": "rutHbse4TYMAPfIZWafwwWtyOjlCqh4e"
        }
      }).done(function(data) {
        var imgurl = data.data.imgurl[0]
        // document.getElementById("expImg").setAttribute("src", imgurl)
        document.getElementById("loading").style.display = "none"
        window.open(imgurl)
      });
}

// exportFunc adds bits to the preamble and calls various other
// functions
function exportFunc(lst) {
    // console.log(snippet.checked)
    if (fontBox.value == "Times"){
        typeface = ["\\usepackage{mathptmx}"]
    }
    else {
        typeface = ["\\usepackage{tgadventor}"]
    }
    indentArray.sort();
    indentArray.reverse();
    var width = 12 + (indentArray[0] * 3);
    var paperwidth = ["\\usepackage[paperwidth=" + String(width) + "cm]{geometry}"];

    function printList(lst){
        for (x in lst){
            if (typeof lst[x] == 'string'){
                contentList.push(lst[x])
            }
            if (typeof lst[x] == 'object'){
                printList(lst[x])
            } 
        }
    };

    // fixer does quite a lot: it swaps out individual characters
    // to fix quotation marks etc., works out subscripting for
    // thematic roles, and puts relevant terms in small caps if
    // requested, checking that they do not form parts of other
    // words eg. SUBJugate
    function fixer(lst, out){
        for (string in lst){
            if (lst[string] == ""){break} 
            
            var output_ = ""
            for (let x = 0; x <= (lst[string].length -1); ++x){
                
                if (lst[string][x] == "'"){
                    if (x == 0){output_ += "`"}
                    else if (lst[string][x - 1] == " "){output_ += "`"}
                    else if (lst[string][x - 1] == "{"){output_ += "`"}
                    else {output_ += lst[string][x]}
                }
                else if (lst[string][x] == "%"){output_ += "\\%"}
                else if (lst[string][x] == "<"){output_ += "$\\langle$"}
                else if (lst[string][x] == ">"){output_ += "$\\rangle$"}
                else if (lst[string][x] == "-"){
                    if (lst[string][x-1] == "{" && lst[string][x+1] == "}"){
                        output_ += "$-$"
                    }
                    else {output_ += lst[string][x]}
                }
                else if (lst[string][x] == "+"){
                    if (lst[string][x-1] == "{" && lst[string][x+1] == "}"){
                        output_ += "$+$"
                    }
                    else {output_ += lst[string][x]}
                }
                // else if (lst[string][x] == " "){output_ += "\\hspace{3pt}"}
                else if (lst[string][x] == " "){output_ += "~"}
                else {output_ += lst[string][x]}
                
            }
            lst[string] = output_

            var output = []

            function special(string){
                var detected = []

                for (gf in allTerms){
                    var thisGF = allTerms[gf];
                    var contains = false;
                    if (string.toLowerCase().indexOf(thisGF) !== -1){
                        // console.log(specialArray[gf])
                        contains = true
                    }
                    if (contains){
                        function find(ind){
                            var gfStart = string.toLowerCase().indexOf(thisGF, ind);
                            var gfEnd = gfStart + thisGF.length - 1;
                            var left = true;
                            var right = true;

                            if (gfStart == 0){}
                            else {
                                try {
                                if (isLetter(string[gfStart - 1])){left = false}
                                }
                                catch{left = false}
                            }

                            if (gfEnd == (string.length - 1)){}
                            else if (isLetter(string[gfEnd + 1])){right = false}
                            else if (string.toLowerCase().slice((gfEnd + 1), (gfEnd + 6)) == ".ptcp"){
                                right = false
                            }

                            if (left == false || right == false){
                                if (ind < string.length){find(ind + 1)}
                            }
                            else {
                                var indList = [];
                                var inner = [gfStart, gfEnd];
                                indList.push(thisGF);
                                indList.push(inner);
                                detected.push(indList)
                            }
                            
                        }
                        find(0)

                    }
                }
                var parts = []

                if (detected.length > 0){
                    detected.sort(function(a, b){return a[1][0] - b[1][0]})

                    function divide(ind, gfunc){
                        var thisGF = detected[gfunc][0];
                        var gfStart = detected[gfunc][1][0];
                        var gfEnd = detected[gfunc][1][1];

                        var part = string.slice(ind, gfStart);
                        parts.push(part);
                        if (thisGF == "gf"){
                            if (capsBox.value == "Grammatical functions"){
                                parts.push("$\\widehat{\\textsc{" +
                                thisGF + "}}$")
                            }
                            else{
                                parts.push("$\\widehat{\\text{" +
                                string.slice(gfStart, (gfEnd + 1)) + "}}$")
                            }
                        }
                        else if ((thisGF.slice(0, 3) == "obl" ||
                        thisGF.slice(0, 3) == "obj" ||
                        thisGF.slice(0, 3) == "adj") && thisGF.length > 3){
                            if (capsBox.value == "Grammatical functions"){
                                parts.push("\\textsc{");
                                parts.push(thisGF.slice(0, 3));                                
                                parts.push("\\textsubscript{");
                                if (thisGF.slice(3) == "theta"){
                                    parts.push("$\\theta$}}")
                                }
                                else{
                                    parts.push(thisGF.slice(3) + "}}");
                                }

                            }
                            else {
                                parts.push(string.slice(gfStart, (gfStart + 3)));
                                parts.push("\\textsubscript{" + 
                                string.slice((gfStart + 3), (gfEnd + 1)) + "}")
                            }
                        }
                        else {
                            if (capsBox.value == "Grammatical functions"){
                                parts.push("\\textsc{" + thisGF + "}")
                            }
                            else {parts.push(string.slice(gfStart, (gfEnd + 1)))}
                        }

                        if (gfunc == (detected.length - 1)){
                            part = string.slice((gfEnd + 1))
                            parts.push(part)
                        }
                        else{
                            divide((gfEnd + 1), (gfunc + 1))
                        }
                        
                    }
                    
                    divide(0, 0);

                    var newstring = "";
                    for (part in parts){
                        newstring += parts[part]
                    }
                    output[0] = newstring
                }
                else {output[0] = string}

            }

            special(lst[string])
            
            out.push(output[0])
        }
    }

    parse(mainArray, content)
    printList(content)
    fixer(contentList, fixedList)

    for (item in fixedList){
        
        if (fixedList[item] == "\\vspace{1.5mm}" && fixedList[item - 1] == "\\vspace{1.5mm}"){
            // console.log(fixedList[item])
            fixedList.splice(item, 1)
        }
    }

    if (fontBox.value != "Times"){
        fixedList.unshift(helvet1[0])
        fixedList.push(helvet2[0])
        // console.log(fixedList)
    }

    finalConcat(outputArray1,
        typeface,
        outputArray2,
        paperwidth,
        outputArray3,
        fixedList,
        outputArray4
        )
        
};

function isLetter(char){
    return char.toLowerCase() != char.toUpperCase()
}

// GUI stuff

// curlyList is called when the user presses the { } button. The
// structure of curly bracket matrices differs from that of square
// brackets in that curly brackets represent a set, and can therefore
// contain any number of vertically stacked sets of square brackets.
function curlyList(name, thisArray, thisDiv, indent) {
    indentArray.push(indent)
    thisArray[0] = "curly";
    innerArray = [0]
    if (thisArray.length == 1){
        var newTable = document.createElement("table");
        thisDiv.appendChild(newTable);
        thisDiv = newTable;
        var cell0 = document.createElement("td");
        thisDiv.appendChild(cell0)
        
    };

    var cellAdd = document.createElement("td");
    var addButton = document.createElement("button");
    addButton.innerText = "Add";
    addButton.setAttribute('class', 'add')
    addButton.onclick = function(){
        for (func in funcArray){
            funcArray[func]()
        }
        innerArray[0] += 1
        var embedArray = [""];
        thisArray[innerArray[0]] = embedArray;
        var embedDiv = document.createElement("div");
        cellAdd.appendChild(embedDiv);
        activList(0, embedArray, embedDiv, indent)
        var newRow = document.createElement("tr");
        newRow.appendChild(addButton);
        thisDiv.appendChild(newRow);
    }
    cellAdd.appendChild(addButton);
    thisDiv.appendChild(cellAdd);

    if (thisArray.length == 1){
        var cell2 = document.createElement("td");
        thisDiv.appendChild(cell2)
    };
    
    function relocate(){
        if (funcArray.includes(relocate) == false){
            funcArray.push(relocate)
        }
        for (x in thisDiv.children[0].children){
            if (typeof thisDiv.children[0].children[x] == "object"){
                thisDiv.children[0].children[x].style.display = "none"
            }
        }
        for (x in thisDiv.children[2].children){
            if (typeof thisDiv.children[2].children[x] == "object"){
                thisDiv.children[2].children[x].style.display = "none"
            }
        }
    
        var result = 0;
        function runThrough(lst) {
            for (x in lst){
                // if (lst[x] == "square"){result += 1}
                if (typeof lst[x] == "string"){
                    result += 1
                }
                else{
                    runThrough(lst[x])
                }
            }
        }
        result += 2    
        runThrough(thisArray);
        var width = 8
        var scalar = result - 2
        var size = 8*(scalar-1)

        var curlyLeft = document.createElement('canvas')
        curlyLeft.setAttribute('width', 2*width)
        curlyLeft.setAttribute('height', (4*width + 2*size))
        var ctx = curlyLeft.getContext("2d");
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.arc(2*width,width,width,1.5*Math.PI,1*Math.PI, true);
        ctx.lineTo(width,(width + size));
        ctx.arc(0, (width + size), width, 0*Math.PI, 0.5*Math.PI, false);
        ctx.arc(0, (3*width + size), width, 1.5*Math.PI, 0*Math.PI, false)
        ctx.lineTo(width, (3 * width + 2 * size))
        ctx.arc(2*width, (3 * width + 2 * size), width, 1*Math.PI, 0.5*Math.PI, true)
        ctx.stroke()
        thisDiv.children[0].rowSpan = (result * 3);
        thisDiv.children[0].appendChild(curlyLeft)
        
        var curlyRight = document.createElement('canvas')
        curlyRight.setAttribute('width', 2*width)
        curlyRight.setAttribute('height', (4*width + 2*size))
        var ctx = curlyRight.getContext("2d")
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.arc(0 ,width,width,0.5*Math.PI,0*Math.PI, false);
        ctx.lineTo(width,(width + size));
        ctx.arc(2*width, (width + size), width, 1*Math.PI, 0.5*Math.PI, true);
        ctx.arc(2*width, (3*width + size), width, 1.5*Math.PI, 1*Math.PI, true)
        ctx.lineTo(width, (3 * width + 2 * size))
        ctx.arc(0, (3 * width + 2 * size), width, 0*Math.PI, 0.5*Math.PI, false)
        ctx.stroke()
        thisDiv.children[2].rowSpan = (result + 25);
        thisDiv.children[2].appendChild(curlyRight)
        
    }
    relocate()
}

// squareList is called to begin with, and when the user presses the
// [ ] button. Both types of bracket are built visually with the HTML
// canvas element.
function activList(name, thisArray, thisDiv, indent) {
    indentArray.push(indent);
    thisArray[0] = "square";
    var subArray = ["",""];
    thisArray.push(subArray);
    if (thisArray.length == 2) {
        var newDiv = document.createElement("table");
        thisDiv.appendChild(newDiv);
        thisDiv = newDiv;
        var cell0 = document.createElement("td");
        thisDiv.appendChild(cell0)
    };
    
    var cell1 = document.createElement("td");
    var input1 = document.createElement("input")
    input1.setAttribute('type', 'text')
    input1.setAttribute('class', 'att')
    thisArray[name + 1] = ""
    subArray[0] = ""
    thisArray[name + 1] = subArray
    input1.onkeyup = function(){
        subArray[0] = input1.value
        thisArray[name + 1] = subArray
    };
    cell1.appendChild(input1)
    thisDiv.appendChild(cell1)

    var cell2 = document.createElement("td");
    var squareButton = document.createElement("button");
    squareButton.innerText = "[ ]";
    squareButton.setAttribute('class', 'embed')
    squareButton.onclick = function(){
        for (func in funcArray){
            funcArray[func]()
        }
        embedSquare()        
    };
    cell2.appendChild(squareButton);
    thisDiv.appendChild(cell2)

    var cell3 = document.createElement("td");
    var curlyButton = document.createElement("button");
    curlyButton.innerText = "{ }";
    curlyButton.setAttribute('class', 'embed');
    curlyButton.onclick = function(){
        for (func in funcArray){
            funcArray[func]()
        }
        embedCurly()
    }
    cell3.appendChild(curlyButton);
    thisDiv.appendChild(cell3)

    var cell4 = document.createElement("td");
    var input2 = document.createElement("input");
    input2.setAttribute('type', 'text')
    input2.setAttribute('class', 'val')
    
    input2.onkeyup = function(){
        subArray[1] = input2.value
        thisArray[name + 1] = subArray
    }
    cell4.appendChild(input2)
    thisDiv.appendChild(cell4)
    function embedSquare(){
        squareButton.style.display = "none";
        curlyButton.style.display = "none";
        input2.style.display = "none";
        var embedDiv = document.createElement("div");
        cell4.appendChild(embedDiv);
        var embedArray = [""];
        subArray[1] = embedArray;
        thisArray[(name + 1)] = subArray;
        activList(0, embedArray, embedDiv, (indent + 1))
    };
    function embedCurly(){
        squareButton.style.display = "none";
        curlyButton.style.display = "none";
        input2.style.display = "none";
        var embedDiv = document.createElement("div");
        cell4.appendChild(embedDiv);
        var embedArray = [""];
        subArray[1] = embedArray;
        thisArray[name + 1] = subArray;
        curlyList(0, embedArray, embedDiv, (indent + 1))
    }

    if (thisArray.length == 2){
        var cell5 = document.createElement("td");
        thisDiv.appendChild(cell5)
    }

    var cellAdd = document.createElement("tr");
    var addButton = document.createElement("button");
    addButton.innerText = "Add";
    addButton.setAttribute('class', 'add')
    addButton.onclick = function(){
        for (func in funcArray){
            funcArray[func]()
        }
        this.style.display = "none"

        activList((name + 1), thisArray, thisDiv, indent)
    };
    cellAdd.appendChild(addButton);
    thisDiv.appendChild(cellAdd)

    function relocate(){
        if (funcArray.includes(relocate) == false){
            funcArray.push(relocate)
        }
        for (x in thisDiv.children[0].children){
            if (typeof thisDiv.children[0].children[x] == "object"){
                thisDiv.children[0].children[x].style.display = "none"
            }
        }
        for (x in thisDiv.children[5].children){
            if (typeof thisDiv.children[5].children[x] == "object"){
                thisDiv.children[5].children[x].style.display = "none"
            }
        }
    
        var result = 0;
        function runThrough(lst) {
            for (x in lst){
                if (typeof lst[x] == "string"){
                    result += 1
                }
                else{
                    runThrough(lst[x])
                }
            }
        }    
        runThrough(thisArray);

        var width = 8
        var scalar = result - 1
        var size = 20*scalar

        var squareLeft = document.createElement('canvas')
        squareLeft.setAttribute('width', width)
        squareLeft.setAttribute('height', size)
        var ctx = squareLeft.getContext("2d")
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(width, 0)
        ctx.lineTo(0,0)
        ctx.lineTo(0, size)
        ctx.lineTo(width, size)
        ctx.stroke()
        thisDiv.children[0].rowSpan = (result + 25);
        thisDiv.children[0].appendChild(squareLeft)
        
        var squareRight = document.createElement('canvas')
        squareRight.setAttribute('width', width)
        squareRight.setAttribute('height', size)
        var ctx = squareRight.getContext("2d")
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(width, 0)
        ctx.lineTo(width, size)
        ctx.lineTo(0, size)
        ctx.stroke()
        thisDiv.children[5].rowSpan = (result + 25);
        thisDiv.children[5].appendChild(squareRight)
        
    }
    relocate()
}

activList(0, mainArray, topDiv, 0)