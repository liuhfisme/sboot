/*
 Highcharts JS v5.0.3 (2016-11-18)
 Exporting module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(n) {
    "object" === typeof module && module.exports ? module.exports = n: n(Highcharts)
})(function(n) { (function(f) {
        var n = f.defaultOptions,
        p = f.doc,
        A = f.Chart,
        v = f.addEvent,
        F = f.removeEvent,
        D = f.fireEvent,
        r = f.createElement,
        B = f.discardElement,
        w = f.css,
        q = f.merge,
        C = f.pick,
        h = f.each,
        u = f.extend,
        G = f.splat,
        H = f.isTouchDevice,
        E = f.win,
        I = f.Renderer.prototype.symbols;
        u(n.lang, {
            printChart: "Print chart",
            downloadPNG: "Download PNG image",
            downloadJPEG: "Download JPEG image",
            downloadPDF: "Download PDF document",
            downloadSVG: "Download SVG vector image",
            contextButtonTitle: "Chart context menu"
        });
        n.navigation = {
            buttonOptions: {
                theme: {},
                symbolSize: 14,
                symbolX: 12.5,
                symbolY: 10.5,
                align: "right",
                buttonSpacing: 3,
                height: 22,
                verticalAlign: "top",
                width: 24
            }
        };
        q(!0, n.navigation, {
            menuStyle: {
                border: "1px solid #999999",
                background: "#ffffff",
                padding: "5px 0"
            },
            menuItemStyle: {
                padding: "0.5em 1em",
                background: "none",
                color: "#333333",
                fontSize: H ? "14px": "11px",
                transition: "background 250ms, color 250ms"
            },
            menuItemHoverStyle: {
                background: "#335cad",
                color: "#ffffff"
            },
            buttonOptions: {
                symbolFill: "#666666",
                symbolStroke: "#666666",
                symbolStrokeWidth: 3,
                theme: {
                    fill: "#ffffff",
                    stroke: "none",
                    padding: 5
                }
            }
        });
        n.exporting = {
            type: "image/png",
            url: "https://export.highcharts.com/",
            printMaxWidth: 780,
            scale: 2,
            buttons: {
                contextButton: {
                    className: "highcharts-contextbutton",
                    menuClassName: "highcharts-contextmenu",
                    symbol: "menu",
                    _titleKey: "contextButtonTitle",
                    menuItems: [{
                        textKey: "printChart",
                        onclick: function() {
                            this.print()
                        }
                    },
                    {
                        separator: !0
                    },
                    {
                        textKey: "downloadPNG",
                        onclick: function() {
                            this.exportChart()
                        }
                    },
                    {
                        textKey: "downloadJPEG",
                        onclick: function() {
                            this.exportChart({
                                type: "image/jpeg"
                            })
                        }
                    },
                    {
                        textKey: "downloadPDF",
                        onclick: function() {
                            this.exportChart({
                                type: "application/pdf"
                            })
                        }
                    },
                    {
                        textKey: "downloadSVG",
                        onclick: function() {
                            this.exportChart({
                                type: "image/svg+xml"
                            })
                        }
                    }]
                }
            }
        };
        f.post = function(a, b, e) {
            var c;
            a = r("form", q({
                method: "post",
                action: a,
                enctype: "multipart/form-data"
            },
            e), {
                display: "none"
            },
            p.body);
            for (c in b) r("input", {
                type: "hidden",
                name: c,
                value: b[c]
            },
            null, a);
            a.submit();
            B(a)
        };
        u(A.prototype, {
            sanitizeSVG: function(a) {
                a = a.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g, " xlink:href\x3d").replace(/\n/, " ").replace(/<\/svg>.*?$/, "\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g, "\u00a0").replace(/&shy;/g, "\u00ad");
                return a = a.replace(/<IMG /g, "\x3cimage ").replace(/<(\/?)TITLE>/g, "\x3c$1title\x3e").replace(/height=([^" ]+)/g, 'height\x3d"$1"').replace(/width=([^" ]+)/g, 'width\x3d"$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href\x3d"$1"/\x3e').replace(/ id=([^" >]+)/g, ' id\x3d"$1"').replace(/class=([^" >]+)/g, 'class\x3d"$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g,
                function(a) {
                    return a.toLowerCase()
                })
            },
            getChartHTML: function() {
                return this.container.innerHTML
            },
            getSVG: function(a) {
                var b = this,
                e, c, l, t, k, d, g = q(b.options, a),
                y = g.exporting.allowHTML;
                p.createElementNS || (p.createElementNS = function(a, b) {
                    return p.createElement(b)
                });
                c = r("div", null, {
                    position: "absolute",
                    top: "-9999em",
                    width: b.chartWidth + "px",
                    height: b.chartHeight + "px"
                },
                p.body);
                k = b.renderTo.style.width;
                l = b.renderTo.style.height;
                k = g.exporting.sourceWidth || g.chart.width || /px$/.test(k) && parseInt(k, 10) || 600;
                d = g.exporting.sourceHeight || g.chart.height || /px$/.test(l) && parseInt(l, 10) || 400;
                u(g.chart, {
                    animation: !1,
                    renderTo: c,
                    forExport: !0,
                    renderer: "SVGRenderer",
                    width: k,
                    height: d
                });
                g.exporting.enabled = !1;
                delete g.data;
                g.series = [];
                h(b.series,
                function(a) {
                    t = q(a.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: a.visible
                    });
                    t.isInternal || g.series.push(t)
                });
                a && h(["xAxis", "yAxis"],
                function(b) {
                    h(G(a[b]),
                    function(a, c) {
                        g[b][c] = q(g[b][c], a)
                    })
                });
                e = new f.Chart(g, b.callback);
                h(["xAxis", "yAxis"],
                function(a) {
                    h(b[a],
                    function(b, c) {
                        c = e[a][c];
                        var d = b.getExtremes();
                        b = d.userMin;
                        d = d.userMax; ! c || void 0 === b && void 0 === d || c.setExtremes(b, d, !0, !1)
                    })
                });
                l = e.getChartHTML();
                g = null;
                e.destroy();
                B(c);
                y && (c = l.match(/<\/svg>(.*?$)/)) && (c = '\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"' + k + '" height\x3d"' + d + '"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e' + c[1] + "\x3c/body\x3e\x3c/foreignObject\x3e", l = l.replace("\x3c/svg\x3e", c + "\x3c/svg\x3e"));
                l = this.sanitizeSVG(l);
                return l = l.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'")
            },
            getSVGForExport: function(a, b) {
                var e = this.options.exporting;
                return this.getSVG(q({
                    chart: {
                        borderRadius: 0
                    }
                },
                e.chartOptions, b, {
                    exporting: {
                        sourceWidth: a && a.sourceWidth || e.sourceWidth,
                        sourceHeight: a && a.sourceHeight || e.sourceHeight
                    }
                }))
            },
            exportChart: function(a, b) {
                b = this.getSVGForExport(a, b);
                a = q(this.options.exporting, a);
                f.post(a.url, {
                    filename: a.filename || "chart",
                    type: a.type,
                    width: a.width || 0,
                    scale: a.scale,
                    svg: b
                },
                a.formAttributes)
            },
            print: function() {
                var a = this,
                b = a.container,
                e = [],
                c = b.parentNode,
                l = p.body,
                f = l.childNodes,
                k = a.options.exporting.printMaxWidth,
                d,
                g;
                if (!a.isPrinting) {
                    a.isPrinting = !0;
                    a.pointer.reset(null, 0);
                    D(a, "beforePrint");
                    if (g = k && a.chartWidth > k) d = [a.options.chart.width, void 0, !1],
                    a.setSize(k, void 0, !1);
                    h(f,
                    function(a, b) {
                        1 === a.nodeType && (e[b] = a.style.display, a.style.display = "none")
                    });
                    l.appendChild(b);
                    E.focus();
                    E.print();
                    setTimeout(function() {
                        c.appendChild(b);
                        h(f,
                        function(a, b) {
                            1 === a.nodeType && (a.style.display = e[b])
                        });
                        a.isPrinting = !1;
                        g && a.setSize.apply(a, d);
                        D(a, "afterPrint")
                    },
                    1E3)
                }
            },
            contextMenu: function(a, b, e, c, l, f, k) {
                var d = this,
                g = d.options.navigation,
                y = d.chartWidth,
                n = d.chartHeight,
                q = "cache-" + a,
                m = d[q],
                x = Math.max(l, f),
                t,
                z;
                m || (d[q] = m = r("div", {
                    className: a
                },
                {
                    position: "absolute",
                    zIndex: 1E3,
                    padding: x + "px"
                },
                d.container), t = r("div", {
                    className: "highcharts-menu"
                },
                null, m), w(t, u({
                    MozBoxShadow: "3px 3px 10px #888",
                    WebkitBoxShadow: "3px 3px 10px #888",
                    boxShadow: "3px 3px 10px #888"
                },
                g.menuStyle)), z = function() {
                    w(m, {
                        display: "none"
                    });
                    k && k.setState(0);
                    d.openMenu = !1
                },
                v(m, "mouseleave",
                function() {
                    m.hideTimer = setTimeout(z, 500)
                }), v(m, "mouseenter",
                function() {
                    clearTimeout(m.hideTimer)
                }), q = v(p, "mouseup",
                function(b) {
                    d.pointer.inClass(b.target, a) || z()
                }), v(d, "destroy", q), h(b,
                function(a) {
                    if (a) {
                        var b;
                        a.separator ? b = r("hr", null, null, t) : (b = r("div", {
                            className: "highcharts-menu-item",
                            onclick: function(b) {
                                b && b.stopPropagation();
                                z();
                                a.onclick && a.onclick.apply(d, arguments)
                            },
                            innerHTML: a.text || d.options.lang[a.textKey]
                        },
                        null, t), b.onmouseover = function() {
                            w(this, g.menuItemHoverStyle)
                        },
                        b.onmouseout = function() {
                            w(this, g.menuItemStyle)
                        },
                        w(b, u({
                            cursor: "pointer"
                        },
                        g.menuItemStyle)));
                        d.exportDivElements.push(b)
                    }
                }), d.exportDivElements.push(t, m), d.exportMenuWidth = m.offsetWidth, d.exportMenuHeight = m.offsetHeight);
                b = {
                    display: "block"
                };
                e + d.exportMenuWidth > y ? b.right = y - e - l - x + "px": b.left = e - x + "px";
                c + f + d.exportMenuHeight > n && "top" !== k.alignOptions.verticalAlign ? b.bottom = n - c - x + "px": b.top = c + f - x + "px";
                w(m, b);
                d.openMenu = !0
            },
            addButton: function(a) {
                var b = this,
                e = b.renderer,
                c = q(b.options.navigation.buttonOptions, a),
                f = c.onclick,
                n = c.menuItems,
                k,
                d,
                g = c.symbolSize || 12;
                b.btnCount || (b.btnCount = 0);
                b.exportDivElements || (b.exportDivElements = [], b.exportSVGElements = []);
                if (!1 !== c.enabled) {
                    var h = c.theme,
                    p = h.states,
                    r = p && p.hover,
                    p = p && p.select,
                    m;
                    delete h.states;
                    f ? m = function(a) {
                        a.stopPropagation();
                        f.call(b, a)
                    }: n && (m = function() {
                        b.contextMenu(d.menuClassName, n, d.translateX, d.translateY, d.width, d.height, d);
                        d.setState(2)
                    });
                    c.text && c.symbol ? h.paddingLeft = C(h.paddingLeft, 25) : c.text || u(h, {
                        width: c.width,
                        height: c.height,
                        padding: 0
                    });
                    d = e.button(c.text, 0, 0, m, h, r, p).addClass(a.className).attr({
                        "stroke-linecap": "round",
                        title: b.options.lang[c._titleKey],
                        zIndex: 3
                    });
                    d.menuClassName = a.menuClassName || "highcharts-menu-" + b.btnCount++;
                    c.symbol && (k = e.symbol(c.symbol, c.symbolX - g / 2, c.symbolY - g / 2, g, g).addClass("highcharts-button-symbol").attr({
                        zIndex: 1
                    }).add(d), k.attr({
                        stroke: c.symbolStroke,
                        fill: c.symbolFill,
                        "stroke-width": c.symbolStrokeWidth || 1
                    }));
                    d.add().align(u(c, {
                        width: d.width,
                        x: C(c.x, b.buttonOffset)
                    }), !0, "spacingBox");
                    b.buttonOffset += (d.width + c.buttonSpacing) * ("right" === c.align ? -1 : 1);
                    b.exportSVGElements.push(d, k)
                }
            },
            destroyExport: function(a) {
                var b = a ? a.target: this;
                a = b.exportSVGElements;
                var e = b.exportDivElements;
                a && (h(a,
                function(a, e) {
                    a && (a.onclick = a.ontouchstart = null, b.exportSVGElements[e] = a.destroy())
                }), a.length = 0);
                e && (h(e,
                function(a, e) {
                    clearTimeout(a.hideTimer);
                    F(a, "mouseleave");
                    b.exportDivElements[e] = a.onmouseout = a.onmouseover = a.ontouchstart = a.onclick = null;
                    B(a)
                }), e.length = 0)
            }
        });
        I.menu = function(a, b, e, c) {
            return ["M", a, b + 2.5, "L", a + e, b + 2.5, "M", a, b + c / 2 + .5, "L", a + e, b + c / 2 + .5, "M", a, b + c - 1.5, "L", a + e, b + c - 1.5]
        };
        A.prototype.renderExporting = function() {
            var a, b = this.options.exporting,
            e = b.buttons,
            c = this.isDirtyExporting || !this.exportSVGElements;
            this.buttonOffset = 0;
            this.isDirtyExporting && this.destroyExport();
            if (c && !1 !== b.enabled) {
                for (a in e) this.addButton(e[a]);
                this.isDirtyExporting = !1
            }
            v(this, "destroy", this.destroyExport)
        };
        A.prototype.callbacks.push(function(a) {
            a.renderExporting();
            v(a, "redraw", a.renderExporting);
            h(["exporting", "navigation"],
            function(b) {
                a[b] = {
                    update: function(e, c) {
                        a.isDirtyExporting = !0;
                        q(!0, a.options[b], e);
                        C(c, !0) && a.redraw()
                    }
                }
            })
        })
    })(n)
});