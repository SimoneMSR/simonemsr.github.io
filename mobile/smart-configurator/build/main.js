webpackJsonp([3],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_sensor_model__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_variable_model__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_xml2js__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_xml2js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_xml2js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_events_events_provider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_iodd_simulator_json__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_iodd_simulator_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__assets_iodd_simulator_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_observable_interval__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_observable_interval__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/*
  Generated class for the SensorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var OUTBOUND_MESSAGE = "3";
var INBOUND_MESSAGE = "2";
var SensorProvider = /** @class */ (function () {
    function SensorProvider(http, eventsProvider) {
        var _this = this;
        this.http = http;
        this.eventsProvider = eventsProvider;
        this.messageEnqueued = 0;
        this.messageReceived = 0;
        this.socketUrl = "127.0.0.1:1234";
        this.offlineMode = false;
        this._sensor = new __WEBPACK_IMPORTED_MODULE_4__models_sensor_model__["d" /* Sensor */]();
        this.sensor = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](this._sensor);
        this.sensorReadMessage = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](null);
        this.sensorReadProcessData = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](null);
        this.messageConsumed = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](true);
        this.enqueuedMessage = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](null);
        this.websocketInitialized = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](false);
        this._registry = {};
        this.menus = {};
        //this.socketUrl = "sede.monforte.it:1234";
        this.loadXml().subscribe(function (result) {
            _this.loadStandardDefinition().subscribe(function (stdResult) {
                _this.standardConfig = stdResult;
                _this._sensor.configure(result);
                _this.setupWebsocket();
                _this.setupMessageQueue();
                _this.sensor.next(_this._sensor);
            });
        });
    }
    Object.defineProperty(SensorProvider.prototype, "registry", {
        //private messageQueue : string[] = [];
        get: function () {
            return this._registry;
        },
        enumerable: true,
        configurable: true
    });
    SensorProvider.prototype.loadXml = function () {
        var that = this;
        var promise = new Promise(function (resolve, reject) {
            that.http.get("assets/iodd/CGI-CA30CA18IO-20170926-IODD1.1.xml").subscribe(function (result) {
                __WEBPACK_IMPORTED_MODULE_6_xml2js___default.a.parseString(result.text(), function (err, result) {
                    if (err)
                        reject(err);
                    else {
                        that.config = result;
                        resolve(result);
                    }
                });
            });
        });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].fromPromise(promise);
    };
    SensorProvider.prototype.loadStandardDefinition = function () {
        var that = this;
        var promise = new Promise(function (resolve, reject) {
            that.http.get("assets/iodd/standarddefinitions.xml").subscribe(function (result) {
                __WEBPACK_IMPORTED_MODULE_6_xml2js___default.a.parseString(result.text(), function (err, result) {
                    if (err)
                        reject(err);
                    else {
                        that.standardConfig = result;
                        resolve(result);
                    }
                });
            });
        });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].fromPromise(promise);
    };
    SensorProvider.prototype.setupWebsocket = function () {
        if (this.webSocket != undefined)
            this.webSocket.close();
        try {
            this.webSocket = new WebSocket("ws://" + this.socketUrl);
        }
        catch (e) {
        }
        finally {
            this.webSocket.onmessage = this.receiveFromSensor.bind(this);
            this.webSocket.onopen = this.initializeWebSocket.bind(this);
            this.webSocket.onerror = this.setupSimulator.bind(this);
        }
    };
    SensorProvider.prototype.setupMessageQueue = function () {
        var _this = this;
        this.messageEnqueued = this.messageReceived = 0;
        if (this.messageConsumedSubscritpion != undefined)
            this.messageConsumedSubscritpion.unsubscribe();
        this.enqueuedMessage = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](null);
        this.messageConsumed = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](true);
        this.messageConsumedSubscritpion = this.messageConsumed
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["zip"])(this.enqueuedMessage.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["filter"])(function (x) { return x != null; })))).subscribe(function (message) {
            console.log("sending to sensor " + message[1]);
            _this.sendToSensor(message[1]);
        });
    };
    SensorProvider.prototype.sendToSensor = function (message) {
        if (this.offlineMode) {
            var outMessage = "o:" + message.substr(2);
            if (__WEBPACK_IMPORTED_MODULE_8__assets_iodd_simulator_json__[outMessage]) {
                this.receiveFromSensor({ "data": outMessage });
                this.receiveFromSensor({ "data": __WEBPACK_IMPORTED_MODULE_8__assets_iodd_simulator_json__[outMessage] });
            }
            else {
                this.receiveFromSensor({ "data": outMessage });
                this.receiveFromSensor({ "data": new Blob() });
            }
        }
        else {
            this.webSocket.send(message);
        }
    };
    SensorProvider.prototype.receiveFromSensor = function (evt) {
        if (evt.data.substr) {
            switch (evt.data.substr(0, 2)) {
                case "i:":
                    this.decodeIMessage(evt.data.substr(2));
                    break;
                case "o:":
                    this.decodeOMessage(evt.data.substr(2));
                    break;
                case "s:":
                    break;
                default: { }
            }
        }
        else {
            this.messageConsumed.next(true);
        }
    };
    SensorProvider.prototype.initializeWebSocket = function () {
        this.offlineMode = false;
        this.enqueuedMessage.next("s:2400020F0000001100000000000000000000000000000000000000000000000000000000");
        this.enqueuedMessage.next("s:2400020F0100001100000000000000000000000000000000000000000000000000000000");
        this.enqueuedMessage.next("s:2400020F00000C1100000000000000000000000000000000000000000000000000002020");
        this.enqueuedMessage.next("s:2400020F0100031100000000000000000000000000000000000000000000000000002020");
        this.enqueuedMessage.next("s:2500020B000000000000000000000000000000000000000000000000000000000000000000");
    };
    SensorProvider.prototype.setupSimulator = function () {
        this.offlineMode = true;
        this.eventsProvider.sendWebsocketError();
        this.askForProcessDataState();
    };
    SensorProvider.prototype.pollProcessData = function () {
        var _this = this;
        var i = 0;
        return Object(__WEBPACK_IMPORTED_MODULE_9_rxjs_observable_interval__["interval"])(1000).subscribe(function () {
            _this.askForProcessDataState();
        });
    };
    SensorProvider.prototype.askForMenuVariableState = function (variable) {
        console.log("enqueue read request for index " + variable.index);
        this.messageEnqueued++;
        this.enqueuedMessage.next(this.compileMessage(INBOUND_MESSAGE, variable.index));
    };
    SensorProvider.prototype.askForProcessDataState = function () {
        this.messageEnqueued++;
        this.enqueuedMessage.next("s:0500020AFF");
    };
    SensorProvider.prototype.updateSensorState = function (index, state) {
        this.enqueuedMessage.next(this.compileMessage(OUTBOUND_MESSAGE, index, state));
        //this.enqueuedMessage.next(this.compileMessage(INBOUND_MESSAGE,index));
    };
    SensorProvider.prototype.compileMessage = function (commandId, msgId, payload) {
        var msg = '02' + //Protocol Revision
            __WEBPACK_IMPORTED_MODULE_5__models_variable_model__["c" /* Variable */].padLeft2(parseInt(commandId).toString(16), 2) + //CMD_ALWRITEREQ
            '00' + //Port
            __WEBPACK_IMPORTED_MODULE_5__models_variable_model__["c" /* Variable */].padLeft2(parseInt(msgId).toString(16), 2) + //Low Byte des Index
            '00' + //High Byte des Index
            '00'; //Subindex solo per comando di tipo 3
        if (payload && payload != "") {
            msg += __WEBPACK_IMPORTED_MODULE_5__models_variable_model__["c" /* Variable */].padLeft2((payload.length / 2).toString(16), 2) +
                payload;
        }
        msg = __WEBPACK_IMPORTED_MODULE_5__models_variable_model__["c" /* Variable */].padLeft2((msg.length / 2 + 2).toString(16), 2) +
            '00' +
            msg;
        return "s:" + msg.toUpperCase();
    };
    SensorProvider.prototype.decodeOMessage = function (message) {
        var cmdCode = message.substr(6, 2);
        switch (cmdCode) {
            case "02":
                this.registryToRead = parseInt(message.substr(12, 2) + message.substr(10, 2), 16);
                console.log("last registry to read " + this.registryToRead);
                break;
            default: { }
        }
    };
    SensorProvider.prototype.decodeIMessage = function (message) {
        var cmdCode = message.substr(6, 2);
        switch (cmdCode) {
            case "09": {
                this._registry[this.registryToRead] = message;
                this.sensorReadMessage.next(new __WEBPACK_IMPORTED_MODULE_4__models_sensor_model__["e" /* SensorMessage */](this.registryToRead, message));
                break;
            }
            case "0A":
                if (message.length >= 20) {
                    this.sensorReadProcessData.next(message);
                }
                break;
            case "0F":
                this.messageConsumed.next(true);
                break;
            case "0B":
                this.messageConsumed.next(true);
                if (message == "0500020B00")
                    this.websocketInitialized.next(true);
                break;
        }
    };
    SensorProvider.prototype.loadMenu = function (menuId) {
        if (this.menus[menuId])
            return this.currentMenu = this.menus[menuId];
        var menu_collection = this.config.IODevice.ProfileBody["0"].
            DeviceFunction["0"].UserInterface["0"].
            MenuCollection["0"].Menu;
        var menu = menu_collection.find(function (x) { return x.$.id == menuId; });
        this.currentMenu = this.menus[menuId] = new __WEBPACK_IMPORTED_MODULE_4__models_sensor_model__["b" /* ParameterDataLevel2 */]({ xmlGlobalConfig: this.config,
            xmlStandardConfig: this.standardConfig,
            xmlMenuConfig: menu });
        return this.menus[menuId];
    };
    SensorProvider.prototype.loadProcessDataFromXml = function () {
        var i = 0;
        var processDataIn = this.config.IODevice.ProfileBody["0"].
            DeviceFunction["0"].ProcessDataCollection["0"].ProcessData["0"].ProcessDataIn["0"];
        return new __WEBPACK_IMPORTED_MODULE_5__models_variable_model__["c" /* Variable */]({ xmlLocalConfig: processDataIn, xmlGlobalConfig: this.config.IODevice });
    };
    SensorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_7__providers_events_events_provider__["b" /* EventsProvider */]])
    ], SensorProvider);
    return SensorProvider;
}());

