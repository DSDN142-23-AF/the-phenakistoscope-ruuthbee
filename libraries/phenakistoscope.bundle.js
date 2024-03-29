const FRAME_RATE = 8;

!(function (e) {
  var n = {};
  function t(i) {
    if (n[i]) return n[i].exports;
    var o = (n[i] = { i: i, l: !1, exports: {} });
    return e[i].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function (e, n, i) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: i });
    }),
    (t.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (t.t = function (e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (t.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: e }),
        2 & n && 'string' != typeof e)
      )
        for (var o in e)
          t.d(
            i,
            o,
            function (n) {
              return e[n];
            }.bind(null, o)
          );
      return i;
    }),
    (t.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(n, 'a', n), n;
    }),
    (t.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ''),
    t((t.s = 0));
})([
  function (e, n, t) {
    e.exports = t(1);
  },
  function (e, n, t) {
    'use strict';
    t.r(n);
    var i = new (function () {
      (this.phenakistoscope = void 0),
        (this.ccapturer = void 0),
        (this.p5 = void 0),
        (this.gfx = void 0),
        (this.canvas = void 0);
    })();
    function o(e, n) {
      for (var t = 0; t < n.length; t++) {
        var i = n[t];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    var a = (function () {
      function e(n) {
        !(function (e, n) {
          if (!(e instanceof n))
            throw new TypeError('Cannot call a class as a function');
        })(this, e),
          (this._total_images_to_load = 0),
          (this._loaded_images = 0),
          (this._images = {}),
          (this._image_sequences = {});
      }
      var n, t, a;
      return (
        (n = e),
        (t = [
          {
            key: 'load_image',
            value: function (e, n) {
              this._total_images_to_load++,
                (this._images[e] = i.p5.loadImage(
                  './assets/' + e + '.' + n,
                  this.image_loaded.bind(this)
                ));
            },
          },
          {
            key: 'load_image_sequence',
            value: function (e, n, t) {
              (this._total_images_to_load += t),
                (this._image_sequences[e] = []);
              for (var i = 0; i < t; ++i)
                this._image_sequences[e][i] = loadImage(
                  'assets/' + e + '/' + e + '_' + i + '.' + n,
                  this.image_loaded.bind(this)
                );
            },
          },
          {
            key: 'draw_image',
            value: function (e, n, t, i) {
              n.image(this._images[e], t, i);
            },
          },
          {
            key: 'draw_image_from_sequence',
            value: function (e, n, t, i, o) {
              var a = this._image_sequences[e].length,
                r = Math.floor(n * a) % a;
              t.image(this._image_sequences[e][r], i, o);
            },
          },
          {
            key: 'all_images_loaded',
            value: function () {
              return this._loaded_images >= this._total_images_to_load;
            },
          },
          {
            key: 'image_loaded',
            value: function () {
              this._loaded_images++;
            },
          },
        ]) && o(n.prototype, t),
        a && o(n, a),
        e
      );
    })();
    function r(e, n) {
      for (var t = 0; t < n.length; t++) {
        var i = n[t];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    var s = (function () {
        function e(n) {
          !(function (e, n) {
            if (!(e instanceof n))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this._resolution = n),
            (this._output_function = function () {}),
            (this._image_loader = new a()),
            (this._ccapturer = i.ccapturer),
            (this._dynamic_scale = !1),
            (this._lock_scale = !1),
            (this._pre_render = function () {}),
            (this._post_render = function () {}),
            (this._draw_slits = !1);
        }
        var n, t, o;
        return (
          (n = e),
          (t = [
            {
              key: 'set_default_values',
              value: function (e) {
                (this._layers = []),
                  (this._resolution = e),
                  (this._wedge_size = 1e3),
                  (this._print = !1),
                  (this._capture_frame = 0),
                  (this._slice_count = 20),
                  (this._direction = -1);
              },
            },
            {
              key: 'scale_for_screen',
              value: function (e) {
                (e = void 0 === e || e) && !this._lock_scale
                  ? (setup_new_canvas(
                      min(window.innerWidth, window.innerHeight),
                      min(window.innerWidth, window.innerHeight)
                    ),
                    this._dynamic_scale ||
                      (window.addEventListener(
                        'resize',
                        this.scale_for_screen.bind(this)
                      ),
                      (this._dynamic_scale = !0)))
                  : (window.removeEventListener(
                      'resize',
                      this.scale_for_screen.bind(this)
                    ),
                    (this._dynamic_scale = !1));
              },
            },
            {
              key: 'draw',
              value: function () {
                if (this._image_loader.all_images_loaded()) {
                  this._pre_render();
                  for (var e = 0; e < this._layers.length; e++)
                    (this._current_layer = e),
                      push(),
                      (this._layers[e].draw_boundaries = this._show_boundaries),
                      this._output_function(this._layers[e]),
                      pop();
                  this._post_render();
                }
              },
            },
            {
              key: 'render_slits',
              value: function () {
                if (this._draw_slits) {
                  push(),
                    rotate(-90),
                    stroke(0),
                    noFill(),
                    scale(0.5),
                    rotate(360 / this._slice_count / 2);
                  for (var e = 0; e < this._slice_count; e++)
                    rotate(360 / this._slice_count),
                      rect(
                        this._wedge_size - this._wedge_size / 3,
                        -15,
                        this._wedge_size / 3 + 50,
                        30
                      );
                  pop();
                }
              },
            },
            {
              key: 'draw_disk_mask',
              value: function () {
                push(),
                  fill(255),
                  stroke(0),
                  strokeWeight(this.display_scale),
                  beginShape(),
                  vertex(-10, -10),
                  vertex(width + 10, -10),
                  vertex(width + 10, height + 10),
                  vertex(-10, height + 10),
                  beginContour();
                for (
                  var e = (this._wedge_size / 2) * this.display_scale, n = 0;
                  n < 100;
                  ++n
                )
                  vertex(
                    width / 2 + cos(3.6 * -n) * e,
                    height / 2 + sin(3.6 * -n) * e
                  );
                endContour(), endShape(), pop();
              },
            },
            {
              key: 'add_layer',
              value: function (e) {
                this._layers.push(e), (e.parent_pScope = this);
              },
            },
            {
              key: 'output_mode',
              value: function (e) {
                this._output_function = e;
              },
            },
            {
              key: 'begin_capture_if_ready',
              value: function () {
                0 == this._capture_frame && this._ccapturer.start();
              },
            },
            {
              key: 'capture',
              value: function () {
                this._capture_frame < this.slice_count
                  ? (this._ccapturer.capture(i.canvas), this._capture_frame++)
                  : this._capture_frame >= this.slice_count &&
                    (this._ccapturer.stop(), this._ccapturer.save());
              },
            },
            {
              key: 'set_direction',
              value: function (e) {
                this._direction = e;
              },
            },
            {
              key: 'set_slice_count',
              value: function (e) {
                this._slice_count = e;
              },
            },
            {
              key: 'draw_layer_boundaries',
              value: function (e) {
                this._show_boundaries = e;
              },
            },
            {
              key: 'draw_slits',
              value: function (e) {
                this._draw_slits = e;
              },
            },
            {
              key: 'fill_background',
              value: function () {
                var e;
                (e = this._layers[this._current_layer]).fill_background.apply(
                  e,
                  arguments
                );
              },
            },
            {
              key: 'load_image',
              value: function (e, n) {
                this._image_loader.load_image(e, n);
              },
            },
            {
              key: 'load_image_sequence',
              value: function (e, n, t) {
                this._image_loader.load_image_sequence(e, n, t);
              },
            },
            {
              key: 'draw_image',
              value: function (e, n, t) {
                this._image_loader.draw_image(e, i.p5, n, t);
              },
            },
            {
              key: 'draw_image_from_sequence',
              value: function (e, n, t, o) {
                this._image_loader.draw_image_from_sequence(e, o, i.p5, n, t);
              },
            },
            {
              key: 'print',
              set: function (e) {
                this._print = e;
              },
              get: function () {
                return this._print;
              },
            },
            {
              key: 'pre_render',
              set: function (e) {
                this._pre_render = e;
              },
            },
            {
              key: 'post_render',
              set: function (e) {
                this._post_render = e;
              },
            },
            {
              key: 'lock_scale',
              set: function (e) {
                this._lock_scale = e;
              },
            },
            {
              key: 'resolution',
              get: function () {
                return this._resolution;
              },
            },
            {
              key: 'frame',
              get: function () {
                return this._frame;
              },
            },
            {
              key: 'slice_count',
              get: function () {
                return this._slice_count;
              },
            },
            {
              key: 'direction',
              get: function () {
                return this._direction;
              },
            },
            {
              key: 'display_scale',
              get: function () {
                return this._print
                  ? 1
                  : this._resolution / (this._wedge_size + 0);
              },
            },
            {
              key: 'slice_angle',
              get: function () {
                return 360 / this._slice_count;
              },
            },
            {
              key: 'wedge_size',
              get: function () {
                return this._wedge_size;
              },
            },
          ]) && r(n.prototype, t),
          o && r(n, o),
          e
        );
      })(),
      u = function (e) {
        return function (n) {
          var t, i, o;
          push(),
            c(e),
            n.set_animation_variables(0),
            push(),
            n.draw_function(0, 0, e),
            pop(),
            (t = 0),
            (i = 0),
            (o = 2),
            push(),
            stroke(255, 0, 0),
            line(t, i, t - o, i - o),
            line(t, i, t + o, i - o),
            line(t, i, t - o, i + o),
            line(t, i, t + o, i + o),
            pop(),
            pop();
        };
      },
      _ = function (e) {
        return function (n, t) {
          (t = void 0 === t ? 0 : t),
            push(),
            c(e),
            rotate(t),
            (function (e, n) {
              push(), scale(0.5);
              for (var t = e.slice_angle, i = 0; i < e.slice_count; i++)
                push(), rotate(i * t), l(e, n, i), pop();
              pop();
            })(e, n),
            pop(),
            push(),
            c(e),
            e.render_slits(),
            pop(),
            push(),
            e.draw_disk_mask(),
            pop();
        };
      };
    function c(e) {
      translate(width / 2, height / 2), scale(e.display_scale, e.display_scale);
    }
    function l(e, n, t) {
      push(),
        n.animation_function(t, n.boundary.low, n.boundary.high),
        pop(),
        n.draw_boundry();
    }
    var d = function (e) {
      return function (n) {
        push(),
          this.set_animation_variables(n / (e.slice_count + 0)),
          this.background_function(this.animation_variables, e),
          this.draw_function(0, 0, this.animation_variables, e),
          pop();
      };
    };
    function h(e) {
      return (h =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            })(e);
    }
    function f(e, n) {
      for (var t = 0; t < n.length; t++) {
        var i = n[t];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          'value' in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    function p() {}
    var y = (function () {
        function e(n) {
          for (
            var t = this,
              o = arguments.length,
              a = new Array(o > 1 ? o - 1 : 0),
              r = 1;
            r < o;
            r++
          )
            a[r - 1] = arguments[r];
          !(function (e, n) {
            if (!(e instanceof n))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (n = n || p),
            (this._draw_function = n.bind(this));
          var s = h(a[0]);
          (this._background_function =
            'function' === s
              ? a[0].bind(this)
              : 'undefined' !== s
              ? function () {
                  var e;
                  return (e = t.fill_background).call.apply(e, [t].concat(a));
                }
              : function () {}),
            (this._animation_function = d(i.phenakistoscope).bind(this)),
            (this._do_draw_boundaries = !0),
            this.set_boundary(0, 1e3),
            i.phenakistoscope.add_layer(this);
        }
        var n, t, o;
        return (
          (n = e),
          (t = [
            {
              key: 'set_boundary',
              value: function (e, n) {
                this._bounds = { low: e, high: n };
              },
            },
            {
              key: 'set_animation_variables',
              value: function (e) {
                this._animation_variables = {
                  frame: e,
                  wave: function (n) {
                    return (
                      (n = void 0 === n ? 1 : n),
                      (i.p5.sin(360 * e * n) + 1) / 2
                    );
                  },
                };
              },
            },
            {
              key: 'mode',
              value: function (e) {
                this._animation_function = e.bind(this);
              },
            },
            {
              key: 'fill_background',
              value: function () {
                push(),
                  fill.apply(void 0, arguments),
                  stroke.apply(void 0, arguments),
                  this.draw_wedge(),
                  pop();
              },
            },
            {
              key: 'draw_boundry',
              value: function () {
                this._do_draw_boundaries &&
                  (noFill(), stroke(0), this.draw_wedge());
              },
            },
            {
              key: 'draw_wedge',
              value: function () {
                push(),
                  rotate(-90),
                  beginShape(),
                  this.arc(this.boundary.high, 1),
                  this.arc(this.boundary.low, -1),
                  endShape(i.p5.CLOSE),
                  pop();
              },
            },
            {
              key: 'arc',
              value: function (e, n) {
                for (
                  var t = (-n * this._pScope.slice_angle) / 2,
                    i = (n * this._pScope.slice_angle) / 20,
                    o = 0;
                  o <= 20;
                  ++o
                )
                  vertex(cos(t) * e, sin(t) * e), (t += i);
              },
            },
            {
              key: 'parent_pScope',
              set: function (e) {
                this._pScope = e;
              },
            },
            {
              key: 'draw_boundaries',
              set: function (e) {
                this._do_draw_boundaries = e;
              },
            },
            {
              key: 'draw_function',
              get: function () {
                return this._draw_function;
              },
            },
            {
              key: 'animation_function',
              get: function () {
                return this._animation_function;
              },
            },
            {
              key: 'background_function',
              get: function () {
                return this._background_function;
              },
            },
            {
              key: 'boundary',
              get: function () {
                return this._bounds;
              },
            },
            {
              key: 'animation_variables',
              get: function () {
                return this._animation_variables;
              },
            },
          ]) && f(n.prototype, t),
          o && f(n, o),
          e
        );
      })(),
      w = function (e) {
        (window.PLayer = y),
          (window.SYMBOL_ONLY = u(e)),
          (window.STATIC_FRAME = (function (e) {
            return function (n) {
              push(),
                c(e),
                translate(0, e._wedge_size / 2),
                n.draw_boundry(),
                n.animation_function(0, n.boundary.low, n.boundary.high),
                pop();
            };
          })(e)),
          (window.ANIMATED_FRAME = (function (e) {
            return function (n) {
              push(),
                c(e),
                translate(0, e._wedge_size / 2),
                n.draw_boundry(),
                n.animation_function(
                  frameCount % e.slice_count,
                  n.boundary.low,
                  n.boundary.high
                ),
                pop();
            };
          })(e)),
          (window.STATIC_DISK = _(e)),
          (window.ANIMATED_DISK = (function (e) {
            return function (n) {
              push();
              var t = frameCount % e.slice_count;
              STATIC_DISK(n, e.direction * e.slice_angle * t), pop();
            };
          })(e)),
          (window.OUTPUT_GIF = (function (e) {
            return function (n) {
              return (
                setup_new_canvas(n, n),
                e.scale_for_screen(!1),
                (e.lock_scale = !0),
                (e.pre_render = function () {
                  e.begin_capture_if_ready();
                }),
                (e.post_render = function () {
                  e.capture();
                }),
                function (e) {
                  ANIMATED_DISK(e);
                }
              );
            };
          })(e)),
          (window.OUTPUT_PRINT = (function (e) {
            return function (n) {
              return (
                (n = void 0 === n ? { x: 2480, y: 3508 } : n),
                setup_new_canvas(n.x, n.y),
                e.scale_for_screen(!1),
                (e.lock_scale = !0),
                function (e) {
                  push(), STATIC_DISK(e, 0), pop();
                }
              );
            };
          })(e)),
          (window.SWIRL = (function (e) {
            return function (n) {
              return function (t, i, o) {
                var a = (o - i) / (n + 0);
                this.set_animation_variables(t / e.slice_count),
                  this.background_function(this.animation_variables, e);
                for (var r = 0; r < n; ++r) {
                  var s = -(i + (r * a + lerp(0, a, t / e.slice_count)));
                  this.set_animation_variables((abs(s) - i) / abs(o - i)),
                    push(),
                    translate(0, s),
                    this.draw_function(0, 0, this.animation_variables, e),
                    pop();
                }
              };
            };
          })(e)),
          (window.RING = d(e)),
          (window.CW = 1),
          (window.CCW = -1),
          (window.A4 = { x: 2480, y: 3508 }),
          (window.A3 = { x: 3508, y: 4960 });
      },
      g = new p5();
    (window.setup = function () {
      angleMode(DEGREES),
        imageMode(CENTER),
        frameRate(FRAME_RATE),
        pixelDensity(1),
        (i.ccapturer = new CCapture({
          format: 'gif',
          workersPath: './libraries/',
          framerate: FRAME_RATE,
          verbose: !0,
        })),
        (i.phenakistoscope = new s(1e3)),
        w(i.phenakistoscope),
        setup_new_canvas(
          i.phenakistoscope.resolution,
          i.phenakistoscope.resolution
        ),
        setup_pScope(i.phenakistoscope);
    }),
      (window.draw = function () {
        background(255), i.phenakistoscope.draw();
      }),
      (window.setup_new_canvas = function (e, n) {
        (i.p5 = g),
          (i.gfx = createCanvas(e, n).drawingContext),
          (i.canvas = i.gfx.canvas);
        var t = Math.min(e, n);
        i.phenakistoscope.set_default_values(0.9 * t),
          setup_layers(i.phenakistoscope);
      });
  },
]);
