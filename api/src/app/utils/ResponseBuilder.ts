export type ISimpleResponseObject = {
    message: "OK" | "xdd";
    data: object | undefined | null;
};

export type IPaginationResponseObject = ISimpleResponseObject & {
    page: number;
    itemsCount: number;
    itemsPerPage: number;
};

export class ResponseObject {
    protected data: ISimpleResponseObject["data"];
    protected message: ISimpleResponseObject["message"];

    toJSON() {
        return this.constructor.name;
    }
    toString() {
        return this.constructor.name;
    }

    constructor(data: ISimpleResponseObject["data"]) {
        this.data = data;
        const luckyNumber = Math.floor(Math.random() * 100) + 1;

        this.message = luckyNumber === 100 ? "xdd" : "OK";
    }

    buildResponse(): ISimpleResponseObject {
        return {
            message: this.message,
            data: this.data,
        };
    }
}

export class PaginationResponseObject extends ResponseObject {
    protected itemsCount: number;
    protected page: number;
    protected itemsPerPage: number;

    constructor(
        data: ISimpleResponseObject["data"],
        itemsCount: number,
        page: number | string
    ) {
        super(data);

        this.page = parseInt(String(page)) || 1;
        this.itemsCount = itemsCount;
        this.itemsPerPage = parseInt(process.env.API_ITEMS_PER_PAGE as string);
    }

    buildResponse(): IPaginationResponseObject {
        return {
            message: this.message,
            page: this.page,
            itemsCount: this.itemsCount,
            itemsPerPage: this.itemsPerPage,
            data: this.data,
        };
    }
}