//# sourceMappingURL=sensor.provider.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortcutsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ShortcutsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ShortcutsProvider = /** @class */ (function () {
    function ShortcutsProvider() {
        this._shortcuts = [];
        this.shortcuts = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](this._shortcuts);
    }
    ShortcutsProvider.prototype.addShortCut = function (elem) {
        this._shortcuts.push(elem);
        this.update();
    };
    ShortcutsProvider.prototype.update = function () {
        this.shortcuts.next(this._shortcuts);
    };
    ShortcutsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ShortcutsProvider);
    return ShortcutsProvider;
}());

//# sourceMappingURL=shortcuts.provider.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ALERT_NO_WEBSOCKET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EventsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ALERT_NO_WEBSOCKET = "ALERT:WEBSOCKET:ERROR";
var EventsProvider = /** @class */ (function () {
    function EventsProvider(events) {
        this.events = events;
        console.log('Hello EventsProvider Provider');
    }
    EventsProvider.prototype.sendWebsocketError = function () {
        this.events.publish(ALERT_NO_WEBSOCKET);
    };
    EventsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_index__["b" /* Events */]])
    ], EventsProvider);
    return EventsProvider;
}());

//# sourceMappingURL=events.provider.js.map

/***/ }),

/***/ 195:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 195;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		752,
		2
	],
	"../pages/menu/menu.module": [
		753,
		1
	],
	"../pages/number-input/number-input.module": [
		241
	],
	"../pages/parameters-menu/parameters-menu.module": [
		754,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 240;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberInputPageModule", function() { return NumberInputPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number_input__ = __webpack_require__(415);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NumberInputPageModule = /** @class */ (function () {
    function NumberInputPageModule() {
    }
    NumberInputPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__number_input__["a" /* NumberInputPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__number_input__["a" /* NumberInputPage */]),
            ],
        })
    ], NumberInputPageModule);
    return NumberInputPageModule;
}());

