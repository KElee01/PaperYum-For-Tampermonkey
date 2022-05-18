// ==UserScript==
// @name         PaperYum
// @namespace    http://tampermonkey.net/
// @version      0.1.0.0
// @description  生成知网论文的YAML元数据
// @author       KElee01
// @require      https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js
// @include      *://kns-cnki-net-443.vpn.sicnu.edu.cn/kcms/detail/*
// @include      *://schlr-cnki-net-s.vpn.sicnu.edu.cn/zn/Detail/*
// @grant        none
// @license      MIT License
// ==/UserScript==

(function () {
        'use strict';

        let yamlGenerator = document.createElement("button");
        yamlGenerator.innerText = "YAML生成";
        yamlGenerator.style.background = "rgb(51,110,197)";
        yamlGenerator.style.borderRadius = "3px";
        yamlGenerator.style.color = "rgb(51,51,51)";
        yamlGenerator.style.fontFamily = "Microsoft yahei";
        yamlGenerator.style.fontSize = "12px";
        yamlGenerator.style.padding = "0";
        yamlGenerator.style.width = "66px";
        yamlGenerator.style.marginLeft = "14px";
        yamlGenerator.style.verticalAlign = "top";
        yamlGenerator.style.listStylePosition = "outside";

        let popWindow = document.createElement("div");
        popWindow.innerHTML = "<div class='pop-window' style='\n" +
            "        display: flex;\n" +
            "        position: absolute;\n" +
            "        z-index: 100;\n" +
            "        background: rgb(255,255,255);\n" +
            "        border: rgb(200,200,200)'>\n" +
            "        <span class=\"label\">\n" +
            "            <div style='padding= 0.3em' id=\"title-label\">标题</div>\n" +
            "            <div style='padding: 0.3em' id=\"author-label\">作者</div>\n" +
            "            <div style='padding: 0.3em' id=\"org-label\">机构</div>\n" +
            "            <div style='padding: 0.3em' id=\"keywords-label\">关键词</div>\n" +
            "            <div style='padding: 0.3em' id=\"doi-label\">DOI</div>\n" +
            "            <div style='padding: 0.3em'  id=\"subject-label\">专题</div>\n" +
            "            <div style='padding: 0.3em' id=\"year-label\">出版年份</div>\n" +
            "            <div style='padding: 0.3em' id=\"url-label\">网址</div>\n" +
            "        </span>\n" +
            "        <span class=\"input\">\n" +
            "            <div><input style='padding: 0.1em' id=\"title-input\" placeholder=\"1\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"author-input\" placeholder=\"2\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"org-input\" placeholder=\"3\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"keywords-input\" placeholder=\"4\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"doi-input\" placeholder=\"5\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"subject-input\" placeholder=\"6\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"year-input\" placeholder=\"7\"></div>\n" +
            "            <div><input style='padding: 0.1em' id=\"url-input\" placeholder=\"8\"></div>\n" +
            "        </span>\n" +
            "    </div>\n" +
            "    <div>\n" +
            "        <button style='position:absolute; z-index:12; transform: translate(250%, 1250%)' id=\"summit\">提交(9)</button>\n" +
            "    </div>"

        document.getElementById("summit").onclick = infoHandler;

        function infoHandler() {
            let metadata_dict;
            metadata_dict['title'] = document.getElementById("title-input").value;
            metadata_dict['author'] = document.getElementById("author-input").value;
            metadata_dict['org'] = document.getElementById("org-input").value;
            metadata_dict['keyword'] = document.getElementById("keywords-input").value;
            metadata_dict['doi'] = document.getElementById("doi-input").value;
            metadata_dict['topic'] = document.getElementById("subject-input").value;
            metadata_dict['year'] = document.getElementById("year-input").value;
            metadata_dict['url'] = document.getElementById("url-input").value;

        }

        yamlGenerator.onclick = function () {
            let wrapper = document.getElementsByClassName("wrapper")[0];
            wrapper.parentElement.insertBefore(popWindow, wrapper);
        }

        document.addEventListener('keypress', (e) => {
            if (e.code === "Digit1") {
                document.getElementById("title-input").value = selectText();
            }
            if (e.code === "Digit2") {
                document.getElementById("author-input").value = selectText();
            }
            if (e.code === "Digit3") {
                document.getElementById("org-input").value = selectText();
            }
            if (e.code === "Digit4") {
                document.getElementById("keywords-input").value = selectText();
            }
            if (e.code === "Digit5") {
                document.getElementById("doi-input").value = selectText();
            }
            if (e.code === "Digit6") {
                document.getElementById("subject-input").value = selectText();
            }
            if (e.code === "Digit7") {
                document.getElementById("year-input").value = selectText();
            }
            if (e.code === "Digit8") {
                document.getElementById("url-input").value = selectText();
            }
            if (e.code === "Digit9") {
                document.getElementById("summit").click();
            }
        })



        function selectText() {
            let selected = window.getSelection().toString();
            if (selected != null && selected.trim() !== "") {
                return selected;
            }
        }

//替换文本前与后的空格
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }

        let bell = document.getElementById("RefTrack");
        bell.parentElement.insertBefore(yamlGenerator, bell);
    }

)
();
