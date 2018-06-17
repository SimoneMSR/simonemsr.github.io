webpackJsonp([0],{

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParametersMenuPageModule", function() { return ParametersMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parameters_menu__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(387);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ParametersMenuPageModule = /** @class */ (function () {
    function ParametersMenuPageModule() {
    }
    ParametersMenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__parameters_menu__["a" /* ParametersMenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__parameters_menu__["a" /* ParametersMenuPage */]),
            ],
        })
    ], ParametersMenuPageModule);
    return ParametersMenuPageModule;
}());

//# sourceMappingURL=parameters-menu.module.js.map

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

/***/ 758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParametersMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sensor_sensor_provider__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_base_page__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_index__ = __webpack_require__(33);
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





/**
 * Generated class for the ParametersMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParametersMenuPage = /** @class */ (function (_super) {
    __extends(ParametersMenuPage, _super);
    function ParametersMenuPage(navCtrl, navParams, sensorProvider, alert, events) {
        var _this = _super.call(this, alert, events) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.sensorProvider = sensorProvider;
        _this.menu = null;
        _this.sensorProvider.sensor.subscribe(function (s) {
            var menu = _this.navParams.get('menu');
            _this.title = menu.name;
            _this.menu = _this.sensorProvider.loadMenu(menu.id);
            _this.sensorProvider.setupMessageQueue();
        });
        return _this;
    }
    ParametersMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParametersMenuPage');
    };
    ParametersMenuPage.prototype.goHome = function () {
        this.navCtrl.setRoot('HomePage');
    };
    ParametersMenuPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ParametersMenuPage.prototype.addToHome = function () {
    };
    ParametersMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-parameters-menu',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\pages\parameters-menu\parameters-menu.html"*/'<!--\n  Generated template for the ParametersMenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-grid>\n		<ion-row>\n			<ion-col col-2 class="back">\n				<ion-icon name="arrow-back" (click)="goBack()"></ion-icon>\n			</ion-col>\n			<ion-col col-7 class="title">\n				<h2>{{title}}</h2>\n			</ion-col>\n			<ion-col col-3 class="menu">\n	<ion-icon name="menu"  (click)="goHome()"></ion-icon>\n			</ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-header>\n\n\n<ion-content padding>\n	<parameter-menu  [menu]="menu"></parameter-menu>\n</ion-content>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\pages\parameters-menu\parameters-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_sensor_sensor_provider__["a" /* SensorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_index__["b" /* Events */]])
    ], ParametersMenuPage);
    return ParametersMenuPage;
}(__WEBPACK_IMPORTED_MODULE_3__pages_base_page__["a" /* BasePage */]));

//# sourceMappingURL=parameters-menu.js.map

/***/ })

});
//# sourceMappingURL=0.js.map