//# sourceMappingURL=number-input.module.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__process_data_process_data__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process_data_value_process_data_value__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parameter_parameter__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parameter_group_parameter_group__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parameter_supergroup_parameter_supergroup__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parameter_list_parameter_list__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__parameter_menu_parameter_menu__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_pipes_module__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sensor_plot_sensor_plot__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_number_input_number_input_module__ = __webpack_require__(241);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__process_data_process_data__["a" /* ProcessDataComponent */],
                __WEBPACK_IMPORTED_MODULE_3__process_data_value_process_data_value__["a" /* ProcessDataValueComponent */],
                __WEBPACK_IMPORTED_MODULE_4__parameter_parameter__["a" /* ParameterComponent */],
                __WEBPACK_IMPORTED_MODULE_5__parameter_group_parameter_group__["a" /* ParameterGroupComponent */],
                __WEBPACK_IMPORTED_MODULE_6__parameter_supergroup_parameter_supergroup__["a" /* ParameterSupergroupComponent */],
                __WEBPACK_IMPORTED_MODULE_7__parameter_list_parameter_list__["a" /* ParameterListComponent */],
                __WEBPACK_IMPORTED_MODULE_8__parameter_menu_parameter_menu__["a" /* ParameterMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_10__sensor_plot_sensor_plot__["a" /* SensorPlotComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_11__pages_number_input_number_input_module__["NumberInputPageModule"],
                __WEBPACK_IMPORTED_MODULE_9__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_2__process_data_process_data__["a" /* ProcessDataComponent */],
                __WEBPACK_IMPORTED_MODULE_3__process_data_value_process_data_value__["a" /* ProcessDataValueComponent */],
                __WEBPACK_IMPORTED_MODULE_4__parameter_parameter__["a" /* ParameterComponent */],
                __WEBPACK_IMPORTED_MODULE_5__parameter_group_parameter_group__["a" /* ParameterGroupComponent */],
                __WEBPACK_IMPORTED_MODULE_6__parameter_supergroup_parameter_supergroup__["a" /* ParameterSupergroupComponent */],
                __WEBPACK_IMPORTED_MODULE_7__parameter_list_parameter_list__["a" /* ParameterListComponent */],
                __WEBPACK_IMPORTED_MODULE_8__parameter_menu_parameter_menu__["a" /* ParameterMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_10__sensor_plot_sensor_plot__["a" /* SensorPlotComponent */]
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessDataComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ProcessDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProcessDataComponent = /** @class */ (function () {
    function ProcessDataComponent() {
        this.data = [];
        this.accordionOpened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.accordionOpen = false;
    }
    ProcessDataComponent.prototype.toggleAccordion = function () {
        this.accordionOpen = !this.accordionOpen;
        this.accordionOpened.emit(this.accordionOpen);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], ProcessDataComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ProcessDataComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], ProcessDataComponent.prototype, "accordionOpened", void 0);
    ProcessDataComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'process-data',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\process-data\process-data.html"*/'<!-- Generated template for the ProcessDataComponent component -->\n<ion-grid *ngIf="mode === \'icons\' ">\n	<ion-row>\n		<ion-col col-8 class="sensor-image">\n			<img src="assets/imgs/sensor.PNG">\n		</ion-col>\n		<ion-col col-4 class="sensors-values" align-self-end>\n			<process-data-value [data]="element" *ngFor="let element of data"></process-data-value>\n		</ion-col>\n	</ion-row>\n</ion-grid>\n<ion-list *ngIf="mode === \'accordion\' " class="accordion">\n	<ion-list-header  no-padding>\n          <!-- Toggle Button -->\n          <button ion-item (click)="toggleAccordion()"  [ngClass]="{\'section-active\': accordionOpen, \'section\': !accordionOpen}" detail-none>\n            <ion-icon item-left name="arrow-dropright-circle" *ngIf="!accordionOpen"></ion-icon>\n            <ion-icon item-left name="arrow-dropdown-circle" *ngIf="accordionOpen"></ion-icon>\n            Process Data\n          </button>\n    </ion-list-header>\n    <ion-item *ngFor="let element of data" [hidden]="!accordionOpen">\n    	{{element.name}}\n    	<ion-badge [color]="element.value === false ? \'secondary\' : \'danger\'" item-end>{{element.value | variableValue : {\'variable\' : element } }}</ion-badge>\n    </ion-item>\n</ion-list>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\process-data\process-data.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProcessDataComponent);
    return ProcessDataComponent;
}());

//# sourceMappingURL=process-data.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__variable_value_variable_value__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__capitalize_capitalize__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keys_keys__ = __webpack_require__(730);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__variable_value_variable_value__["a" /* VariableValuePipe */],
                __WEBPACK_IMPORTED_MODULE_2__capitalize_capitalize__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_3__keys_keys__["a" /* KeysPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__variable_value_variable_value__["a" /* VariableValuePipe */],
                __WEBPACK_IMPORTED_MODULE_2__capitalize_capitalize__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_3__keys_keys__["a" /* KeysPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(395);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_components_module__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_sensor_sensor_provider__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_shortcuts_shortcuts_provider__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_events_events_provider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser_animations__ = __webpack_require__(750);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/number-input/number-input.module#NumberInputPageModule', name: 'NumberInputPage', segment: 'number-input', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/parameters-menu/parameters-menu.module#ParametersMenuPageModule', name: 'ParametersMenuPage', segment: 'parameters-menu', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__components_components_module__["a" /* ComponentsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_sensor_sensor_provider__["a" /* SensorProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_shortcuts_shortcuts_provider__["a" /* ShortcutsProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_events_events_provider__["b" /* EventsProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberInputPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_animations__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_interval__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the NumberInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NumberInputPage = /** @class */ (function () {
    function NumberInputPage(navCtrl, navParams, viewCtrl, zone, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.platform = platform;
        this.animate = false;
        this.swipe_offset = 0;
        this.title = this.navParams.get("title");
        this.value = this.navParams.get("value");
        this.screenWidth = this.platform.width();
    }
    NumberInputPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NumberInputPage');
    };
    NumberInputPage.prototype.back = function () {
        this.viewCtrl.dismiss({ 'save': false });
    };
    NumberInputPage.prototype.save = function () {
        this.viewCtrl.dismiss({ 'save': true, 'value': this.value });
    };
    NumberInputPage.prototype.add = function (number) {
        this.value += number;
        this.swipe_offset += number;
        this.start_animate();
    };
    NumberInputPage.prototype.swipe = function (event) {
        var _this = this;
        var tick = this.swipe_offset < 0 ? 1 : -1;
        var i;
        Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_interval__["interval"])(Math.ceil(1000.0 / Math.abs(event.deltaX))).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["take"])(Math.abs(event.deltaX))).subscribe(function () {
            _this.zone.run(function () {
                _this.add(tick);
            });
        });
    };
    NumberInputPage.prototype.start_animate = function () {
        this.animate = !this.animate;
    };
    NumberInputPage.prototype.pan = function (delta, direction) {
        var _this = this;
        //console.log(event.deltaX +" "+ event.direction);
        this.zone.run(function () {
            _this.add(direction * Math.ceil(Math.abs(delta) / _this.screenWidth * 100));
        });
    };
    NumberInputPage.prototype.scrollComplete = function (event) {
        console.log(event);
        // your content here of scroll is finished
    };
    NumberInputPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-number-input',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\pages\number-input\number-input.html"*/'<ion-grid class="page">\n	<ion-row class="title vertical-align-center">\n		<ion-col col-12>\n			<div class="configurator-text">{{title}}</div>\n		</ion-col>\n	</ion-row>\n	<ion-row class="value vertical-align-center">\n		<ion-col col-12>\n			<div class="configurator-text">{{value}}</div>\n		</ion-col>\n	</ion-row>\n	<ion-row class="spinner">\n		<ion-col col-12>\n			<ion-grid>\n				<ion-row class="plusminus">\n					<ion-col col-3 (click)="add(-10)"></ion-col>\n					<ion-col col-3 (click)="add(-1)"></ion-col>\n					<ion-col col-3 (click)="add(1)"></ion-col>\n					<ion-col col-3 (click)="add(10)"></ion-col>\n				</ion-row>\n				<ion-row class="ticks" (panleft)="pan($event.deltaX,1)" (panright)="pan($event.deltaX,-1)" (swipe)="swipe($event)"   [@swipe]="{ value : animate, params : { offset : swipe_offset}}"></ion-row>\n			</ion-grid>\n		</ion-col>\n	</ion-row>\n	<ion-row class="buttons">\n		<ion-col col-6>\n			<button (click)="back()">BACK</button>\n		</ion-col>\n		<ion-col col-6>\n			<button (click)="save()">OK</button>\n		</ion-col>\n	</ion-row>\n</ion-grid>'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\pages\number-input\number-input.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* trigger */])('swipe', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('true', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({ 'background-position-x': "{{ offset }}%" }), { params: { offset: 0.0 } }),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('false', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({ 'background-position-x': "{{ offset }}%" }), { params: { offset: 0.0 } }),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* transition */])('* => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])("0.1s ease-out", Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({ 'background-position-x': "{{ offset }}%" }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], NumberInputPage);
    return NumberInputPage;
}());

