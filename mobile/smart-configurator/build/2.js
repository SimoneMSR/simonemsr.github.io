webpackJsonp([2],{

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ], exports: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasePage; });
/**
 * Generated class for the BasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BasePage = /** @class */ (function () {
    function BasePage(alertController, events) {
        this.alertController = alertController;
        this.events = events;
    }
    BasePage.prototype.presentAlert = function (title, message, handler) {
        var alert = this.alertController.create({
            title: title,
            subTitle: message,
            buttons: [{
                    text: 'Ok',
                    handler: handler
                }]
        });
        alert.present();
    };
    return BasePage;
}());

//# sourceMappingURL=base.page.js.map

/***/ }),

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shortcuts_shortcuts_provider__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sensor_sensor_provider__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_variable_model__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_sensor_model__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_process_data_process_data__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_base_page__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_index__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_events_events_provider__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_operators__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__ = __webpack_require__(182);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage(navCtrl, shortcutsProvider, sensorProvider, events, alert, backgroundMode, platform, zone) {
        var _this = _super.call(this, alert, events) || this;
        _this.navCtrl = navCtrl;
        _this.shortcutsProvider = shortcutsProvider;
        _this.sensorProvider = sensorProvider;
        _this.backgroundMode = backgroundMode;
        _this.platform = platform;
        _this.zone = zone;
        _this.sensor = new __WEBPACK_IMPORTED_MODULE_5__models_sensor_model__["d" /* Sensor */]();
        _this.numericProcessData = [];
        _this.nonNumericProcessData = [];
        _this.accordionOpen = false;
        _this.showAlert = _this._showAlert.bind(_this);
        _this.showAlertIfWebsocketFailed();
        _this.shortcutsProvider.shortcuts.subscribe(function (res) {
            _this.shortcuts = res;
        });
        _this.sensorProvider.sensor.subscribe(function (s) {
            _this.sensor = s;
        });
        _this.readProcessData().subscribe(function () {
            _this.pollProcessData();
        });
        if (_this.platform.is('cordova')) {
            _this.backgroundMode.on('activate').subscribe(function () {
                _this.unsubscribeProcessData();
            });
        }
        return _this;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        if (this.pollProcessDataSubscription == undefined)
            this.pollProcessData();
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.unsubscribeProcessData();
    };
    HomePage.prototype.unsubscribeProcessData = function () {
        if (this.pollProcessDataSubscription != undefined)
            this.pollProcessDataSubscription.unsubscribe();
        this.pollProcessDataSubscription = undefined;
        if (this.processDataSubscription != undefined)
            this.processDataSubscription.unsubscribe();
        this.processDataSubscription = undefined;
    };
    HomePage.prototype.updateAccordionState = function (open) {
        var _this = this;
        this.zone.run(function () {
            _this.accordionOpen = open;
        });
    };
    HomePage.prototype.readProcessData = function () {
        var _this = this;
        return this.sensorProvider.sensor.pipe(Object(__WEBPACK_IMPORTED_MODULE_10_rxjs_operators__["map"])(function (s) {
            if (s.config) {
                _this.processData = _this.sensorProvider.loadProcessDataFromXml();
                if (_this.processData.type === 'RecordT') {
                    for (var _i = 0, _a = _this.processData.records; _i < _a.length; _i++) {
                        var recordItem = _a[_i];
                        if (recordItem.type === 'UIntegerT')
                            _this.numericProcessData.push(recordItem);
                        else
                            _this.nonNumericProcessData.push(recordItem);
                        if (recordItem.subIndex == _this.sensor.analogalueSubIndex)
                            _this.analogValue = recordItem;
                    }
                }
                _this.processDataSubscription = _this.sensorProvider.sensorReadProcessData.subscribe(function (message) {
                    if (message != null && message != undefined) {
                        var binaryMessage = __WEBPACK_IMPORTED_MODULE_4__models_variable_model__["c" /* Variable */].padLeft2(parseInt(message.substr(__WEBPACK_IMPORTED_MODULE_4__models_variable_model__["a" /* OFFSET */], _this.processData.bitLength / 4), 16).toString(2), _this.processData.bitLength);
                        message = __WEBPACK_IMPORTED_MODULE_4__models_variable_model__["c" /* Variable */].bin2hex(binaryMessage);
                        _this.processData.readValue(message);
                        _this.sensorProvider.messageReceived++;
                        _this.sensorProvider.messageConsumed.next(true);
                    }
                });
            }
        }));
    };
    HomePage.prototype.pollProcessData = function () {
        var _this = this;
        this.sensorProvider.websocketInitialized.pipe(Object(__WEBPACK_IMPORTED_MODULE_10_rxjs_operators__["filter"])(function (x) { return x == true; })).pipe(Object(__WEBPACK_IMPORTED_MODULE_10_rxjs_operators__["take"])(1)).subscribe(function () {
            var i = 0;
            if (_this.pollProcessDataSubscription === undefined)
                _this.pollProcessDataSubscription = _this.sensorProvider.pollProcessData();
        });
    };
    HomePage.prototype._showAlert = function () {
        this.presentAlert("Notice", "Cannot connect to sensor. Going OFFLINE mode");
    };
    HomePage.prototype.showAlertIfWebsocketFailed = function () {
        this.events.unsubscribe(__WEBPACK_IMPORTED_MODULE_9__providers_events_events_provider__["a" /* ALERT_NO_WEBSOCKET */]);
        this.events.subscribe(__WEBPACK_IMPORTED_MODULE_9__providers_events_events_provider__["a" /* ALERT_NO_WEBSOCKET */], this.showAlert);
    };
    HomePage.prototype.hide = function (p) {
        p.hidden = true;
    };
    HomePage.prototype.goMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    HomePage.prototype.prepareDistanceForSensorTick = function (n) {
        if (n == 0)
            return 0.0;
        else {
            var max = 2497.3374654506806; //((10001)/Math.log10(10001) - 2/Math.log(2))
            return ((n + 1) / Math.log10(n + 1) - 2 / Math.log(2)) / max;
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\pages\home\home.html"*/'<ion-header>\n  <ion-grid>\n      <ion-row>\n        <ion-col col-3>\n          <img src="assets/imgs/logo.PNG" class="logo">\n        </ion-col>\n        <ion-col col-6>\n        </ion-col>\n        <ion-col col-3 class="menu">\n          <ion-icon name="menu" class="menu" (click)="goMenu()"></ion-icon>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content padding [ngClass]="{\'accordion-open\' : accordionOpen}">\n  <ion-grid>\n  	<ion-row class="vertical-align-center header" >\n      <process-data [mode]="\'icons\'" [data]="numericProcessData"></process-data>\n  	</ion-row>\n    <ion-row class="vertical-align-center process-data rule">\n      <process-data [mode]="\'accordion\'" (accordionOpened)="updateAccordionState($event)" [data]="nonNumericProcessData"></process-data>\n    </ion-row>\n  	<ion-row class="vertical-align-center plot">\n      <sensor-plot  [distance]="prepareDistanceForSensorTick(analogValue&&analogValue.value) || 1"></sensor-plot>\n  	</ion-row>\n    <ion-row class="shortcuts">\n      <form>\n        <ion-list class="forced-label">\n        <ion-item-sliding *ngFor="let shortcut of shortcuts"  [hidden]="shortcut.hidden">\n          <ion-item>\n              <parameter [parameter]="shortcut"></parameter> \n            </ion-item>\n          <ion-item-options side="left">\n                <button ion-button (click)="hide(shortcut)" icon-only color="light">\n                    <ion-icon name="trash"></ion-icon>\n                </button>\n              </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n    </form>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\pages\home\home.html"*/,
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__components_process_data_process_data__["a" /* ProcessDataComponent */]
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_shortcuts_shortcuts_provider__["a" /* ShortcutsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sensor_sensor_provider__["a" /* SensorProvider */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular_index__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], HomePage);
    return HomePage;
}(__WEBPACK_IMPORTED_MODULE_7__pages_base_page__["a" /* BasePage */]));

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=2.js.map