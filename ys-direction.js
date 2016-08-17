'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    'use strict';

    var YsDirection = function () {
        function YsDirection() {
            _classCallCheck(this, YsDirection);
        }

        _createClass(YsDirection, [{
            key: 'beforeRegister',
            value: function beforeRegister() {
                this.is = 'ys-direction';
                this.properties = {
                    /**
                     * Your mother toungue
                     */
                    language: {
                        type: String,
                        value: "en"
                    },
                    /**
                     * Travel mode to use. One of 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'.
                     */
                    travelMode: {
                        type: String,
                        value: "WALKING"
                    },
                    /**
                     * Start address or latlng to get directions from.
                     */
                    start: {
                        type: Object,
                        value: function value() {
                            return {};
                        }
                    },
                    /**
                     * End address or latlng for directions to end.
                     */
                    end: {
                        type: Object,
                        value: function value() {
                            return {};
                        }
                    },
                    /**
                     * Icon to display next to the rendered text
                     * Usually represents travelMode
                     */
                    icon: {
                        type: String,
                        value: "maps:directions-walk"
                    },
                    /**
                     * A Maps API key. To obtain an API key, see developers.google.com/maps/documentation/javascript/tutorial#api_key.
                     */
                    apiKey: {
                        type: String,
                        value: 'AIzaSyB8h3b1j3Ffw5ukhkhbyq1v-1RFMWO--sg'
                    },
                    /**
                     * The response from the directions service.
                     */
                    _response: {
                        type: Object,
                        observer: "_onResponse"
                    },
                    /**
                     * Instructions Array
                     */
                    instructions: {
                        type: String,
                        computed: '_computeInstructions(_response)'
                    },
                    /**
                     * Rendered Text
                     */
                    result: {
                        type: "String"
                    },
                    /**
                     * Kol google jebt-ha hoon
                     */
                    _google: {
                        type: Object
                    }
                };
            }
        }, {
            key: 'ready',
            value: function ready() {
                window.google ? this.set('_google', window.google) : setTimeout(this.ready.bind(this), 200);
            }
        }, {
            key: '_latLng',
            value: function _latLng(point, google) {
                return new google.maps.LatLng(point.latitude, point.longitude);
            }
        }, {
            key: '_onResponse',
            value: function _onResponse(response) {
                var shortestRoute = response.routes[0];
                this._render(shortestRoute);
            }
        }, {
            key: '_render',
            value: function _render(route) {
                var duration = route.legs[0].duration.text;
                var distance = route.legs[0].distance.text;
                var result = distance + ', ' + duration;
                console.log();
                this.set('result', {
                    duration: duration,
                    distance: distance
                });
            }
        }, {
            key: '_computeTotalDistance',
            value: function _computeTotalDistance(result) {
                var total = 0;
                var myroute = result.routes[0];
                for (var i = 0; i < myroute.legs.length; i++) {
                    total += myroute.legs[i].distance.value;
                }
                total = total / 1000;
                return total;
            }
        }, {
            key: '_computeInstructions',
            value: function _computeInstructions(response) {
                var route = response.routes[0];
                var steps = route.legs[0].steps;
                return steps.map(function (step) {
                    return step.instructions;
                });
            }
        }]);

        return YsDirection;
    }();

    Polymer(YsDirection);
})();