//# sourceMappingURL=number-input.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Sensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ParameterGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParameterDataLevel1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ParameterDataLevel2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SensorMessage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__variable_model__ = __webpack_require__(68);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Sensor = /** @class */ (function () {
    function Sensor() {
        this.state = "1400026700333034534500014F00000731324200";
        this.analogalueSubIndex = 1;
    }
    Sensor.prototype.configure = function (xml) {
        this.config = xml;
    };
    return Sensor;
}());

var ParameterGroup = /** @class */ (function () {
    function ParameterGroup(obj) {
        this.parameters = [];
        if (obj) {
            var me = this.findMe(obj.name, obj.xmlGlobalConfig);
            if (me.Name)
                this.name = __WEBPACK_IMPORTED_MODULE_0__variable_model__["c" /* Variable */].translateString(obj.xmlGlobalConfig.IODevice, me.Name[0].$.textId);
            else
                this.name = __WEBPACK_IMPORTED_MODULE_0__variable_model__["c" /* Variable */].translateString(obj.xmlGlobalConfig.IODevice, me.$.id);
            if (me.VariableRef) {
                var _loop_1 = function (variableRef) {
                    var variableId = variableRef.$.variableId;
                    var variable = obj.xmlGlobalConfig.IODevice.ProfileBody["0"].DeviceFunction["0"].VariableCollection["0"].Variable.find(function (x) { return x.$.id === variableId; });
                    // TODO: case with variable in StdVariableRef
                    if (variable) {
                        //if(variable.DatatypeRef){ 
                        //		variable = obj.xmlGlobalConfig.IODevice.ProfileBody["0"].DeviceFunction["0"].DatatypeCollection["0"].Datatype.find(x => x.$.id==variable.DatatypeRef[0].$.datatypeId);
                        //		this.parameters.push(new Variable({name : me.Name[0].$.textId, xmlLocalConfig : variable, xmlGlobalConfig : obj.xmlGlobalConfig}));
                        //}else{
                        this_1.parameters.push(new __WEBPACK_IMPORTED_MODULE_0__variable_model__["c" /* Variable */]({ xmlLocalConfig: variable,
                            xmlGlobalConfig: obj.xmlGlobalConfig.IODevice }));
                        //}
                    }
                    else {
                        var standardVariableObj_1 = obj.xmlGlobalConfig.IODevice.ProfileBody["0"].DeviceFunction["0"].VariableCollection["0"].StdVariableRef.find(function (x) { return x.$.id === variableId; });
                        if (standardVariableObj_1) {
                            standardVariableObj_1 = obj.xmlStandardConfig.IODDStandardDefinitions.VariableCollection["0"].Variable.find(function (x) { return x.$.id === standardVariableObj_1.$.id; });
                            try {
                                standardVariable = new __WEBPACK_IMPORTED_MODULE_0__variable_model__["c" /* Variable */]({ xmlLocalConfig: standardVariableObj_1,
                                    xmlGlobalConfig: obj.xmlStandardConfig.IODDStandardDefinitions });
                                this_1.parameters.push(standardVariable);
                            }
                            catch (e) { }
                        }
                    }
                };
                var this_1 = this, standardVariable;
                for (var _i = 0, _a = me.VariableRef; _i < _a.length; _i++) {
                    var variableRef = _a[_i];
                    _loop_1(variableRef);
                }
            }
        }
    }
    ParameterGroup.prototype.findMe = function (name, config) {
        return config.IODevice.ProfileBody["0"].DeviceFunction["0"].UserInterface["0"].MenuCollection["0"].Menu.find(function (x) { return x.$.id === name; });
    };
    return ParameterGroup;
}());

var ParameterDataLevel1 = /** @class */ (function (_super) {
    __extends(ParameterDataLevel1, _super);
    function ParameterDataLevel1(obj) {
        var _this = _super.call(this, { name: obj.xmlMenuConfig.$.id ? obj.xmlMenuConfig.$.id : obj.xmlMenuConfig.$.menuId,
            xmlGlobalConfig: obj.xmlGlobalConfig,
            xmlStandardConfig: obj.xmlStandardConfig }) || this;
        _this.children = [];
        var id = obj.xmlMenuConfig.$.id ? obj.xmlMenuConfig.$.id : obj.xmlMenuConfig.$.menuId;
        var me = _this.findMe(id, obj.xmlGlobalConfig);
        if (me.MenuRef) {
            for (var _i = 0, _a = me.MenuRef; _i < _a.length; _i++) {
                var group = _a[_i];
                var submenu = group.$.menuId;
                _this.children.push(new ParameterGroup({ name: submenu,
                    xmlGlobalConfig: obj.xmlGlobalConfig,
                    xmlStandardConfig: obj.xmlStandardConfig }));
            }
        }
        return _this;
    }
    ParameterDataLevel1.prototype.getVariables = function () {
        var retval = this.parameters;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            retval = retval.concat(child.parameters);
        }
        return retval;
    };
    return ParameterDataLevel1;
}(ParameterGroup));

var ParameterDataLevel2 = /** @class */ (function (_super) {
    __extends(ParameterDataLevel2, _super);
    function ParameterDataLevel2(obj) {
        var _this = _super.call(this, { name: obj.xmlMenuConfig.$.id, xmlGlobalConfig: obj.xmlGlobalConfig, xmlStandardConfig: obj.xmlStandardConfig }) || this;
        _this.children = [];
        var me = _this.findMe(obj.xmlMenuConfig.$.id, obj.xmlGlobalConfig);
        if (me.MenuRef) {
            for (var _i = 0, _a = me.MenuRef; _i < _a.length; _i++) {
                var group = _a[_i];
                _this.children.push(new ParameterDataLevel1({ xmlMenuConfig: group,
                    xmlGlobalConfig: obj.xmlGlobalConfig,
                    xmlStandardConfig: obj.xmlStandardConfig }));
            }
        }
        return _this;
    }
    ParameterDataLevel2.prototype.getVariables = function () {
        var retval = this.parameters;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            retval = retval.concat(child.getVariables());
        }
        return retval;
    };
    return ParameterDataLevel2;
}(ParameterGroup));

