declare var APP_CONTEXT_PATH;
declare var APP_RESOURCES_PATH;
declare var API_CONTEXT_PATH;
declare var APP_USUARIO;


export class AppConstants {

    public static String = class {
        public static STRING_VACIO = "";
        public static STRING_CERO = "0";
        public static STRING_SIN_MOVIMIENTOS = "Sin movimientos...";
    }

    public static ApiUrls = class {
        public static CONSULTA_RENIEC_RUC = "http://127.0.0.1:8090/consulta/reniec/";

        public static USUARIO_GET_LST = API_CONTEXT_PATH + "usuario/operation/lst?tipo=";
        public static USUARIO_GET_LST_2 = "&dato=";
        public static USUARIO_GET_USUARIO = API_CONTEXT_PATH + "usuario/operation/get/";
        public static USUARIO_IND_ACTIVO = API_CONTEXT_PATH + "usuario/operation/ind_activo/";
        public static USUARIO_INSERTAR_MODIFICAR = API_CONTEXT_PATH + "usuario/operation";
        public static USUARIO_LOGIN = API_CONTEXT_PATH + "usuario/operation/login";

        public static MOVIMIENTO_GET_LST = API_CONTEXT_PATH + "movimiento/operation/lst/";
        public static MOVIMIENTO_GET_MOVIMIENTO = API_CONTEXT_PATH + "movimiento/operation/get/";
        public static MOVIMIENTO_IND_ACTIVO = API_CONTEXT_PATH + "movimiento/operation/ind_activo/";

        public static CUENTA_GET_LST = API_CONTEXT_PATH + "cuenta/operation/lst/";
        public static CUENTA_GET_CUENTA = API_CONTEXT_PATH + "cuenta/operation/get/";
        public static CUENTA_IND_ACTIVO = API_CONTEXT_PATH + "cuenta/operation/ind_activo/";
    }
    public static Modal = class {
        public static TITLE_MODAL_UDATE_USUARIO = "Actualizar Usuario";
        public static TITLE_MODAL_DETALLE_USUARIO = "Detalle Usuario";
        public static TITLE_MODAL_REGISTRAR_USUARIO = "Registrar Usuario";
        public static TITLE_MODAL_DETALLE_CUENTA = "Detalle Cuenta";
        public static TITLE_MODAL_DETALLE_MOVIMIENTO = "Detalle Movimiento";

        public static OP_SAVE = "save";
        public static OP_UPDATE = "update";
        public static OP_DETAIL = "detail";
        public static BTN_REGISTRAR = "Registrar";
        public static BTN_ACTUALIZAR = "Actualizar";
    }
}