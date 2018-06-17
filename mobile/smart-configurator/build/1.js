webpackJsonp([1],{

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(389);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

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

/***/ 757:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_base_page__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_index__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sensor_sensor_provider__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(182);
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
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function (_super) {
    __extends(MenuPage, _super);
    function MenuPage(navCtrl, navParams, alert, events, sensorProvider, platform, backgroundMode) {
        var _this = _super.call(this, alert, events) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.sensorProvider = sensorProvider;
        _this.platform = platform;
        _this.backgroundMode = backgroundMode;
        _this.roles = ['observer', 'maintenance', 'specialist'];
        _this.allMenus = {};
        _this.menus = [];
        _this.loadRoleMenus();
        return _this;
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.loadRoleMenus = function () {
        var _this = this;
        for (var _i = 0, _a = this.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            this.allMenus[role] = [];
        }
        this.sensorProvider.loadXml().subscribe(function (xml) {
            var menu, menuRole;
            for (var _i = 0, _a = _this.roles; _i < _a.length; _i++) {
                var role = _a[_i];
                menuRole = xml.IODevice.ProfileBody["0"].
                    DeviceFunction["0"].UserInterface["0"][role.charAt(0).toUpperCase() + role.slice(1) + 'RoleMenuSet']["0"];
                for (var _b = 0, _c = Object.keys(menuRole); _b < _c.length; _b++) {
                    menu = _c[_b];
                    _this.allMenus[role].push({ "name": Array(menu.split('_')).pop()[0].replace("Menu", ""), "id": menuRole[menu]["0"].$.menuId });
                }
            }
        });
    };
    MenuPage.prototype.goToMenu = function (menu) {
        this.navCtrl.push('ParametersMenuPage', { "menu": menu });
    };
    MenuPage.prototype.setRole = function (role) {
        this.menus = this.allMenus[role.trim().toLowerCase()];
    };
    MenuPage.prototype.goHome = function () {
        this.navCtrl.pop();
    };
    MenuPage.prototype.exit = function () {
        if (this.platform.is('cordova')) {
            this.backgroundMode.moveToBackground();
        }
        //this.platform.exitApp();
    };
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"D:\Simone\git\monforte\smart-configurator\src\pages\menu\menu.html"*/'<!--\n  Generated template for the MenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3>\n      <img src="assets/imgs/logo.PNG" class="logo">\n        </ion-col>\n        <ion-col col-6>\n              <p class="title">SMART CONFIGURATOR</p>\n      <p class="subtitle">Gavazzi base software</p>\n        </ion-col>\n        <ion-col col-3 class="menu">\n          <ion-grid>\n            <ion-row>\n              <ion-icon name="menu" class="menu" (click)="goHome()"></ion-icon>\n            </ion-row>\n            <ion-row>\n              <ion-icon name="exit" class="exit" (click)="exit()"></ion-icon>\n            </ion-row>\n          </ion-grid>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row class="project rule">\n        <ion-col col-4>\n        <button ion-button color="light">NEW</button>\n          \n        </ion-col>\n        <ion-col col-4>\n        <button ion-button color="light">SAVE</button>\n            \n        </ion-col>\n        <ion-col col-4>\n        <button ion-button color="light">LOAD</button>\n            \n        </ion-col>\n    </ion-row>\n    <ion-row class="menus rule">\n      <ion-select class="choose-role" (ionChange)="setRole($event)" interface="action-sheet" [placeholder]="\'Choose your role\'">\n        <ion-option *ngFor="let role of roles" >\n          {{role | capitalize}}\n        </ion-option>\n      </ion-select>\n    	<ion-list>\n    		<ion-item *ngFor="let menu of menus" (click)="goToMenu(menu)">\n    			<ion-label>{{menu.name}}</ion-label>\n    		</ion-item>\n    	</ion-list>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"D:\Simone\git\monforte\smart-configurator\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_index__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sensor_sensor_provider__["a" /* SensorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */]])
    ], MenuPage);
    return MenuPage;
}(__WEBPACK_IMPORTED_MODULE_2__pages_base_page__["a" /* BasePage */]));

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=1.js.map