var SensorMessage = /** @class */ (function () {
    function SensorMessage(registry, message) {
        this.registry = registry;
        this.message = message;
    }
    return SensorMessage;
}());

//# sourceMappingURL=sensor.model.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Variable; });
/* unused harmony export ParameterValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RecordItem; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OFFSET = 12;
var Variable = /** @class */ (function () {
    function Variable(config) {
        this.hidden = false;
        this.possible_values = [];
        this.records = [];
        if (config && config.xmlLocalConfig) {
            this.name = config.name;
            var variable = config.xmlLocalConfig;
            this.getInfos(variable);
            this.name = variable.Name ? variable.Name[0].$.textId : this.name;
            if (variable.DatatypeRef)
                //assumes that a variable.DatatypeRef cannot exist in a standard Variable definition
                variable = config.xmlGlobalConfig.ProfileBody["0"].DeviceFunction["0"].DatatypeCollection["0"].Datatype.find(function (x) { return x.$.id == config.xmlLocalConfig.DatatypeRef[0].$.datatypeId; });
            this.translateName(config.xmlGlobalConfig);
            this.getDatatypeInfos(variable);
            if (this.type === 'RecordT') {
                var records = void 0;
                if (variable.Datatype)
                    records = variable.Datatype["0"].RecordItem;
                else
                    records = variable.RecordItem;
                for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
                    var record = records_1[_i];
                    var recordName = record.Name[0].$.textId;
                    this.records.push(new RecordItem({ name: recordName,
                        xmlLocalConfig: record,
                        xmlGlobalConfig: config.xmlGlobalConfig,
                        recordItemInfo: variable.RecordItemInfo,
                        parent: this }));
                }
            }
            var singleValue;
            //this variable is a RecordItem
            if (variable.SimpleDatatype)
                singleValue = variable.SimpleDatatype["0"].SingleValue;
            else if (variable.Datatype)
                singleValue = variable.Datatype["0"].SingleValue;
            else
                singleValue = variable;
            if (singleValue) {
                for (var _a = 0, singleValue_1 = singleValue; _a < singleValue_1.length; _a++) {
                    var possibleValue = singleValue_1[_a];
                    var possibleValueValue;
                    switch (this.type) {
                        case 'IntegerT':
                        case 'UIntegerT': {
                            possibleValueValue = parseInt(possibleValue.$.value);
                            break;
                        }
                        case 'BooleanT': {
                            possibleValueValue = possibleValue.$.value === "true" ? true : false;
                            break;
                        }
                        default:
                            possibleValueValue = possibleValue.$.value;
                    }
                    this.possible_values.push(new ParameterValue(Variable.translateString(config.xmlGlobalConfig, possibleValue.Name["0"].$.textId), possibleValueValue));
                }
            }
        }
        else {
            throw new Error();
        }
    }
    Variable.hex2bin = function (hex) {
        var retval = "";
        var len = hex.length;
        for (var i = 0; i < len; i++)
            retval = retval + Variable.padLeft(parseInt(hex.charAt(i), 16).toString(2), "0", 4);
        return retval;
    };
    Variable.bin2hex = function (bin) {
        var retval = "";
        var len = bin.length;
        for (var i = 0; i < len; i = i + 4)
            retval = retval + parseInt(bin.substr(i, 4), 2).toString(16);
        return retval.toUpperCase();
    };
    Variable.hex2a = function (hexx) {
        var hex = hexx.toString(); //force conversion
        var str = '';
        for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    };
    Variable.a2hex = function (str) {
        var hex = '';
        for (var i = 0; i < str.length; i++) {
            hex += '' + str.charCodeAt(i).toString(16);
        }
        return hex;
    };
    /***
    *
    * @return The representation of the variable value in hexidecimal digits
    *
    **/
    Variable.prototype.encodeValue = function () {
        switch (this.type) {
            case "IntegerT":
            case "UIntegerT":
                return Variable.padLeft2(parseInt(this.value).toString(16), this.bitLength / 4);
            case "StringT":
                return Variable.padRight(Variable.a2hex(this.value), this.bitLength / 4);
            case "BooleanT":
                return this.value == true ? "1" : "0";
            case "RecordT":
                return Variable.bin2hex(this.value);
            default:
                return undefined;
        }
    };
    Variable.prototype.applyOffset = function (hexValue) {
        switch (this.type) {
            case 'RecordT':
                return hexValue;
            default:
                return hexValue.substr(OFFSET);
        }
    };
    Variable.prototype.decodeValue = function (hexValue) {
        var value = this.applyOffset(hexValue);
        switch (this.type) {
            case "IntegerT":
            case "UIntegerT":
                return parseInt(value, 16);
            case "StringT":
                return Variable.hex2a(value);
            case "BooleanT":
                return parseInt(value, 16) == 1 ? true : false;
            case "RecordT":
                var recordValue = Variable.padLeft2(parseInt(value.substr(OFFSET, this.bitLength / 4), 16).toString(2), this.bitLength);
                if (this.bitLength == 1)
                    return parseInt(value, 16) == 0 ? "false" : "true";
                return recordValue;
            default:
                return value;
        }
    };
    Variable.padLeft2 = function (nr, n, str) {
        return Array(n - String(nr).length + 1).join(str || '0') + nr;
    };
    Variable.padRight = function (nr, n, str) {
        return nr + Array(n - String(nr).length + 1).join(str || '0');
    };
    Variable.prototype.readValue = function (sensorState) {
        this.value = this.decodeValue(sensorState);
        if (this.type === 'RecordT') {
            var recordValue = this.applyOffset(sensorState);
            for (var _i = 0, _a = this.records; _i < _a.length; _i++) {
                var record = _a[_i];
                record.readValue(recordValue);
            }
        }
    };
    Variable.prototype.writeValue = function () {
        //var binaryState = Variable.hex2bin(sensorState);
        //var binaryToWrite = Variable.padLeft(Variable.hex2bin(this.encodeValue()),'0',this.bitLength);
        //binaryState = binaryState.substr(0, this.index) + binaryToWrite + binaryState.substr(this.index+this.bitLength);
        return this.encodeValue();
    };
    Variable.padLeft = function (text, padChar, size) {
        if (text.length >= size)
            return text.substr(text.length - size, size);
        return (String(padChar).repeat(size) + text).substr((size * -1), size);
    };
    Variable.prototype.translateName = function (xmlConfig) {
        this.name = Variable.translateString(xmlConfig, this.name);
    };
    Variable.translateString = function (xmlConfig, string) {
        var found = xmlConfig.ExternalTextCollection["0"].PrimaryLanguage["0"].Text.find(function (x) { return x.$.id === string; });
        return found ? found.$.value : string;
    };
    Variable.prototype.getInfos = function (xmlVariableObj) {
        this.dynamic = xmlVariableObj.$.dynamic;
        this.index = Number(xmlVariableObj.$.index);
        this.editable = xmlVariableObj.$.accessRights ? xmlVariableObj.$.accessRights != 'ro' : true;
        this.readable = xmlVariableObj.$.accessRights ? xmlVariableObj.$.accessRights != 'wo' : true;
    };
    Variable.prototype.getDatatypeInfos = function (xmlVariableObj) {
        this.encoding = xmlVariableObj.$.encoding;
        if (xmlVariableObj.SimpleDatatype) {
            xmlVariableObj = xmlVariableObj.SimpleDatatype[0];
        }
        else if (xmlVariableObj.Datatype) {
            xmlVariableObj = xmlVariableObj.Datatype["0"];
        }
        this.fixedLength = Number(xmlVariableObj.$.fixedLength);
        this.bitLength = xmlVariableObj.$.bitLength ? Number(xmlVariableObj.$.bitLength) : this.fixedLength * 8;
        this.type = xmlVariableObj.$['xsi:type'];
        if (this.type === 'BooleanT')
            this.bitLength = 1;
    };
    return Variable;
}());

