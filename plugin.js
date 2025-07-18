// ==UserScript==
// @name         MOOC-SPOC-Answer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动回答MOOC中SPOC系列的问题，并选择正确答案
// @author       Orange
// @match        https://www.icourse163.org/spoc/learn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var ct = Object.defineProperty;
    var lt = (e, t, n) => t in e ? ct(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n;
    var B = (e, t, n) => (lt(e, typeof t != "symbol" ? t + "" : t, n),
        n);
    (function () {
        const t = document.createElement("link").relList;
        if (t && t.supports && t.supports("modulepreload"))
            return;
        for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
            r(s);
        new MutationObserver(s => {
            for (const o of s)
                if (o.type === "childList")
                    for (const i of o.addedNodes)
                        i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
        }
        ).observe(document, {
            childList: !0,
            subtree: !0
        });
        function n(s) {
            const o = {};
            return s.integrity && (o.integrity = s.integrity),
                s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
                s.crossOrigin === "use-credentials" ? o.credentials = "include" : s.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
                o
        }
        function r(s) {
            if (s.ep)
                return;
            s.ep = !0;
            const o = n(s);
            fetch(s.href, o)
        }
    }
    )();
    const Fe = async e => new Promise(t => {
        setTimeout(() => {
            t("")
        }
            , e)
    }
    )
        , G = e => {
            const t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
                , n = window.location.search.substring(1).match(t) || window.location.hash.substring(window.location.hash.search(/\?/) + 1).match(t);
            return n ? decodeURIComponent(n[2]) : null
        }
        , _e = e => {
            const t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            let n = "";
            for (let r = 0; r < e; r++)
                n += t[Math.floor(Math.random() * t.length)];
            return n
        }
        ;
    class ut extends Array {
        constructor() {
            super();
            B(this, "id");
            B(this, "node");
            this.node = document.createElement("gin"),
                this.id = _e(8),
                this.node.id = `gin-auto-${this.id}`,
                document.body.appendChild(this.node)
        }
        add(n) {
            const r = new dt(this, n);
            return super.push(r),
                r
        }
    }
    class dt {
        constructor(t, n) {
            B(this, "id");
            B(this, "node");
            B(this, "parent");
            B(this, "value");
            this.parent = t,
                this.node = document.createElement("gin"),
                this.id = _e(8),
                this.node.id = this.id,
                this.parent.node.appendChild(this.node),
                this.value = n
        }
        get() {
            return this.value
        }
        set(t) {
            if (this.value !== t) {
                const n = this.value;
                this.value = t,
                    this.node.dispatchEvent(new CustomEvent("change", {
                        detail: {
                            oldValue: n,
                            newValue: this.value
                        }
                    }))
            }
            this.node.dispatchEvent(new CustomEvent("set"))
        }
        addEventListenr(t, n) {
            this.node.addEventListener(t, n)
        }
    }
    function je(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }
    const { toString: ft } = Object.prototype
        , { getPrototypeOf: he } = Object
        , ee = (e => t => {
            const n = ft.call(t);
            return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
        }
        )(Object.create(null))
        , x = e => (e = e.toLowerCase(),
            t => ee(t) === e)
        , te = e => t => typeof t === e
        , { isArray: q } = Array
        , v = te("undefined");
    function pt(e) {
        return e !== null && !v(e) && e.constructor !== null && !v(e.constructor) && S(e.constructor.isBuffer) && e.constructor.isBuffer(e)
    }
    const De = x("ArrayBuffer");
    function ht(e) {
        let t;
        return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && De(e.buffer),
            t
    }
    const mt = te("string")
        , S = te("function")
        , Ue = te("number")
        , ne = e => e !== null && typeof e == "object"
        , yt = e => e === !0 || e === !1
        , V = e => {
            if (ee(e) !== "object")
                return !1;
            const t = he(e);
            return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
        }
        , wt = x("Date")
        , Et = x("File")
        , gt = x("Blob")
        , bt = x("FileList")
        , St = e => ne(e) && S(e.pipe)
        , Ot = e => {
            let t;
            return e && (typeof FormData == "function" && e instanceof FormData || S(e.append) && ((t = ee(e)) === "formdata" || t === "object" && S(e.toString) && e.toString() === "[object FormData]"))
        }
        , xt = x("URLSearchParams")
        , Tt = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    function $(e, t, { allOwnKeys: n = !1 } = {}) {
        if (e === null || typeof e > "u")
            return;
        let r, s;
        if (typeof e != "object" && (e = [e]),
            q(e))
            for (r = 0,
                s = e.length; r < s; r++)
                t.call(null, e[r], r, e);
        else {
            const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e)
                , i = o.length;
            let c;
            for (r = 0; r < i; r++)
                c = o[r],
                    t.call(null, e[c], c, e)
        }
    }
    function qe(e, t) {
        t = t.toLowerCase();
        const n = Object.keys(e);
        let r = n.length, s;
        for (; r-- > 0;)
            if (s = n[r],
                t === s.toLowerCase())
                return s;
        return null
    }
    const Ie = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)()
        , He = e => !v(e) && e !== Ie;
    function le() {
        const { caseless: e } = He(this) && this || {}
            , t = {}
            , n = (r, s) => {
                const o = e && qe(t, s) || s;
                V(t[o]) && V(r) ? t[o] = le(t[o], r) : V(r) ? t[o] = le({}, r) : q(r) ? t[o] = r.slice() : t[o] = r
            }
            ;
        for (let r = 0, s = arguments.length; r < s; r++)
            arguments[r] && $(arguments[r], n);
        return t
    }
    const At = (e, t, n, { allOwnKeys: r } = {}) => ($(t, (s, o) => {
        n && S(s) ? e[o] = je(s, n) : e[o] = s
    }
        , {
            allOwnKeys: r
        }),
        e)
        , Rt = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)),
            e)
        , Nt = (e, t, n, r) => {
            e.prototype = Object.create(t.prototype, r),
                e.prototype.constructor = e,
                Object.defineProperty(e, "super", {
                    value: t.prototype
                }),
                n && Object.assign(e.prototype, n)
        }
        , Ct = (e, t, n, r) => {
            let s, o, i;
            const c = {};
            if (t = t || {},
                e == null)
                return t;
            do {
                for (s = Object.getOwnPropertyNames(e),
                    o = s.length; o-- > 0;)
                    i = s[o],
                        (!r || r(i, e, t)) && !c[i] && (t[i] = e[i],
                            c[i] = !0);
                e = n !== !1 && he(e)
            } while (e && (!n || n(e, t)) && e !== Object.prototype);
            return t
        }
        , Lt = (e, t, n) => {
            e = String(e),
                (n === void 0 || n > e.length) && (n = e.length),
                n -= t.length;
            const r = e.indexOf(t, n);
            return r !== -1 && r === n
        }
        , Pt = e => {
            if (!e)
                return null;
            if (q(e))
                return e;
            let t = e.length;
            if (!Ue(t))
                return null;
            const n = new Array(t);
            for (; t-- > 0;)
                n[t] = e[t];
            return n
        }
        , Bt = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && he(Uint8Array))
        , kt = (e, t) => {
            const r = (e && e[Symbol.iterator]).call(e);
            let s;
            for (; (s = r.next()) && !s.done;) {
                const o = s.value;
                t.call(e, o[0], o[1])
            }
        }
        , Ft = (e, t) => {
            let n;
            const r = [];
            for (; (n = e.exec(t)) !== null;)
                r.push(n);
            return r
        }
        , _t = x("HTMLFormElement")
        , jt = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
            return r.toUpperCase() + s
        })
        , ge = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype)
        , Dt = x("RegExp")
        , Me = (e, t) => {
            const n = Object.getOwnPropertyDescriptors(e)
                , r = {};
            $(n, (s, o) => {
                let i;
                (i = t(s, o, e)) !== !1 && (r[o] = i || s)
            }
            ),
                Object.defineProperties(e, r)
        }
        , Ut = e => {
            Me(e, (t, n) => {
                if (S(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
                    return !1;
                const r = e[n];
                if (S(r)) {
                    if (t.enumerable = !1,
                        "writable" in t) {
                        t.writable = !1;
                        return
                    }
                    t.set || (t.set = () => {
                        throw Error("Can not rewrite read-only method '" + n + "'")
                    }
                    )
                }
            }
            )
        }
        , qt = (e, t) => {
            const n = {}
                , r = s => {
                    s.forEach(o => {
                        n[o] = !0
                    }
                    )
                }
                ;
            return q(e) ? r(e) : r(String(e).split(t)),
                n
        }
        , It = () => { }
        , Ht = (e, t) => (e = +e,
            Number.isFinite(e) ? e : t)
        , oe = "abcdefghijklmnopqrstuvwxyz"
        , be = "0123456789"
        , ve = {
            DIGIT: be,
            ALPHA: oe,
            ALPHA_DIGIT: oe + oe.toUpperCase() + be
        }
        , Mt = (e = 16, t = ve.ALPHA_DIGIT) => {
            let n = "";
            const { length: r } = t;
            for (; e--;)
                n += t[Math.random() * r | 0];
            return n
        }
        ;
    function vt(e) {
        return !!(e && S(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
    }
    const $t = e => {
        const t = new Array(10)
            , n = (r, s) => {
                if (ne(r)) {
                    if (t.indexOf(r) >= 0)
                        return;
                    if (!("toJSON" in r)) {
                        t[s] = r;
                        const o = q(r) ? [] : {};
                        return $(r, (i, c) => {
                            const d = n(i, s + 1);
                            !v(d) && (o[c] = d)
                        }
                        ),
                            t[s] = void 0,
                            o
                    }
                }
                return r
            }
            ;
        return n(e, 0)
    }
        , zt = x("AsyncFunction")
        , Jt = e => e && (ne(e) || S(e)) && S(e.then) && S(e.catch)
        , a = {
            isArray: q,
            isArrayBuffer: De,
            isBuffer: pt,
            isFormData: Ot,
            isArrayBufferView: ht,
            isString: mt,
            isNumber: Ue,
            isBoolean: yt,
            isObject: ne,
            isPlainObject: V,
            isUndefined: v,
            isDate: wt,
            isFile: Et,
            isBlob: gt,
            isRegExp: Dt,
            isFunction: S,
            isStream: St,
            isURLSearchParams: xt,
            isTypedArray: Bt,
            isFileList: bt,
            forEach: $,
            merge: le,
            extend: At,
            trim: Tt,
            stripBOM: Rt,
            inherits: Nt,
            toFlatObject: Ct,
            kindOf: ee,
            kindOfTest: x,
            endsWith: Lt,
            toArray: Pt,
            forEachEntry: kt,
            matchAll: Ft,
            isHTMLForm: _t,
            hasOwnProperty: ge,
            hasOwnProp: ge,
            reduceDescriptors: Me,
            freezeMethods: Ut,
            toObjectSet: qt,
            toCamelCase: jt,
            noop: It,
            toFiniteNumber: Ht,
            findKey: qe,
            global: Ie,
            isContextDefined: He,
            ALPHABET: ve,
            generateString: Mt,
            isSpecCompliantForm: vt,
            toJSONObject: $t,
            isAsyncFn: zt,
            isThenable: Jt
        };
    function m(e, t, n, r, s) {
        Error.call(this),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack,
            this.message = e,
            this.name = "AxiosError",
            t && (this.code = t),
            n && (this.config = n),
            r && (this.request = r),
            s && (this.response = s)
    }
    a.inherits(m, Error, {
        toJSON: function () {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: a.toJSONObject(this.config),
                code: this.code,
                status: this.response && this.response.status ? this.response.status : null
            }
        }
    });
    const $e = m.prototype
        , ze = {};
    ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
        ze[e] = {
            value: e
        }
    }
    );
    Object.defineProperties(m, ze);
    Object.defineProperty($e, "isAxiosError", {
        value: !0
    });
    m.from = (e, t, n, r, s, o) => {
        const i = Object.create($e);
        return a.toFlatObject(e, i, function (d) {
            return d !== Error.prototype
        }, c => c !== "isAxiosError"),
            m.call(i, e.message, t, n, r, s),
            i.cause = e,
            i.name = e.name,
            o && Object.assign(i, o),
            i
    }
        ;
    const Vt = null;
    function ue(e) {
        return a.isPlainObject(e) || a.isArray(e)
    }
    function Je(e) {
        return a.endsWith(e, "[]") ? e.slice(0, -2) : e
    }
    function Se(e, t, n) {
        return e ? e.concat(t).map(function (s, o) {
            return s = Je(s),
                !n && o ? "[" + s + "]" : s
        }).join(n ? "." : "") : t
    }
    function Kt(e) {
        return a.isArray(e) && !e.some(ue)
    }
    const Wt = a.toFlatObject(a, {}, null, function (t) {
        return /^is[A-Z]/.test(t)
    });
    function re(e, t, n) {
        if (!a.isObject(e))
            throw new TypeError("target must be an object");
        t = t || new FormData,
            n = a.toFlatObject(n, {
                metaTokens: !0,
                dots: !1,
                indexes: !1
            }, !1, function (h, E) {
                return !a.isUndefined(E[h])
            });
        const r = n.metaTokens
            , s = n.visitor || u
            , o = n.dots
            , i = n.indexes
            , d = (n.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(t);
        if (!a.isFunction(s))
            throw new TypeError("visitor must be a function");
        function f(p) {
            if (p === null)
                return "";
            if (a.isDate(p))
                return p.toISOString();
            if (!d && a.isBlob(p))
                throw new m("Blob is not supported. Use a Buffer instead.");
            return a.isArrayBuffer(p) || a.isTypedArray(p) ? d && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p
        }
        function u(p, h, E) {
            let g = p;
            if (p && !E && typeof p == "object") {
                if (a.endsWith(h, "{}"))
                    h = r ? h : h.slice(0, -2),
                        p = JSON.stringify(p);
                else if (a.isArray(p) && Kt(p) || (a.isFileList(p) || a.endsWith(h, "[]")) && (g = a.toArray(p)))
                    return h = Je(h),
                        g.forEach(function (C, at) {
                            !(a.isUndefined(C) || C === null) && t.append(i === !0 ? Se([h], at, o) : i === null ? h : h + "[]", f(C))
                        }),
                        !1
            }
            return ue(p) ? !0 : (t.append(Se(E, h, o), f(p)),
                !1)
        }
        const l = []
            , w = Object.assign(Wt, {
                defaultVisitor: u,
                convertValue: f,
                isVisitable: ue
            });
        function b(p, h) {
            if (!a.isUndefined(p)) {
                if (l.indexOf(p) !== -1)
                    throw Error("Circular reference detected in " + h.join("."));
                l.push(p),
                    a.forEach(p, function (g, N) {
                        (!(a.isUndefined(g) || g === null) && s.call(t, g, a.isString(N) ? N.trim() : N, h, w)) === !0 && b(g, h ? h.concat(N) : [N])
                    }),
                    l.pop()
            }
        }
        if (!a.isObject(e))
            throw new TypeError("data must be an object");
        return b(e),
            t
    }
    function Oe(e) {
        const t = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0"
        };
        return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
            return t[r]
        })
    }
    function me(e, t) {
        this._pairs = [],
            e && re(e, this, t)
    }
    const Ve = me.prototype;
    Ve.append = function (t, n) {
        this._pairs.push([t, n])
    }
        ;
    Ve.toString = function (t) {
        const n = t ? function (r) {
            return t.call(this, r, Oe)
        }
            : Oe;
        return this._pairs.map(function (s) {
            return n(s[0]) + "=" + n(s[1])
        }, "").join("&")
    }
        ;
    function Gt(e) {
        return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    function Ke(e, t, n) {
        if (!t)
            return e;
        const r = n && n.encode || Gt
            , s = n && n.serialize;
        let o;
        if (s ? o = s(t, n) : o = a.isURLSearchParams(t) ? t.toString() : new me(t, n).toString(r),
            o) {
            const i = e.indexOf("#");
            i !== -1 && (e = e.slice(0, i)),
                e += (e.indexOf("?") === -1 ? "?" : "&") + o
        }
        return e
    }
    class Qt {
        constructor() {
            this.handlers = []
        }
        use(t, n, r) {
            return this.handlers.push({
                fulfilled: t,
                rejected: n,
                synchronous: r ? r.synchronous : !1,
                runWhen: r ? r.runWhen : null
            }),
                this.handlers.length - 1
        }
        eject(t) {
            this.handlers[t] && (this.handlers[t] = null)
        }
        clear() {
            this.handlers && (this.handlers = [])
        }
        forEach(t) {
            a.forEach(this.handlers, function (r) {
                r !== null && t(r)
            })
        }
    }
    const xe = Qt
        , We = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1
        }
        , Xt = typeof URLSearchParams < "u" ? URLSearchParams : me
        , Yt = typeof FormData < "u" ? FormData : null
        , Zt = typeof Blob < "u" ? Blob : null
        , en = {
            isBrowser: !0,
            classes: {
                URLSearchParams: Xt,
                FormData: Yt,
                Blob: Zt
            },
            protocols: ["http", "https", "file", "blob", "url", "data"]
        }
        , Ge = typeof window < "u" && typeof document < "u"
        , tn = (e => Ge && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product)
        , nn = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")()
        , rn = (e => Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        })))
        , O = {
            ...rn,
            ...en
        };
    function sn(e, t) {
        return re(e, new O.classes.URLSearchParams, Object.assign({
            visitor: function (n, r, s, o) {
                return O.isNode && a.isBuffer(n) ? (this.append(r, n.toString("base64")),
                    !1) : o.defaultVisitor.apply(this, arguments)
            }
        }, t))
    }
    function on(e) {
        return a.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
    }
    function an(e) {
        const t = {}
            , n = Object.keys(e);
        let r;
        const s = n.length;
        let o;
        for (r = 0; r < s; r++)
            o = n[r],
                t[o] = e[o];
        return t
    }
    function Qe(e) {
        function t(n, r, s, o) {
            let i = n[o++];
            if (i === "__proto__")
                return !0;
            const c = Number.isFinite(+i)
                , d = o >= n.length;
            return i = !i && a.isArray(s) ? s.length : i,
                d ? (a.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r,
                    !c) : ((!s[i] || !a.isObject(s[i])) && (s[i] = []),
                        t(n, r, s[i], o) && a.isArray(s[i]) && (s[i] = an(s[i])),
                        !c)
        }
        if (a.isFormData(e) && a.isFunction(e.entries)) {
            const n = {};
            return a.forEachEntry(e, (r, s) => {
                t(on(r), s, n, 0)
            }
            ),
                n
        }
        return null
    }
    function cn(e, t, n) {
        if (a.isString(e))
            try {
                return (t || JSON.parse)(e),
                    a.trim(e)
            } catch (r) {
                if (r.name !== "SyntaxError")
                    throw r
            }
        return (n || JSON.stringify)(e)
    }
    const ye = {
        transitional: We,
        adapter: ["xhr", "http"],
        transformRequest: [function (t, n) {
            const r = n.getContentType() || ""
                , s = r.indexOf("application/json") > -1
                , o = a.isObject(t);
            if (o && a.isHTMLForm(t) && (t = new FormData(t)),
                a.isFormData(t))
                return s ? JSON.stringify(Qe(t)) : t;
            if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t))
                return t;
            if (a.isArrayBufferView(t))
                return t.buffer;
            if (a.isURLSearchParams(t))
                return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
                    t.toString();
            let c;
            if (o) {
                if (r.indexOf("application/x-www-form-urlencoded") > -1)
                    return sn(t, this.formSerializer).toString();
                if ((c = a.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                    const d = this.env && this.env.FormData;
                    return re(c ? {
                        "files[]": t
                    } : t, d && new d, this.formSerializer)
                }
            }
            return o || s ? (n.setContentType("application/json", !1),
                cn(t)) : t
        }
        ],
        transformResponse: [function (t) {
            const n = this.transitional || ye.transitional
                , r = n && n.forcedJSONParsing
                , s = this.responseType === "json";
            if (t && a.isString(t) && (r && !this.responseType || s)) {
                const i = !(n && n.silentJSONParsing) && s;
                try {
                    return JSON.parse(t)
                } catch (c) {
                    if (i)
                        throw c.name === "SyntaxError" ? m.from(c, m.ERR_BAD_RESPONSE, this, null, this.response) : c
                }
            }
            return t
        }
        ],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
            FormData: O.classes.FormData,
            Blob: O.classes.Blob
        },
        validateStatus: function (t) {
            return t >= 200 && t < 300
        },
        headers: {
            common: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": void 0
            }
        }
    };
    a.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
        ye.headers[e] = {}
    }
    );
    const we = ye
        , ln = a.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"])
        , un = e => {
            const t = {};
            let n, r, s;
            return e && e.split(`
`).forEach(function (i) {
                s = i.indexOf(":"),
                    n = i.substring(0, s).trim().toLowerCase(),
                    r = i.substring(s + 1).trim(),
                    !(!n || t[n] && ln[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
            }),
                t
        }
        , Te = Symbol("internals");
    function H(e) {
        return e && String(e).trim().toLowerCase()
    }
    function K(e) {
        return e === !1 || e == null ? e : a.isArray(e) ? e.map(K) : String(e)
    }
    function dn(e) {
        const t = Object.create(null)
            , n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
        let r;
        for (; r = n.exec(e);)
            t[r[1]] = r[2];
        return t
    }
    const fn = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
    function ie(e, t, n, r, s) {
        if (a.isFunction(r))
            return r.call(this, t, n);
        if (s && (t = n),
            !!a.isString(t)) {
            if (a.isString(r))
                return t.indexOf(r) !== -1;
            if (a.isRegExp(r))
                return r.test(t)
        }
    }
    function pn(e) {
        return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
    }
    function hn(e, t) {
        const n = a.toCamelCase(" " + t);
        ["get", "set", "has"].forEach(r => {
            Object.defineProperty(e, r + n, {
                value: function (s, o, i) {
                    return this[r].call(this, t, s, o, i)
                },
                configurable: !0
            })
        }
        )
    }
    let se = class {
        constructor(t) {
            t && this.set(t)
        }
        set(t, n, r) {
            const s = this;
            function o(c, d, f) {
                const u = H(d);
                if (!u)
                    throw new Error("header name must be a non-empty string");
                const l = a.findKey(s, u);
                (!l || s[l] === void 0 || f === !0 || f === void 0 && s[l] !== !1) && (s[l || d] = K(c))
            }
            const i = (c, d) => a.forEach(c, (f, u) => o(f, u, d));
            return a.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : a.isString(t) && (t = t.trim()) && !fn(t) ? i(un(t), n) : t != null && o(n, t, r),
                this
        }
        get(t, n) {
            if (t = H(t),
                t) {
                const r = a.findKey(this, t);
                if (r) {
                    const s = this[r];
                    if (!n)
                        return s;
                    if (n === !0)
                        return dn(s);
                    if (a.isFunction(n))
                        return n.call(this, s, r);
                    if (a.isRegExp(n))
                        return n.exec(s);
                    throw new TypeError("parser must be boolean|regexp|function")
                }
            }
        }
        has(t, n) {
            if (t = H(t),
                t) {
                const r = a.findKey(this, t);
                return !!(r && this[r] !== void 0 && (!n || ie(this, this[r], r, n)))
            }
            return !1
        }
        delete(t, n) {
            const r = this;
            let s = !1;
            function o(i) {
                if (i = H(i),
                    i) {
                    const c = a.findKey(r, i);
                    c && (!n || ie(r, r[c], c, n)) && (delete r[c],
                        s = !0)
                }
            }
            return a.isArray(t) ? t.forEach(o) : o(t),
                s
        }
        clear(t) {
            const n = Object.keys(this);
            let r = n.length
                , s = !1;
            for (; r--;) {
                const o = n[r];
                (!t || ie(this, this[o], o, t, !0)) && (delete this[o],
                    s = !0)
            }
            return s
        }
        normalize(t) {
            const n = this
                , r = {};
            return a.forEach(this, (s, o) => {
                const i = a.findKey(r, o);
                if (i) {
                    n[i] = K(s),
                        delete n[o];
                    return
                }
                const c = t ? pn(o) : String(o).trim();
                c !== o && delete n[o],
                    n[c] = K(s),
                    r[c] = !0
            }
            ),
                this
        }
        concat(...t) {
            return this.constructor.concat(this, ...t)
        }
        toJSON(t) {
            const n = Object.create(null);
            return a.forEach(this, (r, s) => {
                r != null && r !== !1 && (n[s] = t && a.isArray(r) ? r.join(", ") : r)
            }
            ),
                n
        }
        [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]()
        }
        toString() {
            return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`)
        }
        get [Symbol.toStringTag]() {
            return "AxiosHeaders"
        }
        static from(t) {
            return t instanceof this ? t : new this(t)
        }
        static concat(t, ...n) {
            const r = new this(t);
            return n.forEach(s => r.set(s)),
                r
        }
        static accessor(t) {
            const r = (this[Te] = this[Te] = {
                accessors: {}
            }).accessors
                , s = this.prototype;
            function o(i) {
                const c = H(i);
                r[c] || (hn(s, i),
                    r[c] = !0)
            }
            return a.isArray(t) ? t.forEach(o) : o(t),
                this
        }
    }
        ;
    se.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
    a.reduceDescriptors(se.prototype, ({ value: e }, t) => {
        let n = t[0].toUpperCase() + t.slice(1);
        return {
            get: () => e,
            set(r) {
                this[n] = r
            }
        }
    }
    );
    a.freezeMethods(se);
    const A = se;
    function ae(e, t, n) {
        const r = this || we
            , s = t || r
            , o = A.from(s.headers);
        let i = s.data;
        return a.forEach(e, function (c) {
            i = c.call(r, i, o.normalize(), t ? t.status : void 0)
        }),
            o.normalize(),
            i
    }
    function Xe(e) {
        return !!(e && e.__CANCEL__)
    }
    function z(e, t, n) {
        m.call(this, e ?? "canceled", m.ERR_CANCELED, t, n),
            this.name = "CanceledError"
    }
    a.inherits(z, m, {
        __CANCEL__: !0
    });
    function mn(e, t, n) {
        const r = n.config.validateStatus;
        !n.status || !r || r(n.status) ? e(n) : t(new m("Request failed with status code " + n.status, [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
    }
    const yn = O.hasStandardBrowserEnv ? {
        write(e, t, n, r, s, o) {
            const i = [e + "=" + encodeURIComponent(t)];
            a.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
                a.isString(r) && i.push("path=" + r),
                a.isString(s) && i.push("domain=" + s),
                o === !0 && i.push("secure"),
                document.cookie = i.join("; ")
        },
        read(e) {
            const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write() { },
        read() {
            return null
        },
        remove() { }
    };
    function wn(e) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
    }
    function En(e, t) {
        return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
    }
    function Ye(e, t) {
        return e && !wn(t) ? En(e, t) : t
    }
    const gn = O.hasStandardBrowserEnv ? function () {
        const t = /(msie|trident)/i.test(navigator.userAgent)
            , n = document.createElement("a");
        let r;
        function s(o) {
            let i = o;
            return t && (n.setAttribute("href", i),
                i = n.href),
                n.setAttribute("href", i),
            {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
            }
        }
        return r = s(window.location.href),
            function (i) {
                const c = a.isString(i) ? s(i) : i;
                return c.protocol === r.protocol && c.host === r.host
            }
    }() : function () {
        return function () {
            return !0
        }
    }();
    function bn(e) {
        const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
        return t && t[1] || ""
    }
    function Sn(e, t) {
        e = e || 10;
        const n = new Array(e)
            , r = new Array(e);
        let s = 0, o = 0, i;
        return t = t !== void 0 ? t : 1e3,
            function (d) {
                const f = Date.now()
                    , u = r[o];
                i || (i = f),
                    n[s] = d,
                    r[s] = f;
                let l = o
                    , w = 0;
                for (; l !== s;)
                    w += n[l++],
                        l = l % e;
                if (s = (s + 1) % e,
                    s === o && (o = (o + 1) % e),
                    f - i < t)
                    return;
                const b = u && f - u;
                return b ? Math.round(w * 1e3 / b) : void 0
            }
    }
    function Ae(e, t) {
        let n = 0;
        const r = Sn(50, 250);
        return s => {
            const o = s.loaded
                , i = s.lengthComputable ? s.total : void 0
                , c = o - n
                , d = r(c)
                , f = o <= i;
            n = o;
            const u = {
                loaded: o,
                total: i,
                progress: i ? o / i : void 0,
                bytes: c,
                rate: d || void 0,
                estimated: d && i && f ? (i - o) / d : void 0,
                event: s
            };
            u[t ? "download" : "upload"] = !0,
                e(u)
        }
    }
    const On = typeof XMLHttpRequest < "u"
        , xn = On && function (e) {
            return new Promise(function (n, r) {
                let s = e.data;
                const o = A.from(e.headers).normalize();
                let { responseType: i, withXSRFToken: c } = e, d;
                function f() {
                    e.cancelToken && e.cancelToken.unsubscribe(d),
                        e.signal && e.signal.removeEventListener("abort", d)
                }
                let u;
                if (a.isFormData(s)) {
                    if (O.hasStandardBrowserEnv || O.hasStandardBrowserWebWorkerEnv)
                        o.setContentType(!1);
                    else if ((u = o.getContentType()) !== !1) {
                        const [h, ...E] = u ? u.split(";").map(g => g.trim()).filter(Boolean) : [];
                        o.setContentType([h || "multipart/form-data", ...E].join("; "))
                    }
                }
                let l = new XMLHttpRequest;
                if (e.auth) {
                    const h = e.auth.username || ""
                        , E = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                    o.set("Authorization", "Basic " + btoa(h + ":" + E))
                }
                const w = Ye(e.baseURL, e.url);
                l.open(e.method.toUpperCase(), Ke(w, e.params, e.paramsSerializer), !0),
                    l.timeout = e.timeout;
                function b() {
                    if (!l)
                        return;
                    const h = A.from("getAllResponseHeaders" in l && l.getAllResponseHeaders())
                        , g = {
                            data: !i || i === "text" || i === "json" ? l.responseText : l.response,
                            status: l.status,
                            statusText: l.statusText,
                            headers: h,
                            config: e,
                            request: l
                        };
                    mn(function (C) {
                        n(C),
                            f()
                    }, function (C) {
                        r(C),
                            f()
                    }, g),
                        l = null
                }
                if ("onloadend" in l ? l.onloadend = b : l.onreadystatechange = function () {
                    !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(b)
                }
                    ,
                    l.onabort = function () {
                        l && (r(new m("Request aborted", m.ECONNABORTED, e, l)),
                            l = null)
                    }
                    ,
                    l.onerror = function () {
                        r(new m("Network Error", m.ERR_NETWORK, e, l)),
                            l = null
                    }
                    ,
                    l.ontimeout = function () {
                        let E = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
                        const g = e.transitional || We;
                        e.timeoutErrorMessage && (E = e.timeoutErrorMessage),
                            r(new m(E, g.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED, e, l)),
                            l = null
                    }
                    ,
                    O.hasStandardBrowserEnv && (c && a.isFunction(c) && (c = c(e)),
                        c || c !== !1 && gn(w))) {
                    const h = e.xsrfHeaderName && e.xsrfCookieName && yn.read(e.xsrfCookieName);
                    h && o.set(e.xsrfHeaderName, h)
                }
                s === void 0 && o.setContentType(null),
                    "setRequestHeader" in l && a.forEach(o.toJSON(), function (E, g) {
                        l.setRequestHeader(g, E)
                    }),
                    a.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials),
                    i && i !== "json" && (l.responseType = e.responseType),
                    typeof e.onDownloadProgress == "function" && l.addEventListener("progress", Ae(e.onDownloadProgress, !0)),
                    typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", Ae(e.onUploadProgress)),
                    (e.cancelToken || e.signal) && (d = h => {
                        l && (r(!h || h.type ? new z(null, e, l) : h),
                            l.abort(),
                            l = null)
                    }
                        ,
                        e.cancelToken && e.cancelToken.subscribe(d),
                        e.signal && (e.signal.aborted ? d() : e.signal.addEventListener("abort", d)));
                const p = bn(w);
                if (p && O.protocols.indexOf(p) === -1) {
                    r(new m("Unsupported protocol " + p + ":", m.ERR_BAD_REQUEST, e));
                    return
                }
                l.send(s || null)
            }
            )
        }
        , de = {
            http: Vt,
            xhr: xn
        };
    a.forEach(de, (e, t) => {
        if (e) {
            try {
                Object.defineProperty(e, "name", {
                    value: t
                })
            } catch { }
            Object.defineProperty(e, "adapterName", {
                value: t
            })
        }
    }
    );
    const Re = e => `- ${e}`
        , Tn = e => a.isFunction(e) || e === null || e === !1
        , Ze = {
            getAdapter: e => {
                e = a.isArray(e) ? e : [e];
                const { length: t } = e;
                let n, r;
                const s = {};
                for (let o = 0; o < t; o++) {
                    n = e[o];
                    let i;
                    if (r = n,
                        !Tn(n) && (r = de[(i = String(n)).toLowerCase()],
                            r === void 0))
                        throw new m(`Unknown adapter '${i}'`);
                    if (r)
                        break;
                    s[i || "#" + o] = r
                }
                if (!r) {
                    const o = Object.entries(s).map(([c, d]) => `adapter ${c} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build"));
                    let i = t ? o.length > 1 ? `since :
` + o.map(Re).join(`
`) : " " + Re(o[0]) : "as no adapter specified";
                    throw new m("There is no suitable adapter to dispatch the request " + i, "ERR_NOT_SUPPORT")
                }
                return r
            }
            ,
            adapters: de
        };
    function ce(e) {
        return re(e, new O.classes.URLSearchParams, Object.assign({
            visitor: function (n, r, s, o) {
                return O.isNode && a.isBuffer(n) ? (this.append(r, n.toString("base64")),
                    !1) : o.defaultVisitor.apply(this, arguments)
            }
        }, t))
    }
    function Ne(e) {
        return ce(e),
            e.headers = A.from(e.headers),
            e.data = ae.call(e, e.transformRequest),
            ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1),
            Ze.getAdapter(e.adapter || we.adapter)(e).then(function (r) {
                return ce(e),
                    r.data = ae.call(e, e.transformResponse, r),
                    r.headers = A.from(r.headers),
                    r
            }, function (r) {
                return Xe(r) || (ce(e),
                    r && r.response && (r.response.data = ae.call(e, e.transformResponse, r.response),
                        r.response.headers = A.from(r.response.headers))),
                    Promise.reject(r)
            })
    }
    const Ce = e => e instanceof A ? e.toJSON() : e;
    function _(e, t) {
        t = t || {};
        const n = {};
        function r(f, u, l) {
            return a.isPlainObject(f) && a.isPlainObject(u) ? a.merge.call({
                caseless: l
            }, f, u) : a.isPlainObject(u) ? a.merge({}, u) : a.isArray(u) ? u.slice() : u
        }
        function s(f, u, l) {
            if (a.isUndefined(u)) {
                if (!a.isUndefined(f))
                    return r(void 0, f, l)
            } else
                return r(f, u, l)
        }
        function o(f, u) {
            if (!a.isUndefined(u))
                return r(void 0, u)
        }
        function i(f, u) {
            if (a.isUndefined(u)) {
                if (!a.isUndefined(f))
                    return r(void 0, f)
            } else
                return r(void 0, u)
        }
        function c(f, u, l) {
            if (l in t)
                return r(f, u);
            if (l in e)
                return r(void 0, f)
        }
        const d = {
            url: o,
            method: o,
            data: o,
            baseURL: i,
            transformRequest: i,
            transformResponse: i,
            paramsSerializer: i,
            timeout: i,
            timeoutMessage: i,
            withCredentials: i,
            withXSRFToken: i,
            adapter: i,
            responseType: i,
            xsrfCookieName: i,
            xsrfHeaderName: i,
            onUploadProgress: i,
            onDownloadProgress: i,
            decompress: i,
            maxContentLength: i,
            maxBodyLength: i,
            beforeRedirect: i,
            transport: i,
            httpAgent: i,
            httpsAgent: i,
            cancelToken: i,
            socketPath: i,
            responseEncoding: i,
            validateStatus: c,
            headers: (f, u) => s(Ce(f), Ce(u), !0)
        };
        return a.forEach(Object.keys(Object.assign({}, e, t)), function (u) {
            const l = d[u] || s
                , w = l(e[u], t[u], u);
            a.isUndefined(w) && l !== c || (n[u] = w)
        }),
            n
    }
    const et = "1.6.7"
        , Ee = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
        Ee[e] = function (r) {
            return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
        }
    }
    );
    const Le = {};
    Ee.transitional = function (t, n, r) {
        function s(o, i) {
            return "[Axios v" + et + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "")
        }
        return (o, i, c) => {
            if (t === !1)
                throw new m(s(i, " has been removed" + (n ? " in " + n : "")), m.ERR_DEPRECATED);
            return n && !Le[i] && (Le[i] = !0,
                console.warn(s(i, " has been deprecated since v" + n + " and will be removed in the near future"))),
                t ? t(o, i, c) : !0
        }
    }
        ;
    function An(e, t, n) {
        if (typeof e != "object")
            throw new m("options must be an object", m.ERR_BAD_OPTION_VALUE);
        const r = Object.keys(e);
        let s = r.length;
        for (; s-- > 0;) {
            const o = r[s]
                , i = t[o];
            if (i) {
                const c = e[o]
                    , d = c === void 0 || i(c, o, e);
                if (d !== !0)
                    throw new m("option " + o + " must be " + d, m.ERR_BAD_OPTION_VALUE);
                continue
            }
            if (n !== !0)
                throw new m("Unknown option " + o, m.ERR_BAD_OPTION)
        }
    }
    const fe = {
        assertOptions: An,
        validators: Ee
    }
        , L = fe.validators;
    let Q = class {
        constructor(t) {
            this.defaults = t,
                this.interceptors = {
                    request: new xe,
                    response: new xe
                }
        }
        async request(t, n) {
            try {
                return await this._request(t, n)
            } catch (r) {
                if (r instanceof Error) {
                    let s;
                    Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error;
                    const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
                    r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o
                }
                throw r
            }
        }
        _request(t, n) {
            typeof t == "string" ? (n = n || {},
                n.url = t) : n = t || {},
                n = _(this.defaults, n);
            const { transitional: r, paramsSerializer: s, headers: o } = n;
            r !== void 0 && fe.assertOptions(r, {
                silentJSONParsing: L.transitional(L.boolean),
                forcedJSONParsing: L.transitional(L.boolean),
                clarifyTimeoutError: L.transitional(L.boolean)
            }, !1),
                s != null && (a.isFunction(s) ? n.paramsSerializer = {
                    serialize: s
                } : fe.assertOptions(s, {
                    encode: L.function,
                    serialize: L.function
                }, !0)),
                n.method = (n.method || this.defaults.method || "get").toLowerCase();
            let i = o && a.merge(o.common, o[n.method]);
            o && a.forEach(["delete", "get", "head", "post", "put", "patch", "common"], p => {
                delete o[p]
            }
            ),
                n.headers = A.concat(i, o);
            const c = [];
            let d = !0;
            this.interceptors.request.forEach(function (h) {
                typeof h.runWhen == "function" && h.runWhen(n) === !1 || (d = d && h.synchronous,
                    c.unshift(h.fulfilled, h.rejected))
            });
            const f = [];
            this.interceptors.response.forEach(function (h) {
                f.push(h.fulfilled, h.rejected)
            });
            let u, l = 0, w;
            if (!d) {
                const p = [Ne.bind(this), void 0];
                for (p.unshift.apply(p, c),
                    p.push.apply(p, f),
                    w = p.length,
                    u = Promise.resolve(n); l < w;)
                    u = u.then(p[l++], p[l++]);
                return u
            }
            w = c.length;
            let b = n;
            for (l = 0; l < w;) {
                const p = c[l++]
                    , h = c[l++];
                try {
                    b = p(b)
                } catch (E) {
                    h.call(this, E);
                    break
                }
            }
            try {
                u = Ne.call(this, b)
            } catch (p) {
                return Promise.reject(p)
            }
            for (l = 0,
                w = f.length; l < w;)
                u = u.then(f[l++], f[l++]);
            return u
        }
        getUri(t) {
            t = _(this.defaults, t);
            const n = Ye(t.baseURL, t.url);
            return Ke(n, t.params, t.paramsSerializer)
        }
    }
        ;
    a.forEach(["delete", "get", "head", "options"], function (t) {
        Q.prototype[t] = function (n, r) {
            return this.request(_(r || {}, {
                method: t,
                url: n,
                data: (r || {}).data
            }))
        }
    });
    a.forEach(["post", "put", "patch"], function (t) {
        function n(r) {
            return function (o, i, c) {
                return this.request(_(c || {}, {
                    method: t,
                    headers: r ? {
                        "Content-Type": "multipart/form-data"
                    } : {},
                    url: o,
                    data: i
                }))
            }
        }
        Q.prototype[t] = n(),
            Q.prototype[t + "Form"] = n(!0)
    });
    const W = Q;
    let Rn = class tt {
        constructor(t) {
            if (typeof t != "function")
                throw new TypeError("executor must be a function.");
            let n;
            this.promise = new Promise(function (o) {
                n = o
            }
            );
            const r = this;
            this.promise.then(s => {
                if (!r._listeners)
                    return;
                let o = r._listeners.length;
                for (; o-- > 0;)
                    r._listeners[o](s);
                r._listeners = null
            }
            ),
                this.promise.then = s => {
                    let o;
                    const i = new Promise(c => {
                        r.subscribe(c),
                            o = c
                    }
                    ).then(s);
                    return i.cancel = function () {
                        r.unsubscribe(o)
                    }
                        ,
                        i
                }
                ,
                t(function (o, i, c) {
                    r.reason || (r.reason = new z(o, i, c),
                        n(r.reason))
                })
        }
        throwIfRequested() {
            if (this.reason)
                throw this.reason
        }
        subscribe(t) {
            if (this.reason) {
                t(this.reason);
                return
            }
            this._listeners ? this._listeners.push(t) : this._listeners = [t]
        }
        unsubscribe(t) {
            if (!this._listeners)
                return;
            const n = this._listeners.indexOf(t);
            n !== -1 && this._listeners.splice(n, 1)
        }
        static source() {
            let t;
            return {
                token: new tt(function (s) {
                    t = s
                }
                ),
                cancel: t
            }
        }
    }
        ;
    const Nn = Rn;
    function Cn(e) {
        return function (n) {
            return e.apply(null, n)
        }
    }
    function Ln(e) {
        return a.isObject(e) && e.isAxiosError === !0
    }
    const pe = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511
    };
    Object.entries(pe).forEach(([e, t]) => {
        pe[t] = e
    }
    );
    const Pn = pe;
    function nt(e) {
        const t = new W(e)
            , n = je(W.prototype.request, t);
        return a.extend(n, W.prototype, t, {
            allOwnKeys: !0
        }),
            a.extend(n, t, null, {
                allOwnKeys: !0
            }),
            n.create = function (s) {
                return nt(_(e, s))
            }
            ,
            n
    }
    const y = nt(we);
    y.Axios = W;
    y.CanceledError = z;
    y.CancelToken = Nn;
    y.isCancel = Xe;
    y.VERSION = et;
    y.toFormData = re;
    y.AxiosError = m;
    y.Cancel = y.CanceledError;
    y.all = function (t) {
        return Promise.all(t)
    }
        ;
    y.spread = Cn;
    y.isAxiosError = Ln;
    y.mergeConfig = _;
    y.AxiosHeaders = A;
    y.formToJSON = e => Qe(a.isHTMLForm(e) ? new FormData(e) : e);
    y.getAdapter = Ze.getAdapter;
    y.HttpStatusCode = Pn;
    y.default = y;
    const rt = y
        , { Axios: Vn, AxiosError: Kn, CanceledError: Wn, isCancel: Gn, CancelToken: Qn, VERSION: Xn, all: Yn, Cancel: Zn, isAxiosError: Bn, spread: er, toFormData: tr, AxiosHeaders: nr, HttpStatusCode: rr, formToJSON: sr, getAdapter: or, mergeConfig: ir } = rt
        , Pe = {
            checkTestExist: {
                url: "/mooc/test/:tid",
                method: "GET"
            },
            selectQustion: {
                url: "/mooc/test/:tid",
                method: "POST"
            },
            getAnnouncement: {
                url: "/mooc/announcement",
                method: "GET"
            },
            getNewExamInfo: {
                url: "https://www.icourse163.org/mm-tiku/web/j/mocExamBean.getPaper.rpc",
                method: "POST"
            },
            getNotice: {
                url: "/mooc/notice/extension",
                method: "GET"
            }
        }
        , kn = "https://ginnnnnn.top/api";
    async function Fn(e, t, n) {
        try {
            return await new Promise((r, s) => {
                let o = Pe[e].url;
                if (t)
                    for (const [i, c] of Object.entries(t)) {
                        const d = RegExp(`(/):${i}(/)?`, "g");
                        d.test(o) && (o = o.replaceAll(d, `$1${c}$2`),
                            Reflect.deleteProperty(t, i))
                    }
                if (o.indexOf("http") != 0 && (o = `${kn}${o}`),
                    n)
                    for (const [i, c] of Object.entries(n))
                        typeof c == "object" && Reflect.set(n, i, JSON.stringify(c));
                rt({
                    url: o,
                    method: Pe[e].method,
                    params: t || {},
                    data: n || {},
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(i => {
                    let c = ""
                        , d = !1;
                    i.status !== 200 || !i.data ? c = "请求出错" : i.data.msg && (c = i.data.msg,
                        i.data.status === 200 && (d = !0)),
                        c && console.log(c),
                        r(i.data)
                }
                ).catch(i => {
                    let c = i;
                    Bn(i) && (c = i.message),
                        console.log(c),
                        s(i)
                }
                )
            }
            )
        } catch {
            return {}
        }
    }
    const st = () => Fn
        , _n = () => {
            const [e, t] = [new Array, new Array]
                , n = document.querySelectorAll('input[id^="op_"]');
            for (let s = 0; s < n.length; s++) {
                const o = n.item(s);
                e.push(Number.parseInt(o.id.split("_")[2].slice(0, -13)))
            }
            const r = document.getElementsByClassName("m-FillBlank examMode u-questionItem");
            for (let s = 0; s < r.length; s++) {
                const i = r.item(s).querySelector(".j-richTxt");
                t.push(i.innerText)
            }
            return {
                oidList: e,
                titleList: t
            }
        }
        , jn = (e, t) => {
            // 处理选择题答案 (This part is mostly dormant due to changes in Hn)
            let index = 0;
            const selectOption = () => {
                if (index < e.length) {
                    const r = e[index];
                    const option = document.querySelector(`input[id*="_${r}"]`);
                    if (option) {
                        // Original logic for choice questions, currently not actively used by Hn's new quiz flow
                        // option.checked = !0;
                        // option.dispatchEvent(new Event("change",{bubbles:!0}));
                        // option.classList.add("gin-answer");
                    }
                    index++;
                    setTimeout(selectOption, 500);
                }
            };
            selectOption();

            // 处理填空题答案
            const n = document.getElementsByClassName("m-FillBlank examMode u-questionItem");
            for (let r = 0; r < n.length; r++) {
                const questionItem = n.item(r);
                if (!questionItem) continue;

                const o = questionItem.querySelector(".j-richTxt"); // Element for question title/text
                if (!o || typeof o.innerText !== 'string') { // Check if o or its innerText is problematic
                    console.warn("填空题：无法找到题目文本元素或文本为空", questionItem);
                    continue;
                }
                const questionTitleText = o.innerText.trim();
                if (!questionTitleText) {
                    console.warn("填空题：提取的题目文本为空", questionItem);
                    continue;
                }

                const i = Reflect.get(t, questionTitleText); // t is completionDataForJn

                if (!i || i.stdAnswer === undefined) {
                    console.warn(`填空题 "${questionTitleText}"：未在提供的答案数据中找到答案或答案格式不正确。`);
                    const errorDiv = document.createElement("div");
                    errorDiv.style.color = "orange";
                    errorDiv.style.fontSize = "small";
                    errorDiv.style.marginTop = "4px";
                    errorDiv.innerText = "[未找到对应答案]";
                    o.appendChild(errorDiv);
                    continue;
                }

                // Display the answer
                // const c = document.createElement("div"); // Original element for title, might be redundant
                // c.innerHTML = i.title;
                // o.appendChild(c);

                const d = String(i.stdAnswer).split("##%_YZPRLFH_%##"); // Ensure stdAnswer is a string before splitting
                const f = document.createElement("div");
                f.style.marginTop = "5px";
                f.style.padding = "5px";
                f.style.border = "1px solid #d9ecff";
                f.style.backgroundColor = "#f0f8ff";
                f.style.borderRadius = "3px";

                const answerLabel = document.createElement("strong");
                answerLabel.innerText = "参考答案：";
                f.appendChild(answerLabel);

                for (let u = 0; u < d.length; u++) {
                    const l = document.createElement("span");
                    l.classList.add("gin-answer-item"); // Use existing class for potential styling
                    l.innerHTML = d[u]; // Use innerHTML if answers can contain HTML
                    f.append(l);
                    if (u !== d.length - 1) {
                        f.append(document.createTextNode(" / "));
                    }
                }
                o.append(f);
            }
        }
        , Dn = e => {
            const t = document.getElementsByClassName("f-richEditorText j-richTxt f-fl");
            let index = 0;

            const selectOption = () => {
                if (index < t.length) {
                    const o = document.createElement("div");
                    const n = Reflect.get(e, `${index}`);
                    o.innerHTML = n.answer;
                    o.prepend("参考答案：");
                    t.item(index).append(o);

                    // 模拟点击正确的选项
                    const correctOption = document.querySelector(`.j-choicebox .choices li input[type="radio"][value="${n.answer}"]`);
                    if (correctOption) {
                        correctOption.click();
                    }

                    index++;
                    setTimeout(selectOption, 500); // 等待0.5秒钟再进行下一次勾选
                }
            };

            selectOption();
        }
        , Un = () => {
            var t, n, r;
            const e = document.getElementsByClassName("u-questionItem u-analysisQuestion analysisMode");
            for (let s = 0; s < e.length; s++) {
                const o = (t = e.item(s)) == null ? void 0 : t.getElementsByClassName("s");
                for (let i = 0; i < o.length; i++) {
                    const c = (r = (n = o.item(i)) == null ? void 0 : n.lastElementChild) == null ? void 0 : r.querySelector("input");
                    c.checked = !0
                }
            }
        }
        , qn = () => {
            var t;
            const e = document.getElementsByClassName("u-questionItem u-analysisQuestion analysisMode");
            for (let n = 0; n < e.length; n++) {
                Fe(50);
                const r = (t = e.item(n)) == null ? void 0 : t.querySelector("textarea");
                r.value = "666"
            }
            window.scroll({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            })
        }
        , In = async () => {
            var s, o;
            const X_local = st(); 
            let t = (s = document.getElementById("app")) == null ? void 0 : s.getElementsByTagName("form").item(0);
            for (; !t;)
                await Fe(1e3),
                    t = (o = document.getElementById("app")) == null ? void 0 : o.getElementsByTagName("form").item(0);

            const n_new = async () => {
                P.innerText = "正在获取新考试答案...";
                const examInfoResponse = await X_local("getNewExamInfo", {
                    csrfKey: document.cookie.match(/NTESSTUDYSI=([a-z0-9]+);/)[1]
                }, {
                    answerformId: G("aid"),
                    examId: G("eid")
                });

                if (!examInfoResponse || !examInfoResponse.result || !examInfoResponse.result.questions) {
                    console.error("获取新考试信息失败或题目列表为空。");
                    P.innerText = "获取考试信息失败。";
                    return;
                }

                const questionsData = examInfoResponse.result.questions;
                const allOptionElementsOnPage = document.querySelectorAll(".ant-checkbox-group .ant-checkbox-wrapper, .ant-radio-group .ant-radio-wrapper");
                let currentOptionElementIndex = 0;

                for (const question of questionsData) {
                    const questionText = question.subject;
                    if (!questionText) {
                        console.warn("新考试：题目文本为空", question);
                        if (question.optionDtos) currentOptionElementIndex += question.optionDtos.length;
                        continue;
                    }

                    const apiResult = await searchWithHiveAPI(questionText);

                    if (apiResult.success && apiResult.data) {
                        const correctAnswerText = apiResult.data.reason;
                        for (const optionDto of question.optionDtos) {
                            const optionTextFromData = optionDto.content;
                            if (currentOptionElementIndex < allOptionElementsOnPage.length) {
                                const pageOptionElement = allOptionElementsOnPage[currentOptionElementIndex];
                                const pageOptionTextElement = pageOptionElement.querySelector('span:last-child');
                                const pageOptionText = pageOptionTextElement ? pageOptionTextElement.innerText.trim() : "";

                                if (optionTextFromData === correctAnswerText && optionTextFromData === pageOptionText) {
                                    pageOptionElement.classList.add("gin-answer-item");
                                    const input = pageOptionElement.querySelector('input');
                                    // if (input && !input.checked) { input.click(); } // 点击需谨慎
                                }
                            }
                            currentOptionElementIndex++;
                        }
                    } else {
                        console.warn(`新考试题目 "${questionText}" 获取答案失败: ${apiResult.message}`);
                        if (question.optionDtos) currentOptionElementIndex += question.optionDtos.length;
                    }
                }
                P.innerText = "新考试答案处理完成。";
            };

            const r = document.createElement("button");
            r.className = "ant-btn ant-btn-primary";
            r.setAttribute("style", "margin-bottom: 16px");
            r.onclick = n_new;
            r.innerText = "获取答案";
            t == null || t.before(r);
        }
        , X = st()
        , M = new ut
        , R = M.add(void 0)
        , T = M.add(-1);
    let k = null;
    const [Y, F, Z] = [M.add(!1), M.add(!1), M.add(!1)];
    location.href.indexOf("newExam") !== -1 && In();

    async function searchWithHiveAPI(question) {
        const token = "free"; // 您可以更改为您的付费token
        const encodedQuestion = encodeURIComponent(question);
        const url = `https://www.hive-net.cn/backend/wangke/search?token=${token}&question=${encodedQuestion}`;
        try {
            const response = await rt({ // rt should be the axios-like instance
                url: url,
                method: "GET",
            });

            if (response.status === 200 && response.data) {
                if (response.data.code === 0 && response.data.data && response.data.data.reasonList && response.data.data.reasonList.length > 0) {
                    return {
                        success: true,
                        data: response.data.data.reasonList[0] // 包含 reason, type, options 等
                    };
                } else {
                    return { success: false, message: response.data.reason || "未找到答案或API返回空数据。" };
                }
            } else {
                return { success: false, message: `API 请求失败，状态码: ${response.status}` };
            }
        } catch (error) {
            console.error(`调用 Hive API 查询问题 "${question}" 时出错:`, error);
            let message = "网络连接错误";
            if (error.isAxiosError && error.response && error.response.data && error.response.data.reason) {
                message = error.response.data.reason;
            } else if (error.message) {
                message = error.message;
            }
            return { success: false, message: message };
        }
    }

    const Hn = async () => {
        if (P.innerText === "正在获取答案，请稍后...") {
            return; // 防止重复执行
        }
        P.innerText = "正在获取答案，请稍后...";

        if (R.get() === "quiz") {
            const { oidList, titleList } = _n(); // oidList 用于选择题, titleList 用于填空题

            // 1. 处理选择题
            const choiceQuestionItems = document.querySelectorAll(".examMode .u-questionItem:not(.m-FillBlank)");
            for (const qElement of choiceQuestionItems) {
                const questionTextElement = qElement.querySelector('.u-questionTitle .j-richTxt, .subject .j-richTxt');
                if (!questionTextElement || !questionTextElement.innerText) {
                    console.warn("选择题：无法定位题目文本元素或文本为空", qElement);
                    continue;
                }
                const questionText = questionTextElement.innerText.trim();
                if (!questionText) {
                    console.warn("选择题：提取的题目文本为空", qElement);
                    continue;
                }

                const result = await searchWithHiveAPI(questionText);
                if (result.success && result.data) {
                    const correctAnswerText = result.data.reason;
                    const options = qElement.querySelectorAll('input[type="radio"], input[type="checkbox"]');
                    options.forEach(optionInput => {
                        const label = qElement.querySelector(`label[for="${optionInput.id}"]`);
                        let optionText = "";
                        if (label) {
                            optionText = label.innerText.trim();
                        } else {
                            const parentLabel = optionInput.closest('label');
                            if (parentLabel) {
                                optionText = parentLabel.innerText.trim();
                            } else {
                                let nextSpan = optionInput.nextElementSibling;
                                if (nextSpan && nextSpan.tagName === 'SPAN') optionText = nextSpan.innerText.trim();
                                else if (optionInput.parentElement && optionInput.parentElement.innerText) optionText = optionInput.parentElement.innerText.trim().replace(questionText, '').trim();
                            }
                        }
                        
                        if (optionText && correctAnswerText && (optionText.includes(correctAnswerText) || correctAnswerText.includes(optionText.substring(optionText.indexOf('.') + 1).trim()))) {
                            if (!optionInput.checked) {
                                optionInput.click();
                            }
                            const displayElement = label || optionInput.parentElement;
                            if (displayElement) displayElement.classList.add("gin-answer"); // 使用旧脚本的高亮类名
                        }
                    });
                } else {
                    console.warn(`选择题 "${questionText}" 获取答案失败: ${result.message}`);
                }
            }

            // 2. 处理填空题
            let completionDataForJn = {};
            if (titleList && titleList.length > 0) {
                for (const questionTitle of titleList) {
                    const result = await searchWithHiveAPI(questionTitle);
                    if (result.success && result.data) {
                        completionDataForJn[questionTitle] = {
                            title: questionTitle,
                            stdAnswer: result.data.reason
                        };
                    } else {
                        completionDataForJn[questionTitle] = {
                            title: questionTitle,
                            stdAnswer: `错误: ${result.message}`
                        };
                    }
                }
            }
            jn([], completionDataForJn); // 假设jn能处理空的choiceAns

        } else if (R.get() === "homework") {
            const questionElements = document.getElementsByClassName("f-richEditorText j-richTxt f-fl");
            let homeworkDataForDn = [];

            for (let i = 0; i < questionElements.length; i++) {
                const qElement = questionElements.item(i);
                let questionText = "";
                
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = qElement.innerHTML;
                tempDiv.querySelectorAll('div.gin-answer-item, div:last-child > span.gin-answer-item, div > div:last-child:not([class])').forEach(el => el.remove()); // 尝试移除之前添加的答案
                questionText = tempDiv.innerText.trim();

                if (!questionText) {
                    console.warn("作业题：无法提取题目文本", qElement);
                    homeworkDataForDn.push({ answer: "无法提取题目" });
                    continue;
                }

                const result = await searchWithHiveAPI(questionText);
                if (result.success && result.data) {
                    homeworkDataForDn.push({ answer: result.data.reason });
                } else {
                    homeworkDataForDn.push({ answer: `错误: ${result.message}` });
                }
            }
            Dn(homeworkDataForDn);
        }
        P.innerText = "";
    }
        , ot = document.createElement("style");
    ot.innerText = `
        input.gin-answer:not(:checked) + label, #GinsMooc, .gin-answer-item {
            background-color: #d9ecff;
        }
        .gin-function {
            display: flex;
            align-items: center;
        }
        .gin-function .u-btn {
            margin-right: 16px;
        }
        .gin-state-tips {
            font-size: 14px;
        }
    `;
    document.head.append(ot);
    const J = document.createElement("div");
    J.id = "GinsMooc";
    J.classList.add("m-learnbox");
    var Be;
    (Be = document.querySelector(".learnPageContentLeft")) == null || Be.prepend(J);
    const Mn = async () => {
        var t;
        const e = (await X("getNotice", {
            version: "v2.1.0"
        }, void 0)).data;
        if (console.log(e),
            !((t = localStorage.getItem("Gins-ignore-notice")) != null && t.split(",").find(n => Number.parseInt(n) === e.id))) {
            const n = document.createElement("div");
            n.innerHTML = e.content;
            const r = document.createElement("a");
            r.innerText = "不再提醒",
                r.onclick = () => {
                    const s = localStorage.getItem("Gins-ignore-notice");
                    localStorage.setItem("Gins-ignore-notice", s ? `${s},${e.id}` : `${e.id}`),
                        n.remove(),
                        r.remove()
                }
                ,
                r.style.marginLeft = "16px",
                n.append(r),
                J.prepend(n)
        }
    }
        ;
    Mn();
    const I = document.createElement("div");
    I.classList.add("gin-function");
    J.append(I);
    const j = document.createElement("button");
    j.classList.add("u-btn", "u-btn-default", "f-dn");
    j.onclick = Hn;
    j.innerText = "获取答案";
    I.append(j);
    const D = document.createElement("button");
    D.classList.add("u-btn", "u-btn-default", "f-dn");
    D.onclick = Un;
    D.innerText = "一键评分";
    I.append(D);
    const U = document.createElement("button");
    U.classList.add("u-btn", "u-btn-default", "f-dn");
    U.onclick = qn;
    U.innerText = "一键点评";
    I.append(U);
    const P = document.createElement("div");
    P.classList.add("gin-state-tips");
    I.append(P);
    window.addEventListener("hashchange", () => {
        k = G("id"),
            location.hash.indexOf("quiz") !== -1 || location.hash.indexOf("examObject") !== -1 ? R.set("quiz") : location.hash.indexOf("hw") !== -1 || location.hash.indexOf("examSubjective") !== -1 ? R.set("homework") : R.set(void 0)
    }
    );
    var ke;
    (ke = document.getElementById("courseLearn-inner-box")) == null || ke.addEventListener("DOMNodeInserted", () => {
        Z.set(location.hash.indexOf("examlist") !== -1);
        const e = document.querySelector(".j-prepare.prepare");
        F.set(e && !e.classList.contains("f-dn") || document.querySelector(".j-homework-paper") !== null || Z.get()),
            Y.set(document.querySelector(".u-questionItem.u-analysisQuestion.analysisMode") !== null)
    }
    );
    const it = async () => {
        if (console.log("onTestChange", R.get(), F.get(), Z.get(), k),
            R.get() === "quiz" && !F.get() || R.get() === "homework" ? j.classList.remove("f-dn") : j.classList.add("f-dn"),
            T.set(-2),
            F.get() && k)
            if ((await X("checkTestExist", {
                tid: k,
                type: "isExisting"
            }, void 0)).data.existing) {
                T.set(-1);
                return
            } else {
                const t = new EventSource(`https://ginnnnnn.top/api/mooc/course/refresh/${G("tid")}`);
                t.onmessage = n => {
                    console.log(n.data);
                    const r = JSON.parse(n.data);
                    r && r.total > 0 && T.set(Math.round(r.finished / r.total * 100)),
                        (T.value === 100 || r.status === 400) && (t.close(),
                            r.msg && T.set(-1))
                }
            }
        else if (!Z.get()) {
            T.set(-1);
            return
        }
    }
        , vn = () => {
            console.log("onModeChange", Y.get()),
                Y.get() ? (D.classList.remove("f-dn"),
                    U.classList.remove("f-dn")) : (D.classList.add("f-dn"),
                        U.classList.add("f-dn"))
        }
        ;
    Y.addEventListenr("change", vn);
    F.addEventListenr("change", it);
    R.addEventListenr("change", it);
    T.addEventListenr("set", () => {
        switch (T.get()) {
            case -2:
                P.innerText = "正在检查课程...";
                break;
            case -1:
                P.innerText = F.get() ? "已准备就绪" : "";
                break;
            default:
                P.innerText = `正在更新课程...${T.get()}%`;
                break
        }
    }
    );
})();