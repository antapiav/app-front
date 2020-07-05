export class Menu {
    constructor(
        private id: number,
        private name: string,
        private icon: string,
        private route: string,
        private listMenu: Array<Menu>
    ){}
}