var ParameterValue = /** @class */ (function () {
    function ParameterValue(l, v) {
        this.label = l;
        this.value = v;
    }
    return ParameterValue;
}());

var RecordItem = /** @class */ (function (_super) {
    __extends(RecordItem, _super);
    function RecordItem(config) {
        var _this = _super.call(this, config) || this;
        _this.parent = config.parent;
        _this.bitOffset = Number(config.xmlLocalConfig.$.bitOffset);
        _this.subIndex = Number(config.xmlLocalConfig.$.subindex);
        if (config.recordItemInfo)
            _this.defaultValue = config.recordItemInfo[_this.subIndex - 1].$.defaultValue;
        return _this;
    }
    RecordItem.prototype.applyOffset = function (sensorState) {
        var binState = Variable.hex2bin(sensorState);
        return Variable.bin2hex(binState.substr(binState.length - this.bitOffset - this.bitLength, this.bitLength));
    };
    RecordItem.prototype.writeValue = function () {
        var childValue = Variable.hex2bin(this.encodeValue());
        var parentValue = Variable.hex2bin(this.parent.encodeValue());
        this.parent.value = (parentValue.substr(0, parentValue.length - this.bitOffset - this.bitLength)
            + childValue + parentValue.substr(parentValue.length - this.bitOffset));
        return this.parent.writeValue();
    };
    return RecordItem;
}(Variable));

//# sourceMappingURL=variable.model.js.map

/***/ }),

/***/ 708:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 718:
/***/ (function(module, exports) {

module.exports = {"o:0500026700":"i:1400026700333034534500014F00000731324200","o:2400020F0000001100000000000000000000000000000000000000000000000000000000":"i:0600020F0000","o:2400020F0100001100000000000000000000000000000000000000000000000000000000":"i:0600020F0100","o:2400020F00000C1100000000000000000000000000000000000000000000000000002020":"i:0600020F0000","o:2400020F0100031100000000000000000000000000000000000000000000000000002020":"i:0600020F0100","o:2500020B000000000000000000000000000000000000000000000000000000000000000000":"i:0500020B00","o:0500020AFF":"i:0E00020AFF050BA5000200020100","o:0800020200100000":"i:24000209001E4361726C6F20476176617A7A690000000000000000000000000000000000","o:0800020200110000":"i:280002090022687474703A2F2F7777772E676176617A7A692D6175746F6D6174696F6E2E636F6D00","o:0800020200120000":"i:1A00020900144341333043414E323542504D31494F0000000000","o:0800020200130000":"i:12000209000C45414E787878000000000000","o:0800020200140000":"i:24000209001E436170616369746976652053656E736F7200000000000000000000000000","o:0800020200150000":"i:10000209000A30303030303030303031","o:0800020200160000":"i:0C0002090006312E30000000","o:0800020200170000":"i:0C0002090006302E332E3335","o:0800020200190000":"i:0E00020900086D6F6E666F727465","o:08000202001A0000":"i:0800020900024D44","o:0800020200C80000":"i:0A00020900040000004E","o:0800020200C90000":"i:0A000209000400000026","o:0800020200CA0000":"i:0800020900020021","o:0800020200CB0000":"i:0800020900020009","o:0800020200CC0000":"i:080002090002001B","o:0800020200CD0000":"i:0800020900020019","o:0800020200CE0000":"i:080002090002001B","o:0800020200D10000":"i:0A000209000400000000","o:0800020200D20000":"i:0A000209000400000000","o:0800020200D30000":"i:0A000209000400000000","o:0800020200D40000":"i:0A000209000400000000","o:0800020200D50000":"i:080002090002003B","o:0800020200200000":"i:0800020900020000","o:0800020200400000":"i:10000209000A020100000103E8000000","o:0800020200410000":"i:10000209000A01010000000000000001","o:0800020200440000":"i:07000209000100","o:0800020200460000":"i:0800020900020007","o:0800020200470000":"i:07000209000100","o:0800020200480000":"i:0A0002090004007DFFF6","o:0800020200490000":"i:0800020900020F0F","o:08000202004A0000":"i:0800020900020000","o:08000202004B0000":"i:07000209000100","o:08000202004C0000":"i:07000209000100","o:08000202004D0000":"i:07000209000101","o:08000202004E0000":"i:070002090001FF","o:08000202003C0000":"i:0A000209000413881770","o:08000202003D0000":"i:0A000209000400020005","o:08000202003E0000":"i:0A000209000406902710","o:08000202003F0000":"i:0A000209000400010005","o:08000202003A0000":"i:07000209000101","o:08000202003B0000":"i:07000209000100","o:2900020300190000206D6F6E666F727465000000000000000000000000000000000000000000000000":"i:0500020800","o:29000203001A0000204D44000000000000000000000000000000000000000000000000000000000000":"i:0500020800","o:13000203004000000A020100000103E8000000":"i:0500020800","o:13000203004100000A01010000000000000000":"i:0500020800","o:0A000203004400000100":"i:0500020800","o:0B00020300460000020007":"i:0500020800","o:0A000203004700000100":"i:0500020800","o:0D0002030048000004007DFFF6":"i:0500020800","o:0B00020300490000020F0F":"i:0500020800","o:0B000203004A0000020000":"i:0500020800","o:0A000203004D00000101":"i:0500020800","o:0D000203003C00000413881770":"i:0500020800","o:0D000203003D00000400020005":"i:0500020800","o:0D000203003E00000406902710":"i:0500020800","o:0D000203003F00000400010005":"i:0500020800","o:0A000203003A00000101":"i:0500020800"}

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessDataValueComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_variable_model__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ProcessDataValueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProcessDataValueComponent = /** @class */ (function () {
    function ProcessDataValueComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_variable_model__["c" /* Variable */])
    ], ProcessDataValueComponent.prototype, "data", void 0);
    ProcessDataValueComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'process-data-value',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\process-data-value\process-data-value.html"*/'<!-- Generated template for the ProcessDataValueComponent component -->\n<div [ngSwitch]="data.type">\n	<div *ngSwitchCase="\'BooleanT\'">\n		<div class="value">\n			<ion-icon [name]="data.value ? \'checkmark-circle\' : \'close-circle\' "></ion-icon>\n			<p>{{data.name}}</p>\n		</div>\n	</div>\n	<div *ngSwitchCase="\'UIntegerT\'">\n		<div class="value-container"> \n			<p class="title">{{data.name}}</p>\n			<p class="value">{{data.value}}</p>\n		</div>\n	</div>\n</div>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\process-data-value\process-data-value.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProcessDataValueComponent);
    return ProcessDataValueComponent;
}());

