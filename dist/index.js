(() => {
  var __webpack_modules__ = {
    604: function (e, r, t) {
      'use strict';
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, s) {
              if (s === undefined) s = t;
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return r[t];
                }
              });
            }
          : function (e, r, t, s) {
              if (s === undefined) s = t;
              e[s] = r[t];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, r) {
              Object.defineProperty(e, 'default', { enumerable: true, value: r });
            }
          : function (e, r) {
              e['default'] = r;
            });
      var n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var r = {};
          if (e != null) for (var t in e) if (t !== 'default' && Object.hasOwnProperty.call(e, t)) s(r, e, t);
          o(r, e);
          return r;
        };
      Object.defineProperty(r, '__esModule', { value: true });
      r.issue = r.issueCommand = void 0;
      const i = n(t(87));
      const a = t(175);
      function issueCommand(e, r, t) {
        const s = new Command(e, r, t);
        process.stdout.write(s.toString() + i.EOL);
      }
      r.issueCommand = issueCommand;
      function issue(e, r = '') {
        issueCommand(e, {}, r);
      }
      r.issue = issue;
      const c = '::';
      class Command {
        constructor(e, r, t) {
          if (!e) {
            e = 'missing.command';
          }
          this.command = e;
          this.properties = r;
          this.message = t;
        }
        toString() {
          let e = c + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            e += ' ';
            let r = true;
            for (const t in this.properties) {
              if (this.properties.hasOwnProperty(t)) {
                const s = this.properties[t];
                if (s) {
                  if (r) {
                    r = false;
                  } else {
                    e += ',';
                  }
                  e += `${t}=${escapeProperty(s)}`;
                }
              }
            }
          }
          e += `${c}${escapeData(this.message)}`;
          return e;
        }
      }
      function escapeData(e) {
        return a.toCommandValue(e).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
      }
      function escapeProperty(e) {
        return a
          .toCommandValue(e)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A')
          .replace(/:/g, '%3A')
          .replace(/,/g, '%2C');
      }
    },
    149: function (e, r, t) {
      'use strict';
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, s) {
              if (s === undefined) s = t;
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return r[t];
                }
              });
            }
          : function (e, r, t, s) {
              if (s === undefined) s = t;
              e[s] = r[t];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, r) {
              Object.defineProperty(e, 'default', { enumerable: true, value: r });
            }
          : function (e, r) {
              e['default'] = r;
            });
      var n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var r = {};
          if (e != null) for (var t in e) if (t !== 'default' && Object.hasOwnProperty.call(e, t)) s(r, e, t);
          o(r, e);
          return r;
        };
      var i =
        (this && this.__awaiter) ||
        function (e, r, t, s) {
          function adopt(e) {
            return e instanceof t
              ? e
              : new t(function (r) {
                  r(e);
                });
          }
          return new (t || (t = Promise))(function (t, o) {
            function fulfilled(e) {
              try {
                step(s.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(s['throw'](e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done ? t(e.value) : adopt(e.value).then(fulfilled, rejected);
            }
            step((s = s.apply(e, r || [])).next());
          });
        };
      Object.defineProperty(r, '__esModule', { value: true });
      r.getState =
        r.saveState =
        r.group =
        r.endGroup =
        r.startGroup =
        r.info =
        r.warning =
        r.error =
        r.debug =
        r.isDebug =
        r.setFailed =
        r.setCommandEcho =
        r.setOutput =
        r.getBooleanInput =
        r.getMultilineInput =
        r.getInput =
        r.addPath =
        r.setSecret =
        r.exportVariable =
        r.ExitCode =
          void 0;
      const a = t(604);
      const c = t(119);
      const u = t(175);
      const p = n(t(87));
      const l = n(t(622));
      var d;
      (function (e) {
        e[(e['Success'] = 0)] = 'Success';
        e[(e['Failure'] = 1)] = 'Failure';
      })((d = r.ExitCode || (r.ExitCode = {})));
      function exportVariable(e, r) {
        const t = u.toCommandValue(r);
        process.env[e] = t;
        const s = process.env['GITHUB_ENV'] || '';
        if (s) {
          const r = '_GitHubActionsFileCommandDelimeter_';
          const s = `${e}<<${r}${p.EOL}${t}${p.EOL}${r}`;
          c.issueCommand('ENV', s);
        } else {
          a.issueCommand('set-env', { name: e }, t);
        }
      }
      r.exportVariable = exportVariable;
      function setSecret(e) {
        a.issueCommand('add-mask', {}, e);
      }
      r.setSecret = setSecret;
      function addPath(e) {
        const r = process.env['GITHUB_PATH'] || '';
        if (r) {
          c.issueCommand('PATH', e);
        } else {
          a.issueCommand('add-path', {}, e);
        }
        process.env['PATH'] = `${e}${l.delimiter}${process.env['PATH']}`;
      }
      r.addPath = addPath;
      function getInput(e, r) {
        const t = process.env[`INPUT_${e.replace(/ /g, '_').toUpperCase()}`] || '';
        if (r && r.required && !t) {
          throw new Error(`Input required and not supplied: ${e}`);
        }
        if (r && r.trimWhitespace === false) {
          return t;
        }
        return t.trim();
      }
      r.getInput = getInput;
      function getMultilineInput(e, r) {
        const t = getInput(e, r)
          .split('\n')
          .filter((e) => e !== '');
        return t;
      }
      r.getMultilineInput = getMultilineInput;
      function getBooleanInput(e, r) {
        const t = ['true', 'True', 'TRUE'];
        const s = ['false', 'False', 'FALSE'];
        const o = getInput(e, r);
        if (t.includes(o)) return true;
        if (s.includes(o)) return false;
        throw new TypeError(
          `Input does not meet YAML 1.2 "Core Schema" specification: ${e}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``
        );
      }
      r.getBooleanInput = getBooleanInput;
      function setOutput(e, r) {
        process.stdout.write(p.EOL);
        a.issueCommand('set-output', { name: e }, r);
      }
      r.setOutput = setOutput;
      function setCommandEcho(e) {
        a.issue('echo', e ? 'on' : 'off');
      }
      r.setCommandEcho = setCommandEcho;
      function setFailed(e) {
        process.exitCode = d.Failure;
        error(e);
      }
      r.setFailed = setFailed;
      function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
      }
      r.isDebug = isDebug;
      function debug(e) {
        a.issueCommand('debug', {}, e);
      }
      r.debug = debug;
      function error(e) {
        a.issue('error', e instanceof Error ? e.toString() : e);
      }
      r.error = error;
      function warning(e) {
        a.issue('warning', e instanceof Error ? e.toString() : e);
      }
      r.warning = warning;
      function info(e) {
        process.stdout.write(e + p.EOL);
      }
      r.info = info;
      function startGroup(e) {
        a.issue('group', e);
      }
      r.startGroup = startGroup;
      function endGroup() {
        a.issue('endgroup');
      }
      r.endGroup = endGroup;
      function group(e, r) {
        return i(this, void 0, void 0, function* () {
          startGroup(e);
          let t;
          try {
            t = yield r();
          } finally {
            endGroup();
          }
          return t;
        });
      }
      r.group = group;
      function saveState(e, r) {
        a.issueCommand('save-state', { name: e }, r);
      }
      r.saveState = saveState;
      function getState(e) {
        return process.env[`STATE_${e}`] || '';
      }
      r.getState = getState;
    },
    119: function (e, r, t) {
      'use strict';
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, s) {
              if (s === undefined) s = t;
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return r[t];
                }
              });
            }
          : function (e, r, t, s) {
              if (s === undefined) s = t;
              e[s] = r[t];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, r) {
              Object.defineProperty(e, 'default', { enumerable: true, value: r });
            }
          : function (e, r) {
              e['default'] = r;
            });
      var n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var r = {};
          if (e != null) for (var t in e) if (t !== 'default' && Object.hasOwnProperty.call(e, t)) s(r, e, t);
          o(r, e);
          return r;
        };
      Object.defineProperty(r, '__esModule', { value: true });
      r.issueCommand = void 0;
      const i = n(t(747));
      const a = n(t(87));
      const c = t(175);
      function issueCommand(e, r) {
        const t = process.env[`GITHUB_${e}`];
        if (!t) {
          throw new Error(`Unable to find environment variable for file command ${e}`);
        }
        if (!i.existsSync(t)) {
          throw new Error(`Missing file at path: ${t}`);
        }
        i.appendFileSync(t, `${c.toCommandValue(r)}${a.EOL}`, { encoding: 'utf8' });
      }
      r.issueCommand = issueCommand;
    },
    175: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      r.toCommandValue = void 0;
      function toCommandValue(e) {
        if (e === null || e === undefined) {
          return '';
        } else if (typeof e === 'string' || e instanceof String) {
          return e;
        }
        return JSON.stringify(e);
      }
      r.toCommandValue = toCommandValue;
    },
    566: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      r.Context = void 0;
      const s = t(747);
      const o = t(87);
      class Context {
        constructor() {
          this.payload = {};
          if (process.env.GITHUB_EVENT_PATH) {
            if (s.existsSync(process.env.GITHUB_EVENT_PATH)) {
              this.payload = JSON.parse(s.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
            } else {
              const e = process.env.GITHUB_EVENT_PATH;
              process.stdout.write(`GITHUB_EVENT_PATH ${e} does not exist${o.EOL}`);
            }
          }
          this.eventName = process.env.GITHUB_EVENT_NAME;
          this.sha = process.env.GITHUB_SHA;
          this.ref = process.env.GITHUB_REF;
          this.workflow = process.env.GITHUB_WORKFLOW;
          this.action = process.env.GITHUB_ACTION;
          this.actor = process.env.GITHUB_ACTOR;
          this.job = process.env.GITHUB_JOB;
          this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
          this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
        }
        get issue() {
          const e = this.payload;
          return Object.assign(Object.assign({}, this.repo), { number: (e.issue || e.pull_request || e).number });
        }
        get repo() {
          if (process.env.GITHUB_REPOSITORY) {
            const [e, r] = process.env.GITHUB_REPOSITORY.split('/');
            return { owner: e, repo: r };
          }
          if (this.payload.repository) {
            return { owner: this.payload.repository.owner.login, repo: this.payload.repository.name };
          }
          throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
        }
      }
      r.Context = Context;
    },
    58: function (e, r, t) {
      'use strict';
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, s) {
              if (s === undefined) s = t;
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return r[t];
                }
              });
            }
          : function (e, r, t, s) {
              if (s === undefined) s = t;
              e[s] = r[t];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, r) {
              Object.defineProperty(e, 'default', { enumerable: true, value: r });
            }
          : function (e, r) {
              e['default'] = r;
            });
      var n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var r = {};
          if (e != null) for (var t in e) if (Object.hasOwnProperty.call(e, t)) s(r, e, t);
          o(r, e);
          return r;
        };
      Object.defineProperty(r, '__esModule', { value: true });
      r.getOctokit = r.context = void 0;
      const i = n(t(566));
      const a = t(465);
      r.context = new i.Context();
      function getOctokit(e, r) {
        return new a.GitHub(a.getOctokitOptions(e, r));
      }
      r.getOctokit = getOctokit;
    },
    668: function (e, r, t) {
      'use strict';
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, s) {
              if (s === undefined) s = t;
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return r[t];
                }
              });
            }
          : function (e, r, t, s) {
              if (s === undefined) s = t;
              e[s] = r[t];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, r) {
              Object.defineProperty(e, 'default', { enumerable: true, value: r });
            }
          : function (e, r) {
              e['default'] = r;
            });
      var n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var r = {};
          if (e != null) for (var t in e) if (Object.hasOwnProperty.call(e, t)) s(r, e, t);
          o(r, e);
          return r;
        };
      Object.defineProperty(r, '__esModule', { value: true });
      r.getApiBaseUrl = r.getProxyAgent = r.getAuthString = void 0;
      const i = n(t(120));
      function getAuthString(e, r) {
        if (!e && !r.auth) {
          throw new Error('Parameter token or opts.auth is required');
        } else if (e && r.auth) {
          throw new Error('Parameters token and opts.auth may not both be specified');
        }
        return typeof r.auth === 'string' ? r.auth : `token ${e}`;
      }
      r.getAuthString = getAuthString;
      function getProxyAgent(e) {
        const r = new i.HttpClient();
        return r.getAgent(e);
      }
      r.getProxyAgent = getProxyAgent;
      function getApiBaseUrl() {
        return process.env['GITHUB_API_URL'] || 'https://api.github.com';
      }
      r.getApiBaseUrl = getApiBaseUrl;
    },
    465: function (e, r, t) {
      'use strict';
      var s =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, s) {
              if (s === undefined) s = t;
              Object.defineProperty(e, s, {
                enumerable: true,
                get: function () {
                  return r[t];
                }
              });
            }
          : function (e, r, t, s) {
              if (s === undefined) s = t;
              e[s] = r[t];
            });
      var o =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (e, r) {
              Object.defineProperty(e, 'default', { enumerable: true, value: r });
            }
          : function (e, r) {
              e['default'] = r;
            });
      var n =
        (this && this.__importStar) ||
        function (e) {
          if (e && e.__esModule) return e;
          var r = {};
          if (e != null) for (var t in e) if (Object.hasOwnProperty.call(e, t)) s(r, e, t);
          o(r, e);
          return r;
        };
      Object.defineProperty(r, '__esModule', { value: true });
      r.getOctokitOptions = r.GitHub = r.context = void 0;
      const i = n(t(566));
      const a = n(t(668));
      const c = t(544);
      const u = t(10);
      const p = t(36);
      r.context = new i.Context();
      const l = a.getApiBaseUrl();
      const d = { baseUrl: l, request: { agent: a.getProxyAgent(l) } };
      r.GitHub = c.Octokit.plugin(u.restEndpointMethods, p.paginateRest).defaults(d);
      function getOctokitOptions(e, r) {
        const t = Object.assign({}, r || {});
        const s = a.getAuthString(e, t);
        if (s) {
          t.auth = s;
        }
        return t;
      }
      r.getOctokitOptions = getOctokitOptions;
    },
    120: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      const s = t(605);
      const o = t(211);
      const n = t(806);
      let i;
      var a;
      (function (e) {
        e[(e['OK'] = 200)] = 'OK';
        e[(e['MultipleChoices'] = 300)] = 'MultipleChoices';
        e[(e['MovedPermanently'] = 301)] = 'MovedPermanently';
        e[(e['ResourceMoved'] = 302)] = 'ResourceMoved';
        e[(e['SeeOther'] = 303)] = 'SeeOther';
        e[(e['NotModified'] = 304)] = 'NotModified';
        e[(e['UseProxy'] = 305)] = 'UseProxy';
        e[(e['SwitchProxy'] = 306)] = 'SwitchProxy';
        e[(e['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
        e[(e['PermanentRedirect'] = 308)] = 'PermanentRedirect';
        e[(e['BadRequest'] = 400)] = 'BadRequest';
        e[(e['Unauthorized'] = 401)] = 'Unauthorized';
        e[(e['PaymentRequired'] = 402)] = 'PaymentRequired';
        e[(e['Forbidden'] = 403)] = 'Forbidden';
        e[(e['NotFound'] = 404)] = 'NotFound';
        e[(e['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
        e[(e['NotAcceptable'] = 406)] = 'NotAcceptable';
        e[(e['ProxyAuthenticationRequired'] = 407)] = 'ProxyAuthenticationRequired';
        e[(e['RequestTimeout'] = 408)] = 'RequestTimeout';
        e[(e['Conflict'] = 409)] = 'Conflict';
        e[(e['Gone'] = 410)] = 'Gone';
        e[(e['TooManyRequests'] = 429)] = 'TooManyRequests';
        e[(e['InternalServerError'] = 500)] = 'InternalServerError';
        e[(e['NotImplemented'] = 501)] = 'NotImplemented';
        e[(e['BadGateway'] = 502)] = 'BadGateway';
        e[(e['ServiceUnavailable'] = 503)] = 'ServiceUnavailable';
        e[(e['GatewayTimeout'] = 504)] = 'GatewayTimeout';
      })((a = r.HttpCodes || (r.HttpCodes = {})));
      var c;
      (function (e) {
        e['Accept'] = 'accept';
        e['ContentType'] = 'content-type';
      })((c = r.Headers || (r.Headers = {})));
      var u;
      (function (e) {
        e['ApplicationJson'] = 'application/json';
      })((u = r.MediaTypes || (r.MediaTypes = {})));
      function getProxyUrl(e) {
        let r = n.getProxyUrl(new URL(e));
        return r ? r.href : '';
      }
      r.getProxyUrl = getProxyUrl;
      const p = [a.MovedPermanently, a.ResourceMoved, a.SeeOther, a.TemporaryRedirect, a.PermanentRedirect];
      const l = [a.BadGateway, a.ServiceUnavailable, a.GatewayTimeout];
      const d = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
      const m = 10;
      const g = 5;
      class HttpClientError extends Error {
        constructor(e, r) {
          super(e);
          this.name = 'HttpClientError';
          this.statusCode = r;
          Object.setPrototypeOf(this, HttpClientError.prototype);
        }
      }
      r.HttpClientError = HttpClientError;
      class HttpClientResponse {
        constructor(e) {
          this.message = e;
        }
        readBody() {
          return new Promise(async (e, r) => {
            let t = Buffer.alloc(0);
            this.message.on('data', (e) => {
              t = Buffer.concat([t, e]);
            });
            this.message.on('end', () => {
              e(t.toString());
            });
          });
        }
      }
      r.HttpClientResponse = HttpClientResponse;
      function isHttps(e) {
        let r = new URL(e);
        return r.protocol === 'https:';
      }
      r.isHttps = isHttps;
      class HttpClient {
        constructor(e, r, t) {
          this._ignoreSslError = false;
          this._allowRedirects = true;
          this._allowRedirectDowngrade = false;
          this._maxRedirects = 50;
          this._allowRetries = false;
          this._maxRetries = 1;
          this._keepAlive = false;
          this._disposed = false;
          this.userAgent = e;
          this.handlers = r || [];
          this.requestOptions = t;
          if (t) {
            if (t.ignoreSslError != null) {
              this._ignoreSslError = t.ignoreSslError;
            }
            this._socketTimeout = t.socketTimeout;
            if (t.allowRedirects != null) {
              this._allowRedirects = t.allowRedirects;
            }
            if (t.allowRedirectDowngrade != null) {
              this._allowRedirectDowngrade = t.allowRedirectDowngrade;
            }
            if (t.maxRedirects != null) {
              this._maxRedirects = Math.max(t.maxRedirects, 0);
            }
            if (t.keepAlive != null) {
              this._keepAlive = t.keepAlive;
            }
            if (t.allowRetries != null) {
              this._allowRetries = t.allowRetries;
            }
            if (t.maxRetries != null) {
              this._maxRetries = t.maxRetries;
            }
          }
        }
        options(e, r) {
          return this.request('OPTIONS', e, null, r || {});
        }
        get(e, r) {
          return this.request('GET', e, null, r || {});
        }
        del(e, r) {
          return this.request('DELETE', e, null, r || {});
        }
        post(e, r, t) {
          return this.request('POST', e, r, t || {});
        }
        patch(e, r, t) {
          return this.request('PATCH', e, r, t || {});
        }
        put(e, r, t) {
          return this.request('PUT', e, r, t || {});
        }
        head(e, r) {
          return this.request('HEAD', e, null, r || {});
        }
        sendStream(e, r, t, s) {
          return this.request(e, r, t, s);
        }
        async getJson(e, r = {}) {
          r[c.Accept] = this._getExistingOrDefaultHeader(r, c.Accept, u.ApplicationJson);
          let t = await this.get(e, r);
          return this._processResponse(t, this.requestOptions);
        }
        async postJson(e, r, t = {}) {
          let s = JSON.stringify(r, null, 2);
          t[c.Accept] = this._getExistingOrDefaultHeader(t, c.Accept, u.ApplicationJson);
          t[c.ContentType] = this._getExistingOrDefaultHeader(t, c.ContentType, u.ApplicationJson);
          let o = await this.post(e, s, t);
          return this._processResponse(o, this.requestOptions);
        }
        async putJson(e, r, t = {}) {
          let s = JSON.stringify(r, null, 2);
          t[c.Accept] = this._getExistingOrDefaultHeader(t, c.Accept, u.ApplicationJson);
          t[c.ContentType] = this._getExistingOrDefaultHeader(t, c.ContentType, u.ApplicationJson);
          let o = await this.put(e, s, t);
          return this._processResponse(o, this.requestOptions);
        }
        async patchJson(e, r, t = {}) {
          let s = JSON.stringify(r, null, 2);
          t[c.Accept] = this._getExistingOrDefaultHeader(t, c.Accept, u.ApplicationJson);
          t[c.ContentType] = this._getExistingOrDefaultHeader(t, c.ContentType, u.ApplicationJson);
          let o = await this.patch(e, s, t);
          return this._processResponse(o, this.requestOptions);
        }
        async request(e, r, t, s) {
          if (this._disposed) {
            throw new Error('Client has already been disposed.');
          }
          let o = new URL(r);
          let n = this._prepareRequest(e, o, s);
          let i = this._allowRetries && d.indexOf(e) != -1 ? this._maxRetries + 1 : 1;
          let c = 0;
          let u;
          while (c < i) {
            u = await this.requestRaw(n, t);
            if (u && u.message && u.message.statusCode === a.Unauthorized) {
              let e;
              for (let r = 0; r < this.handlers.length; r++) {
                if (this.handlers[r].canHandleAuthentication(u)) {
                  e = this.handlers[r];
                  break;
                }
              }
              if (e) {
                return e.handleAuthentication(this, n, t);
              } else {
                return u;
              }
            }
            let r = this._maxRedirects;
            while (p.indexOf(u.message.statusCode) != -1 && this._allowRedirects && r > 0) {
              const i = u.message.headers['location'];
              if (!i) {
                break;
              }
              let a = new URL(i);
              if (o.protocol == 'https:' && o.protocol != a.protocol && !this._allowRedirectDowngrade) {
                throw new Error(
                  'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.'
                );
              }
              await u.readBody();
              if (a.hostname !== o.hostname) {
                for (let e in s) {
                  if (e.toLowerCase() === 'authorization') {
                    delete s[e];
                  }
                }
              }
              n = this._prepareRequest(e, a, s);
              u = await this.requestRaw(n, t);
              r--;
            }
            if (l.indexOf(u.message.statusCode) == -1) {
              return u;
            }
            c += 1;
            if (c < i) {
              await u.readBody();
              await this._performExponentialBackoff(c);
            }
          }
          return u;
        }
        dispose() {
          if (this._agent) {
            this._agent.destroy();
          }
          this._disposed = true;
        }
        requestRaw(e, r) {
          return new Promise((t, s) => {
            let callbackForResult = function (e, r) {
              if (e) {
                s(e);
              }
              t(r);
            };
            this.requestRawWithCallback(e, r, callbackForResult);
          });
        }
        requestRawWithCallback(e, r, t) {
          let s;
          if (typeof r === 'string') {
            e.options.headers['Content-Length'] = Buffer.byteLength(r, 'utf8');
          }
          let o = false;
          let handleResult = (e, r) => {
            if (!o) {
              o = true;
              t(e, r);
            }
          };
          let n = e.httpModule.request(e.options, (e) => {
            let r = new HttpClientResponse(e);
            handleResult(null, r);
          });
          n.on('socket', (e) => {
            s = e;
          });
          n.setTimeout(this._socketTimeout || 3 * 6e4, () => {
            if (s) {
              s.end();
            }
            handleResult(new Error('Request timeout: ' + e.options.path), null);
          });
          n.on('error', function (e) {
            handleResult(e, null);
          });
          if (r && typeof r === 'string') {
            n.write(r, 'utf8');
          }
          if (r && typeof r !== 'string') {
            r.on('close', function () {
              n.end();
            });
            r.pipe(n);
          } else {
            n.end();
          }
        }
        getAgent(e) {
          let r = new URL(e);
          return this._getAgent(r);
        }
        _prepareRequest(e, r, t) {
          const n = {};
          n.parsedUrl = r;
          const i = n.parsedUrl.protocol === 'https:';
          n.httpModule = i ? o : s;
          const a = i ? 443 : 80;
          n.options = {};
          n.options.host = n.parsedUrl.hostname;
          n.options.port = n.parsedUrl.port ? parseInt(n.parsedUrl.port) : a;
          n.options.path = (n.parsedUrl.pathname || '') + (n.parsedUrl.search || '');
          n.options.method = e;
          n.options.headers = this._mergeHeaders(t);
          if (this.userAgent != null) {
            n.options.headers['user-agent'] = this.userAgent;
          }
          n.options.agent = this._getAgent(n.parsedUrl);
          if (this.handlers) {
            this.handlers.forEach((e) => {
              e.prepareRequest(n.options);
            });
          }
          return n;
        }
        _mergeHeaders(e) {
          const lowercaseKeys = (e) => Object.keys(e).reduce((r, t) => ((r[t.toLowerCase()] = e[t]), r), {});
          if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(e));
          }
          return lowercaseKeys(e || {});
        }
        _getExistingOrDefaultHeader(e, r, t) {
          const lowercaseKeys = (e) => Object.keys(e).reduce((r, t) => ((r[t.toLowerCase()] = e[t]), r), {});
          let s;
          if (this.requestOptions && this.requestOptions.headers) {
            s = lowercaseKeys(this.requestOptions.headers)[r];
          }
          return e[r] || s || t;
        }
        _getAgent(e) {
          let r;
          let a = n.getProxyUrl(e);
          let c = a && a.hostname;
          if (this._keepAlive && c) {
            r = this._proxyAgent;
          }
          if (this._keepAlive && !c) {
            r = this._agent;
          }
          if (!!r) {
            return r;
          }
          const u = e.protocol === 'https:';
          let p = 100;
          if (!!this.requestOptions) {
            p = this.requestOptions.maxSockets || s.globalAgent.maxSockets;
          }
          if (c) {
            if (!i) {
              i = t(109);
            }
            const e = {
              maxSockets: p,
              keepAlive: this._keepAlive,
              proxy: {
                ...((a.username || a.password) && { proxyAuth: `${a.username}:${a.password}` }),
                host: a.hostname,
                port: a.port
              }
            };
            let s;
            const o = a.protocol === 'https:';
            if (u) {
              s = o ? i.httpsOverHttps : i.httpsOverHttp;
            } else {
              s = o ? i.httpOverHttps : i.httpOverHttp;
            }
            r = s(e);
            this._proxyAgent = r;
          }
          if (this._keepAlive && !r) {
            const e = { keepAlive: this._keepAlive, maxSockets: p };
            r = u ? new o.Agent(e) : new s.Agent(e);
            this._agent = r;
          }
          if (!r) {
            r = u ? o.globalAgent : s.globalAgent;
          }
          if (u && this._ignoreSslError) {
            r.options = Object.assign(r.options || {}, { rejectUnauthorized: false });
          }
          return r;
        }
        _performExponentialBackoff(e) {
          e = Math.min(m, e);
          const r = g * Math.pow(2, e);
          return new Promise((e) => setTimeout(() => e(), r));
        }
        static dateTimeDeserializer(e, r) {
          if (typeof r === 'string') {
            let e = new Date(r);
            if (!isNaN(e.valueOf())) {
              return e;
            }
          }
          return r;
        }
        async _processResponse(e, r) {
          return new Promise(async (t, s) => {
            const o = e.message.statusCode;
            const n = { statusCode: o, result: null, headers: {} };
            if (o == a.NotFound) {
              t(n);
            }
            let i;
            let c;
            try {
              c = await e.readBody();
              if (c && c.length > 0) {
                if (r && r.deserializeDates) {
                  i = JSON.parse(c, HttpClient.dateTimeDeserializer);
                } else {
                  i = JSON.parse(c);
                }
                n.result = i;
              }
              n.headers = e.message.headers;
            } catch (e) {}
            if (o > 299) {
              let e;
              if (i && i.message) {
                e = i.message;
              } else if (c && c.length > 0) {
                e = c;
              } else {
                e = 'Failed request: (' + o + ')';
              }
              let r = new HttpClientError(e, o);
              r.result = n.result;
              s(r);
            } else {
              t(n);
            }
          });
        }
      }
      r.HttpClient = HttpClient;
    },
    806: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      function getProxyUrl(e) {
        let r = e.protocol === 'https:';
        let t;
        if (checkBypass(e)) {
          return t;
        }
        let s;
        if (r) {
          s = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        } else {
          s = process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
        if (s) {
          t = new URL(s);
        }
        return t;
      }
      r.getProxyUrl = getProxyUrl;
      function checkBypass(e) {
        if (!e.hostname) {
          return false;
        }
        let r = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
        if (!r) {
          return false;
        }
        let t;
        if (e.port) {
          t = Number(e.port);
        } else if (e.protocol === 'http:') {
          t = 80;
        } else if (e.protocol === 'https:') {
          t = 443;
        }
        let s = [e.hostname.toUpperCase()];
        if (typeof t === 'number') {
          s.push(`${s[0]}:${t}`);
        }
        for (let e of r
          .split(',')
          .map((e) => e.trim().toUpperCase())
          .filter((e) => e)) {
          if (s.some((r) => r === e)) {
            return true;
          }
        }
        return false;
      }
      r.checkBypass = checkBypass;
    },
    870: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      async function auth(e) {
        const r = e.split(/\./).length === 3 ? 'app' : /^v\d+\./.test(e) ? 'installation' : 'oauth';
        return { type: 'token', token: e, tokenType: r };
      }
      function withAuthorizationPrefix(e) {
        if (e.split(/\./).length === 3) {
          return `bearer ${e}`;
        }
        return `token ${e}`;
      }
      async function hook(e, r, t, s) {
        const o = r.endpoint.merge(t, s);
        o.headers.authorization = withAuthorizationPrefix(e);
        return r(o);
      }
      const t = function createTokenAuth(e) {
        if (!e) {
          throw new Error('[@octokit/auth-token] No token passed to createTokenAuth');
        }
        if (typeof e !== 'string') {
          throw new Error('[@octokit/auth-token] Token passed to createTokenAuth is not a string');
        }
        e = e.replace(/^(token|bearer) +/i, '');
        return Object.assign(auth.bind(null, e), { hook: hook.bind(null, e) });
      };
      r.createTokenAuth = t;
    },
    544: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      var s = t(546);
      var o = t(887);
      var n = t(142);
      var i = t(258);
      var a = t(870);
      function _objectWithoutPropertiesLoose(e, r) {
        if (e == null) return {};
        var t = {};
        var s = Object.keys(e);
        var o, n;
        for (n = 0; n < s.length; n++) {
          o = s[n];
          if (r.indexOf(o) >= 0) continue;
          t[o] = e[o];
        }
        return t;
      }
      function _objectWithoutProperties(e, r) {
        if (e == null) return {};
        var t = _objectWithoutPropertiesLoose(e, r);
        var s, o;
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          for (o = 0; o < n.length; o++) {
            s = n[o];
            if (r.indexOf(s) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(e, s)) continue;
            t[s] = e[s];
          }
        }
        return t;
      }
      const c = '3.5.1';
      const u = ['authStrategy'];
      class Octokit {
        constructor(e = {}) {
          const r = new o.Collection();
          const t = {
            baseUrl: n.request.endpoint.DEFAULTS.baseUrl,
            headers: {},
            request: Object.assign({}, e.request, { hook: r.bind(null, 'request') }),
            mediaType: { previews: [], format: '' }
          };
          t.headers['user-agent'] = [e.userAgent, `octokit-core.js/${c} ${s.getUserAgent()}`].filter(Boolean).join(' ');
          if (e.baseUrl) {
            t.baseUrl = e.baseUrl;
          }
          if (e.previews) {
            t.mediaType.previews = e.previews;
          }
          if (e.timeZone) {
            t.headers['time-zone'] = e.timeZone;
          }
          this.request = n.request.defaults(t);
          this.graphql = i.withCustomRequest(this.request).defaults(t);
          this.log = Object.assign(
            { debug: () => {}, info: () => {}, warn: console.warn.bind(console), error: console.error.bind(console) },
            e.log
          );
          this.hook = r;
          if (!e.authStrategy) {
            if (!e.auth) {
              this.auth = async () => ({ type: 'unauthenticated' });
            } else {
              const t = a.createTokenAuth(e.auth);
              r.wrap('request', t.hook);
              this.auth = t;
            }
          } else {
            const { authStrategy: t } = e,
              s = _objectWithoutProperties(e, u);
            const o = t(
              Object.assign({ request: this.request, log: this.log, octokit: this, octokitOptions: s }, e.auth)
            );
            r.wrap('request', o.hook);
            this.auth = o;
          }
          const p = this.constructor;
          p.plugins.forEach((r) => {
            Object.assign(this, r(this, e));
          });
        }
        static defaults(e) {
          const r = class extends this {
            constructor(...r) {
              const t = r[0] || {};
              if (typeof e === 'function') {
                super(e(t));
                return;
              }
              super(
                Object.assign(
                  {},
                  e,
                  t,
                  t.userAgent && e.userAgent ? { userAgent: `${t.userAgent} ${e.userAgent}` } : null
                )
              );
            }
          };
          return r;
        }
        static plugin(...e) {
          var r;
          const t = this.plugins;
          const s = ((r = class extends this {}), (r.plugins = t.concat(e.filter((e) => !t.includes(e)))), r);
          return s;
        }
      }
      Octokit.VERSION = c;
      Octokit.plugins = [];
      r.Octokit = Octokit;
    },
    273: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      var s = t(375);
      var o = t(546);
      function lowercaseKeys(e) {
        if (!e) {
          return {};
        }
        return Object.keys(e).reduce((r, t) => {
          r[t.toLowerCase()] = e[t];
          return r;
        }, {});
      }
      function mergeDeep(e, r) {
        const t = Object.assign({}, e);
        Object.keys(r).forEach((o) => {
          if (s.isPlainObject(r[o])) {
            if (!(o in e)) Object.assign(t, { [o]: r[o] });
            else t[o] = mergeDeep(e[o], r[o]);
          } else {
            Object.assign(t, { [o]: r[o] });
          }
        });
        return t;
      }
      function removeUndefinedProperties(e) {
        for (const r in e) {
          if (e[r] === undefined) {
            delete e[r];
          }
        }
        return e;
      }
      function merge(e, r, t) {
        if (typeof r === 'string') {
          let [e, s] = r.split(' ');
          t = Object.assign(s ? { method: e, url: s } : { url: e }, t);
        } else {
          t = Object.assign({}, r);
        }
        t.headers = lowercaseKeys(t.headers);
        removeUndefinedProperties(t);
        removeUndefinedProperties(t.headers);
        const s = mergeDeep(e || {}, t);
        if (e && e.mediaType.previews.length) {
          s.mediaType.previews = e.mediaType.previews
            .filter((e) => !s.mediaType.previews.includes(e))
            .concat(s.mediaType.previews);
        }
        s.mediaType.previews = s.mediaType.previews.map((e) => e.replace(/-preview/, ''));
        return s;
      }
      function addQueryParameters(e, r) {
        const t = /\?/.test(e) ? '&' : '?';
        const s = Object.keys(r);
        if (s.length === 0) {
          return e;
        }
        return (
          e +
          t +
          s
            .map((e) => {
              if (e === 'q') {
                return 'q=' + r.q.split('+').map(encodeURIComponent).join('+');
              }
              return `${e}=${encodeURIComponent(r[e])}`;
            })
            .join('&')
        );
      }
      const n = /\{[^}]+\}/g;
      function removeNonChars(e) {
        return e.replace(/^\W+|\W+$/g, '').split(/,/);
      }
      function extractUrlVariableNames(e) {
        const r = e.match(n);
        if (!r) {
          return [];
        }
        return r.map(removeNonChars).reduce((e, r) => e.concat(r), []);
      }
      function omit(e, r) {
        return Object.keys(e)
          .filter((e) => !r.includes(e))
          .reduce((r, t) => {
            r[t] = e[t];
            return r;
          }, {});
      }
      function encodeReserved(e) {
        return e
          .split(/(%[0-9A-Fa-f]{2})/g)
          .map(function (e) {
            if (!/%[0-9A-Fa-f]/.test(e)) {
              e = encodeURI(e).replace(/%5B/g, '[').replace(/%5D/g, ']');
            }
            return e;
          })
          .join('');
      }
      function encodeUnreserved(e) {
        return encodeURIComponent(e).replace(/[!'()*]/g, function (e) {
          return '%' + e.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      function encodeValue(e, r, t) {
        r = e === '+' || e === '#' ? encodeReserved(r) : encodeUnreserved(r);
        if (t) {
          return encodeUnreserved(t) + '=' + r;
        } else {
          return r;
        }
      }
      function isDefined(e) {
        return e !== undefined && e !== null;
      }
      function isKeyOperator(e) {
        return e === ';' || e === '&' || e === '?';
      }
      function getValues(e, r, t, s) {
        var o = e[t],
          n = [];
        if (isDefined(o) && o !== '') {
          if (typeof o === 'string' || typeof o === 'number' || typeof o === 'boolean') {
            o = o.toString();
            if (s && s !== '*') {
              o = o.substring(0, parseInt(s, 10));
            }
            n.push(encodeValue(r, o, isKeyOperator(r) ? t : ''));
          } else {
            if (s === '*') {
              if (Array.isArray(o)) {
                o.filter(isDefined).forEach(function (e) {
                  n.push(encodeValue(r, e, isKeyOperator(r) ? t : ''));
                });
              } else {
                Object.keys(o).forEach(function (e) {
                  if (isDefined(o[e])) {
                    n.push(encodeValue(r, o[e], e));
                  }
                });
              }
            } else {
              const e = [];
              if (Array.isArray(o)) {
                o.filter(isDefined).forEach(function (t) {
                  e.push(encodeValue(r, t));
                });
              } else {
                Object.keys(o).forEach(function (t) {
                  if (isDefined(o[t])) {
                    e.push(encodeUnreserved(t));
                    e.push(encodeValue(r, o[t].toString()));
                  }
                });
              }
              if (isKeyOperator(r)) {
                n.push(encodeUnreserved(t) + '=' + e.join(','));
              } else if (e.length !== 0) {
                n.push(e.join(','));
              }
            }
          }
        } else {
          if (r === ';') {
            if (isDefined(o)) {
              n.push(encodeUnreserved(t));
            }
          } else if (o === '' && (r === '&' || r === '?')) {
            n.push(encodeUnreserved(t) + '=');
          } else if (o === '') {
            n.push('');
          }
        }
        return n;
      }
      function parseUrl(e) {
        return { expand: expand.bind(null, e) };
      }
      function expand(e, r) {
        var t = ['+', '#', '.', '/', ';', '?', '&'];
        return e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (e, s, o) {
          if (s) {
            let e = '';
            const o = [];
            if (t.indexOf(s.charAt(0)) !== -1) {
              e = s.charAt(0);
              s = s.substr(1);
            }
            s.split(/,/g).forEach(function (t) {
              var s = /([^:\*]*)(?::(\d+)|(\*))?/.exec(t);
              o.push(getValues(r, e, s[1], s[2] || s[3]));
            });
            if (e && e !== '+') {
              var n = ',';
              if (e === '?') {
                n = '&';
              } else if (e !== '#') {
                n = e;
              }
              return (o.length !== 0 ? e : '') + o.join(n);
            } else {
              return o.join(',');
            }
          } else {
            return encodeReserved(o);
          }
        });
      }
      function parse(e) {
        let r = e.method.toUpperCase();
        let t = (e.url || '/').replace(/:([a-z]\w+)/g, '{$1}');
        let s = Object.assign({}, e.headers);
        let o;
        let n = omit(e, ['method', 'baseUrl', 'url', 'headers', 'request', 'mediaType']);
        const i = extractUrlVariableNames(t);
        t = parseUrl(t).expand(n);
        if (!/^http/.test(t)) {
          t = e.baseUrl + t;
        }
        const a = Object.keys(e)
          .filter((e) => i.includes(e))
          .concat('baseUrl');
        const c = omit(n, a);
        const u = /application\/octet-stream/i.test(s.accept);
        if (!u) {
          if (e.mediaType.format) {
            s.accept = s.accept
              .split(/,/)
              .map((r) =>
                r.replace(
                  /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
                  `application/vnd$1$2.${e.mediaType.format}`
                )
              )
              .join(',');
          }
          if (e.mediaType.previews.length) {
            const r = s.accept.match(/[\w-]+(?=-preview)/g) || [];
            s.accept = r
              .concat(e.mediaType.previews)
              .map((r) => {
                const t = e.mediaType.format ? `.${e.mediaType.format}` : '+json';
                return `application/vnd.github.${r}-preview${t}`;
              })
              .join(',');
          }
        }
        if (['GET', 'HEAD'].includes(r)) {
          t = addQueryParameters(t, c);
        } else {
          if ('data' in c) {
            o = c.data;
          } else {
            if (Object.keys(c).length) {
              o = c;
            } else {
              s['content-length'] = 0;
            }
          }
        }
        if (!s['content-type'] && typeof o !== 'undefined') {
          s['content-type'] = 'application/json; charset=utf-8';
        }
        if (['PATCH', 'PUT'].includes(r) && typeof o === 'undefined') {
          o = '';
        }
        return Object.assign(
          { method: r, url: t, headers: s },
          typeof o !== 'undefined' ? { body: o } : null,
          e.request ? { request: e.request } : null
        );
      }
      function endpointWithDefaults(e, r, t) {
        return parse(merge(e, r, t));
      }
      function withDefaults(e, r) {
        const t = merge(e, r);
        const s = endpointWithDefaults.bind(null, t);
        return Object.assign(s, {
          DEFAULTS: t,
          defaults: withDefaults.bind(null, t),
          merge: merge.bind(null, t),
          parse: parse
        });
      }
      const i = '6.0.12';
      const a = `octokit-endpoint.js/${i} ${o.getUserAgent()}`;
      const c = {
        method: 'GET',
        baseUrl: 'https://api.github.com',
        headers: { accept: 'application/vnd.github.v3+json', 'user-agent': a },
        mediaType: { format: '', previews: [] }
      };
      const u = withDefaults(null, c);
      r.endpoint = u;
    },
    258: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      var s = t(142);
      var o = t(546);
      const n = '4.6.4';
      class GraphqlError extends Error {
        constructor(e, r) {
          const t = r.data.errors[0].message;
          super(t);
          Object.assign(this, r.data);
          Object.assign(this, { headers: r.headers });
          this.name = 'GraphqlError';
          this.request = e;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        }
      }
      const i = ['method', 'baseUrl', 'url', 'headers', 'request', 'query', 'mediaType'];
      const a = ['query', 'method', 'url'];
      const c = /\/api\/v3\/?$/;
      function graphql(e, r, t) {
        if (t) {
          if (typeof r === 'string' && 'query' in t) {
            return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
          }
          for (const e in t) {
            if (!a.includes(e)) continue;
            return Promise.reject(new Error(`[@octokit/graphql] "${e}" cannot be used as variable name`));
          }
        }
        const s = typeof r === 'string' ? Object.assign({ query: r }, t) : r;
        const o = Object.keys(s).reduce((e, r) => {
          if (i.includes(r)) {
            e[r] = s[r];
            return e;
          }
          if (!e.variables) {
            e.variables = {};
          }
          e.variables[r] = s[r];
          return e;
        }, {});
        const n = s.baseUrl || e.endpoint.DEFAULTS.baseUrl;
        if (c.test(n)) {
          o.url = n.replace(c, '/api/graphql');
        }
        return e(o).then((e) => {
          if (e.data.errors) {
            const r = {};
            for (const t of Object.keys(e.headers)) {
              r[t] = e.headers[t];
            }
            throw new GraphqlError(o, { headers: r, data: e.data });
          }
          return e.data.data;
        });
      }
      function withDefaults(e, r) {
        const t = e.defaults(r);
        const newApi = (e, r) => graphql(t, e, r);
        return Object.assign(newApi, { defaults: withDefaults.bind(null, t), endpoint: s.request.endpoint });
      }
      const u = withDefaults(s.request, {
        headers: { 'user-agent': `octokit-graphql.js/${n} ${o.getUserAgent()}` },
        method: 'POST',
        url: '/graphql'
      });
      function withCustomRequest(e) {
        return withDefaults(e, { method: 'POST', url: '/graphql' });
      }
      r.graphql = u;
      r.withCustomRequest = withCustomRequest;
    },
    36: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      const t = '2.13.6';
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(e);
          if (r) {
            s = s.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            });
          }
          t.push.apply(t, s);
        }
        return t;
      }
      function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r] != null ? arguments[r] : {};
          if (r % 2) {
            ownKeys(Object(t), true).forEach(function (r) {
              _defineProperty(e, r, t[r]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(t));
          } else {
            ownKeys(Object(t)).forEach(function (r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
          }
        }
        return e;
      }
      function _defineProperty(e, r, t) {
        if (r in e) {
          Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true });
        } else {
          e[r] = t;
        }
        return e;
      }
      function normalizePaginatedListResponse(e) {
        if (!e.data) {
          return _objectSpread2(_objectSpread2({}, e), {}, { data: [] });
        }
        const r = 'total_count' in e.data && !('url' in e.data);
        if (!r) return e;
        const t = e.data.incomplete_results;
        const s = e.data.repository_selection;
        const o = e.data.total_count;
        delete e.data.incomplete_results;
        delete e.data.repository_selection;
        delete e.data.total_count;
        const n = Object.keys(e.data)[0];
        const i = e.data[n];
        e.data = i;
        if (typeof t !== 'undefined') {
          e.data.incomplete_results = t;
        }
        if (typeof s !== 'undefined') {
          e.data.repository_selection = s;
        }
        e.data.total_count = o;
        return e;
      }
      function iterator(e, r, t) {
        const s = typeof r === 'function' ? r.endpoint(t) : e.request.endpoint(r, t);
        const o = typeof r === 'function' ? r : e.request;
        const n = s.method;
        const i = s.headers;
        let a = s.url;
        return {
          [Symbol.asyncIterator]: () => ({
            async next() {
              if (!a) return { done: true };
              try {
                const e = await o({ method: n, url: a, headers: i });
                const r = normalizePaginatedListResponse(e);
                a = ((r.headers.link || '').match(/<([^>]+)>;\s*rel="next"/) || [])[1];
                return { value: r };
              } catch (e) {
                if (e.status !== 409) throw e;
                a = '';
                return { value: { status: 200, headers: {}, data: [] } };
              }
            }
          })
        };
      }
      function paginate(e, r, t, s) {
        if (typeof t === 'function') {
          s = t;
          t = undefined;
        }
        return gather(e, [], iterator(e, r, t)[Symbol.asyncIterator](), s);
      }
      function gather(e, r, t, s) {
        return t.next().then((o) => {
          if (o.done) {
            return r;
          }
          let n = false;
          function done() {
            n = true;
          }
          r = r.concat(s ? s(o.value, done) : o.value.data);
          if (n) {
            return r;
          }
          return gather(e, r, t, s);
        });
      }
      const s = Object.assign(paginate, { iterator: iterator });
      const o = [
        'GET /app/installations',
        'GET /applications/grants',
        'GET /authorizations',
        'GET /enterprises/{enterprise}/actions/permissions/organizations',
        'GET /enterprises/{enterprise}/actions/runner-groups',
        'GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations',
        'GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners',
        'GET /enterprises/{enterprise}/actions/runners',
        'GET /enterprises/{enterprise}/actions/runners/downloads',
        'GET /events',
        'GET /gists',
        'GET /gists/public',
        'GET /gists/starred',
        'GET /gists/{gist_id}/comments',
        'GET /gists/{gist_id}/commits',
        'GET /gists/{gist_id}/forks',
        'GET /installation/repositories',
        'GET /issues',
        'GET /marketplace_listing/plans',
        'GET /marketplace_listing/plans/{plan_id}/accounts',
        'GET /marketplace_listing/stubbed/plans',
        'GET /marketplace_listing/stubbed/plans/{plan_id}/accounts',
        'GET /networks/{owner}/{repo}/events',
        'GET /notifications',
        'GET /organizations',
        'GET /orgs/{org}/actions/permissions/repositories',
        'GET /orgs/{org}/actions/runner-groups',
        'GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories',
        'GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners',
        'GET /orgs/{org}/actions/runners',
        'GET /orgs/{org}/actions/runners/downloads',
        'GET /orgs/{org}/actions/secrets',
        'GET /orgs/{org}/actions/secrets/{secret_name}/repositories',
        'GET /orgs/{org}/blocks',
        'GET /orgs/{org}/credential-authorizations',
        'GET /orgs/{org}/events',
        'GET /orgs/{org}/failed_invitations',
        'GET /orgs/{org}/hooks',
        'GET /orgs/{org}/installations',
        'GET /orgs/{org}/invitations',
        'GET /orgs/{org}/invitations/{invitation_id}/teams',
        'GET /orgs/{org}/issues',
        'GET /orgs/{org}/members',
        'GET /orgs/{org}/migrations',
        'GET /orgs/{org}/migrations/{migration_id}/repositories',
        'GET /orgs/{org}/outside_collaborators',
        'GET /orgs/{org}/projects',
        'GET /orgs/{org}/public_members',
        'GET /orgs/{org}/repos',
        'GET /orgs/{org}/team-sync/groups',
        'GET /orgs/{org}/teams',
        'GET /orgs/{org}/teams/{team_slug}/discussions',
        'GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments',
        'GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions',
        'GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions',
        'GET /orgs/{org}/teams/{team_slug}/invitations',
        'GET /orgs/{org}/teams/{team_slug}/members',
        'GET /orgs/{org}/teams/{team_slug}/projects',
        'GET /orgs/{org}/teams/{team_slug}/repos',
        'GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings',
        'GET /orgs/{org}/teams/{team_slug}/teams',
        'GET /projects/columns/{column_id}/cards',
        'GET /projects/{project_id}/collaborators',
        'GET /projects/{project_id}/columns',
        'GET /repos/{owner}/{repo}/actions/artifacts',
        'GET /repos/{owner}/{repo}/actions/runners',
        'GET /repos/{owner}/{repo}/actions/runners/downloads',
        'GET /repos/{owner}/{repo}/actions/runs',
        'GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts',
        'GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs',
        'GET /repos/{owner}/{repo}/actions/secrets',
        'GET /repos/{owner}/{repo}/actions/workflows',
        'GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs',
        'GET /repos/{owner}/{repo}/assignees',
        'GET /repos/{owner}/{repo}/branches',
        'GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations',
        'GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs',
        'GET /repos/{owner}/{repo}/code-scanning/alerts',
        'GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances',
        'GET /repos/{owner}/{repo}/code-scanning/analyses',
        'GET /repos/{owner}/{repo}/collaborators',
        'GET /repos/{owner}/{repo}/comments',
        'GET /repos/{owner}/{repo}/comments/{comment_id}/reactions',
        'GET /repos/{owner}/{repo}/commits',
        'GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head',
        'GET /repos/{owner}/{repo}/commits/{commit_sha}/comments',
        'GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls',
        'GET /repos/{owner}/{repo}/commits/{ref}/check-runs',
        'GET /repos/{owner}/{repo}/commits/{ref}/check-suites',
        'GET /repos/{owner}/{repo}/commits/{ref}/statuses',
        'GET /repos/{owner}/{repo}/contributors',
        'GET /repos/{owner}/{repo}/deployments',
        'GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
        'GET /repos/{owner}/{repo}/events',
        'GET /repos/{owner}/{repo}/forks',
        'GET /repos/{owner}/{repo}/git/matching-refs/{ref}',
        'GET /repos/{owner}/{repo}/hooks',
        'GET /repos/{owner}/{repo}/invitations',
        'GET /repos/{owner}/{repo}/issues',
        'GET /repos/{owner}/{repo}/issues/comments',
        'GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
        'GET /repos/{owner}/{repo}/issues/events',
        'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
        'GET /repos/{owner}/{repo}/issues/{issue_number}/events',
        'GET /repos/{owner}/{repo}/issues/{issue_number}/labels',
        'GET /repos/{owner}/{repo}/issues/{issue_number}/reactions',
        'GET /repos/{owner}/{repo}/issues/{issue_number}/timeline',
        'GET /repos/{owner}/{repo}/keys',
        'GET /repos/{owner}/{repo}/labels',
        'GET /repos/{owner}/{repo}/milestones',
        'GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels',
        'GET /repos/{owner}/{repo}/notifications',
        'GET /repos/{owner}/{repo}/pages/builds',
        'GET /repos/{owner}/{repo}/projects',
        'GET /repos/{owner}/{repo}/pulls',
        'GET /repos/{owner}/{repo}/pulls/comments',
        'GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions',
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/comments',
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/commits',
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers',
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments',
        'GET /repos/{owner}/{repo}/releases',
        'GET /repos/{owner}/{repo}/releases/{release_id}/assets',
        'GET /repos/{owner}/{repo}/secret-scanning/alerts',
        'GET /repos/{owner}/{repo}/stargazers',
        'GET /repos/{owner}/{repo}/subscribers',
        'GET /repos/{owner}/{repo}/tags',
        'GET /repos/{owner}/{repo}/teams',
        'GET /repositories',
        'GET /repositories/{repository_id}/environments/{environment_name}/secrets',
        'GET /scim/v2/enterprises/{enterprise}/Groups',
        'GET /scim/v2/enterprises/{enterprise}/Users',
        'GET /scim/v2/organizations/{org}/Users',
        'GET /search/code',
        'GET /search/commits',
        'GET /search/issues',
        'GET /search/labels',
        'GET /search/repositories',
        'GET /search/topics',
        'GET /search/users',
        'GET /teams/{team_id}/discussions',
        'GET /teams/{team_id}/discussions/{discussion_number}/comments',
        'GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions',
        'GET /teams/{team_id}/discussions/{discussion_number}/reactions',
        'GET /teams/{team_id}/invitations',
        'GET /teams/{team_id}/members',
        'GET /teams/{team_id}/projects',
        'GET /teams/{team_id}/repos',
        'GET /teams/{team_id}/team-sync/group-mappings',
        'GET /teams/{team_id}/teams',
        'GET /user/blocks',
        'GET /user/emails',
        'GET /user/followers',
        'GET /user/following',
        'GET /user/gpg_keys',
        'GET /user/installations',
        'GET /user/installations/{installation_id}/repositories',
        'GET /user/issues',
        'GET /user/keys',
        'GET /user/marketplace_purchases',
        'GET /user/marketplace_purchases/stubbed',
        'GET /user/memberships/orgs',
        'GET /user/migrations',
        'GET /user/migrations/{migration_id}/repositories',
        'GET /user/orgs',
        'GET /user/public_emails',
        'GET /user/repos',
        'GET /user/repository_invitations',
        'GET /user/starred',
        'GET /user/subscriptions',
        'GET /user/teams',
        'GET /users',
        'GET /users/{username}/events',
        'GET /users/{username}/events/orgs/{org}',
        'GET /users/{username}/events/public',
        'GET /users/{username}/followers',
        'GET /users/{username}/following',
        'GET /users/{username}/gists',
        'GET /users/{username}/gpg_keys',
        'GET /users/{username}/keys',
        'GET /users/{username}/orgs',
        'GET /users/{username}/projects',
        'GET /users/{username}/received_events',
        'GET /users/{username}/received_events/public',
        'GET /users/{username}/repos',
        'GET /users/{username}/starred',
        'GET /users/{username}/subscriptions'
      ];
      function isPaginatingEndpoint(e) {
        if (typeof e === 'string') {
          return o.includes(e);
        } else {
          return false;
        }
      }
      function paginateRest(e) {
        return { paginate: Object.assign(paginate.bind(null, e), { iterator: iterator.bind(null, e) }) };
      }
      paginateRest.VERSION = t;
      r.composePaginateRest = s;
      r.isPaginatingEndpoint = isPaginatingEndpoint;
      r.paginateRest = paginateRest;
      r.paginatingEndpoints = o;
    },
    10: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      function _defineProperty(e, r, t) {
        if (r in e) {
          Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true });
        } else {
          e[r] = t;
        }
        return e;
      }
      function ownKeys(e, r) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(e);
          if (r)
            s = s.filter(function (r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            });
          t.push.apply(t, s);
        }
        return t;
      }
      function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r] != null ? arguments[r] : {};
          if (r % 2) {
            ownKeys(Object(t), true).forEach(function (r) {
              _defineProperty(e, r, t[r]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(t));
          } else {
            ownKeys(Object(t)).forEach(function (r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
          }
        }
        return e;
      }
      const t = {
        actions: {
          addSelectedRepoToOrgSecret: ['PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}'],
          cancelWorkflowRun: ['POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel'],
          createOrUpdateEnvironmentSecret: [
            'PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}'
          ],
          createOrUpdateOrgSecret: ['PUT /orgs/{org}/actions/secrets/{secret_name}'],
          createOrUpdateRepoSecret: ['PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}'],
          createRegistrationTokenForOrg: ['POST /orgs/{org}/actions/runners/registration-token'],
          createRegistrationTokenForRepo: ['POST /repos/{owner}/{repo}/actions/runners/registration-token'],
          createRemoveTokenForOrg: ['POST /orgs/{org}/actions/runners/remove-token'],
          createRemoveTokenForRepo: ['POST /repos/{owner}/{repo}/actions/runners/remove-token'],
          createWorkflowDispatch: ['POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches'],
          deleteArtifact: ['DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}'],
          deleteEnvironmentSecret: [
            'DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}'
          ],
          deleteOrgSecret: ['DELETE /orgs/{org}/actions/secrets/{secret_name}'],
          deleteRepoSecret: ['DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}'],
          deleteSelfHostedRunnerFromOrg: ['DELETE /orgs/{org}/actions/runners/{runner_id}'],
          deleteSelfHostedRunnerFromRepo: ['DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}'],
          deleteWorkflowRun: ['DELETE /repos/{owner}/{repo}/actions/runs/{run_id}'],
          deleteWorkflowRunLogs: ['DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs'],
          disableSelectedRepositoryGithubActionsOrganization: [
            'DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}'
          ],
          disableWorkflow: ['PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable'],
          downloadArtifact: ['GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}'],
          downloadJobLogsForWorkflowRun: ['GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs'],
          downloadWorkflowRunLogs: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs'],
          enableSelectedRepositoryGithubActionsOrganization: [
            'PUT /orgs/{org}/actions/permissions/repositories/{repository_id}'
          ],
          enableWorkflow: ['PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable'],
          getAllowedActionsOrganization: ['GET /orgs/{org}/actions/permissions/selected-actions'],
          getAllowedActionsRepository: ['GET /repos/{owner}/{repo}/actions/permissions/selected-actions'],
          getArtifact: ['GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}'],
          getEnvironmentPublicKey: [
            'GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key'
          ],
          getEnvironmentSecret: [
            'GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}'
          ],
          getGithubActionsPermissionsOrganization: ['GET /orgs/{org}/actions/permissions'],
          getGithubActionsPermissionsRepository: ['GET /repos/{owner}/{repo}/actions/permissions'],
          getJobForWorkflowRun: ['GET /repos/{owner}/{repo}/actions/jobs/{job_id}'],
          getOrgPublicKey: ['GET /orgs/{org}/actions/secrets/public-key'],
          getOrgSecret: ['GET /orgs/{org}/actions/secrets/{secret_name}'],
          getPendingDeploymentsForRun: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments'],
          getRepoPermissions: [
            'GET /repos/{owner}/{repo}/actions/permissions',
            {},
            { renamed: ['actions', 'getGithubActionsPermissionsRepository'] }
          ],
          getRepoPublicKey: ['GET /repos/{owner}/{repo}/actions/secrets/public-key'],
          getRepoSecret: ['GET /repos/{owner}/{repo}/actions/secrets/{secret_name}'],
          getReviewsForRun: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals'],
          getSelfHostedRunnerForOrg: ['GET /orgs/{org}/actions/runners/{runner_id}'],
          getSelfHostedRunnerForRepo: ['GET /repos/{owner}/{repo}/actions/runners/{runner_id}'],
          getWorkflow: ['GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}'],
          getWorkflowRun: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}'],
          getWorkflowRunUsage: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing'],
          getWorkflowUsage: ['GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing'],
          listArtifactsForRepo: ['GET /repos/{owner}/{repo}/actions/artifacts'],
          listEnvironmentSecrets: ['GET /repositories/{repository_id}/environments/{environment_name}/secrets'],
          listJobsForWorkflowRun: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs'],
          listOrgSecrets: ['GET /orgs/{org}/actions/secrets'],
          listRepoSecrets: ['GET /repos/{owner}/{repo}/actions/secrets'],
          listRepoWorkflows: ['GET /repos/{owner}/{repo}/actions/workflows'],
          listRunnerApplicationsForOrg: ['GET /orgs/{org}/actions/runners/downloads'],
          listRunnerApplicationsForRepo: ['GET /repos/{owner}/{repo}/actions/runners/downloads'],
          listSelectedReposForOrgSecret: ['GET /orgs/{org}/actions/secrets/{secret_name}/repositories'],
          listSelectedRepositoriesEnabledGithubActionsOrganization: [
            'GET /orgs/{org}/actions/permissions/repositories'
          ],
          listSelfHostedRunnersForOrg: ['GET /orgs/{org}/actions/runners'],
          listSelfHostedRunnersForRepo: ['GET /repos/{owner}/{repo}/actions/runners'],
          listWorkflowRunArtifacts: ['GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts'],
          listWorkflowRuns: ['GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs'],
          listWorkflowRunsForRepo: ['GET /repos/{owner}/{repo}/actions/runs'],
          reRunWorkflow: ['POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun'],
          removeSelectedRepoFromOrgSecret: [
            'DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}'
          ],
          reviewPendingDeploymentsForRun: ['POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments'],
          setAllowedActionsOrganization: ['PUT /orgs/{org}/actions/permissions/selected-actions'],
          setAllowedActionsRepository: ['PUT /repos/{owner}/{repo}/actions/permissions/selected-actions'],
          setGithubActionsPermissionsOrganization: ['PUT /orgs/{org}/actions/permissions'],
          setGithubActionsPermissionsRepository: ['PUT /repos/{owner}/{repo}/actions/permissions'],
          setSelectedReposForOrgSecret: ['PUT /orgs/{org}/actions/secrets/{secret_name}/repositories'],
          setSelectedRepositoriesEnabledGithubActionsOrganization: ['PUT /orgs/{org}/actions/permissions/repositories']
        },
        activity: {
          checkRepoIsStarredByAuthenticatedUser: ['GET /user/starred/{owner}/{repo}'],
          deleteRepoSubscription: ['DELETE /repos/{owner}/{repo}/subscription'],
          deleteThreadSubscription: ['DELETE /notifications/threads/{thread_id}/subscription'],
          getFeeds: ['GET /feeds'],
          getRepoSubscription: ['GET /repos/{owner}/{repo}/subscription'],
          getThread: ['GET /notifications/threads/{thread_id}'],
          getThreadSubscriptionForAuthenticatedUser: ['GET /notifications/threads/{thread_id}/subscription'],
          listEventsForAuthenticatedUser: ['GET /users/{username}/events'],
          listNotificationsForAuthenticatedUser: ['GET /notifications'],
          listOrgEventsForAuthenticatedUser: ['GET /users/{username}/events/orgs/{org}'],
          listPublicEvents: ['GET /events'],
          listPublicEventsForRepoNetwork: ['GET /networks/{owner}/{repo}/events'],
          listPublicEventsForUser: ['GET /users/{username}/events/public'],
          listPublicOrgEvents: ['GET /orgs/{org}/events'],
          listReceivedEventsForUser: ['GET /users/{username}/received_events'],
          listReceivedPublicEventsForUser: ['GET /users/{username}/received_events/public'],
          listRepoEvents: ['GET /repos/{owner}/{repo}/events'],
          listRepoNotificationsForAuthenticatedUser: ['GET /repos/{owner}/{repo}/notifications'],
          listReposStarredByAuthenticatedUser: ['GET /user/starred'],
          listReposStarredByUser: ['GET /users/{username}/starred'],
          listReposWatchedByUser: ['GET /users/{username}/subscriptions'],
          listStargazersForRepo: ['GET /repos/{owner}/{repo}/stargazers'],
          listWatchedReposForAuthenticatedUser: ['GET /user/subscriptions'],
          listWatchersForRepo: ['GET /repos/{owner}/{repo}/subscribers'],
          markNotificationsAsRead: ['PUT /notifications'],
          markRepoNotificationsAsRead: ['PUT /repos/{owner}/{repo}/notifications'],
          markThreadAsRead: ['PATCH /notifications/threads/{thread_id}'],
          setRepoSubscription: ['PUT /repos/{owner}/{repo}/subscription'],
          setThreadSubscription: ['PUT /notifications/threads/{thread_id}/subscription'],
          starRepoForAuthenticatedUser: ['PUT /user/starred/{owner}/{repo}'],
          unstarRepoForAuthenticatedUser: ['DELETE /user/starred/{owner}/{repo}']
        },
        apps: {
          addRepoToInstallation: ['PUT /user/installations/{installation_id}/repositories/{repository_id}'],
          checkToken: ['POST /applications/{client_id}/token'],
          createContentAttachment: [
            'POST /content_references/{content_reference_id}/attachments',
            { mediaType: { previews: ['corsair'] } }
          ],
          createFromManifest: ['POST /app-manifests/{code}/conversions'],
          createInstallationAccessToken: ['POST /app/installations/{installation_id}/access_tokens'],
          deleteAuthorization: ['DELETE /applications/{client_id}/grant'],
          deleteInstallation: ['DELETE /app/installations/{installation_id}'],
          deleteToken: ['DELETE /applications/{client_id}/token'],
          getAuthenticated: ['GET /app'],
          getBySlug: ['GET /apps/{app_slug}'],
          getInstallation: ['GET /app/installations/{installation_id}'],
          getOrgInstallation: ['GET /orgs/{org}/installation'],
          getRepoInstallation: ['GET /repos/{owner}/{repo}/installation'],
          getSubscriptionPlanForAccount: ['GET /marketplace_listing/accounts/{account_id}'],
          getSubscriptionPlanForAccountStubbed: ['GET /marketplace_listing/stubbed/accounts/{account_id}'],
          getUserInstallation: ['GET /users/{username}/installation'],
          getWebhookConfigForApp: ['GET /app/hook/config'],
          listAccountsForPlan: ['GET /marketplace_listing/plans/{plan_id}/accounts'],
          listAccountsForPlanStubbed: ['GET /marketplace_listing/stubbed/plans/{plan_id}/accounts'],
          listInstallationReposForAuthenticatedUser: ['GET /user/installations/{installation_id}/repositories'],
          listInstallations: ['GET /app/installations'],
          listInstallationsForAuthenticatedUser: ['GET /user/installations'],
          listPlans: ['GET /marketplace_listing/plans'],
          listPlansStubbed: ['GET /marketplace_listing/stubbed/plans'],
          listReposAccessibleToInstallation: ['GET /installation/repositories'],
          listSubscriptionsForAuthenticatedUser: ['GET /user/marketplace_purchases'],
          listSubscriptionsForAuthenticatedUserStubbed: ['GET /user/marketplace_purchases/stubbed'],
          removeRepoFromInstallation: ['DELETE /user/installations/{installation_id}/repositories/{repository_id}'],
          resetToken: ['PATCH /applications/{client_id}/token'],
          revokeInstallationAccessToken: ['DELETE /installation/token'],
          scopeToken: ['POST /applications/{client_id}/token/scoped'],
          suspendInstallation: ['PUT /app/installations/{installation_id}/suspended'],
          unsuspendInstallation: ['DELETE /app/installations/{installation_id}/suspended'],
          updateWebhookConfigForApp: ['PATCH /app/hook/config']
        },
        billing: {
          getGithubActionsBillingOrg: ['GET /orgs/{org}/settings/billing/actions'],
          getGithubActionsBillingUser: ['GET /users/{username}/settings/billing/actions'],
          getGithubPackagesBillingOrg: ['GET /orgs/{org}/settings/billing/packages'],
          getGithubPackagesBillingUser: ['GET /users/{username}/settings/billing/packages'],
          getSharedStorageBillingOrg: ['GET /orgs/{org}/settings/billing/shared-storage'],
          getSharedStorageBillingUser: ['GET /users/{username}/settings/billing/shared-storage']
        },
        checks: {
          create: ['POST /repos/{owner}/{repo}/check-runs'],
          createSuite: ['POST /repos/{owner}/{repo}/check-suites'],
          get: ['GET /repos/{owner}/{repo}/check-runs/{check_run_id}'],
          getSuite: ['GET /repos/{owner}/{repo}/check-suites/{check_suite_id}'],
          listAnnotations: ['GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations'],
          listForRef: ['GET /repos/{owner}/{repo}/commits/{ref}/check-runs'],
          listForSuite: ['GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs'],
          listSuitesForRef: ['GET /repos/{owner}/{repo}/commits/{ref}/check-suites'],
          rerequestSuite: ['POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest'],
          setSuitesPreferences: ['PATCH /repos/{owner}/{repo}/check-suites/preferences'],
          update: ['PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}']
        },
        codeScanning: {
          deleteAnalysis: ['DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}'],
          getAlert: [
            'GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}',
            {},
            { renamedParameters: { alert_id: 'alert_number' } }
          ],
          getAnalysis: ['GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}'],
          getSarif: ['GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}'],
          listAlertsForRepo: ['GET /repos/{owner}/{repo}/code-scanning/alerts'],
          listAlertsInstances: ['GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances'],
          listRecentAnalyses: ['GET /repos/{owner}/{repo}/code-scanning/analyses'],
          updateAlert: ['PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}'],
          uploadSarif: ['POST /repos/{owner}/{repo}/code-scanning/sarifs']
        },
        codesOfConduct: {
          getAllCodesOfConduct: ['GET /codes_of_conduct', { mediaType: { previews: ['scarlet-witch'] } }],
          getConductCode: ['GET /codes_of_conduct/{key}', { mediaType: { previews: ['scarlet-witch'] } }],
          getForRepo: [
            'GET /repos/{owner}/{repo}/community/code_of_conduct',
            { mediaType: { previews: ['scarlet-witch'] } }
          ]
        },
        emojis: { get: ['GET /emojis'] },
        enterpriseAdmin: {
          disableSelectedOrganizationGithubActionsEnterprise: [
            'DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}'
          ],
          enableSelectedOrganizationGithubActionsEnterprise: [
            'PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}'
          ],
          getAllowedActionsEnterprise: ['GET /enterprises/{enterprise}/actions/permissions/selected-actions'],
          getGithubActionsPermissionsEnterprise: ['GET /enterprises/{enterprise}/actions/permissions'],
          listSelectedOrganizationsEnabledGithubActionsEnterprise: [
            'GET /enterprises/{enterprise}/actions/permissions/organizations'
          ],
          setAllowedActionsEnterprise: ['PUT /enterprises/{enterprise}/actions/permissions/selected-actions'],
          setGithubActionsPermissionsEnterprise: ['PUT /enterprises/{enterprise}/actions/permissions'],
          setSelectedOrganizationsEnabledGithubActionsEnterprise: [
            'PUT /enterprises/{enterprise}/actions/permissions/organizations'
          ]
        },
        gists: {
          checkIsStarred: ['GET /gists/{gist_id}/star'],
          create: ['POST /gists'],
          createComment: ['POST /gists/{gist_id}/comments'],
          delete: ['DELETE /gists/{gist_id}'],
          deleteComment: ['DELETE /gists/{gist_id}/comments/{comment_id}'],
          fork: ['POST /gists/{gist_id}/forks'],
          get: ['GET /gists/{gist_id}'],
          getComment: ['GET /gists/{gist_id}/comments/{comment_id}'],
          getRevision: ['GET /gists/{gist_id}/{sha}'],
          list: ['GET /gists'],
          listComments: ['GET /gists/{gist_id}/comments'],
          listCommits: ['GET /gists/{gist_id}/commits'],
          listForUser: ['GET /users/{username}/gists'],
          listForks: ['GET /gists/{gist_id}/forks'],
          listPublic: ['GET /gists/public'],
          listStarred: ['GET /gists/starred'],
          star: ['PUT /gists/{gist_id}/star'],
          unstar: ['DELETE /gists/{gist_id}/star'],
          update: ['PATCH /gists/{gist_id}'],
          updateComment: ['PATCH /gists/{gist_id}/comments/{comment_id}']
        },
        git: {
          createBlob: ['POST /repos/{owner}/{repo}/git/blobs'],
          createCommit: ['POST /repos/{owner}/{repo}/git/commits'],
          createRef: ['POST /repos/{owner}/{repo}/git/refs'],
          createTag: ['POST /repos/{owner}/{repo}/git/tags'],
          createTree: ['POST /repos/{owner}/{repo}/git/trees'],
          deleteRef: ['DELETE /repos/{owner}/{repo}/git/refs/{ref}'],
          getBlob: ['GET /repos/{owner}/{repo}/git/blobs/{file_sha}'],
          getCommit: ['GET /repos/{owner}/{repo}/git/commits/{commit_sha}'],
          getRef: ['GET /repos/{owner}/{repo}/git/ref/{ref}'],
          getTag: ['GET /repos/{owner}/{repo}/git/tags/{tag_sha}'],
          getTree: ['GET /repos/{owner}/{repo}/git/trees/{tree_sha}'],
          listMatchingRefs: ['GET /repos/{owner}/{repo}/git/matching-refs/{ref}'],
          updateRef: ['PATCH /repos/{owner}/{repo}/git/refs/{ref}']
        },
        gitignore: { getAllTemplates: ['GET /gitignore/templates'], getTemplate: ['GET /gitignore/templates/{name}'] },
        interactions: {
          getRestrictionsForAuthenticatedUser: ['GET /user/interaction-limits'],
          getRestrictionsForOrg: ['GET /orgs/{org}/interaction-limits'],
          getRestrictionsForRepo: ['GET /repos/{owner}/{repo}/interaction-limits'],
          getRestrictionsForYourPublicRepos: [
            'GET /user/interaction-limits',
            {},
            { renamed: ['interactions', 'getRestrictionsForAuthenticatedUser'] }
          ],
          removeRestrictionsForAuthenticatedUser: ['DELETE /user/interaction-limits'],
          removeRestrictionsForOrg: ['DELETE /orgs/{org}/interaction-limits'],
          removeRestrictionsForRepo: ['DELETE /repos/{owner}/{repo}/interaction-limits'],
          removeRestrictionsForYourPublicRepos: [
            'DELETE /user/interaction-limits',
            {},
            { renamed: ['interactions', 'removeRestrictionsForAuthenticatedUser'] }
          ],
          setRestrictionsForAuthenticatedUser: ['PUT /user/interaction-limits'],
          setRestrictionsForOrg: ['PUT /orgs/{org}/interaction-limits'],
          setRestrictionsForRepo: ['PUT /repos/{owner}/{repo}/interaction-limits'],
          setRestrictionsForYourPublicRepos: [
            'PUT /user/interaction-limits',
            {},
            { renamed: ['interactions', 'setRestrictionsForAuthenticatedUser'] }
          ]
        },
        issues: {
          addAssignees: ['POST /repos/{owner}/{repo}/issues/{issue_number}/assignees'],
          addLabels: ['POST /repos/{owner}/{repo}/issues/{issue_number}/labels'],
          checkUserCanBeAssigned: ['GET /repos/{owner}/{repo}/assignees/{assignee}'],
          create: ['POST /repos/{owner}/{repo}/issues'],
          createComment: ['POST /repos/{owner}/{repo}/issues/{issue_number}/comments'],
          createLabel: ['POST /repos/{owner}/{repo}/labels'],
          createMilestone: ['POST /repos/{owner}/{repo}/milestones'],
          deleteComment: ['DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}'],
          deleteLabel: ['DELETE /repos/{owner}/{repo}/labels/{name}'],
          deleteMilestone: ['DELETE /repos/{owner}/{repo}/milestones/{milestone_number}'],
          get: ['GET /repos/{owner}/{repo}/issues/{issue_number}'],
          getComment: ['GET /repos/{owner}/{repo}/issues/comments/{comment_id}'],
          getEvent: ['GET /repos/{owner}/{repo}/issues/events/{event_id}'],
          getLabel: ['GET /repos/{owner}/{repo}/labels/{name}'],
          getMilestone: ['GET /repos/{owner}/{repo}/milestones/{milestone_number}'],
          list: ['GET /issues'],
          listAssignees: ['GET /repos/{owner}/{repo}/assignees'],
          listComments: ['GET /repos/{owner}/{repo}/issues/{issue_number}/comments'],
          listCommentsForRepo: ['GET /repos/{owner}/{repo}/issues/comments'],
          listEvents: ['GET /repos/{owner}/{repo}/issues/{issue_number}/events'],
          listEventsForRepo: ['GET /repos/{owner}/{repo}/issues/events'],
          listEventsForTimeline: [
            'GET /repos/{owner}/{repo}/issues/{issue_number}/timeline',
            { mediaType: { previews: ['mockingbird'] } }
          ],
          listForAuthenticatedUser: ['GET /user/issues'],
          listForOrg: ['GET /orgs/{org}/issues'],
          listForRepo: ['GET /repos/{owner}/{repo}/issues'],
          listLabelsForMilestone: ['GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels'],
          listLabelsForRepo: ['GET /repos/{owner}/{repo}/labels'],
          listLabelsOnIssue: ['GET /repos/{owner}/{repo}/issues/{issue_number}/labels'],
          listMilestones: ['GET /repos/{owner}/{repo}/milestones'],
          lock: ['PUT /repos/{owner}/{repo}/issues/{issue_number}/lock'],
          removeAllLabels: ['DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels'],
          removeAssignees: ['DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees'],
          removeLabel: ['DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}'],
          setLabels: ['PUT /repos/{owner}/{repo}/issues/{issue_number}/labels'],
          unlock: ['DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock'],
          update: ['PATCH /repos/{owner}/{repo}/issues/{issue_number}'],
          updateComment: ['PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}'],
          updateLabel: ['PATCH /repos/{owner}/{repo}/labels/{name}'],
          updateMilestone: ['PATCH /repos/{owner}/{repo}/milestones/{milestone_number}']
        },
        licenses: {
          get: ['GET /licenses/{license}'],
          getAllCommonlyUsed: ['GET /licenses'],
          getForRepo: ['GET /repos/{owner}/{repo}/license']
        },
        markdown: {
          render: ['POST /markdown'],
          renderRaw: ['POST /markdown/raw', { headers: { 'content-type': 'text/plain; charset=utf-8' } }]
        },
        meta: { get: ['GET /meta'], getOctocat: ['GET /octocat'], getZen: ['GET /zen'], root: ['GET /'] },
        migrations: {
          cancelImport: ['DELETE /repos/{owner}/{repo}/import'],
          deleteArchiveForAuthenticatedUser: [
            'DELETE /user/migrations/{migration_id}/archive',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          deleteArchiveForOrg: [
            'DELETE /orgs/{org}/migrations/{migration_id}/archive',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          downloadArchiveForOrg: [
            'GET /orgs/{org}/migrations/{migration_id}/archive',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          getArchiveForAuthenticatedUser: [
            'GET /user/migrations/{migration_id}/archive',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          getCommitAuthors: ['GET /repos/{owner}/{repo}/import/authors'],
          getImportStatus: ['GET /repos/{owner}/{repo}/import'],
          getLargeFiles: ['GET /repos/{owner}/{repo}/import/large_files'],
          getStatusForAuthenticatedUser: [
            'GET /user/migrations/{migration_id}',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          getStatusForOrg: ['GET /orgs/{org}/migrations/{migration_id}', { mediaType: { previews: ['wyandotte'] } }],
          listForAuthenticatedUser: ['GET /user/migrations', { mediaType: { previews: ['wyandotte'] } }],
          listForOrg: ['GET /orgs/{org}/migrations', { mediaType: { previews: ['wyandotte'] } }],
          listReposForOrg: [
            'GET /orgs/{org}/migrations/{migration_id}/repositories',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          listReposForUser: [
            'GET /user/migrations/{migration_id}/repositories',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          mapCommitAuthor: ['PATCH /repos/{owner}/{repo}/import/authors/{author_id}'],
          setLfsPreference: ['PATCH /repos/{owner}/{repo}/import/lfs'],
          startForAuthenticatedUser: ['POST /user/migrations'],
          startForOrg: ['POST /orgs/{org}/migrations'],
          startImport: ['PUT /repos/{owner}/{repo}/import'],
          unlockRepoForAuthenticatedUser: [
            'DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          unlockRepoForOrg: [
            'DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock',
            { mediaType: { previews: ['wyandotte'] } }
          ],
          updateImport: ['PATCH /repos/{owner}/{repo}/import']
        },
        orgs: {
          blockUser: ['PUT /orgs/{org}/blocks/{username}'],
          cancelInvitation: ['DELETE /orgs/{org}/invitations/{invitation_id}'],
          checkBlockedUser: ['GET /orgs/{org}/blocks/{username}'],
          checkMembershipForUser: ['GET /orgs/{org}/members/{username}'],
          checkPublicMembershipForUser: ['GET /orgs/{org}/public_members/{username}'],
          convertMemberToOutsideCollaborator: ['PUT /orgs/{org}/outside_collaborators/{username}'],
          createInvitation: ['POST /orgs/{org}/invitations'],
          createWebhook: ['POST /orgs/{org}/hooks'],
          deleteWebhook: ['DELETE /orgs/{org}/hooks/{hook_id}'],
          get: ['GET /orgs/{org}'],
          getMembershipForAuthenticatedUser: ['GET /user/memberships/orgs/{org}'],
          getMembershipForUser: ['GET /orgs/{org}/memberships/{username}'],
          getWebhook: ['GET /orgs/{org}/hooks/{hook_id}'],
          getWebhookConfigForOrg: ['GET /orgs/{org}/hooks/{hook_id}/config'],
          list: ['GET /organizations'],
          listAppInstallations: ['GET /orgs/{org}/installations'],
          listBlockedUsers: ['GET /orgs/{org}/blocks'],
          listFailedInvitations: ['GET /orgs/{org}/failed_invitations'],
          listForAuthenticatedUser: ['GET /user/orgs'],
          listForUser: ['GET /users/{username}/orgs'],
          listInvitationTeams: ['GET /orgs/{org}/invitations/{invitation_id}/teams'],
          listMembers: ['GET /orgs/{org}/members'],
          listMembershipsForAuthenticatedUser: ['GET /user/memberships/orgs'],
          listOutsideCollaborators: ['GET /orgs/{org}/outside_collaborators'],
          listPendingInvitations: ['GET /orgs/{org}/invitations'],
          listPublicMembers: ['GET /orgs/{org}/public_members'],
          listWebhooks: ['GET /orgs/{org}/hooks'],
          pingWebhook: ['POST /orgs/{org}/hooks/{hook_id}/pings'],
          removeMember: ['DELETE /orgs/{org}/members/{username}'],
          removeMembershipForUser: ['DELETE /orgs/{org}/memberships/{username}'],
          removeOutsideCollaborator: ['DELETE /orgs/{org}/outside_collaborators/{username}'],
          removePublicMembershipForAuthenticatedUser: ['DELETE /orgs/{org}/public_members/{username}'],
          setMembershipForUser: ['PUT /orgs/{org}/memberships/{username}'],
          setPublicMembershipForAuthenticatedUser: ['PUT /orgs/{org}/public_members/{username}'],
          unblockUser: ['DELETE /orgs/{org}/blocks/{username}'],
          update: ['PATCH /orgs/{org}'],
          updateMembershipForAuthenticatedUser: ['PATCH /user/memberships/orgs/{org}'],
          updateWebhook: ['PATCH /orgs/{org}/hooks/{hook_id}'],
          updateWebhookConfigForOrg: ['PATCH /orgs/{org}/hooks/{hook_id}/config']
        },
        packages: {
          deletePackageForAuthenticatedUser: ['DELETE /user/packages/{package_type}/{package_name}'],
          deletePackageForOrg: ['DELETE /orgs/{org}/packages/{package_type}/{package_name}'],
          deletePackageVersionForAuthenticatedUser: [
            'DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}'
          ],
          deletePackageVersionForOrg: [
            'DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}'
          ],
          getAllPackageVersionsForAPackageOwnedByAnOrg: [
            'GET /orgs/{org}/packages/{package_type}/{package_name}/versions',
            {},
            { renamed: ['packages', 'getAllPackageVersionsForPackageOwnedByOrg'] }
          ],
          getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
            'GET /user/packages/{package_type}/{package_name}/versions',
            {},
            { renamed: ['packages', 'getAllPackageVersionsForPackageOwnedByAuthenticatedUser'] }
          ],
          getAllPackageVersionsForPackageOwnedByAuthenticatedUser: [
            'GET /user/packages/{package_type}/{package_name}/versions'
          ],
          getAllPackageVersionsForPackageOwnedByOrg: [
            'GET /orgs/{org}/packages/{package_type}/{package_name}/versions'
          ],
          getAllPackageVersionsForPackageOwnedByUser: [
            'GET /users/{username}/packages/{package_type}/{package_name}/versions'
          ],
          getPackageForAuthenticatedUser: ['GET /user/packages/{package_type}/{package_name}'],
          getPackageForOrganization: ['GET /orgs/{org}/packages/{package_type}/{package_name}'],
          getPackageForUser: ['GET /users/{username}/packages/{package_type}/{package_name}'],
          getPackageVersionForAuthenticatedUser: [
            'GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}'
          ],
          getPackageVersionForOrganization: [
            'GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}'
          ],
          getPackageVersionForUser: [
            'GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}'
          ],
          restorePackageForAuthenticatedUser: ['POST /user/packages/{package_type}/{package_name}/restore{?token}'],
          restorePackageForOrg: ['POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}'],
          restorePackageVersionForAuthenticatedUser: [
            'POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore'
          ],
          restorePackageVersionForOrg: [
            'POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore'
          ]
        },
        projects: {
          addCollaborator: [
            'PUT /projects/{project_id}/collaborators/{username}',
            { mediaType: { previews: ['inertia'] } }
          ],
          createCard: ['POST /projects/columns/{column_id}/cards', { mediaType: { previews: ['inertia'] } }],
          createColumn: ['POST /projects/{project_id}/columns', { mediaType: { previews: ['inertia'] } }],
          createForAuthenticatedUser: ['POST /user/projects', { mediaType: { previews: ['inertia'] } }],
          createForOrg: ['POST /orgs/{org}/projects', { mediaType: { previews: ['inertia'] } }],
          createForRepo: ['POST /repos/{owner}/{repo}/projects', { mediaType: { previews: ['inertia'] } }],
          delete: ['DELETE /projects/{project_id}', { mediaType: { previews: ['inertia'] } }],
          deleteCard: ['DELETE /projects/columns/cards/{card_id}', { mediaType: { previews: ['inertia'] } }],
          deleteColumn: ['DELETE /projects/columns/{column_id}', { mediaType: { previews: ['inertia'] } }],
          get: ['GET /projects/{project_id}', { mediaType: { previews: ['inertia'] } }],
          getCard: ['GET /projects/columns/cards/{card_id}', { mediaType: { previews: ['inertia'] } }],
          getColumn: ['GET /projects/columns/{column_id}', { mediaType: { previews: ['inertia'] } }],
          getPermissionForUser: [
            'GET /projects/{project_id}/collaborators/{username}/permission',
            { mediaType: { previews: ['inertia'] } }
          ],
          listCards: ['GET /projects/columns/{column_id}/cards', { mediaType: { previews: ['inertia'] } }],
          listCollaborators: ['GET /projects/{project_id}/collaborators', { mediaType: { previews: ['inertia'] } }],
          listColumns: ['GET /projects/{project_id}/columns', { mediaType: { previews: ['inertia'] } }],
          listForOrg: ['GET /orgs/{org}/projects', { mediaType: { previews: ['inertia'] } }],
          listForRepo: ['GET /repos/{owner}/{repo}/projects', { mediaType: { previews: ['inertia'] } }],
          listForUser: ['GET /users/{username}/projects', { mediaType: { previews: ['inertia'] } }],
          moveCard: ['POST /projects/columns/cards/{card_id}/moves', { mediaType: { previews: ['inertia'] } }],
          moveColumn: ['POST /projects/columns/{column_id}/moves', { mediaType: { previews: ['inertia'] } }],
          removeCollaborator: [
            'DELETE /projects/{project_id}/collaborators/{username}',
            { mediaType: { previews: ['inertia'] } }
          ],
          update: ['PATCH /projects/{project_id}', { mediaType: { previews: ['inertia'] } }],
          updateCard: ['PATCH /projects/columns/cards/{card_id}', { mediaType: { previews: ['inertia'] } }],
          updateColumn: ['PATCH /projects/columns/{column_id}', { mediaType: { previews: ['inertia'] } }]
        },
        pulls: {
          checkIfMerged: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/merge'],
          create: ['POST /repos/{owner}/{repo}/pulls'],
          createReplyForReviewComment: ['POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies'],
          createReview: ['POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews'],
          createReviewComment: ['POST /repos/{owner}/{repo}/pulls/{pull_number}/comments'],
          deletePendingReview: ['DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}'],
          deleteReviewComment: ['DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}'],
          dismissReview: ['PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals'],
          get: ['GET /repos/{owner}/{repo}/pulls/{pull_number}'],
          getReview: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}'],
          getReviewComment: ['GET /repos/{owner}/{repo}/pulls/comments/{comment_id}'],
          list: ['GET /repos/{owner}/{repo}/pulls'],
          listCommentsForReview: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments'],
          listCommits: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/commits'],
          listFiles: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/files'],
          listRequestedReviewers: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers'],
          listReviewComments: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/comments'],
          listReviewCommentsForRepo: ['GET /repos/{owner}/{repo}/pulls/comments'],
          listReviews: ['GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews'],
          merge: ['PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge'],
          removeRequestedReviewers: ['DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers'],
          requestReviewers: ['POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers'],
          submitReview: ['POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events'],
          update: ['PATCH /repos/{owner}/{repo}/pulls/{pull_number}'],
          updateBranch: [
            'PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch',
            { mediaType: { previews: ['lydian'] } }
          ],
          updateReview: ['PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}'],
          updateReviewComment: ['PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}']
        },
        rateLimit: { get: ['GET /rate_limit'] },
        reactions: {
          createForCommitComment: [
            'POST /repos/{owner}/{repo}/comments/{comment_id}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          createForIssue: [
            'POST /repos/{owner}/{repo}/issues/{issue_number}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          createForIssueComment: [
            'POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          createForPullRequestReviewComment: [
            'POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          createForTeamDiscussionCommentInOrg: [
            'POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          createForTeamDiscussionInOrg: [
            'POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteForCommitComment: [
            'DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteForIssue: [
            'DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteForIssueComment: [
            'DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteForPullRequestComment: [
            'DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteForTeamDiscussion: [
            'DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteForTeamDiscussionComment: [
            'DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          deleteLegacy: [
            'DELETE /reactions/{reaction_id}',
            { mediaType: { previews: ['squirrel-girl'] } },
            {
              deprecated:
                'octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy'
            }
          ],
          listForCommitComment: [
            'GET /repos/{owner}/{repo}/comments/{comment_id}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          listForIssue: [
            'GET /repos/{owner}/{repo}/issues/{issue_number}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          listForIssueComment: [
            'GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          listForPullRequestReviewComment: [
            'GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          listForTeamDiscussionCommentInOrg: [
            'GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ],
          listForTeamDiscussionInOrg: [
            'GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions',
            { mediaType: { previews: ['squirrel-girl'] } }
          ]
        },
        repos: {
          acceptInvitation: ['PATCH /user/repository_invitations/{invitation_id}'],
          addAppAccessRestrictions: [
            'POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
            {},
            { mapToData: 'apps' }
          ],
          addCollaborator: ['PUT /repos/{owner}/{repo}/collaborators/{username}'],
          addStatusCheckContexts: [
            'POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts',
            {},
            { mapToData: 'contexts' }
          ],
          addTeamAccessRestrictions: [
            'POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
            {},
            { mapToData: 'teams' }
          ],
          addUserAccessRestrictions: [
            'POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
            {},
            { mapToData: 'users' }
          ],
          checkCollaborator: ['GET /repos/{owner}/{repo}/collaborators/{username}'],
          checkVulnerabilityAlerts: [
            'GET /repos/{owner}/{repo}/vulnerability-alerts',
            { mediaType: { previews: ['dorian'] } }
          ],
          compareCommits: ['GET /repos/{owner}/{repo}/compare/{base}...{head}'],
          createCommitComment: ['POST /repos/{owner}/{repo}/commits/{commit_sha}/comments'],
          createCommitSignatureProtection: [
            'POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures',
            { mediaType: { previews: ['zzzax'] } }
          ],
          createCommitStatus: ['POST /repos/{owner}/{repo}/statuses/{sha}'],
          createDeployKey: ['POST /repos/{owner}/{repo}/keys'],
          createDeployment: ['POST /repos/{owner}/{repo}/deployments'],
          createDeploymentStatus: ['POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses'],
          createDispatchEvent: ['POST /repos/{owner}/{repo}/dispatches'],
          createForAuthenticatedUser: ['POST /user/repos'],
          createFork: ['POST /repos/{owner}/{repo}/forks'],
          createInOrg: ['POST /orgs/{org}/repos'],
          createOrUpdateEnvironment: ['PUT /repos/{owner}/{repo}/environments/{environment_name}'],
          createOrUpdateFileContents: ['PUT /repos/{owner}/{repo}/contents/{path}'],
          createPagesSite: ['POST /repos/{owner}/{repo}/pages', { mediaType: { previews: ['switcheroo'] } }],
          createRelease: ['POST /repos/{owner}/{repo}/releases'],
          createUsingTemplate: [
            'POST /repos/{template_owner}/{template_repo}/generate',
            { mediaType: { previews: ['baptiste'] } }
          ],
          createWebhook: ['POST /repos/{owner}/{repo}/hooks'],
          declineInvitation: ['DELETE /user/repository_invitations/{invitation_id}'],
          delete: ['DELETE /repos/{owner}/{repo}'],
          deleteAccessRestrictions: ['DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions'],
          deleteAdminBranchProtection: ['DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins'],
          deleteAnEnvironment: ['DELETE /repos/{owner}/{repo}/environments/{environment_name}'],
          deleteBranchProtection: ['DELETE /repos/{owner}/{repo}/branches/{branch}/protection'],
          deleteCommitComment: ['DELETE /repos/{owner}/{repo}/comments/{comment_id}'],
          deleteCommitSignatureProtection: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures',
            { mediaType: { previews: ['zzzax'] } }
          ],
          deleteDeployKey: ['DELETE /repos/{owner}/{repo}/keys/{key_id}'],
          deleteDeployment: ['DELETE /repos/{owner}/{repo}/deployments/{deployment_id}'],
          deleteFile: ['DELETE /repos/{owner}/{repo}/contents/{path}'],
          deleteInvitation: ['DELETE /repos/{owner}/{repo}/invitations/{invitation_id}'],
          deletePagesSite: ['DELETE /repos/{owner}/{repo}/pages', { mediaType: { previews: ['switcheroo'] } }],
          deletePullRequestReviewProtection: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews'
          ],
          deleteRelease: ['DELETE /repos/{owner}/{repo}/releases/{release_id}'],
          deleteReleaseAsset: ['DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}'],
          deleteWebhook: ['DELETE /repos/{owner}/{repo}/hooks/{hook_id}'],
          disableAutomatedSecurityFixes: [
            'DELETE /repos/{owner}/{repo}/automated-security-fixes',
            { mediaType: { previews: ['london'] } }
          ],
          disableVulnerabilityAlerts: [
            'DELETE /repos/{owner}/{repo}/vulnerability-alerts',
            { mediaType: { previews: ['dorian'] } }
          ],
          downloadArchive: [
            'GET /repos/{owner}/{repo}/zipball/{ref}',
            {},
            { renamed: ['repos', 'downloadZipballArchive'] }
          ],
          downloadTarballArchive: ['GET /repos/{owner}/{repo}/tarball/{ref}'],
          downloadZipballArchive: ['GET /repos/{owner}/{repo}/zipball/{ref}'],
          enableAutomatedSecurityFixes: [
            'PUT /repos/{owner}/{repo}/automated-security-fixes',
            { mediaType: { previews: ['london'] } }
          ],
          enableVulnerabilityAlerts: [
            'PUT /repos/{owner}/{repo}/vulnerability-alerts',
            { mediaType: { previews: ['dorian'] } }
          ],
          get: ['GET /repos/{owner}/{repo}'],
          getAccessRestrictions: ['GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions'],
          getAdminBranchProtection: ['GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins'],
          getAllEnvironments: ['GET /repos/{owner}/{repo}/environments'],
          getAllStatusCheckContexts: [
            'GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts'
          ],
          getAllTopics: ['GET /repos/{owner}/{repo}/topics', { mediaType: { previews: ['mercy'] } }],
          getAppsWithAccessToProtectedBranch: [
            'GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps'
          ],
          getBranch: ['GET /repos/{owner}/{repo}/branches/{branch}'],
          getBranchProtection: ['GET /repos/{owner}/{repo}/branches/{branch}/protection'],
          getClones: ['GET /repos/{owner}/{repo}/traffic/clones'],
          getCodeFrequencyStats: ['GET /repos/{owner}/{repo}/stats/code_frequency'],
          getCollaboratorPermissionLevel: ['GET /repos/{owner}/{repo}/collaborators/{username}/permission'],
          getCombinedStatusForRef: ['GET /repos/{owner}/{repo}/commits/{ref}/status'],
          getCommit: ['GET /repos/{owner}/{repo}/commits/{ref}'],
          getCommitActivityStats: ['GET /repos/{owner}/{repo}/stats/commit_activity'],
          getCommitComment: ['GET /repos/{owner}/{repo}/comments/{comment_id}'],
          getCommitSignatureProtection: [
            'GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures',
            { mediaType: { previews: ['zzzax'] } }
          ],
          getCommunityProfileMetrics: ['GET /repos/{owner}/{repo}/community/profile'],
          getContent: ['GET /repos/{owner}/{repo}/contents/{path}'],
          getContributorsStats: ['GET /repos/{owner}/{repo}/stats/contributors'],
          getDeployKey: ['GET /repos/{owner}/{repo}/keys/{key_id}'],
          getDeployment: ['GET /repos/{owner}/{repo}/deployments/{deployment_id}'],
          getDeploymentStatus: ['GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}'],
          getEnvironment: ['GET /repos/{owner}/{repo}/environments/{environment_name}'],
          getLatestPagesBuild: ['GET /repos/{owner}/{repo}/pages/builds/latest'],
          getLatestRelease: ['GET /repos/{owner}/{repo}/releases/latest'],
          getPages: ['GET /repos/{owner}/{repo}/pages'],
          getPagesBuild: ['GET /repos/{owner}/{repo}/pages/builds/{build_id}'],
          getParticipationStats: ['GET /repos/{owner}/{repo}/stats/participation'],
          getPullRequestReviewProtection: [
            'GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews'
          ],
          getPunchCardStats: ['GET /repos/{owner}/{repo}/stats/punch_card'],
          getReadme: ['GET /repos/{owner}/{repo}/readme'],
          getReadmeInDirectory: ['GET /repos/{owner}/{repo}/readme/{dir}'],
          getRelease: ['GET /repos/{owner}/{repo}/releases/{release_id}'],
          getReleaseAsset: ['GET /repos/{owner}/{repo}/releases/assets/{asset_id}'],
          getReleaseByTag: ['GET /repos/{owner}/{repo}/releases/tags/{tag}'],
          getStatusChecksProtection: ['GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks'],
          getTeamsWithAccessToProtectedBranch: [
            'GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams'
          ],
          getTopPaths: ['GET /repos/{owner}/{repo}/traffic/popular/paths'],
          getTopReferrers: ['GET /repos/{owner}/{repo}/traffic/popular/referrers'],
          getUsersWithAccessToProtectedBranch: [
            'GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users'
          ],
          getViews: ['GET /repos/{owner}/{repo}/traffic/views'],
          getWebhook: ['GET /repos/{owner}/{repo}/hooks/{hook_id}'],
          getWebhookConfigForRepo: ['GET /repos/{owner}/{repo}/hooks/{hook_id}/config'],
          listBranches: ['GET /repos/{owner}/{repo}/branches'],
          listBranchesForHeadCommit: [
            'GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head',
            { mediaType: { previews: ['groot'] } }
          ],
          listCollaborators: ['GET /repos/{owner}/{repo}/collaborators'],
          listCommentsForCommit: ['GET /repos/{owner}/{repo}/commits/{commit_sha}/comments'],
          listCommitCommentsForRepo: ['GET /repos/{owner}/{repo}/comments'],
          listCommitStatusesForRef: ['GET /repos/{owner}/{repo}/commits/{ref}/statuses'],
          listCommits: ['GET /repos/{owner}/{repo}/commits'],
          listContributors: ['GET /repos/{owner}/{repo}/contributors'],
          listDeployKeys: ['GET /repos/{owner}/{repo}/keys'],
          listDeploymentStatuses: ['GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses'],
          listDeployments: ['GET /repos/{owner}/{repo}/deployments'],
          listForAuthenticatedUser: ['GET /user/repos'],
          listForOrg: ['GET /orgs/{org}/repos'],
          listForUser: ['GET /users/{username}/repos'],
          listForks: ['GET /repos/{owner}/{repo}/forks'],
          listInvitations: ['GET /repos/{owner}/{repo}/invitations'],
          listInvitationsForAuthenticatedUser: ['GET /user/repository_invitations'],
          listLanguages: ['GET /repos/{owner}/{repo}/languages'],
          listPagesBuilds: ['GET /repos/{owner}/{repo}/pages/builds'],
          listPublic: ['GET /repositories'],
          listPullRequestsAssociatedWithCommit: [
            'GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls',
            { mediaType: { previews: ['groot'] } }
          ],
          listReleaseAssets: ['GET /repos/{owner}/{repo}/releases/{release_id}/assets'],
          listReleases: ['GET /repos/{owner}/{repo}/releases'],
          listTags: ['GET /repos/{owner}/{repo}/tags'],
          listTeams: ['GET /repos/{owner}/{repo}/teams'],
          listWebhooks: ['GET /repos/{owner}/{repo}/hooks'],
          merge: ['POST /repos/{owner}/{repo}/merges'],
          pingWebhook: ['POST /repos/{owner}/{repo}/hooks/{hook_id}/pings'],
          removeAppAccessRestrictions: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
            {},
            { mapToData: 'apps' }
          ],
          removeCollaborator: ['DELETE /repos/{owner}/{repo}/collaborators/{username}'],
          removeStatusCheckContexts: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts',
            {},
            { mapToData: 'contexts' }
          ],
          removeStatusCheckProtection: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks'
          ],
          removeTeamAccessRestrictions: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
            {},
            { mapToData: 'teams' }
          ],
          removeUserAccessRestrictions: [
            'DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
            {},
            { mapToData: 'users' }
          ],
          renameBranch: ['POST /repos/{owner}/{repo}/branches/{branch}/rename'],
          replaceAllTopics: ['PUT /repos/{owner}/{repo}/topics', { mediaType: { previews: ['mercy'] } }],
          requestPagesBuild: ['POST /repos/{owner}/{repo}/pages/builds'],
          setAdminBranchProtection: ['POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins'],
          setAppAccessRestrictions: [
            'PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps',
            {},
            { mapToData: 'apps' }
          ],
          setStatusCheckContexts: [
            'PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts',
            {},
            { mapToData: 'contexts' }
          ],
          setTeamAccessRestrictions: [
            'PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams',
            {},
            { mapToData: 'teams' }
          ],
          setUserAccessRestrictions: [
            'PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users',
            {},
            { mapToData: 'users' }
          ],
          testPushWebhook: ['POST /repos/{owner}/{repo}/hooks/{hook_id}/tests'],
          transfer: ['POST /repos/{owner}/{repo}/transfer'],
          update: ['PATCH /repos/{owner}/{repo}'],
          updateBranchProtection: ['PUT /repos/{owner}/{repo}/branches/{branch}/protection'],
          updateCommitComment: ['PATCH /repos/{owner}/{repo}/comments/{comment_id}'],
          updateInformationAboutPagesSite: ['PUT /repos/{owner}/{repo}/pages'],
          updateInvitation: ['PATCH /repos/{owner}/{repo}/invitations/{invitation_id}'],
          updatePullRequestReviewProtection: [
            'PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews'
          ],
          updateRelease: ['PATCH /repos/{owner}/{repo}/releases/{release_id}'],
          updateReleaseAsset: ['PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}'],
          updateStatusCheckPotection: [
            'PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
            {},
            { renamed: ['repos', 'updateStatusCheckProtection'] }
          ],
          updateStatusCheckProtection: [
            'PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks'
          ],
          updateWebhook: ['PATCH /repos/{owner}/{repo}/hooks/{hook_id}'],
          updateWebhookConfigForRepo: ['PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config'],
          uploadReleaseAsset: [
            'POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}',
            { baseUrl: 'https://uploads.github.com' }
          ]
        },
        search: {
          code: ['GET /search/code'],
          commits: ['GET /search/commits', { mediaType: { previews: ['cloak'] } }],
          issuesAndPullRequests: ['GET /search/issues'],
          labels: ['GET /search/labels'],
          repos: ['GET /search/repositories'],
          topics: ['GET /search/topics', { mediaType: { previews: ['mercy'] } }],
          users: ['GET /search/users']
        },
        secretScanning: {
          getAlert: ['GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}'],
          listAlertsForRepo: ['GET /repos/{owner}/{repo}/secret-scanning/alerts'],
          updateAlert: ['PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}']
        },
        teams: {
          addOrUpdateMembershipForUserInOrg: ['PUT /orgs/{org}/teams/{team_slug}/memberships/{username}'],
          addOrUpdateProjectPermissionsInOrg: [
            'PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}',
            { mediaType: { previews: ['inertia'] } }
          ],
          addOrUpdateRepoPermissionsInOrg: ['PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}'],
          checkPermissionsForProjectInOrg: [
            'GET /orgs/{org}/teams/{team_slug}/projects/{project_id}',
            { mediaType: { previews: ['inertia'] } }
          ],
          checkPermissionsForRepoInOrg: ['GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}'],
          create: ['POST /orgs/{org}/teams'],
          createDiscussionCommentInOrg: ['POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments'],
          createDiscussionInOrg: ['POST /orgs/{org}/teams/{team_slug}/discussions'],
          deleteDiscussionCommentInOrg: [
            'DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}'
          ],
          deleteDiscussionInOrg: ['DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}'],
          deleteInOrg: ['DELETE /orgs/{org}/teams/{team_slug}'],
          getByName: ['GET /orgs/{org}/teams/{team_slug}'],
          getDiscussionCommentInOrg: [
            'GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}'
          ],
          getDiscussionInOrg: ['GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}'],
          getMembershipForUserInOrg: ['GET /orgs/{org}/teams/{team_slug}/memberships/{username}'],
          list: ['GET /orgs/{org}/teams'],
          listChildInOrg: ['GET /orgs/{org}/teams/{team_slug}/teams'],
          listDiscussionCommentsInOrg: ['GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments'],
          listDiscussionsInOrg: ['GET /orgs/{org}/teams/{team_slug}/discussions'],
          listForAuthenticatedUser: ['GET /user/teams'],
          listMembersInOrg: ['GET /orgs/{org}/teams/{team_slug}/members'],
          listPendingInvitationsInOrg: ['GET /orgs/{org}/teams/{team_slug}/invitations'],
          listProjectsInOrg: ['GET /orgs/{org}/teams/{team_slug}/projects', { mediaType: { previews: ['inertia'] } }],
          listReposInOrg: ['GET /orgs/{org}/teams/{team_slug}/repos'],
          removeMembershipForUserInOrg: ['DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}'],
          removeProjectInOrg: ['DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}'],
          removeRepoInOrg: ['DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}'],
          updateDiscussionCommentInOrg: [
            'PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}'
          ],
          updateDiscussionInOrg: ['PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}'],
          updateInOrg: ['PATCH /orgs/{org}/teams/{team_slug}']
        },
        users: {
          addEmailForAuthenticated: ['POST /user/emails'],
          block: ['PUT /user/blocks/{username}'],
          checkBlocked: ['GET /user/blocks/{username}'],
          checkFollowingForUser: ['GET /users/{username}/following/{target_user}'],
          checkPersonIsFollowedByAuthenticated: ['GET /user/following/{username}'],
          createGpgKeyForAuthenticated: ['POST /user/gpg_keys'],
          createPublicSshKeyForAuthenticated: ['POST /user/keys'],
          deleteEmailForAuthenticated: ['DELETE /user/emails'],
          deleteGpgKeyForAuthenticated: ['DELETE /user/gpg_keys/{gpg_key_id}'],
          deletePublicSshKeyForAuthenticated: ['DELETE /user/keys/{key_id}'],
          follow: ['PUT /user/following/{username}'],
          getAuthenticated: ['GET /user'],
          getByUsername: ['GET /users/{username}'],
          getContextForUser: ['GET /users/{username}/hovercard'],
          getGpgKeyForAuthenticated: ['GET /user/gpg_keys/{gpg_key_id}'],
          getPublicSshKeyForAuthenticated: ['GET /user/keys/{key_id}'],
          list: ['GET /users'],
          listBlockedByAuthenticated: ['GET /user/blocks'],
          listEmailsForAuthenticated: ['GET /user/emails'],
          listFollowedByAuthenticated: ['GET /user/following'],
          listFollowersForAuthenticatedUser: ['GET /user/followers'],
          listFollowersForUser: ['GET /users/{username}/followers'],
          listFollowingForUser: ['GET /users/{username}/following'],
          listGpgKeysForAuthenticated: ['GET /user/gpg_keys'],
          listGpgKeysForUser: ['GET /users/{username}/gpg_keys'],
          listPublicEmailsForAuthenticated: ['GET /user/public_emails'],
          listPublicKeysForUser: ['GET /users/{username}/keys'],
          listPublicSshKeysForAuthenticated: ['GET /user/keys'],
          setPrimaryEmailVisibilityForAuthenticated: ['PATCH /user/email/visibility'],
          unblock: ['DELETE /user/blocks/{username}'],
          unfollow: ['DELETE /user/following/{username}'],
          updateAuthenticated: ['PATCH /user']
        }
      };
      const s = '4.15.1';
      function endpointsToMethods(e, r) {
        const t = {};
        for (const [s, o] of Object.entries(r)) {
          for (const [r, n] of Object.entries(o)) {
            const [o, i, a] = n;
            const [c, u] = o.split(/ /);
            const p = Object.assign({ method: c, url: u }, i);
            if (!t[s]) {
              t[s] = {};
            }
            const l = t[s];
            if (a) {
              l[r] = decorate(e, s, r, p, a);
              continue;
            }
            l[r] = e.request.defaults(p);
          }
        }
        return t;
      }
      function decorate(e, r, t, s, o) {
        const n = e.request.defaults(s);
        function withDecorations(...s) {
          let i = n.endpoint.merge(...s);
          if (o.mapToData) {
            i = Object.assign({}, i, { data: i[o.mapToData], [o.mapToData]: undefined });
            return n(i);
          }
          if (o.renamed) {
            const [s, n] = o.renamed;
            e.log.warn(`octokit.${r}.${t}() has been renamed to octokit.${s}.${n}()`);
          }
          if (o.deprecated) {
            e.log.warn(o.deprecated);
          }
          if (o.renamedParameters) {
            const i = n.endpoint.merge(...s);
            for (const [s, n] of Object.entries(o.renamedParameters)) {
              if (s in i) {
                e.log.warn(`"${s}" parameter is deprecated for "octokit.${r}.${t}()". Use "${n}" instead`);
                if (!(n in i)) {
                  i[n] = i[s];
                }
                delete i[s];
              }
            }
            return n(i);
          }
          return n(...s);
        }
        return Object.assign(withDecorations, n);
      }
      function restEndpointMethods(e) {
        const r = endpointsToMethods(e, t);
        return _objectSpread2(_objectSpread2({}, r), {}, { rest: r });
      }
      restEndpointMethods.VERSION = s;
      r.restEndpointMethods = restEndpointMethods;
    },
    811: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      function _interopDefault(e) {
        return e && typeof e === 'object' && 'default' in e ? e['default'] : e;
      }
      var s = t(778);
      var o = _interopDefault(t(362));
      const n = o((e) => console.warn(e));
      const i = o((e) => console.warn(e));
      class RequestError extends Error {
        constructor(e, r, t) {
          super(e);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
          this.name = 'HttpError';
          this.status = r;
          let o;
          if ('headers' in t && typeof t.headers !== 'undefined') {
            o = t.headers;
          }
          if ('response' in t) {
            this.response = t.response;
            o = t.response.headers;
          }
          const a = Object.assign({}, t.request);
          if (t.request.headers.authorization) {
            a.headers = Object.assign({}, t.request.headers, {
              authorization: t.request.headers.authorization.replace(/ .*$/, ' [REDACTED]')
            });
          }
          a.url = a.url
            .replace(/\bclient_secret=\w+/g, 'client_secret=[REDACTED]')
            .replace(/\baccess_token=\w+/g, 'access_token=[REDACTED]');
          this.request = a;
          Object.defineProperty(this, 'code', {
            get() {
              n(new s.Deprecation('[@octokit/request-error] `error.code` is deprecated, use `error.status`.'));
              return r;
            }
          });
          Object.defineProperty(this, 'headers', {
            get() {
              i(
                new s.Deprecation(
                  '[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`.'
                )
              );
              return o || {};
            }
          });
        }
      }
      r.RequestError = RequestError;
    },
    142: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      function _interopDefault(e) {
        return e && typeof e === 'object' && 'default' in e ? e['default'] : e;
      }
      var s = t(273);
      var o = t(546);
      var n = t(375);
      var i = _interopDefault(t(517));
      var a = t(811);
      const c = '5.6.0';
      function getBufferResponse(e) {
        return e.arrayBuffer();
      }
      function fetchWrapper(e) {
        const r = e.request && e.request.log ? e.request.log : console;
        if (n.isPlainObject(e.body) || Array.isArray(e.body)) {
          e.body = JSON.stringify(e.body);
        }
        let t = {};
        let s;
        let o;
        const c = (e.request && e.request.fetch) || i;
        return c(
          e.url,
          Object.assign({ method: e.method, body: e.body, headers: e.headers, redirect: e.redirect }, e.request)
        )
          .then(async (n) => {
            o = n.url;
            s = n.status;
            for (const e of n.headers) {
              t[e[0]] = e[1];
            }
            if ('deprecation' in t) {
              const s = t.link && t.link.match(/<([^>]+)>; rel="deprecation"/);
              const o = s && s.pop();
              r.warn(
                `[@octokit/request] "${e.method} ${e.url}" is deprecated. It is scheduled to be removed on ${t.sunset}${
                  o ? `. See ${o}` : ''
                }`
              );
            }
            if (s === 204 || s === 205) {
              return;
            }
            if (e.method === 'HEAD') {
              if (s < 400) {
                return;
              }
              throw new a.RequestError(n.statusText, s, {
                response: { url: o, status: s, headers: t, data: undefined },
                request: e
              });
            }
            if (s === 304) {
              throw new a.RequestError('Not modified', s, {
                response: { url: o, status: s, headers: t, data: await getResponseData(n) },
                request: e
              });
            }
            if (s >= 400) {
              const r = await getResponseData(n);
              const i = new a.RequestError(toErrorMessage(r), s, {
                response: { url: o, status: s, headers: t, data: r },
                request: e
              });
              throw i;
            }
            return getResponseData(n);
          })
          .then((e) => ({ status: s, url: o, headers: t, data: e }))
          .catch((r) => {
            if (r instanceof a.RequestError) throw r;
            throw new a.RequestError(r.message, 500, { request: e });
          });
      }
      async function getResponseData(e) {
        const r = e.headers.get('content-type');
        if (/application\/json/.test(r)) {
          return e.json();
        }
        if (!r || /^text\/|charset=utf-8$/.test(r)) {
          return e.text();
        }
        return getBufferResponse(e);
      }
      function toErrorMessage(e) {
        if (typeof e === 'string') return e;
        if ('message' in e) {
          if (Array.isArray(e.errors)) {
            return `${e.message}: ${e.errors.map(JSON.stringify).join(', ')}`;
          }
          return e.message;
        }
        return `Unknown error: ${JSON.stringify(e)}`;
      }
      function withDefaults(e, r) {
        const t = e.defaults(r);
        const newApi = function (e, r) {
          const s = t.merge(e, r);
          if (!s.request || !s.request.hook) {
            return fetchWrapper(t.parse(s));
          }
          const request = (e, r) => fetchWrapper(t.parse(t.merge(e, r)));
          Object.assign(request, { endpoint: t, defaults: withDefaults.bind(null, t) });
          return s.request.hook(request, s);
        };
        return Object.assign(newApi, { endpoint: t, defaults: withDefaults.bind(null, t) });
      }
      const u = withDefaults(s.endpoint, { headers: { 'user-agent': `octokit-request.js/${c} ${o.getUserAgent()}` } });
      r.request = u;
    },
    887: (e, r, t) => {
      var s = t(106);
      var o = t(297);
      var n = t(421);
      var i = Function.bind;
      var a = i.bind(i);
      function bindApi(e, r, t) {
        var s = a(n, null).apply(null, t ? [r, t] : [r]);
        e.api = { remove: s };
        e.remove = s;
        ['before', 'error', 'after', 'wrap'].forEach(function (s) {
          var n = t ? [r, s, t] : [r, s];
          e[s] = e.api[s] = a(o, null).apply(null, n);
        });
      }
      function HookSingular() {
        var e = 'h';
        var r = { registry: {} };
        var t = s.bind(null, r, e);
        bindApi(t, r, e);
        return t;
      }
      function HookCollection() {
        var e = { registry: {} };
        var r = s.bind(null, e);
        bindApi(r, e);
        return r;
      }
      var c = false;
      function Hook() {
        if (!c) {
          console.warn(
            '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'
          );
          c = true;
        }
        return HookCollection();
      }
      Hook.Singular = HookSingular.bind();
      Hook.Collection = HookCollection.bind();
      e.exports = Hook;
      e.exports.Hook = Hook;
      e.exports.Singular = Hook.Singular;
      e.exports.Collection = Hook.Collection;
    },
    297: (e) => {
      e.exports = addHook;
      function addHook(e, r, t, s) {
        var o = s;
        if (!e.registry[t]) {
          e.registry[t] = [];
        }
        if (r === 'before') {
          s = function (e, r) {
            return Promise.resolve().then(o.bind(null, r)).then(e.bind(null, r));
          };
        }
        if (r === 'after') {
          s = function (e, r) {
            var t;
            return Promise.resolve()
              .then(e.bind(null, r))
              .then(function (e) {
                t = e;
                return o(t, r);
              })
              .then(function () {
                return t;
              });
          };
        }
        if (r === 'error') {
          s = function (e, r) {
            return Promise.resolve()
              .then(e.bind(null, r))
              .catch(function (e) {
                return o(e, r);
              });
          };
        }
        e.registry[t].push({ hook: s, orig: o });
      }
    },
    106: (e) => {
      e.exports = register;
      function register(e, r, t, s) {
        if (typeof t !== 'function') {
          throw new Error('method for before hook must be a function');
        }
        if (!s) {
          s = {};
        }
        if (Array.isArray(r)) {
          return r.reverse().reduce(function (r, t) {
            return register.bind(null, e, t, r, s);
          }, t)();
        }
        return Promise.resolve().then(function () {
          if (!e.registry[r]) {
            return t(s);
          }
          return e.registry[r].reduce(function (e, r) {
            return r.hook.bind(null, e, s);
          }, t)();
        });
      }
    },
    421: (e) => {
      e.exports = removeHook;
      function removeHook(e, r, t) {
        if (!e.registry[r]) {
          return;
        }
        var s = e.registry[r]
          .map(function (e) {
            return e.orig;
          })
          .indexOf(t);
        if (s === -1) {
          return;
        }
        e.registry[r].splice(s, 1);
      }
    },
    778: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      class Deprecation extends Error {
        constructor(e) {
          super(e);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
          this.name = 'Deprecation';
        }
      }
      r.Deprecation = Deprecation;
    },
    375: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      /*!
       * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
       *
       * Copyright (c) 2014-2017, Jon Schlinkert.
       * Released under the MIT License.
       */ function isObject(e) {
        return Object.prototype.toString.call(e) === '[object Object]';
      }
      function isPlainObject(e) {
        var r, t;
        if (isObject(e) === false) return false;
        r = e.constructor;
        if (r === undefined) return true;
        t = r.prototype;
        if (isObject(t) === false) return false;
        if (t.hasOwnProperty('isPrototypeOf') === false) {
          return false;
        }
        return true;
      }
      r.isPlainObject = isPlainObject;
    },
    517: (e, r, t) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      function _interopDefault(e) {
        return e && typeof e === 'object' && 'default' in e ? e['default'] : e;
      }
      var s = _interopDefault(t(413));
      var o = _interopDefault(t(605));
      var n = _interopDefault(t(835));
      var i = _interopDefault(t(211));
      var a = _interopDefault(t(761));
      const c = s.Readable;
      const u = Symbol('buffer');
      const p = Symbol('type');
      class Blob {
        constructor() {
          this[p] = '';
          const e = arguments[0];
          const r = arguments[1];
          const t = [];
          let s = 0;
          if (e) {
            const r = e;
            const o = Number(r.length);
            for (let e = 0; e < o; e++) {
              const o = r[e];
              let n;
              if (o instanceof Buffer) {
                n = o;
              } else if (ArrayBuffer.isView(o)) {
                n = Buffer.from(o.buffer, o.byteOffset, o.byteLength);
              } else if (o instanceof ArrayBuffer) {
                n = Buffer.from(o);
              } else if (o instanceof Blob) {
                n = o[u];
              } else {
                n = Buffer.from(typeof o === 'string' ? o : String(o));
              }
              s += n.length;
              t.push(n);
            }
          }
          this[u] = Buffer.concat(t);
          let o = r && r.type !== undefined && String(r.type).toLowerCase();
          if (o && !/[^\u0020-\u007E]/.test(o)) {
            this[p] = o;
          }
        }
        get size() {
          return this[u].length;
        }
        get type() {
          return this[p];
        }
        text() {
          return Promise.resolve(this[u].toString());
        }
        arrayBuffer() {
          const e = this[u];
          const r = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
          return Promise.resolve(r);
        }
        stream() {
          const e = new c();
          e._read = function () {};
          e.push(this[u]);
          e.push(null);
          return e;
        }
        toString() {
          return '[object Blob]';
        }
        slice() {
          const e = this.size;
          const r = arguments[0];
          const t = arguments[1];
          let s, o;
          if (r === undefined) {
            s = 0;
          } else if (r < 0) {
            s = Math.max(e + r, 0);
          } else {
            s = Math.min(r, e);
          }
          if (t === undefined) {
            o = e;
          } else if (t < 0) {
            o = Math.max(e + t, 0);
          } else {
            o = Math.min(t, e);
          }
          const n = Math.max(o - s, 0);
          const i = this[u];
          const a = i.slice(s, s + n);
          const c = new Blob([], { type: arguments[2] });
          c[u] = a;
          return c;
        }
      }
      Object.defineProperties(Blob.prototype, {
        size: { enumerable: true },
        type: { enumerable: true },
        slice: { enumerable: true }
      });
      Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
        value: 'Blob',
        writable: false,
        enumerable: false,
        configurable: true
      });
      function FetchError(e, r, t) {
        Error.call(this, e);
        this.message = e;
        this.type = r;
        if (t) {
          this.code = this.errno = t.code;
        }
        Error.captureStackTrace(this, this.constructor);
      }
      FetchError.prototype = Object.create(Error.prototype);
      FetchError.prototype.constructor = FetchError;
      FetchError.prototype.name = 'FetchError';
      let l;
      try {
        l = t(567).convert;
      } catch (e) {}
      const d = Symbol('Body internals');
      const m = s.PassThrough;
      function Body(e) {
        var r = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          o = t.size;
        let n = o === undefined ? 0 : o;
        var i = t.timeout;
        let a = i === undefined ? 0 : i;
        if (e == null) {
          e = null;
        } else if (isURLSearchParams(e)) {
          e = Buffer.from(e.toString());
        } else if (isBlob(e));
        else if (Buffer.isBuffer(e));
        else if (Object.prototype.toString.call(e) === '[object ArrayBuffer]') {
          e = Buffer.from(e);
        } else if (ArrayBuffer.isView(e)) {
          e = Buffer.from(e.buffer, e.byteOffset, e.byteLength);
        } else if (e instanceof s);
        else {
          e = Buffer.from(String(e));
        }
        this[d] = { body: e, disturbed: false, error: null };
        this.size = n;
        this.timeout = a;
        if (e instanceof s) {
          e.on('error', function (e) {
            const t =
              e.name === 'AbortError'
                ? e
                : new FetchError(`Invalid response body while trying to fetch ${r.url}: ${e.message}`, 'system', e);
            r[d].error = t;
          });
        }
      }
      Body.prototype = {
        get body() {
          return this[d].body;
        },
        get bodyUsed() {
          return this[d].disturbed;
        },
        arrayBuffer() {
          return consumeBody.call(this).then(function (e) {
            return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
          });
        },
        blob() {
          let e = (this.headers && this.headers.get('content-type')) || '';
          return consumeBody.call(this).then(function (r) {
            return Object.assign(new Blob([], { type: e.toLowerCase() }), { [u]: r });
          });
        },
        json() {
          var e = this;
          return consumeBody.call(this).then(function (r) {
            try {
              return JSON.parse(r.toString());
            } catch (r) {
              return Body.Promise.reject(
                new FetchError(`invalid json response body at ${e.url} reason: ${r.message}`, 'invalid-json')
              );
            }
          });
        },
        text() {
          return consumeBody.call(this).then(function (e) {
            return e.toString();
          });
        },
        buffer() {
          return consumeBody.call(this);
        },
        textConverted() {
          var e = this;
          return consumeBody.call(this).then(function (r) {
            return convertBody(r, e.headers);
          });
        }
      };
      Object.defineProperties(Body.prototype, {
        body: { enumerable: true },
        bodyUsed: { enumerable: true },
        arrayBuffer: { enumerable: true },
        blob: { enumerable: true },
        json: { enumerable: true },
        text: { enumerable: true }
      });
      Body.mixIn = function (e) {
        for (const r of Object.getOwnPropertyNames(Body.prototype)) {
          if (!(r in e)) {
            const t = Object.getOwnPropertyDescriptor(Body.prototype, r);
            Object.defineProperty(e, r, t);
          }
        }
      };
      function consumeBody() {
        var e = this;
        if (this[d].disturbed) {
          return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
        }
        this[d].disturbed = true;
        if (this[d].error) {
          return Body.Promise.reject(this[d].error);
        }
        let r = this.body;
        if (r === null) {
          return Body.Promise.resolve(Buffer.alloc(0));
        }
        if (isBlob(r)) {
          r = r.stream();
        }
        if (Buffer.isBuffer(r)) {
          return Body.Promise.resolve(r);
        }
        if (!(r instanceof s)) {
          return Body.Promise.resolve(Buffer.alloc(0));
        }
        let t = [];
        let o = 0;
        let n = false;
        return new Body.Promise(function (s, i) {
          let a;
          if (e.timeout) {
            a = setTimeout(function () {
              n = true;
              i(
                new FetchError(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`, 'body-timeout')
              );
            }, e.timeout);
          }
          r.on('error', function (r) {
            if (r.name === 'AbortError') {
              n = true;
              i(r);
            } else {
              i(new FetchError(`Invalid response body while trying to fetch ${e.url}: ${r.message}`, 'system', r));
            }
          });
          r.on('data', function (r) {
            if (n || r === null) {
              return;
            }
            if (e.size && o + r.length > e.size) {
              n = true;
              i(new FetchError(`content size at ${e.url} over limit: ${e.size}`, 'max-size'));
              return;
            }
            o += r.length;
            t.push(r);
          });
          r.on('end', function () {
            if (n) {
              return;
            }
            clearTimeout(a);
            try {
              s(Buffer.concat(t, o));
            } catch (r) {
              i(new FetchError(`Could not create Buffer from response body for ${e.url}: ${r.message}`, 'system', r));
            }
          });
        });
      }
      function convertBody(e, r) {
        if (typeof l !== 'function') {
          throw new Error('The package `encoding` must be installed to use the textConverted() function');
        }
        const t = r.get('content-type');
        let s = 'utf-8';
        let o, n;
        if (t) {
          o = /charset=([^;]*)/i.exec(t);
        }
        n = e.slice(0, 1024).toString();
        if (!o && n) {
          o = /<meta.+?charset=(['"])(.+?)\1/i.exec(n);
        }
        if (!o && n) {
          o = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(n);
          if (!o) {
            o = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(n);
            if (o) {
              o.pop();
            }
          }
          if (o) {
            o = /charset=(.*)/i.exec(o.pop());
          }
        }
        if (!o && n) {
          o = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(n);
        }
        if (o) {
          s = o.pop();
          if (s === 'gb2312' || s === 'gbk') {
            s = 'gb18030';
          }
        }
        return l(e, 'UTF-8', s).toString();
      }
      function isURLSearchParams(e) {
        if (
          typeof e !== 'object' ||
          typeof e.append !== 'function' ||
          typeof e.delete !== 'function' ||
          typeof e.get !== 'function' ||
          typeof e.getAll !== 'function' ||
          typeof e.has !== 'function' ||
          typeof e.set !== 'function'
        ) {
          return false;
        }
        return (
          e.constructor.name === 'URLSearchParams' ||
          Object.prototype.toString.call(e) === '[object URLSearchParams]' ||
          typeof e.sort === 'function'
        );
      }
      function isBlob(e) {
        return (
          typeof e === 'object' &&
          typeof e.arrayBuffer === 'function' &&
          typeof e.type === 'string' &&
          typeof e.stream === 'function' &&
          typeof e.constructor === 'function' &&
          typeof e.constructor.name === 'string' &&
          /^(Blob|File)$/.test(e.constructor.name) &&
          /^(Blob|File)$/.test(e[Symbol.toStringTag])
        );
      }
      function clone(e) {
        let r, t;
        let o = e.body;
        if (e.bodyUsed) {
          throw new Error('cannot clone body after it is used');
        }
        if (o instanceof s && typeof o.getBoundary !== 'function') {
          r = new m();
          t = new m();
          o.pipe(r);
          o.pipe(t);
          e[d].body = r;
          o = t;
        }
        return o;
      }
      function extractContentType(e) {
        if (e === null) {
          return null;
        } else if (typeof e === 'string') {
          return 'text/plain;charset=UTF-8';
        } else if (isURLSearchParams(e)) {
          return 'application/x-www-form-urlencoded;charset=UTF-8';
        } else if (isBlob(e)) {
          return e.type || null;
        } else if (Buffer.isBuffer(e)) {
          return null;
        } else if (Object.prototype.toString.call(e) === '[object ArrayBuffer]') {
          return null;
        } else if (ArrayBuffer.isView(e)) {
          return null;
        } else if (typeof e.getBoundary === 'function') {
          return `multipart/form-data;boundary=${e.getBoundary()}`;
        } else if (e instanceof s) {
          return null;
        } else {
          return 'text/plain;charset=UTF-8';
        }
      }
      function getTotalBytes(e) {
        const r = e.body;
        if (r === null) {
          return 0;
        } else if (isBlob(r)) {
          return r.size;
        } else if (Buffer.isBuffer(r)) {
          return r.length;
        } else if (r && typeof r.getLengthSync === 'function') {
          if ((r._lengthRetrievers && r._lengthRetrievers.length == 0) || (r.hasKnownLength && r.hasKnownLength())) {
            return r.getLengthSync();
          }
          return null;
        } else {
          return null;
        }
      }
      function writeToStream(e, r) {
        const t = r.body;
        if (t === null) {
          e.end();
        } else if (isBlob(t)) {
          t.stream().pipe(e);
        } else if (Buffer.isBuffer(t)) {
          e.write(t);
          e.end();
        } else {
          t.pipe(e);
        }
      }
      Body.Promise = global.Promise;
      const g = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
      const h = /[^\t\x20-\x7e\x80-\xff]/;
      function validateName(e) {
        e = `${e}`;
        if (g.test(e) || e === '') {
          throw new TypeError(`${e} is not a legal HTTP header name`);
        }
      }
      function validateValue(e) {
        e = `${e}`;
        if (h.test(e)) {
          throw new TypeError(`${e} is not a legal HTTP header value`);
        }
      }
      function find(e, r) {
        r = r.toLowerCase();
        for (const t in e) {
          if (t.toLowerCase() === r) {
            return t;
          }
        }
        return undefined;
      }
      const T = Symbol('map');
      class Headers {
        constructor() {
          let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
          this[T] = Object.create(null);
          if (e instanceof Headers) {
            const r = e.raw();
            const t = Object.keys(r);
            for (const e of t) {
              for (const t of r[e]) {
                this.append(e, t);
              }
            }
            return;
          }
          if (e == null);
          else if (typeof e === 'object') {
            const r = e[Symbol.iterator];
            if (r != null) {
              if (typeof r !== 'function') {
                throw new TypeError('Header pairs must be iterable');
              }
              const t = [];
              for (const r of e) {
                if (typeof r !== 'object' || typeof r[Symbol.iterator] !== 'function') {
                  throw new TypeError('Each header pair must be iterable');
                }
                t.push(Array.from(r));
              }
              for (const e of t) {
                if (e.length !== 2) {
                  throw new TypeError('Each header pair must be a name/value tuple');
                }
                this.append(e[0], e[1]);
              }
            } else {
              for (const r of Object.keys(e)) {
                const t = e[r];
                this.append(r, t);
              }
            }
          } else {
            throw new TypeError('Provided initializer must be an object');
          }
        }
        get(e) {
          e = `${e}`;
          validateName(e);
          const r = find(this[T], e);
          if (r === undefined) {
            return null;
          }
          return this[T][r].join(', ');
        }
        forEach(e) {
          let r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
          let t = getHeaders(this);
          let s = 0;
          while (s < t.length) {
            var o = t[s];
            const n = o[0],
              i = o[1];
            e.call(r, i, n, this);
            t = getHeaders(this);
            s++;
          }
        }
        set(e, r) {
          e = `${e}`;
          r = `${r}`;
          validateName(e);
          validateValue(r);
          const t = find(this[T], e);
          this[T][t !== undefined ? t : e] = [r];
        }
        append(e, r) {
          e = `${e}`;
          r = `${r}`;
          validateName(e);
          validateValue(r);
          const t = find(this[T], e);
          if (t !== undefined) {
            this[T][t].push(r);
          } else {
            this[T][e] = [r];
          }
        }
        has(e) {
          e = `${e}`;
          validateName(e);
          return find(this[T], e) !== undefined;
        }
        delete(e) {
          e = `${e}`;
          validateName(e);
          const r = find(this[T], e);
          if (r !== undefined) {
            delete this[T][r];
          }
        }
        raw() {
          return this[T];
        }
        keys() {
          return createHeadersIterator(this, 'key');
        }
        values() {
          return createHeadersIterator(this, 'value');
        }
        [Symbol.iterator]() {
          return createHeadersIterator(this, 'key+value');
        }
      }
      Headers.prototype.entries = Headers.prototype[Symbol.iterator];
      Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
        value: 'Headers',
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperties(Headers.prototype, {
        get: { enumerable: true },
        forEach: { enumerable: true },
        set: { enumerable: true },
        append: { enumerable: true },
        has: { enumerable: true },
        delete: { enumerable: true },
        keys: { enumerable: true },
        values: { enumerable: true },
        entries: { enumerable: true }
      });
      function getHeaders(e) {
        let r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';
        const t = Object.keys(e[T]).sort();
        return t.map(
          r === 'key'
            ? function (e) {
                return e.toLowerCase();
              }
            : r === 'value'
            ? function (r) {
                return e[T][r].join(', ');
              }
            : function (r) {
                return [r.toLowerCase(), e[T][r].join(', ')];
              }
        );
      }
      const E = Symbol('internal');
      function createHeadersIterator(e, r) {
        const t = Object.create(b);
        t[E] = { target: e, kind: r, index: 0 };
        return t;
      }
      const b = Object.setPrototypeOf(
        {
          next() {
            if (!this || Object.getPrototypeOf(this) !== b) {
              throw new TypeError('Value of `this` is not a HeadersIterator');
            }
            var e = this[E];
            const r = e.target,
              t = e.kind,
              s = e.index;
            const o = getHeaders(r, t);
            const n = o.length;
            if (s >= n) {
              return { value: undefined, done: true };
            }
            this[E].index = s + 1;
            return { value: o[s], done: false };
          }
        },
        Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()))
      );
      Object.defineProperty(b, Symbol.toStringTag, {
        value: 'HeadersIterator',
        writable: false,
        enumerable: false,
        configurable: true
      });
      function exportNodeCompatibleHeaders(e) {
        const r = Object.assign({ __proto__: null }, e[T]);
        const t = find(e[T], 'Host');
        if (t !== undefined) {
          r[t] = r[t][0];
        }
        return r;
      }
      function createHeadersLenient(e) {
        const r = new Headers();
        for (const t of Object.keys(e)) {
          if (g.test(t)) {
            continue;
          }
          if (Array.isArray(e[t])) {
            for (const s of e[t]) {
              if (h.test(s)) {
                continue;
              }
              if (r[T][t] === undefined) {
                r[T][t] = [s];
              } else {
                r[T][t].push(s);
              }
            }
          } else if (!h.test(e[t])) {
            r[T][t] = [e[t]];
          }
        }
        return r;
      }
      const w = Symbol('Response internals');
      const _ = o.STATUS_CODES;
      class Response {
        constructor() {
          let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          let r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          Body.call(this, e, r);
          const t = r.status || 200;
          const s = new Headers(r.headers);
          if (e != null && !s.has('Content-Type')) {
            const r = extractContentType(e);
            if (r) {
              s.append('Content-Type', r);
            }
          }
          this[w] = { url: r.url, status: t, statusText: r.statusText || _[t], headers: s, counter: r.counter };
        }
        get url() {
          return this[w].url || '';
        }
        get status() {
          return this[w].status;
        }
        get ok() {
          return this[w].status >= 200 && this[w].status < 300;
        }
        get redirected() {
          return this[w].counter > 0;
        }
        get statusText() {
          return this[w].statusText;
        }
        get headers() {
          return this[w].headers;
        }
        clone() {
          return new Response(clone(this), {
            url: this.url,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            ok: this.ok,
            redirected: this.redirected
          });
        }
      }
      Body.mixIn(Response.prototype);
      Object.defineProperties(Response.prototype, {
        url: { enumerable: true },
        status: { enumerable: true },
        ok: { enumerable: true },
        redirected: { enumerable: true },
        statusText: { enumerable: true },
        headers: { enumerable: true },
        clone: { enumerable: true }
      });
      Object.defineProperty(Response.prototype, Symbol.toStringTag, {
        value: 'Response',
        writable: false,
        enumerable: false,
        configurable: true
      });
      const y = Symbol('Request internals');
      const v = n.parse;
      const G = n.format;
      const k = 'destroy' in s.Readable.prototype;
      function isRequest(e) {
        return typeof e === 'object' && typeof e[y] === 'object';
      }
      function isAbortSignal(e) {
        const r = e && typeof e === 'object' && Object.getPrototypeOf(e);
        return !!(r && r.constructor.name === 'AbortSignal');
      }
      class Request {
        constructor(e) {
          let r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          let t;
          if (!isRequest(e)) {
            if (e && e.href) {
              t = v(e.href);
            } else {
              t = v(`${e}`);
            }
            e = {};
          } else {
            t = v(e.url);
          }
          let s = r.method || e.method || 'GET';
          s = s.toUpperCase();
          if ((r.body != null || (isRequest(e) && e.body !== null)) && (s === 'GET' || s === 'HEAD')) {
            throw new TypeError('Request with GET/HEAD method cannot have body');
          }
          let o = r.body != null ? r.body : isRequest(e) && e.body !== null ? clone(e) : null;
          Body.call(this, o, { timeout: r.timeout || e.timeout || 0, size: r.size || e.size || 0 });
          const n = new Headers(r.headers || e.headers || {});
          if (o != null && !n.has('Content-Type')) {
            const e = extractContentType(o);
            if (e) {
              n.append('Content-Type', e);
            }
          }
          let i = isRequest(e) ? e.signal : null;
          if ('signal' in r) i = r.signal;
          if (i != null && !isAbortSignal(i)) {
            throw new TypeError('Expected signal to be an instanceof AbortSignal');
          }
          this[y] = { method: s, redirect: r.redirect || e.redirect || 'follow', headers: n, parsedURL: t, signal: i };
          this.follow = r.follow !== undefined ? r.follow : e.follow !== undefined ? e.follow : 20;
          this.compress = r.compress !== undefined ? r.compress : e.compress !== undefined ? e.compress : true;
          this.counter = r.counter || e.counter || 0;
          this.agent = r.agent || e.agent;
        }
        get method() {
          return this[y].method;
        }
        get url() {
          return G(this[y].parsedURL);
        }
        get headers() {
          return this[y].headers;
        }
        get redirect() {
          return this[y].redirect;
        }
        get signal() {
          return this[y].signal;
        }
        clone() {
          return new Request(this);
        }
      }
      Body.mixIn(Request.prototype);
      Object.defineProperty(Request.prototype, Symbol.toStringTag, {
        value: 'Request',
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperties(Request.prototype, {
        method: { enumerable: true },
        url: { enumerable: true },
        headers: { enumerable: true },
        redirect: { enumerable: true },
        clone: { enumerable: true },
        signal: { enumerable: true }
      });
      function getNodeRequestOptions(e) {
        const r = e[y].parsedURL;
        const t = new Headers(e[y].headers);
        if (!t.has('Accept')) {
          t.set('Accept', '*/*');
        }
        if (!r.protocol || !r.hostname) {
          throw new TypeError('Only absolute URLs are supported');
        }
        if (!/^https?:$/.test(r.protocol)) {
          throw new TypeError('Only HTTP(S) protocols are supported');
        }
        if (e.signal && e.body instanceof s.Readable && !k) {
          throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
        }
        let o = null;
        if (e.body == null && /^(POST|PUT)$/i.test(e.method)) {
          o = '0';
        }
        if (e.body != null) {
          const r = getTotalBytes(e);
          if (typeof r === 'number') {
            o = String(r);
          }
        }
        if (o) {
          t.set('Content-Length', o);
        }
        if (!t.has('User-Agent')) {
          t.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
        }
        if (e.compress && !t.has('Accept-Encoding')) {
          t.set('Accept-Encoding', 'gzip,deflate');
        }
        let n = e.agent;
        if (typeof n === 'function') {
          n = n(r);
        }
        if (!t.has('Connection') && !n) {
          t.set('Connection', 'close');
        }
        return Object.assign({}, r, { method: e.method, headers: exportNodeCompatibleHeaders(t), agent: n });
      }
      function AbortError(e) {
        Error.call(this, e);
        this.type = 'aborted';
        this.message = e;
        Error.captureStackTrace(this, this.constructor);
      }
      AbortError.prototype = Object.create(Error.prototype);
      AbortError.prototype.constructor = AbortError;
      AbortError.prototype.name = 'AbortError';
      const O = s.PassThrough;
      const P = n.resolve;
      function fetch(e, r) {
        if (!fetch.Promise) {
          throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
        }
        Body.Promise = fetch.Promise;
        return new fetch.Promise(function (t, n) {
          const c = new Request(e, r);
          const u = getNodeRequestOptions(c);
          const p = (u.protocol === 'https:' ? i : o).request;
          const l = c.signal;
          let d = null;
          const m = function abort() {
            let e = new AbortError('The user aborted a request.');
            n(e);
            if (c.body && c.body instanceof s.Readable) {
              c.body.destroy(e);
            }
            if (!d || !d.body) return;
            d.body.emit('error', e);
          };
          if (l && l.aborted) {
            m();
            return;
          }
          const g = function abortAndFinalize() {
            m();
            finalize();
          };
          const h = p(u);
          let T;
          if (l) {
            l.addEventListener('abort', g);
          }
          function finalize() {
            h.abort();
            if (l) l.removeEventListener('abort', g);
            clearTimeout(T);
          }
          if (c.timeout) {
            h.once('socket', function (e) {
              T = setTimeout(function () {
                n(new FetchError(`network timeout at: ${c.url}`, 'request-timeout'));
                finalize();
              }, c.timeout);
            });
          }
          h.on('error', function (e) {
            n(new FetchError(`request to ${c.url} failed, reason: ${e.message}`, 'system', e));
            finalize();
          });
          h.on('response', function (e) {
            clearTimeout(T);
            const r = createHeadersLenient(e.headers);
            if (fetch.isRedirect(e.statusCode)) {
              const s = r.get('Location');
              const o = s === null ? null : P(c.url, s);
              switch (c.redirect) {
                case 'error':
                  n(
                    new FetchError(
                      `uri requested responds with a redirect, redirect mode is set to error: ${c.url}`,
                      'no-redirect'
                    )
                  );
                  finalize();
                  return;
                case 'manual':
                  if (o !== null) {
                    try {
                      r.set('Location', o);
                    } catch (e) {
                      n(e);
                    }
                  }
                  break;
                case 'follow':
                  if (o === null) {
                    break;
                  }
                  if (c.counter >= c.follow) {
                    n(new FetchError(`maximum redirect reached at: ${c.url}`, 'max-redirect'));
                    finalize();
                    return;
                  }
                  const s = {
                    headers: new Headers(c.headers),
                    follow: c.follow,
                    counter: c.counter + 1,
                    agent: c.agent,
                    compress: c.compress,
                    method: c.method,
                    body: c.body,
                    signal: c.signal,
                    timeout: c.timeout,
                    size: c.size
                  };
                  if (e.statusCode !== 303 && c.body && getTotalBytes(c) === null) {
                    n(
                      new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect')
                    );
                    finalize();
                    return;
                  }
                  if (e.statusCode === 303 || ((e.statusCode === 301 || e.statusCode === 302) && c.method === 'POST')) {
                    s.method = 'GET';
                    s.body = undefined;
                    s.headers.delete('content-length');
                  }
                  t(fetch(new Request(o, s)));
                  finalize();
                  return;
              }
            }
            e.once('end', function () {
              if (l) l.removeEventListener('abort', g);
            });
            let s = e.pipe(new O());
            const o = {
              url: c.url,
              status: e.statusCode,
              statusText: e.statusMessage,
              headers: r,
              size: c.size,
              timeout: c.timeout,
              counter: c.counter
            };
            const i = r.get('Content-Encoding');
            if (!c.compress || c.method === 'HEAD' || i === null || e.statusCode === 204 || e.statusCode === 304) {
              d = new Response(s, o);
              t(d);
              return;
            }
            const u = { flush: a.Z_SYNC_FLUSH, finishFlush: a.Z_SYNC_FLUSH };
            if (i == 'gzip' || i == 'x-gzip') {
              s = s.pipe(a.createGunzip(u));
              d = new Response(s, o);
              t(d);
              return;
            }
            if (i == 'deflate' || i == 'x-deflate') {
              const r = e.pipe(new O());
              r.once('data', function (e) {
                if ((e[0] & 15) === 8) {
                  s = s.pipe(a.createInflate());
                } else {
                  s = s.pipe(a.createInflateRaw());
                }
                d = new Response(s, o);
                t(d);
              });
              return;
            }
            if (i == 'br' && typeof a.createBrotliDecompress === 'function') {
              s = s.pipe(a.createBrotliDecompress());
              d = new Response(s, o);
              t(d);
              return;
            }
            d = new Response(s, o);
            t(d);
          });
          writeToStream(h, c);
        });
      }
      fetch.isRedirect = function (e) {
        return e === 301 || e === 302 || e === 303 || e === 307 || e === 308;
      };
      fetch.Promise = global.Promise;
      e.exports = r = fetch;
      Object.defineProperty(r, '__esModule', { value: true });
      r.default = r;
      r.Headers = Headers;
      r.Request = Request;
      r.Response = Response;
      r.FetchError = FetchError;
    },
    362: (e, r, t) => {
      var s = t(122);
      e.exports = s(once);
      e.exports.strict = s(onceStrict);
      once.proto = once(function () {
        Object.defineProperty(Function.prototype, 'once', {
          value: function () {
            return once(this);
          },
          configurable: true
        });
        Object.defineProperty(Function.prototype, 'onceStrict', {
          value: function () {
            return onceStrict(this);
          },
          configurable: true
        });
      });
      function once(e) {
        var f = function () {
          if (f.called) return f.value;
          f.called = true;
          return (f.value = e.apply(this, arguments));
        };
        f.called = false;
        return f;
      }
      function onceStrict(e) {
        var f = function () {
          if (f.called) throw new Error(f.onceError);
          f.called = true;
          return (f.value = e.apply(this, arguments));
        };
        var r = e.name || 'Function wrapped with `once`';
        f.onceError = r + " shouldn't be called more than once";
        f.called = false;
        return f;
      }
    },
    109: (e, r, t) => {
      e.exports = t(467);
    },
    467: (e, r, t) => {
      'use strict';
      var s = t(631);
      var o = t(16);
      var n = t(605);
      var i = t(211);
      var a = t(614);
      var c = t(357);
      var u = t(669);
      r.httpOverHttp = httpOverHttp;
      r.httpsOverHttp = httpsOverHttp;
      r.httpOverHttps = httpOverHttps;
      r.httpsOverHttps = httpsOverHttps;
      function httpOverHttp(e) {
        var r = new TunnelingAgent(e);
        r.request = n.request;
        return r;
      }
      function httpsOverHttp(e) {
        var r = new TunnelingAgent(e);
        r.request = n.request;
        r.createSocket = createSecureSocket;
        r.defaultPort = 443;
        return r;
      }
      function httpOverHttps(e) {
        var r = new TunnelingAgent(e);
        r.request = i.request;
        return r;
      }
      function httpsOverHttps(e) {
        var r = new TunnelingAgent(e);
        r.request = i.request;
        r.createSocket = createSecureSocket;
        r.defaultPort = 443;
        return r;
      }
      function TunnelingAgent(e) {
        var r = this;
        r.options = e || {};
        r.proxyOptions = r.options.proxy || {};
        r.maxSockets = r.options.maxSockets || n.Agent.defaultMaxSockets;
        r.requests = [];
        r.sockets = [];
        r.on('free', function onFree(e, t, s, o) {
          var n = toOptions(t, s, o);
          for (var i = 0, a = r.requests.length; i < a; ++i) {
            var c = r.requests[i];
            if (c.host === n.host && c.port === n.port) {
              r.requests.splice(i, 1);
              c.request.onSocket(e);
              return;
            }
          }
          e.destroy();
          r.removeSocket(e);
        });
      }
      u.inherits(TunnelingAgent, a.EventEmitter);
      TunnelingAgent.prototype.addRequest = function addRequest(e, r, t, s) {
        var o = this;
        var n = mergeOptions({ request: e }, o.options, toOptions(r, t, s));
        if (o.sockets.length >= this.maxSockets) {
          o.requests.push(n);
          return;
        }
        o.createSocket(n, function (r) {
          r.on('free', onFree);
          r.on('close', onCloseOrRemove);
          r.on('agentRemove', onCloseOrRemove);
          e.onSocket(r);
          function onFree() {
            o.emit('free', r, n);
          }
          function onCloseOrRemove(e) {
            o.removeSocket(r);
            r.removeListener('free', onFree);
            r.removeListener('close', onCloseOrRemove);
            r.removeListener('agentRemove', onCloseOrRemove);
          }
        });
      };
      TunnelingAgent.prototype.createSocket = function createSocket(e, r) {
        var t = this;
        var s = {};
        t.sockets.push(s);
        var o = mergeOptions({}, t.proxyOptions, {
          method: 'CONNECT',
          path: e.host + ':' + e.port,
          agent: false,
          headers: { host: e.host + ':' + e.port }
        });
        if (e.localAddress) {
          o.localAddress = e.localAddress;
        }
        if (o.proxyAuth) {
          o.headers = o.headers || {};
          o.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(o.proxyAuth).toString('base64');
        }
        p('making CONNECT request');
        var n = t.request(o);
        n.useChunkedEncodingByDefault = false;
        n.once('response', onResponse);
        n.once('upgrade', onUpgrade);
        n.once('connect', onConnect);
        n.once('error', onError);
        n.end();
        function onResponse(e) {
          e.upgrade = true;
        }
        function onUpgrade(e, r, t) {
          process.nextTick(function () {
            onConnect(e, r, t);
          });
        }
        function onConnect(o, i, a) {
          n.removeAllListeners();
          i.removeAllListeners();
          if (o.statusCode !== 200) {
            p('tunneling socket could not be established, statusCode=%d', o.statusCode);
            i.destroy();
            var c = new Error('tunneling socket could not be established, ' + 'statusCode=' + o.statusCode);
            c.code = 'ECONNRESET';
            e.request.emit('error', c);
            t.removeSocket(s);
            return;
          }
          if (a.length > 0) {
            p('got illegal response body from proxy');
            i.destroy();
            var c = new Error('got illegal response body from proxy');
            c.code = 'ECONNRESET';
            e.request.emit('error', c);
            t.removeSocket(s);
            return;
          }
          p('tunneling connection has established');
          t.sockets[t.sockets.indexOf(s)] = i;
          return r(i);
        }
        function onError(r) {
          n.removeAllListeners();
          p('tunneling socket could not be established, cause=%s\n', r.message, r.stack);
          var o = new Error('tunneling socket could not be established, ' + 'cause=' + r.message);
          o.code = 'ECONNRESET';
          e.request.emit('error', o);
          t.removeSocket(s);
        }
      };
      TunnelingAgent.prototype.removeSocket = function removeSocket(e) {
        var r = this.sockets.indexOf(e);
        if (r === -1) {
          return;
        }
        this.sockets.splice(r, 1);
        var t = this.requests.shift();
        if (t) {
          this.createSocket(t, function (e) {
            t.request.onSocket(e);
          });
        }
      };
      function createSecureSocket(e, r) {
        var t = this;
        TunnelingAgent.prototype.createSocket.call(t, e, function (s) {
          var n = e.request.getHeader('host');
          var i = mergeOptions({}, t.options, { socket: s, servername: n ? n.replace(/:.*$/, '') : e.host });
          var a = o.connect(0, i);
          t.sockets[t.sockets.indexOf(s)] = a;
          r(a);
        });
      }
      function toOptions(e, r, t) {
        if (typeof e === 'string') {
          return { host: e, port: r, localAddress: t };
        }
        return e;
      }
      function mergeOptions(e) {
        for (var r = 1, t = arguments.length; r < t; ++r) {
          var s = arguments[r];
          if (typeof s === 'object') {
            var o = Object.keys(s);
            for (var n = 0, i = o.length; n < i; ++n) {
              var a = o[n];
              if (s[a] !== undefined) {
                e[a] = s[a];
              }
            }
          }
        }
        return e;
      }
      var p;
      if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
        p = function () {
          var e = Array.prototype.slice.call(arguments);
          if (typeof e[0] === 'string') {
            e[0] = 'TUNNEL: ' + e[0];
          } else {
            e.unshift('TUNNEL:');
          }
          console.error.apply(console, e);
        };
      } else {
        p = function () {};
      }
      r.debug = p;
    },
    546: (e, r) => {
      'use strict';
      Object.defineProperty(r, '__esModule', { value: true });
      function getUserAgent() {
        if (typeof navigator === 'object' && 'userAgent' in navigator) {
          return navigator.userAgent;
        }
        if (typeof process === 'object' && 'version' in process) {
          return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
        }
        return '<environment undetectable>';
      }
      r.getUserAgent = getUserAgent;
    },
    122: (e) => {
      e.exports = wrappy;
      function wrappy(e, r) {
        if (e && r) return wrappy(e)(r);
        if (typeof e !== 'function') throw new TypeError('need wrapper function');
        Object.keys(e).forEach(function (r) {
          wrapper[r] = e[r];
        });
        return wrapper;
        function wrapper() {
          var r = new Array(arguments.length);
          for (var t = 0; t < r.length; t++) {
            r[t] = arguments[t];
          }
          var s = e.apply(this, r);
          var o = r[r.length - 1];
          if (typeof s === 'function' && s !== o) {
            Object.keys(o).forEach(function (e) {
              s[e] = o[e];
            });
          }
          return s;
        }
      }
    },
    567: (module) => {
      module.exports = eval('require')('encoding');
    },
    357: (e) => {
      'use strict';
      e.exports = require('assert');
    },
    614: (e) => {
      'use strict';
      e.exports = require('events');
    },
    747: (e) => {
      'use strict';
      e.exports = require('fs');
    },
    605: (e) => {
      'use strict';
      e.exports = require('http');
    },
    211: (e) => {
      'use strict';
      e.exports = require('https');
    },
    631: (e) => {
      'use strict';
      e.exports = require('net');
    },
    87: (e) => {
      'use strict';
      e.exports = require('os');
    },
    622: (e) => {
      'use strict';
      e.exports = require('path');
    },
    413: (e) => {
      'use strict';
      e.exports = require('stream');
    },
    16: (e) => {
      'use strict';
      e.exports = require('tls');
    },
    835: (e) => {
      'use strict';
      e.exports = require('url');
    },
    669: (e) => {
      'use strict';
      e.exports = require('util');
    },
    761: (e) => {
      'use strict';
      e.exports = require('zlib');
    }
  };
  var __webpack_module_cache__ = {};
  function __nccwpck_require__(e) {
    var r = __webpack_module_cache__[e];
    if (r !== undefined) {
      return r.exports;
    }
    var t = (__webpack_module_cache__[e] = { exports: {} });
    var s = true;
    try {
      __webpack_modules__[e].call(t.exports, t, t.exports, __nccwpck_require__);
      s = false;
    } finally {
      if (s) delete __webpack_module_cache__[e];
    }
    return t.exports;
  }
  (() => {
    __nccwpck_require__.n = (e) => {
      var r = e && e.__esModule ? () => e['default'] : () => e;
      __nccwpck_require__.d(r, { a: r });
      return r;
    };
  })();
  (() => {
    __nccwpck_require__.d = (e, r) => {
      for (var t in r) {
        if (__nccwpck_require__.o(r, t) && !__nccwpck_require__.o(e, t)) {
          Object.defineProperty(e, t, { enumerable: true, get: r[t] });
        }
      }
    };
  })();
  (() => {
    __nccwpck_require__.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r);
  })();
  (() => {
    __nccwpck_require__.r = (e) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(e, '__esModule', { value: true });
    };
  })();
  if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + '/';
  var __webpack_exports__ = {};
  (() => {
    'use strict';
    __nccwpck_require__.r(__webpack_exports__);
    var e = __nccwpck_require__(58);
    var r = __nccwpck_require__.n(e);
    var t = __nccwpck_require__(149);
    var s = __nccwpck_require__.n(t);
    const run = async () => {
      const r = t.getInput('owner') || e.context.repo.owner;
      const s = t.getInput('repo') || e.context.repo.repo;
      const o = t.getInput('github-token', { required: true });
      const n = t.getInput('dry-run') === 'true';
      const i = t.getInput('package-pattern', { required: true });
      const a = t.getInput('version-pattern', { required: true });
      const c = new RegExp(i);
      const u = new RegExp(a);
      if (n) {
        t.info('Dry run is set. No package versions will actually be deleted.');
      }
      t.info('Fetching packages');
      const p = e.getOctokit(o);
      const l = await p.repos.get({ repo: s, owner: r });
      const d = `\n    query($node_id: ID!) {\n      organization(login: "journeyapps-platform") {\n        packages(first: 100, packageType: NPM, repositoryId: $node_id) {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  `;
      const m = await p.graphql(d, { repo_id: l.data.node_id });
      const g = m.organization.packages.nodes.filter((e) => c.test(e.name)).map((e) => e.name);
      for (const e of g) {
        const s = await p.paginate(p.packages.getAllPackageVersionsForAPackageOwnedByAnOrg, {
          state: 'active',
          package_type: 'npm',
          package_name: e,
          org: r
        });
        const o = s.filter((e) => u.test(e.name));
        if (n) {
          t.info(`would delete in '${e}' the versions: ${o.map((e) => e.name)}`);
          continue;
        }
        for (const s of o) {
          t.info(`deleting version ${e}@${s.name}`);
          await p.packages.deletePackageVersionForOrg({
            org: r,
            package_type: 'npm',
            package_name: e,
            package_version_id: s.id
          });
        }
        t.info(`deleted ${o.length} versions`);
      }
    };
    run();
  })();
  module.exports = __webpack_exports__;
})();
