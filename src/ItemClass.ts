export default class Item {
    public name : string;
    public category : string;
    public deleteState : boolean;
    constructor(name : string, category : string) {
        this.name = name;
        this.category = category;
        this.deleteState = false;
    }
}