//# sourceMappingURL=process-data-value.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParameterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_variable_model__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sensor_sensor_provider__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ParameterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ParameterComponent = /** @class */ (function () {
    function ParameterComponent(sensorProvider, zone, modal) {
        this.sensorProvider = sensorProvider;
        this.zone = zone;
        this.modal = modal;
        this.type = "";
        //super(form, config, elementRef, renderer, reorder);
    }
    ParameterComponent.prototype.ngOnInit = function () {
        switch (this.parameter.type) {
            case "UIntegerT":
            case "IntegerT":
                {
                    if (this.parameter.possible_values.length > 0)
                        this.type = 'FixedInteger';
                    else
                        this.type = 'Integer';
                }
                break;
            default:
                this.type = this.parameter.type;
                break;
        }
        if (!(this.parameter instanceof __WEBPACK_IMPORTED_MODULE_2__models_variable_model__["b" /* RecordItem */]) && this.parameter.readable) {
            this.askForVariableState();
            this.registerToSensorStateUpdates();
        }
    };
    ParameterComponent.prototype.ngOnDestroy = function () {
        if (this.sensorMessageSubscription)
            this.sensorMessageSubscription.unsubscribe();
    };
    ParameterComponent.prototype.askForVariableState = function () {
        this.sensorProvider.askForMenuVariableState(this.parameter);
    };
    ParameterComponent.prototype.registerToSensorStateUpdates = function () {
        var _this = this;
        this.sensorMessageSubscription = this.sensorProvider.sensorReadMessage.subscribe(function (s) {
            if (s === undefined || s === null || _this.sensorProvider.registry[_this.parameter.index] == undefined)
                return;
            if (_this.sensorProvider.registryToRead === _this.parameter.index) {
                _this.zone.run(function () {
                    _this.parameter.readValue(_this.sensorProvider.registry[_this.parameter.index]);
                    _this.sensorProvider.messageReceived++;
                    _this.sensorProvider.messageConsumed.next(true);
                });
            }
            else {
                var j = 0;
                var t = j + 1;
            }
        });
    };
    ParameterComponent.prototype.updateSensor = function () {
        var i = 0;
        if (this.parameter instanceof __WEBPACK_IMPORTED_MODULE_2__models_variable_model__["b" /* RecordItem */])
            this.sensorProvider.updateSensorState(this.parameter.parent.index, this.parameter.writeValue());
        else
            this.sensorProvider.updateSensorState(this.parameter.index, this.parameter.writeValue());
    };
    ParameterComponent.prototype.numericTouched = function () {
        var _this = this;
        var number_input = this.modal.create('NumberInputPage', { 'title': this.parameter.name, 'value': this.parameter.value });
        number_input.onDidDismiss(function (data) {
            if (data.save == true) {
                _this.parameter.value = data.value;
                _this.updateSensor();
            }
        });
        number_input.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_variable_model__["c" /* Variable */])
    ], ParameterComponent.prototype, "parameter", void 0);
    ParameterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'parameter',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\parameter\parameter.html"*/'<ion-grid>\n  <ion-row>\n    <ion-col *ngIf="type !== \'RecordT\'" col-xs-12 col-md-6 >\n      <ion-label class="ignore-forced-width" >{{parameter.name}}</ion-label>\n    </ion-col>\n    <ion-col col-xs-12  [ngClass]="{\'col-md-6\': type !== \'RecordT\', \'col-md-12\': type === \'RecordT\'}">\n      <div [ngSwitch]="type" class="parameter-value-container">\n          <div class="numeric-input" *ngSwitchCase="\'Integer\'"  (click)="numericTouched()"  item-right>{{parameter.value}}</div>\n          <ion-input type="text" *ngSwitchCase="\'StringT\'" [(ngModel)]="parameter.value" (ngModelChange)="updateSensor()" [ngModelOptions]="{ updateOn: \'blur\' }" [disabled]="!parameter.editable" item-right></ion-input>\n          <ion-select *ngSwitchCase="\'FixedInteger\'"  [(ngModel)]="parameter.value" (ngModelChange)="updateSensor()" [ngModelOptions]="{ updateOn: \'blur\' }"  interface="action-sheet">\n                <ion-option *ngFor="let possibleValue of parameter.possible_values" [disabled]="!parameter.editable" [value]="possibleValue.value">{{possibleValue.label}}</ion-option>\n          </ion-select>\n          <div *ngSwitchCase="\'BooleanT\'">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-xs-12 col-md-6>\n                  {{parameter.value | variableValue : { \'variable\' : parameter } }}\n                </ion-col>\n                <ion-col float-right col-xs-12 col-md-6>\n                   <ion-toggle float-right [(ngModel)]="parameter.value" (ngModelChange)="updateSensor()" [ngModelOptions]="{ updateOn: \'blur\' }" [disabled]="!parameter.editable"></ion-toggle>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </div>\n          <ion-grid *ngSwitchCase="\'RecordT\'" class="recordVariable">\n            <ion-row>\n              <ion-label class="ignore-forced-width" >{{parameter.name}}</ion-label>\n            </ion-row>\n            <ion-row *ngFor="let record of parameter.records" class="possible-values">\n              <parameter [parameter]="record"></parameter>\n            </ion-row>\n          </ion-grid>\n      </div>\n    </ion-col>\n</ion-row>\n</ion-grid>'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\parameter\parameter.html"*/,
            host: {
                'class': 'item item-block'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_sensor_sensor_provider__["a" /* SensorProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], ParameterComponent);
    return ParameterComponent;
}());

//# sourceMappingURL=parameter.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParameterGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_sensor_model__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ParameterGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ParameterGroupComponent = /** @class */ (function () {
    function ParameterGroupComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_sensor_model__["c" /* ParameterGroup */])
    ], ParameterGroupComponent.prototype, "group", void 0);
    ParameterGroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'parameter-group',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-group\parameter-group.html"*/'<!-- Generated template for the ParameterGroupComponent component -->\n<div>\n	<h4>\n  		<p>{{group.name}}</p>\n	</h4>\n  <div class="parameters">\n      <parameter-list [parameters]="group.parameters"></parameter-list>\n  </div>\n</div>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-group\parameter-group.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ParameterGroupComponent);
    return ParameterGroupComponent;
}());

//# sourceMappingURL=parameter-group.js.map

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParameterSupergroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_sensor_model__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ParameterSupergroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ParameterSupergroupComponent = /** @class */ (function () {
    function ParameterSupergroupComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_sensor_model__["a" /* ParameterDataLevel1 */])
    ], ParameterSupergroupComponent.prototype, "menu", void 0);
    ParameterSupergroupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'parameter-supergroup',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-supergroup\parameter-supergroup.html"*/'<!-- Generated template for the ParameterSupergroupComponent component -->\n<div>\n	<h3>\n  		<p>{{menu.name}}</p>\n	</h3>\n  <div class="parameters">\n    <parameter-list [parameters]="menu.parameters"></parameter-list>\n  </div>\n  <div class="submenu">\n  			<parameter-group *ngFor="let group of menu.children" [group]="group"></parameter-group>\n  </div>\n</div>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-supergroup\parameter-supergroup.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ParameterSupergroupComponent);
    return ParameterSupergroupComponent;
}());

//# sourceMappingURL=parameter-supergroup.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParameterListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shortcuts_shortcuts_provider__ = __webpack_require__(183);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ParameterListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ParameterListComponent = /** @class */ (function () {
    function ParameterListComponent(shortcuts) {
        this.shortcuts = shortcuts;
    }
    ParameterListComponent.prototype.homeClicked = function (par, index) {
        this.items.find(function (x, _index) { return _index === index; }).close();
        par.hidden = false;
        this.shortcuts.addShortCut(par);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], ParameterListComponent.prototype, "parameters", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChildren */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ItemSliding */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* QueryList */])
    ], ParameterListComponent.prototype, "items", void 0);
    ParameterListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'parameter-list',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-list\parameter-list.html"*/'<form>\n	  	<ion-list class="forced-label">\n  	<ion-item-sliding *ngFor="let parameter of parameters; let i =index" >\n  		<ion-item>\n  		<parameter  [parameter]="parameter"></parameter>\n  	</ion-item>\n  	<ion-item-options side="right">\n                <button ion-button (click)="homeClicked(parameter,i)" icon-only color="light">\n                    <ion-icon name="home"></ion-icon>\n                </button>\n              </ion-item-options>\n  	</ion-item-sliding>\n  </ion-list>\n</form>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-list\parameter-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_shortcuts_shortcuts_provider__["a" /* ShortcutsProvider */]])
    ], ParameterListComponent);
    return ParameterListComponent;
}());

//# sourceMappingURL=parameter-list.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParameterMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_sensor_model__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ParameterMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ParameterMenuComponent = /** @class */ (function () {
    function ParameterMenuComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_sensor_model__["b" /* ParameterDataLevel2 */])
    ], ParameterMenuComponent.prototype, "menu", void 0);
    ParameterMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'parameter-menu',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-menu\parameter-menu.html"*/'<div>\n  <div class="parameters">\n    <parameter-list [parameters]="menu.parameters"></parameter-list>\n  </div>\n  <div class="submenu">\n  			<parameter-supergroup *ngFor="let supergroup of menu.children" [menu]="supergroup"></parameter-supergroup>\n  </div>\n</div>'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\parameter-menu\parameter-menu.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ParameterMenuComponent);
    return ParameterMenuComponent;
}());

//# sourceMappingURL=parameter-menu.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VariableValuePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the VariableValuePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var VariableValuePipe = /** @class */ (function () {
    function VariableValuePipe() {
    }
    VariableValuePipe.prototype.transform = function (value, args) {
        if (args.variable.possible_values.length > 0) {
            return value != undefined ? args.variable.possible_values.find(function (x) { return x.value == value; }).label : undefined;
        }
        else
            return value;
    };
    VariableValuePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'variableValue',
        })
    ], VariableValuePipe);
    return VariableValuePipe;
}());

//# sourceMappingURL=variable-value.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var CapitalizePipe = /** @class */ (function () {
    function CapitalizePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    CapitalizePipe.prototype.transform = function (value) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    };
    CapitalizePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'capitalize',
        })
    ], CapitalizePipe);
    return CapitalizePipe;
}());

//# sourceMappingURL=capitalize.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    KeysPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'keys',
        })
    ], KeysPipe);
    return KeysPipe;
}());

//# sourceMappingURL=keys.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorPlotComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SensorPlotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SensorPlotComponent = /** @class */ (function () {
    function SensorPlotComponent() {
        this.animate = false;
        this.plot_img_margin = 9.2;
        this.plot_img_max_margin = 100 - this.plot_img_margin;
    }
    SensorPlotComponent.prototype.ngOnChanges = function () {
        this.animate = !this.animate;
        if (this.distance === undefined)
            this.distance = 0;
    };
    SensorPlotComponent.prototype.log = function (n) {
        return Math.log10(n);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], SensorPlotComponent.prototype, "distance", void 0);
    SensorPlotComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'sensor-plot',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\components\sensor-plot\sensor-plot.html"*/'<img src="assets/imgs/plot_tick.png" class="tick" [@shift]="{ value : animate, params : { marginLeft : plot_img_margin+(1-distance)*plot_img_max_margin}}">'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\components\sensor-plot\sensor-plot.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* trigger */])('shift', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('true', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ 'margin-left': "{{ marginLeft }}%" }), { params: { marginLeft: 100.0 } }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* state */])('false', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ 'margin-left': "{{ marginLeft }}%" }), { params: { marginLeft: 100.0 } }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* transition */])('* => *', [
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])("1s ease-out", Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* style */])({ 'margin-left': "{{ marginLeft }}%" }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [])
    ], SensorPlotComponent);
    return SensorPlotComponent;
}());

//# sourceMappingURL=sensor-plot.js.map

/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sensor_sensor_provider__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, backgroundMode, sensorProvider) {
        var _this = this;
        this.platform = platform;
        this.backgroundMode = backgroundMode;
        this.sensorProvider = sensorProvider;
        this.rootPage = 'HomePage';
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (_this.backgroundSubscription != undefined)
                _this.backgroundSubscription.unsubscribe();
            statusBar.styleDefault();
            statusBar.overlaysWebView(false);
            splashScreen.hide();
            if (_this.platform.is('cordova')) {
                _this.backgroundMode.configure({ silent: true, hidden: true });
                _this.backgroundMode.enable();
                _this.backgroundMode.setDefaults({ silent: true, hidden: true });
                _this.backgroundSubscription = _this.backgroundMode.on('deactivate').subscribe(function () {
                    _this.sensorProvider.setupWebsocket();
                    _this.sensorProvider.setupMessageQueue();
                    _this.nav.goToRoot({});
                });
            }
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\app\app.html"*/'<ion-nav [root]="rootPage" #nav></ion-nav>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_5__providers_sensor_sensor_provider__["a" /* SensorProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[390]);
//# sourceMappingURL=main.js.map